import "./Footer.css";

import {
    Shield,
    Lock,
    BadgeCheck,
    Heart,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
    FaInstagram,
    FaWhatsapp,
} from "react-icons/fa";

import logo from "../../../assets/images/logo-white.png";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-top">

                    {/* =========================
                        COLUNA LOGO
                    ========================= */}

                    <div className="footer-brand">

                        <img
                            src={logo}
                            alt="ABAS"
                            className="footer-logo"
                        />

                        <p>

                            Conectamos quem quer ajudar com quem precisa
                            de esperança, cuidado e transformação.

                        </p>

                        <strong>

                            Juntos, vamos mais longe.

                        </strong>

                        <div className="footer-social">

                            <a
                                href="https://www.instagram.com/doe.abas/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram da ABAS"

                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://wa.me/5586921427920"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp da ABAS"
                            >
                                <FaWhatsapp />
                            </a>

                        </div>

                    </div>

                    {/* =========================
                        PARA VOCÊ
                    ========================= */}

                    <div className="footer-column">

                        <h3>Para você</h3>

                        <span></span>

                        <Link to="/">Início</Link>

                        <Link to="/campanhas">Campanhas</Link>

                        <Link to="/login">Login</Link>

                    </div>

                    {/* =========================
                        INSTITUCIONAL
                    ========================= */}

                    <div className="footer-column">

                        <h3>Institucional</h3>

                        <span></span>

                        <Link to="/sobre">Sobre nós</Link>

                        <Link to="/transparencia">Transparência</Link>

                        

                    </div>

                    {/* =========================
                        AJUDA
                    ========================= */}

                    <div className="footer-column">

                        <h3>Ajuda</h3>

                        <span></span>

                        <a
                            href="https://wa.me/5586921427920"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Fale conosco
                        </a>

                        <Link to="/transparencia">Taxas</Link>

                    </div>

                </div>

                {/* =========================
                    BENEFÍCIOS
                ========================= */}

                <div className="footer-features">

                    <div className="footer-feature">

                        <div className="footer-feature-icon">

                            <Shield size={28} />

                        </div>

                        <div>

                            <strong>100% Seguro</strong>

                            <span>Seus dados protegidos</span>

                        </div>

                    </div>

                    <div className="footer-feature">

                        <div className="footer-feature-icon">

                            <Lock size={28} />

                        </div>

                        <div>

                            <strong>Transparente</strong>

                            <span>Tudo é público e claro</span>

                        </div>

                    </div>

                    <div className="footer-feature">

                        <div className="footer-feature-icon">

                            <BadgeCheck size={28} />

                        </div>

                        <div>

                            <strong>Confiável</strong>

                            <span>Milhares de histórias reais</span>

                        </div>

                    </div>

                    <div className="footer-feature">

                        <div className="footer-feature-icon">

                            <Heart size={28} />

                        </div>

                        <div>

                            <strong>Impacto real</strong>

                            <span>Transformando vidas todos os dias</span>

                        </div>

                    </div>

                </div>

                {/* =========================
                    COPYRIGHT
                ========================= */}

                <div className="footer-bottom">

                    <p>

                        © {currentYear} ABAS. Todos os direitos reservados.

                    </p>

                </div>

            </div>

        </footer>

    );

}

export default Footer;