import "./Checkout.css";

import {
    useEffect,
    useState,
    useRef
} from "react";

import {
    useNavigate
} from "react-router-dom";

import { Link } from "react-router-dom";
import { SiPix } from "react-icons/si";

import {
    ArrowLeft,
    AlertCircle,
    CheckCircle2,
    CreditCard,
    Pencil,
    Plus,
    Wallet
} from "lucide-react";

import {
    useParams
} from "react-router-dom";

import {
    listenCampaignBySlug,
} from "../../services/campaigns";

import { useToast } from "../../hooks/useToast";

import {
    createPixPayment,
    createCardPayment,
    getPaymentStatus
} from "../../services/payments";

import { LoadingModal } from "../../components/LoadingModal/LoadingModal";

import {
    initMercadoPago
} from "@mercadopago/sdk-react";

import {
    MP_PUBLIC_KEY
} from "../../config/mercadopago";

declare global {

    interface Window {

        MercadoPago: any;

    }

}

function Checkout() {

const navigate = useNavigate();

const { slug } = useParams();

const [campaign, setCampaign] = useState<any>(null);

const { show } = useToast();

const [donorName, setDonorName] = useState("");
const [donorEmail, setDonorEmail] = useState("");
const [donorCpf, setDonorCpf] = useState("");
const [donorPhone, setDonorPhone] = useState("");

const [amount, setAmount] = useState("");

const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

const [step, setStep] = useState(1);

const [paymentMethod, setPaymentMethod] = useState("pix");

const walletBalance = 42.3;

const donationValue =
    Number(amount.replace(/\./g, "").replace(",", ".")) || 0;

const hasEnoughBalance = walletBalance >= donationValue;

const [editingDonation, setEditingDonation] = useState(false);

const [pixCode, setPixCode] = useState("");

const [pixQrCode, setPixQrCode] = useState("");

const [loadingPix, setLoadingPix] = useState(false);

const [pixGenerated, setPixGenerated] = useState(false);

const [paymentId, setPaymentId] = useState<string | null>(null);

const [showLoading, setShowLoading] = useState(false);

const [cardNumber, setCardNumber] = useState("");

const [cardName, setCardName] = useState("");

const [cardExpiration, setCardExpiration] = useState("");

const [cardCvv, setCardCvv] = useState("");

const [installments] = useState(1);

const mpRef = useRef<any>(null);

useEffect(() => {

    if(!slug){

        return;

    }


    const unsubscribe =
        listenCampaignBySlug(
            slug,
            (data)=>{

                setCampaign(data);

            }
        );


    return ()=>{

        unsubscribe();

    };


}, [slug]);

useEffect(() => {

    if(!paymentId){

        return;

    }


    const interval = setInterval(async()=>{

        try{

            const response =
                await getPaymentStatus(
                    paymentId
                );


            if(response.status === "approved"){


                clearInterval(interval);


                setShowLoading(true);


                setTimeout(()=>{


                    navigate(
                        "/sucesso"
                    );


                },5000);


            }


        }catch(error){

            console.log(error);

        }


    },3000);


    return ()=>{

        clearInterval(interval);

    };


},[
    paymentId,
    navigate
]);

function handleAmountChange(value: string) {

    const numbers = value.replace(/\D/g, "");

    const formatted = new Intl.NumberFormat("pt-BR", {

        minimumFractionDigits: 2,
        maximumFractionDigits: 2,

    }).format(Number(numbers) / 100);

    setAmount(numbers ? formatted : "");

}

function handleSelectAmount(value: number) {

    setSelectedAmount(value);

    const formatted = new Intl.NumberFormat("pt-BR", {

        minimumFractionDigits: 2,
        maximumFractionDigits: 2,

    }).format(value);

    setAmount(formatted);

}


function handleContinueStepOne() {

    if (!amount.trim() || donationValue <= 0) {

        show({

            type: "error",

            title: "Valor inválido",

            message: "Informe um valor maior que R$ 0,00 para continuar."

        });

        return;

    }

    setStep(2);

}

function formatCpf(value: string) {

    const cpf = value.replace(/\D/g, "").slice(0, 11);

    if (cpf.length <= 3) return cpf;

    if (cpf.length <= 6) {
        return cpf.replace(/(\d{3})(\d+)/, "$1.$2");
    }

    if (cpf.length <= 9) {
        return cpf.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    }

    return cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
    );

}

