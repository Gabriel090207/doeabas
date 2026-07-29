import { useEffect, useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

import "./Header.css";

type HeaderProps = {
    onMenuClick: () => void;
};

export function Header({
    onMenuClick,
}: HeaderProps) {

    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const { show } = useToast();

    const [name, setName] = useState("");

    useEffect(() => {

        async function loadUser() {

            if (!user) return;

            const snapshot = await getDoc(
                doc(db, "users", user.uid)
            );

            if (!snapshot.exists()) return;

            const data = snapshot.data();

            const names = data.fullName
                .trim()
                .split(" ");

            const firstName = names[0];

            const lastName =
                names.length > 1
                    ? names[names.length - 1]
                    : "";

            setName(
                `${firstName} ${lastName}`.trim()
            );

        }

        loadUser();

    }, [user]);

    async function handleLogout() {

        await logout();

        show({
            type: "success",
            title: "Logout realizado",
            message: "Você saiu do painel com sucesso.",
        });

        navigate("/login", {
            replace: true,
        });

    }

    return (

        <header className="admin-header">

            <button
                className="admin-menu-button"
                onClick={onMenuClick}
            >
                <Menu size={24} />
            </button>

            <h1>Painel Administrativo</h1>

            <div className="admin-header-user">

                <span className="admin-user-name">
                    {name}
                </span>

                <div className="admin-avatar">
                    {name.charAt(0).toUpperCase()}
                </div>

                <button
                    onClick={handleLogout}
                    className="admin-logout-button"
                >
                    <LogOut size={18} />

                    <span>Sair</span>
                </button>

            </div>

        </header>

    );

}