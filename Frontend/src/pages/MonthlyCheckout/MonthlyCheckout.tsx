import "./MonthlyCheckout.css";

import { useState } from "react";

import { Link } from "react-router-dom";


import {
    ArrowLeft,
} from "lucide-react";

import { useToast } from "../../hooks/useToast";

function MonthlyCheckout() {

const { show } = useToast();

const [donorName, setDonorName] = useState("");
const [donorEmail, setDonorEmail] = useState("");
const [donorCpf, setDonorCpf] = useState("");
const [donorPhone, setDonorPhone] = useState("");

const [amount, setAmount] = useState("");

const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

const [step, setStep] = useState(1);


const donationValue =
    Number(amount.replace(/\./g, "").replace(",", ".")) || 0;


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

                        {step === 1 ? (

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



                                <div className="checkout-payment-form">

                                    <div className="checkout-payment-form">

                                        <div className="checkout-field">

                                            <label>

                                                Número do cartão

                                            </label>

                                            <input
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                            />

                                        </div>

                                        <div className="checkout-field">

                                            <label>

                                                Nome impresso no cartão

                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Digite o nome impresso no cartão"
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
                                                />

                                            </div>

                                            <div className="checkout-field">

                                                <label>

                                                    CVV

                                                </label>

                                                <input
                                                    type="password"
                                                    placeholder="123"
                                                    maxLength={4}
                                                />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                              
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
                                    >

                                        Finalizar doação

                                    </button>

                                </div>

                            </section>

                        )}
                            

                    </article>

                   

                        <div className="checkout-summary-card">

                            <div className="checkout-summary-image-wrapper">

                            <img
                                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&auto=format&fit=crop&q=80"
                                alt="Campanha"
                                className="checkout-summary-image"
                            />

                            <span className="checkout-summary-category">

                                Saúde

                            </span>

                        </div>

                        <div className="checkout-summary-content">

                                <h3>

                                    Ajude no tratamento da Maria

                                </h3>

                                <p>

                                    Organizado por João Silva

                                </p>

                            </div>

                            <div className="checkout-summary-progress">

                                <span className="checkout-summary-progress-value">

                                    68%

                                </span>

                                <div className="checkout-summary-progress-bar">

                                    <div
                                        className="checkout-summary-progress-fill"
                                        style={{ width: "68%" }}
                                    />

                                </div>

                            </div>

                            <div className="checkout-summary-values">

                                <div>

                                    <span>

                                        Arrecadado

                                    </span>

                                    <strong>

                                        R$ 13.640,00

                                    </strong>

                                </div>

                                <div>

                                    <span>

                                        Meta

                                    </span>

                                    <strong>

                                        R$ 20.000,00

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

        </main>

    );

}

export default MonthlyCheckout;