function formatPhone(value: string) {

    value = value.replace(/\D/g, "").slice(0, 11);

    if (value.length <= 10) {

        return value.replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");

    }

    return value.replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");

}

function isValidEmail(email: string) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

function isValidPhone(phone: string) {

    const digits = phone.replace(/\D/g, "");

    return digits.length >= 10;

}

function isValidCpf(cpf: string) {

    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let sum = 0;

    for (let i = 0; i < 9; i++) {
        sum += Number(cpf[i]) * (10 - i);
    }

    let firstDigit = (sum * 10) % 11;

    if (firstDigit === 10) {
        firstDigit = 0;
    }

    if (firstDigit !== Number(cpf[9])) {
        return false;
    }

    sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += Number(cpf[i]) * (11 - i);
    }

    let secondDigit = (sum * 10) % 11;

    if (secondDigit === 10) {
        secondDigit = 0;
    }

    return secondDigit === Number(cpf[10]);

}

function handleContinueStepTwo() {

    if (!donorName.trim()) {

        show({

            type: "error",

            title: "Nome obrigatório",

            message: "Informe seu nome completo."

        });

        return;

    }

    if (!donorEmail.trim()) {

        show({

            type: "error",

            title: "E-mail obrigatório",

            message: "Informe seu e-mail."

        });

        return;

    }

    if (!donorCpf.trim()) {

        show({

            type: "error",

            title: "CPF obrigatório",

            message: "Informe seu CPF."

        });

        return;

    }

    if (!donorPhone.trim()) {

        show({

            type: "error",

            title: "Telefone obrigatório",

            message: "Informe seu telefone."

        });

        return;

    }

    if (!isValidEmail(donorEmail)) {

        show({

            type: "error",

            title: "E-mail inválido",

            message: "Informe um e-mail válido."

        });

        return;

    }

    if (!isValidCpf(donorCpf)) {

        show({

            type: "error",

            title: "CPF inválido",

            message: "Informe um CPF válido."

        });

        return;

    }

    if (!isValidPhone(donorPhone)) {

        show({

            type: "error",

            title: "Telefone inválido",

            message: "Informe um telefone válido."

        });

        return;

    }

    setStep(3);

}

async function handleCreatePix(){

    if(!campaign){

        show({

            type:"error",

            title:"Campanha não encontrada",

            message:"Não foi possível identificar a campanha."

        });

        return;

    }

    try{

        setLoadingPix(true);


        const response = await createPixPayment({

            amount: donationValue,

            email: donorEmail,

            campaign_id:
                campaign?.id,

            campaign_title:
                campaign?.title,

            donor_name:
                donorName

        });


        setPaymentId(
            response.id
        );

        setPixCode(
            response.qr_code
        );


        setPixQrCode(
            response.qr_code_base64
        );

        setPixGenerated(true);


    }catch(error){

        show({

            type:"error",

            title:"Erro",

            message:"Não foi possível gerar o Pix."

        });

    }finally{

        setLoadingPix(false);

    }

}


