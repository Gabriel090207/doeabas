import "./Footer.css";

import {
    Shield,
    Lock,
    BadgeCheck,
    Heart,
} from "lucide-react";

import {
    FaInstagram,
    FaFacebookF,
    FaYoutube,
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

                            <a href="">
                                <FaInstagram />
                            </a>

                            <a href="">
                                <FaFacebookF />
                            </a>

                            <a href="">
                                <FaYoutube />
                            </a>

                            <a href="">
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

                        <a href="">Início</a>

                        <a href="">Campanhas</a>

                        <a href="">Login</a>

                     

                    </div>

                    {/* =========================
                        INSTITUCIONAL
                    ========================= */}

                    <div className="footer-column">

                        <h3>Institucional</h3>

                        <span></span>

                        <a href="">Sobre nós</a>

                        <a href="">Transparência</a>

                        <a href="">Termos de Uso</a>

                        <a href="">Politica de Privacidade</a>

                       

                    </div>

                    {/* =========================
                        AJUDA
                    ========================= */}

                    <div className="footer-column">

                        <h3>Ajuda</h3>

                        <span></span>

                        <a href="">Fale conosco</a>

                        <a href="">Taxas</a>

                       
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