import { useEffect, useState } from "react";

import {
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Phone,
    User,
    X,
} from "lucide-react";

import "./RegisterModal.css";

import { useToast } from "../../../hooks/useToast";
import { useAuth } from "../../../hooks/useAuth";

type RegisterModalProps = {

    open: boolean;

    onClose: () => void;

    onSuccess: (
        email: string,
        password: string,
    ) => void;

};

type RegisterFormData = {
    fullName: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
};

function RegisterModal({

    open,

    onClose,

    onSuccess,

}: RegisterModalProps) {

        

    const [step, setStep] = useState(1);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState<RegisterFormData>({
        fullName: "",
        cpf: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { show } = useToast();
    const { createAccount, loading } = useAuth();

    


    function formatCpf(value: string) {

        return value
            .replace(/\D/g, "")
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    }

    function formatPhone(value: string) {

        const numbers = value
            .replace(/\D/g, "")
            .slice(0, 11);

        if (numbers.length <= 10) {

            return numbers
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2");

        }

        return numbers
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");

    }

    function isValidCpf(cpf: string) {

        const cleanedCpf = cpf.replace(/\D/g, "");

        if (cleanedCpf.length !== 11) {
            return false;
        }

        if (/^(\d)\1{10}$/.test(cleanedCpf)) {
            return false;
        }

        let sum = 0;

        for (let index = 0; index < 9; index++) {

            sum += Number(cleanedCpf[index]) * (10 - index);

        }

        let remainder = (sum * 10) % 11;

        if (remainder === 10) {
            remainder = 0;
        }

        if (remainder !== Number(cleanedCpf[9])) {
            return false;
        }

        sum = 0;

        for (let index = 0; index < 10; index++) {

            sum += Number(cleanedCpf[index]) * (11 - index);

        }

        remainder = (sum * 10) % 11;

        if (remainder === 10) {
            remainder = 0;
        }

        return remainder === Number(cleanedCpf[10]);

    }

    useEffect(() => {

        if (!open) {
            return;
        }

        document.body.style.overflow = "hidden";

        function handleEscape(event: KeyboardEvent) {

            if (event.key === "Escape") {
                onClose();
            }

        }

        window.addEventListener("keydown", handleEscape);

        return () => {

            document.body.style.overflow = "";

            window.removeEventListener("keydown", handleEscape);

        };

    }, [open, onClose]);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const { name, value } = event.target;

        let formattedValue = value;

        if (name === "cpf") {

            formattedValue = formatCpf(value);

        }

        if (name === "phone") {

            formattedValue = formatPhone(value);

        }

        setFormData((currentData) => ({
            ...currentData,
            [name]: formattedValue,
        }));

    }


    function validateStepOne() {

        if (!formData.fullName.trim()) {

            show({

                type: "error",

                title: "Nome obrigatório",

                message: "Informe seu nome completo.",

            });

            return false;

        }

        if (!formData.cpf.trim()) {

            show({

                type: "error",

                title: "CPF obrigatório",

                message: "Informe seu CPF.",

            });

            return false;

        }

        if (!isValidCpf(formData.cpf)) {

            show({

                type: "error",

                title: "CPF inválido",

                message: "Digite um CPF válido.",

            });

            return false;

        }

        if (!formData.phone.trim()) {

            show({

                type: "error",

                title: "Telefone obrigatório",

                message: "Informe seu telefone.",

            });

            return false;

        }

        const phone = formData.phone.replace(/\D/g, "");

        if (phone.length < 10 || phone.length > 11) {

            show({

                type: "error",

                title: "Telefone inválido",

                message: "Digite um telefone válido.",

            });

            return false;

        }

        return true;

    }

    function validateStepTwo() {

        if (!formData.email.trim()) {

            show({

                type: "error",

                title: "E-mail obrigatório",

                message: "Informe seu endereço de e-mail.",

            });

            return false;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {

            show({

                type: "error",

                title: "E-mail inválido",

                message: "Digite um endereço de e-mail válido.",

            });

            return false;

        }

        if (!formData.password) {

            show({

                type: "error",

                title: "Senha obrigatória",

                message: "Crie uma senha para sua conta.",

            });

            return false;

        }

        if (formData.password.length < 6) {

            show({

                type: "error",

                title: "Senha muito curta",

                message: "A senha deve possuir pelo menos 6 caracteres.",

            });

            return false;

        }

        if (!formData.confirmPassword) {

            show({

                type: "error",

                title: "Confirmação obrigatória",

                message: "Repita sua senha.",

            });

            return false;

        }

        if (formData.password !== formData.confirmPassword) {

            show({

                type: "error",

                title: "Senhas diferentes",

                message: "As senhas informadas não coincidem.",

            });

            return false;

        }

        return true;

    }

    function handleOverlayClick(
        event: React.MouseEvent<HTMLDivElement>
    ) {

        if (event.target === event.currentTarget) {
            onClose();
        }

    }

    function handleNextStep(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        if (!validateStepOne()) {
            return;
        }

        setStep(2);

    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        if (!validateStepTwo()) {
            return;
        }

        try {

            await createAccount({

                fullName: formData.fullName,

                cpf: formData.cpf,

                phone: formData.phone,

                email: formData.email,

                password: formData.password,

            });

            show({

                type: "success",

                title: "Conta criada",

                message: "Sua conta foi criada com sucesso.",

            });

            const email = formData.email;

            const password = formData.password;

            setFormData({

                fullName: "",

                cpf: "",

                phone: "",

                email: "",

                password: "",

                confirmPassword: "",

            });

            setStep(1);

            setShowPassword(false);

            setShowConfirmPassword(false);

            onSuccess(
                email,
                password,
            );

            onClose();

        } catch (error) {

            show({

                type: "error",

                title: "Erro ao criar conta",

                message:
                    error instanceof Error
                        ? error.message
                        : "Não foi possível criar sua conta.",

            });

        }

    }

    if (!open) {

        return null;

    }

    return (

        <div
            className="register-overlay"
            onMouseDown={handleOverlayClick}
        >

            <div
                className="register-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="register-title"
            >

                <button
                    type="button"
                    className="register-close"
                    onClick={onClose}
                    aria-label="Fechar cadastro"
                >

                    <X size={22} />

                </button>

                <div className="register-header">

                    <span className="register-step-text">

                        Etapa {step} de 2

                    </span>

                    <h2 id="register-title">

                        Criar sua conta

                    </h2>

                    <p>

                        Preencha seus dados para começar.

                    </p>

                    <div className="register-progress">

                        <span
                            className={
                                step === 2
                                    ? "is-complete"
                                    : ""
                            }
                        />

                    </div>

                </div>

                {step === 1 ? (

                    <form
                        className="register-form"
                        onSubmit={handleNextStep}
                        noValidate
                    >

                        <div className="register-input-group">

                            <label htmlFor="register-full-name">

                                Nome completo

                            </label>

                            <div className="register-input-control">

                                <User size={20} />

                                <input
                                    id="register-full-name"
                                    name="fullName"
                                    type="text"
                                    placeholder="Digite seu nome completo"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    autoComplete="name"
                                   
                                />

                            </div>

                        </div>

                        <div className="register-input-group">

                            <label htmlFor="register-cpf">

                                CPF

                            </label>

                            <div className="register-input-control">

                                <User size={20} />

                                <input
                                    id="register-cpf"
                                    name="cpf"
                                    type="text"
                                    placeholder="000.000.000-00"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    inputMode="numeric"
                                   
                                />

                            </div>

                        </div>

                        <div className="register-input-group">

                            <label htmlFor="register-phone">

                                Telefone

                            </label>

                            <div className="register-input-control">

                                <Phone size={20} />

                                <input
                                    id="register-phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="(00) 00000-0000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    autoComplete="tel"
                                  
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="register-primary-button"
                        >

                            Continuar

                            <ArrowRight size={18} />

                        </button>

                    </form>

                ) : (

                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                        noValidate
                    >

                        <div className="register-input-group">

                            <label htmlFor="register-email">

                                E-mail

                            </label>

                            <div className="register-input-control">

                                <Mail size={20} />

                                <input
                                    id="register-email"
                                    name="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    
                                />

                            </div>

                        </div>

                        <div className="register-input-group">

                            <label htmlFor="register-password">

                                Senha

                            </label>

                            <div className="register-input-control">

                                <Lock size={20} />

                                <input
                                    id="register-password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Crie uma senha"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    
                                />

                                <button
                                    type="button"
                                    className="register-password-button"
                                    onClick={() =>
                                        setShowPassword(
                                            (currentValue) =>
                                                !currentValue
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >

                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}

                                </button>

                            </div>

                        </div>

                        <div className="register-input-group">

                            <label htmlFor="register-confirm-password">

                                Repetir senha

                            </label>

                            <div className="register-input-control">

                                <Lock size={20} />

                                <input
                                    id="register-confirm-password"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Repita sua senha"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    
                                />

                                <button
                                    type="button"
                                    className="register-password-button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (currentValue) =>
                                                !currentValue
                                        )
                                    }
                                    aria-label={
                                        showConfirmPassword
                                            ? "Ocultar confirmação"
                                            : "Mostrar confirmação"
                                    }
                                >

                                    {showConfirmPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}

                                </button>

                            </div>

                        </div>

                        <div className="register-actions">

                            <button
                                type="button"
                                className="register-back-button"
                                onClick={() => setStep(1)}
                            >

                                <ArrowLeft size={18} />

                                Voltar

                            </button>

                            <button
                                type="submit"
                                className="register-primary-button"
                                disabled={loading}
                            >

                                {

                                    loading
                                        ? "Criando conta..."
                                        : "Criar conta"

                                }

                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>

    );

}

export default RegisterModal;