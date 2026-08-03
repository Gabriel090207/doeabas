import "./Header.css";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Link,
    NavLink,
    useNavigate,
} from "react-router-dom";

import {
    Building2,
    CreditCard,
    Heart,
    HeartHandshake,
    Home,
    LogIn,
    LogOut,
    Menu,
    ShieldCheck,
    User,
    X,
} from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";

import logo from "../../../assets/images/logo.png";
import { useToast } from "../../../hooks/useToast";

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    const [accountMenuOpen, setAccountMenuOpen] =
    useState(false);

    const accountMenuRef =
        useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const {

        authenticated,

        logout,

    } = useAuth();

    const { show } = useToast();


    useEffect(() => {

        function handleClickOutside(
            event: MouseEvent,
        ) {

            if (

                accountMenuRef.current &&

                !accountMenuRef.current.contains(

                    event.target as Node,

                )

            ) {

                setAccountMenuOpen(false);

            }

        }

        document.addEventListener(

            "mousedown",

            handleClickOutside,

        );

        return () => {

            document.removeEventListener(

                "mousedown",

                handleClickOutside,

            );

        };

    }, []);

    async function handleLogout() {

        setAccountMenuOpen(false);

        setMenuOpen(false);

        show({
            type: "success",
            title: "Sessão encerrada",
            message: "Até a próxima!"
        });

        navigate("/", { replace: true });

        await logout();

    }

    return (

        <header className="header">

            {/* ===========================
                TOP HEADER
            =========================== */}

            <div className="header-top">

                <div className="header-top-content">

                    <div className="header-message">

                        <Heart
                            size={16}
                            fill="currentColor"
                        />

                        <span>

                            Arrecadamos esperança. Transformamos histórias.

                        </span>

                    </div>

                    <Link
                        to="/seja-doador-mensal"
                        className="header-donor-button"
                    >

                        <Heart size={16} />

                        Seja doador mensal

                    </Link>

                </div>

            </div>

            {/* ===========================
                NAVBAR
            =========================== */}

            <div className="header-navbar">

                <div className="header-navbar-content">

                    <img
                        src={logo}
                        alt="ABAS"
                        className="header-logo"
                    />

                    {/* Desktop */}

                    <nav className="header-menu">

                        <NavLink to="/">
                            Início
                        </NavLink>

                        <NavLink to="/campanhas">
                            Campanhas
                        </NavLink>

                        <NavLink to="/sobre">
                            Sobre nós
                        </NavLink>

                        <NavLink to="/transparencia">
                            Transparência
                        </NavLink>

                    </nav>

                    {

                        authenticated ? (

                            <div
                                className="header-account"
                                ref={accountMenuRef}
                            >

                                <button
                                    type="button"
                                    className="header-login"
                                    onClick={() =>
                                        setAccountMenuOpen(
                                            (currentValue) =>
                                                !currentValue
                                        )
                                    }
                                >

                                    <User size={20} />

                                    Minha Conta

                                </button>

                                {

                                    accountMenuOpen && (

                                        <div
                                            className="header-account-menu"
                                        >

                                            <Link
                                                to="/perfil"
                                                onClick={() =>
                                                    setAccountMenuOpen(false)
                                                }
                                            >

                                                <User size={18} />

                                                Meu Perfil

                                            </Link>

                                            <Link
                                                to="/minhas-doacoes"
                                                onClick={() =>
                                                    setAccountMenuOpen(false)
                                                }
                                            >

                                                <Heart size={18} />

                                                Minhas Doações

                                            </Link>

                                            <Link
                                                to="/minha-carteira"
                                                onClick={() =>
                                                    setAccountMenuOpen(false)
                                                }
                                            >

                                                <CreditCard size={18} />

                                                Minha Carteira

                                            </Link>

                                            <hr className="header-account-divider" />

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                            >

                                                <LogOut size={18} />

                                                Sair

                                            </button>

                                        </div>

                                    )

                                }

                            </div>

                        ) : (

                            <Link
                                to="/login"
                                className="header-login"
                            >

                                <LogIn size={20} />

                                Entrar

                            </Link>

                        )

                    }

                    {/* Mobile */}

                    <button
                        className="header-menu-button"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Abrir menu"
                    >

                        <Menu size={28} />

                    </button>

                </div>

            </div>

            {/* ===========================
                OVERLAY
            =========================== */}

            <div
                className={`mobile-overlay ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
            />

            {/* ===========================
                SIDEBAR
            =========================== */}

            <aside
                className={`mobile-sidebar ${menuOpen ? "active" : ""}`}
            >

                <div className="mobile-sidebar-header">

                    <img
                        src={logo}
                        alt="ABAS"
                        className="mobile-logo"
                    />

                    <button
                        onClick={() => setMenuOpen(false)}
                    >

                        <X size={28} />

                    </button>

                </div>

               <nav className="mobile-menu">

                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                    >
                        <Home size={20} />
                        <span>Início</span>
                    </NavLink>

                    <NavLink
                        to="/campanhas"
                        onClick={() => setMenuOpen(false)}
                    >
                        <HeartHandshake size={20} />
                        <span>Campanhas</span>
                    </NavLink>

                    <NavLink
                        to="/sobre"
                        onClick={() => setMenuOpen(false)}
                    >
                        <Building2 size={20} />
                        <span>Sobre nós</span>
                    </NavLink>

                    <NavLink
                        to="/transparencia"
                        onClick={() => setMenuOpen(false)}
                    >
                        <ShieldCheck size={20} />
                        <span>Transparência</span>
                    </NavLink>

                </nav>

                {

                    authenticated ? (

                        <>

                            <hr className="mobile-menu-divider" />

                            <nav className="mobile-menu">

                                <NavLink
                                    to="/perfil"
                                    onClick={() => setMenuOpen(false)}
                                >

                                    <User size={20} />

                                    <span>Meu Perfil</span>

                                </NavLink>

                                <NavLink
                                    to="/minhas-doacoes"
                                    onClick={() => setMenuOpen(false)}
                                >

                                    <Heart size={20} />

                                    <span>Minhas Doações</span>

                                </NavLink>

                                <NavLink
                                    to="/minha-carteira"
                                    onClick={() => setMenuOpen(false)}
                                >

                                    <CreditCard size={20} />

                                    <span>Minha Carteira</span>

                                </NavLink>

                            </nav>

                            <hr className="mobile-menu-divider" />

                            <button
                                type="button"
                                className="mobile-menu-logout"
                                onClick={handleLogout}
                            >

                                <LogOut size={20} />

                                <span>Sair</span>

                            </button>

                        </>

                    ) : (

                        <Link
                            to="/login"
                            className="mobile-login"
                            onClick={() => setMenuOpen(false)}
                        >

                            <LogIn size={20} />

                            Entrar

                        </Link>

                    )

                }

            </aside>

        </header>

    );

}

export default Header;