import "./Login.css";

import { Link } from "react-router-dom";

import {
    ArrowLeft,
    Eye,
    Lock,
    Mail,
} from "lucide-react";

import background from "../../assets/images/login-background.png";
import bunny from "../../assets/images/login-bunny.png";
import logo from "../../assets/images/logo.png";


function Login() {

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

                    <form>

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
                                    type="password"
                                    placeholder="Sua senha"
                                />

                                <button
                                    type="button"
                                    className="show-password"
                                >

                                    <Eye size={20} />

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
                        >

                            Entrar

                        </button>

                    </form>

                   

                   

                    {/* Cadastro */}

                    <div className="login-register">

                        <span>

                            Ainda não possui conta?

                        </span>

                        <Link to="">

                            Criar conta

                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Login;