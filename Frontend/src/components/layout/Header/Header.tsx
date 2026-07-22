import "./Header.css";

import { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import {
    Heart,
    LogIn,
    Menu,
    X,
    Home,
    HeartHandshake,
    Building2,
    ShieldCheck
} from "lucide-react";

import logo from "../../../assets/images/logo.png";

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

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

                    <button className="header-donor-button">

                        <Heart size={16} />

                        Seja doador mensal

                    </button>

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

                   <Link
                        to="/login"
                        className="header-login"
                    >

                        <LogIn size={20} />

                        Entrar

                    </Link>

                    {/* Mobile */}

                    <button
                        className="header-menu-button"
                        onClick={() => setMenuOpen(true)}
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

                <Link
                    to="/login"
                    className="mobile-login"
                    onClick={() => setMenuOpen(false)}
                >

                    <LogIn size={20} />

                    Entrar

                </Link>

            </aside>

        </header>

    );

}

export default Header;