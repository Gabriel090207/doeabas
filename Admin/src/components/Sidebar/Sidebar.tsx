import {
    BadgeDollarSign,
    CircleDollarSign,
    HeartHandshake,
    LayoutDashboard,
    Network,
    Users,
    X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import logo from "../../assets/images/logo.png";

import "./Sidebar.css";

type SidebarProps = {
    open: boolean;
    onClose: () => void;
};

const menuItems = [
    {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Campanhas",
        path: "/campanhas",
        icon: HeartHandshake,
    },
    {
        label: "Subcontas",
        path: "/subcontas",
        icon: Network,
    },
    {
        label: "Usuários",
        path: "/usuarios",
        icon: Users,
    },
    {
        label: "Doações",
        path: "/doacoes",
        icon: HeartHandshake,
    },
    {
        label: "Assinantes",
        path: "/assinantes",
        icon: BadgeDollarSign,
    },
    {
        label: "Receitas",
        path: "/receitas",
        icon: CircleDollarSign,
    },
];

export function Sidebar({
    open,
    onClose,
}: SidebarProps) {

    return (

        <>

            <div
                className={`admin-sidebar-overlay ${open ? "show" : ""}`}
                onClick={onClose}
            />

            <aside
                className={`admin-sidebar ${open ? "open" : ""}`}
            >

                <div className="admin-sidebar-logo">

                    <img
                        src={logo}
                        alt="ABAS"
                    />

                    <button
                        className="admin-sidebar-close"
                        onClick={onClose}
                    >
                        <X size={22} />
                    </button>

                </div>

                <nav className="admin-sidebar-nav">

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    isActive
                                        ? "admin-sidebar-link active"
                                        : "admin-sidebar-link"
                                }
                            >

                                <Icon size={20} />

                                <span>
                                    {item.label}
                                </span>

                            </NavLink>

                        );

                    })}

                </nav>

            </aside>

        </>

    );

}