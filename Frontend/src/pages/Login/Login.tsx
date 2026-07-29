import "./Login.css";

import { useState } from "react";

import RegisterModal from "./components/RegisterModal";

import { Link } from "react-router-dom";

import {
    ArrowLeft,
    Eye,
    EyeOff,
    Lock,
    Mail,
} from "lucide-react";

import background from "../../assets/images/login-background.png";
import bunny from "../../assets/images/login-bunny.png";
import logo from "../../assets/images/logo.png";

import { useNavigate } from "react-router-dom";

import { useToast } from "../../hooks/useToast";

import { useAuth } from "../../hooks/useAuth";

function Login() {

const [registerOpen, setRegisterOpen] = useState(false);

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const navigate = useNavigate();

const { show } = useToast();

const { login, loading } = useAuth();

const [showPassword, setShowPassword] =
    useState(false);

function handleRegisterSuccess(
    email: string,
    password: string,
) {

    setEmail(email);

    setPassword(password);

}

async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
) {

    event.preventDefault();

    if (!email.trim()) {

        show({

            type: "error",

            title: "E-mail obrigatório",

            message: "Informe seu e-mail.",

        });

        return;

    }

    if (!password.trim()) {

        show({

            type: "error",

            title: "Senha obrigatória",

            message: "Informe sua senha.",

        });

        return;

    }

    try {

        await login(

            email,

            password,

        );

        show({

            type: "success",

            title: "Login realizado",

            message: "Bem-vindo de volta!",

        });

        navigate("/");

    } catch (error) {

        show({

            type: "error",

            title: "Erro ao entrar",

            message:

                error instanceof Error

                    ? error.message

                    : "Não foi possível entrar.",

        });

    }

}

    return (

        <section
            className="login"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >

            {/* ===========================
                LEFT
            =========================== */}

            <div className="login-left">

                <div className="login-text">

                    <h1>

                        Que bom

                        <span> ter você </span>

                        de volta!

                    </h1>

                    <div className="login-line"></div>

                    <p>

                        Cada retorno é uma nova
                        oportunidade de transformar
                        vidas.

                    </p>

                </div>

                <img
                    src={bunny}
                    alt="ABAS"
                    className="login-bunny"
                />

                <div className="login-brand">

                    <img
                        src={logo}
                        alt="ABAS"
                    />

                  

                </div>

            </div>

            {/* ===========================
                RIGHT
            =========================== */}

            <div className="login-right">

                <Link
                    to="/"
                    className="login-back"
                >

                    <ArrowLeft size={18} />

                    Voltar ao site

                </Link>

                <div className="login-card">

                    <h2>

                        Entrar na sua conta

                    </h2>

                    <form onSubmit={handleLogin}>

                        {/* Email */}

                        <div className="input-group">

                            <label>

                                E-mail

                            </label>

                            <div className="input-control">

                                <Mail size={20} />

                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />

                            </div>

                        </div>

                        {/* Senha */}

                        <div className="input-group">

                            <label>

                                Senha

                            </label>

                            <div className="input-control">

                                <Lock size={20} />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Sua senha"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />

                                <button
                                    type="button"
                                    className="show-password"
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

                                    {

                                        showPassword ? (

                                            <EyeOff size={20} />

                                        ) : (

                                            <Eye size={20} />

                                        )

                                    }

                                </button>

                            </div>

                        </div>

                        {/* Opções */}

                        <div className="login-options">

                            <label className="remember">

                                <input type="checkbox" />

                                Lembrar de mim

                            </label>

                            <Link to="">

                                Esqueceu sua senha?

                            </Link>

                        </div>

                        {/* Botão */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >

                            {

                                loading

                                    ? "Entrando..."

                                    : "Entrar"

                            }

                        </button>

                    </form>

                   

                   

                    {/* Cadastro */}

                    <div className="login-register">

                        <span>

                            Ainda não possui conta?

                        </span>

                        <button
                            type="button"
                            className="login-register-button"
                            onClick={() => setRegisterOpen(true)}
                        >

                            Criar conta

                        </button>

                    </div>

                </div>

            </div>


            <RegisterModal
                open={registerOpen}
                onClose={() => setRegisterOpen(false)}
                onSuccess={handleRegisterSuccess}
            />

        </section>

    );

}

export default Login;