async function handleCreateCard(){

    if(!campaign){

        show({

            type:"error",

            title:"Campanha não encontrada",

            message:"Não foi possível identificar a campanha."

        });

        return;

    }


    try{


        if(!mpRef.current){

            show({

                type:"error",

                title:"Erro",

                message:"Mercado Pago não carregado."

            });

            return;

        }



        const expiration =
            cardExpiration.replace(/\s/g,"").split("/");


        if(
            expiration.length !== 2
        ){

            show({

                type:"error",

                title:"Validade inválida",

                message:"Digite a validade no formato MM/AA."

            });

            return;

        }



        const cardToken =
            await mpRef.current.createCardToken({

                cardNumber:
                    cardNumber.replace(/\s/g,""),


                cardholderName:
                    cardName,


                securityCode:
                    cardCvv,


                expirationMonth:
                    expiration[0],


                expirationYear:
                    "20" + expiration[1],


                identificationType:
                    "CPF",


                identificationNumber:
                    donorCpf.replace(/\D/g,"")

            });



        const paymentMethods =
            await mpRef.current.getPaymentMethods({

                bin:
                    cardToken.first_six_digits

            });

        console.log(
            "BANDEIRA",
            paymentMethods
        );

        console.log(
            "TOKEN",
            cardToken
        );


        if(
            !paymentMethods.results ||
            paymentMethods.results.length === 0
        ){
            show({

                type:"error",

                title:"Cartão inválido",

                message:"Não foi possível identificar a bandeira do cartão."

            });

            return;

        }



        console.log(
            "TOKEN",
            cardToken
        );

        const payload = {

            token:
                cardToken.id,

            issuer_id:
                paymentMethods.results[0]?.issuer?.id,

            payment_method_id:
                paymentMethods.results[0]?.id,

            installments,

            amount:
                donationValue,

            email:
                donorEmail,

            campaign_id:
                campaign.id,

            campaign_title:
                campaign.title,

            donor_name:
                donorName,

            cpf:
                donorCpf.replace(/\D/g,""),

            expiration_month:
                Number(expiration[0]),

            expiration_year:
                Number("20" + expiration[1])

        };

        console.log(
            "PAYLOAD",
            payload
        );

        const response =
            await createCardPayment(
                payload
            );


        console.log(
            "PAGAMENTO CARTÃO",
            response
        );


        if (
            response.status === "approved"
        ) {

            setShowLoading(true);

            setTimeout(() => {

                navigate(
                    "/sucesso"
                );

            }, 2500);

        } else {

            show({

                type: "error",

                title: "Pagamento recusado",

                message: "O cartão não foi aprovado."

            });

        }


    }catch(error){

        console.log(error);

        show({

            type:"error",

            title:"Erro no pagamento",

            message:"Não foi possível processar o pagamento do cartão."

        });

    }

}

useEffect(()=>{

    initMercadoPago(
        MP_PUBLIC_KEY
    );


    if(window.MercadoPago){

        mpRef.current =
            new window.MercadoPago(
                MP_PUBLIC_KEY
            );

    }


},[]);


    return (

        <main className="checkout">

            <div className="checkout-container">

                <Link
                    to="/campanha"
                    className="checkout-back"
                >

                    <ArrowLeft size={18} />

                    Voltar para vaquinha

                </Link>

                <header className="checkout-header">

                    <h1>

                        Finalizar doação

                    </h1>

                    <p>

                        Conclua sua doação em poucos passos.

                    </p>

                </header>

               <div className="checkout-stepper">

                    <div className={`checkout-step ${step >= 1 ? "active" : ""}`}>

                        <div className="checkout-step-circle">

                            1

                        </div>

                        <span>

                            Valor

                        </span>

                    </div>

                    <div
                        className={`checkout-step-line ${
                            step > 1 ? "active" : ""
                        }`}
                    />

                    <div className={`checkout-step ${step >= 2 ? "active" : ""}`}>

                        <div className="checkout-step-circle">

                            2

                        </div>

                        <span>

                            Dados

                        </span>

                    </div>

                    <div
                        className={`checkout-step-line ${
                            step > 2 ? "active" : ""
                        }`}
                    />

                    <div className={`checkout-step ${step >= 3 ? "active" : ""}`}>

                        <div className="checkout-step-circle">

                            3

                        </div>

                        <span>

                            Pagamento

                        </span>

                    </div>


                    <div
                        className={`checkout-step-line ${
                            step > 3 ? "active" : ""
                        }`}
                    />

                    <div className={`checkout-step ${step >= 4 ? "active" : ""}`}>

                        <div className="checkout-step-circle">

                            4

                        </div>

                        <span>

                            Confirmação

                        </span>

                    </div>

                    

                </div>

                <section className="checkout-content">

                    <article className="checkout-card">

                        {pixGenerated ? (

                        <section className="checkout-pix-screen">

                            <button
                                type="button"
                                className="checkout-pix-cancel"
                                onClick={() => {

                                    setPixGenerated(false);

                                    setPixCode("");

                                    setPixQrCode("");

                                    setPaymentId(null);

                                    setStep(1);

                                }}
                            >

                                Cancelar

                            </button>


                            <h2>
                                Finalize sua doação via Pix
                            </h2>


                            {pixQrCode && (

                                <img
                                    className="checkout-pix-qrcode"
                                    src={`data:image/png;base64,${pixQrCode}`}
                                    alt="QR Code Pix"
                                />

                            )}


                            <div className="checkout-pix-copy">

                                <textarea
                                    readOnly
                                    value={pixCode}
                                />


                                <button
                                    type="button"
                                    onClick={() => {

                                        navigator.clipboard.writeText(
                                            pixCode
                                        );


                                        show({

                                            type:"success",

                                            title:"Código copiado",

                                            message:"O código Pix foi copiado para sua área de transferência."

                                        });

                                    }}
                                >

                                    Copiar código Pix

                                </button>

                            </div>


                        </section>

                    ) : (

                        step === 1 ? (

                            <section
                                key="step-1"
                                className="checkout-step-content"
                            >

                                    <header className="checkout-section-header">

                                    <span>

                                        Etapa 1

                                    </span>

                                    <h2>

                                        Escolha quanto deseja doar

                                    </h2>

                                    <p>

                                        Você pode selecionar um dos valores sugeridos ou informar outro valor.

                                    </p>

                                </header>

                                <div className="checkout-value-input">

                                    <label>

                                        Valor da doação

                                    </label>

                                    <div className="checkout-money-field">

                                        <span>

                                            R$

                                        </span>

                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="0,00"
                                            value={amount}
                                            onChange={(e) => handleAmountChange(e.target.value)}
                                        />

                                    </div>

                                </div>

                                <div className="checkout-suggestions">

                                    <button
                                        type="button"
                                        className={selectedAmount === 20 ? "active" : ""}
                                        onClick={() => handleSelectAmount(20)}
                                    >

                                        R$ 20

                                    </button>

                                    <button
                                        type="button"
                                        className={selectedAmount === 50 ? "active" : ""}
                                        onClick={() => handleSelectAmount(50)}
                                    >

                                        R$ 50

                                    </button>

                                    <button
                                        type="button"
                                        className={selectedAmount === 100 ? "active" : ""}
                                        onClick={() => handleSelectAmount(100)}
                                    >

                                        R$ 100

                                    </button>

                                    <button
                                        type="button"
                                        className={selectedAmount === 200 ? "active" : ""}
                                        onClick={() => handleSelectAmount(200)}
                                    >

                                        R$ 200

                                    </button>

                                    

                                </div>

                                <div className="checkout-actions">

                                    <button
                                        type="button"
                                        className="checkout-next-button"
                                        onClick={handleContinueStepOne}
                                    >

                                        Continuar

                                    </button>

                                </div>

                            </section>
                                

                        ) : step === 2 ? (

                            <section
                                key="step-2"
                                className="checkout-step-content"
                            >

                                <header className="checkout-section-header">

                                    <span>

                                        Etapa 2

                                    </span>

                                    <h2>

                                        Dados do doador

                                    </h2>

                                    <p>

                                        Informe seus dados para continuarmos com a doação.

                                    </p>

                                </header>

                                <div className="checkout-form">

                                    <div className="checkout-field">

                                        <label>

                                            Nome completo

                                        </label>

                                       <input
                                            type="text"
                                            placeholder="Seu nome completo"
                                            value={donorName}
                                            onChange={(e) => setDonorName(e.target.value)}
                                        />

                                    </div>

                                    <div className="checkout-field">

                                        <label>

                                            E-mail

                                        </label>

                                        <input
                                            type="email"
                                            placeholder="Seu e-mail"
                                            value={donorEmail}
                                            onChange={(e) => setDonorEmail(e.target.value)}
                                        />

                                    </div>

                                    <div className="checkout-row">

                                    <div className="checkout-field">

                                        <label>

                                            CPF

                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Seu CPF"
                                            value={donorCpf}
                                            onChange={(e) => setDonorCpf(formatCpf(e.target.value))}
                                        />

                                    </div>

                                    <div className="checkout-field">

                                        <label>

                                            Telefone

                                        </label>

                                        <input
                                            type="tel"
                                            placeholder="Seu telefone"
                                            value={donorPhone}
                                            onChange={(e) => setDonorPhone(formatPhone(e.target.value))}
                                        />

                                    </div>

                                </div>

                                </div>

                                <div className="checkout-actions">

                                    <button
                                        type="button"
                                        className="checkout-secondary-button"
                                        onClick={() => setStep(1)}
                                    >

                                        Voltar

                                    </button>

                                    <button
                                        type="button"
                                        className="checkout-next-button"
                                        onClick={handleContinueStepTwo}
                                    >

                                        Continuar

                                    </button>

                                </div>

                            </section>

                       ) : (

                            <section
                                key="step-3"
                                className="checkout-step-content"
                            >

                                <header className="checkout-section-header">

                                    <span>

                                        Etapa 3

                                    </span>

                                    <h2>

                                        Forma de pagamento

                                    </h2>

                                    <p>

                                        Escolha como deseja concluir sua doação.

                                    </p>

                                </header>

                               <div className="checkout-payment-options">

                                    <button
                                        type="button"
                                        className={`checkout-payment-option ${
                                            paymentMethod === "pix" ? "active" : ""
                                        }`}
                                        onClick={() => setPaymentMethod("pix")}
                                    >
                                        <SiPix
                                            size={36}
                                            className="checkout-payment-icon"
                                        />

                                        <span>PIX</span>

                                    </button>

                                    <button
                                        type="button"
                                        className={`checkout-payment-option ${
                                            paymentMethod === "card" ? "active" : ""
                                        }`}
                                        onClick={() => setPaymentMethod("card")}
                                    >
                                        <CreditCard
                                            size={36}
                                            className="checkout-payment-icon"
                                        />

                                        <span>Cartão</span>

                                    </button>

                                    <button
                                        type="button"
                                        className={`checkout-payment-option ${
                                            paymentMethod === "wallet" ? "active" : ""
                                        }`}
                                        onClick={() => setPaymentMethod("wallet")}
                                    >
                                        <Wallet
                                            size={36}
                                            className="checkout-payment-icon"
                                        />

                                        <span>Carteira</span>

                                    </button>

                                </div>


                                {paymentMethod === "pix" && (

                                    <div className="checkout-payment-info">

                                        <h3>

                                            Pagamento via PIX

                                        </h3>

                                        <p>

                                            Após clicar em <strong>Finalizar doação</strong>, um QR Code e um código PIX Copia e Cola serão gerados para você concluir o pagamento.

                                        </p>

                                    </div>

                                )}


                              {paymentMethod === "card" && (

                                <div className="checkout-payment-form">


                                    <div className="checkout-field">

                                        <label>
                                            Número do cartão
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            value={cardNumber}
                                            onChange={(e)=>setCardNumber(e.target.value)}
                                            maxLength={19}
                                        />

                                    </div>



                                    <div className="checkout-field">

                                        <label>
                                            Nome impresso no cartão
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Digite o nome impresso no cartão"
                                            value={cardName}
                                            onChange={(e)=>setCardName(e.target.value)}
                                        />

                                    </div>



                                    <div className="checkout-row">


                                        <div className="checkout-field">

                                            <label>
                                                Validade
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="MM/AA"
                                                value={cardExpiration}
                                                onChange={(e)=>setCardExpiration(e.target.value)}
                                                maxLength={5}
                                            />

                                        </div>



                                        <div className="checkout-field">

                                            <label>
                                                CVV
                                            </label>

                                            <input
                                                type="password"
                                                placeholder="123"
                                                value={cardCvv}
                                                onChange={(e)=>setCardCvv(e.target.value)}
                                                maxLength={4}
                                            />

                                        </div>


                                    </div>


                                </div>

                            )}

                                {paymentMethod === "wallet" && (

                                    <div className="checkout-wallet">

                                        <div className="checkout-wallet-header">

                                            <div>

                                                <span className="checkout-wallet-label">

                                                    Saldo disponível

                                                </span>

                                                <strong className="checkout-wallet-balance">

                                                    {walletBalance.toLocaleString("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    })}

                                                </strong>

                                            </div>

                                            <Wallet size={28} />

                                        </div>

                                        <div className="checkout-wallet-donation">

                                            <div>

                                                <span>

                                                    Valor da doação

                                                </span>

                                                {editingDonation ? (

                                                    <input
                                                        className="checkout-wallet-input"
                                                        value={amount}
                                                        onChange={(e) => handleAmountChange(e.target.value)}
                                                    />

                                                ) : (

                                                    <strong>

                                                        {donationValue.toLocaleString("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        })}

                                                    </strong>

                                                )}

                                            </div>

                                            <button
                                                type="button"
                                                className="checkout-wallet-edit"
                                                onClick={() => setEditingDonation(!editingDonation)}
                                            >

                                                <Pencil size={17} />

                                                {editingDonation ? "Salvar" : "Alterar valor"}

                                            </button>

                                        </div>

                                        {hasEnoughBalance ? (

                                            <div className="checkout-wallet-status success">

                                                <CheckCircle2 size={21} />

                                                <div>

                                                    <strong>

                                                        Saldo suficiente

                                                    </strong>

                                                    <p>

                                                        Seu saldo cobre o valor desta doação.

                                                    </p>

                                                </div>

                                            </div>

                                        ) : (

                                            <div className="checkout-wallet-status warning">

                                                <AlertCircle size={21} />

                                                <div>

                                                    <strong>

                                                        Saldo insuficiente

                                                    </strong>

                                                    <p>

                                                        Altere o valor da doação ou adicione saldo à sua carteira.

                                                    </p>

                                                </div>

                                            </div>

                                        )}

                                        {!hasEnoughBalance && (

                                            <button
                                                type="button"
                                                className="checkout-add-balance"
                                            >

                                                <Plus size={18} />

                                                Adicionar saldo

                                            </button>

                                        )}

                                    </div>

                                )}

                                <div className="checkout-actions">

                                    <button
                                        type="button"
                                        className="checkout-secondary-button"
                                        onClick={() => setStep(2)}
                                    >

                                        Voltar

                                    </button>

                                    <button
                                        type="button"
                                        className="checkout-next-button"
                                        onClick={
                                            paymentMethod === "pix"
                                                ? handleCreatePix
                                                : paymentMethod === "card"
                                                    ? handleCreateCard
                                                    : undefined
                                        }
                                    >
                                        {loadingPix
                                            ? "Gerando Pix..."
                                            : "Finalizar doação"
                                        }

                                    </button>

                                </div>

                            </section>

                        )

                        )}
                            

                    </article>

                   

                        <div className="checkout-summary-card">

                            <div className="checkout-summary-image-wrapper">

                            <img
                                src={campaign?.coverImage}
                                alt={campaign?.title}
                                className="checkout-summary-image"
                            />

                            <span className="checkout-summary-category">

                                {campaign?.category}

                            </span>

                        </div>

                        <div className="checkout-summary-content">

                                <h3>

                                    {campaign?.title}

                                </h3>

                                <p>

                                    {campaign?.story}

                                </p>

                            </div>

                            <div className="checkout-summary-progress">

                                <span className="checkout-summary-progress-value">

                                    {
                                        campaign
                                        ? Math.min(
                                            Math.round(
                                                (campaign.raisedAmount / campaign.goalAmount) * 100
                                            ),
                                            100
                                        )
                                        : 0
                                    }%

                                </span>

                                <div className="checkout-summary-progress-bar">

                                    <div
                                        className="checkout-summary-progress-fill"
                                        style={{
                                            width: `${
                                                campaign
                                                ? Math.min(
                                                    Math.round(
                                                        (campaign.raisedAmount /
                                                        campaign.goalAmount) * 100
                                                    ),
                                                    100
                                                )
                                                : 0
                                            }%`
                                        }}
                                    />

                                </div>

                            </div>

                            <div className="checkout-summary-values">

                                <div>

                                    <span>

                                        Arrecadado

                                    </span>

                                    <strong>

                                       {campaign?.raisedAmount.toLocaleString(
                                            "pt-BR",
                                            {
                                                style:"currency",
                                                currency:"BRL"
                                            }
                                        )}

                                    </strong>

                                </div>

                                <div>

                                    <span>

                                        Meta

                                    </span>

                                    <strong>

                                       {campaign?.goalAmount.toLocaleString(
                                            "pt-BR",
                                            {
                                                style:"currency",
                                                currency:"BRL"
                                            }
                                        )}

                                    </strong>

                                </div>

                            </div>

                            <div className="checkout-summary-footer">

                                <strong>

                                    184 doadores

                                </strong>

                            </div>

                        </div>

                    

                </section>

            </div>


            <LoadingModal
                open={showLoading}
                title="Pagamento confirmado!"
                description="Estamos preparando sua confirmação."
            />

        </main>

    );

}

export default Checkout;