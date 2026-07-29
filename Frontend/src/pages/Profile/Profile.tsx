import "./Profile.css";

import {
    User,
    Shield,
    Pencil,
    Eye,
    EyeOff,
} from "lucide-react";

import { useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { AuthContext } from "../../contexts/AuthContext";

import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    sendPasswordResetEmail,
} from "firebase/auth";

import { useToast } from "../../hooks/useToast";

interface UserProfile {

    fullName: string;

    email: string;

    phone: string;

    cpf: string;

}

function Profile() {

const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

const [profile, setProfile] = useState<UserProfile | null>(null);

const { user } = useContext(AuthContext);
const { show } = useToast();

const [editing, setEditing] = useState(false);
const [saving, setSaving] = useState(false);

const [fullName, setFullName] = useState("");

const [email, setEmail] = useState("");

const [phone, setPhone] = useState("");

const [cpf, setCpf] = useState("");

const [showCurrentPassword, setShowCurrentPassword] = useState(false);

const [showNewPassword, setShowNewPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [currentSecurityPassword, setCurrentSecurityPassword] = useState("");

const [newPassword, setNewPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");

const [changingPassword, setChangingPassword] = useState(false);

const [sendingResetEmail, setSendingResetEmail] = useState(false);

useEffect(() => {

    async function loadProfile() {

        if (!user) {

            setProfile(null);

            return;

        }

        try {

            const snapshot = await getDoc(

                doc(db, "users", user.uid)

            );

            if (snapshot.exists()) {

                const data = {

                    fullName: snapshot.data().fullName ?? "",

                    email: snapshot.data().email ?? user.email ?? "",

                    phone: snapshot.data().phone ?? "",

                    cpf: snapshot.data().cpf ?? "",

                };

                setProfile(data);

                setFullName(data.fullName);

                setEmail(data.email);

                setPhone(data.phone);

                setCpf(data.cpf);

                return;

            }

            const data = {

                fullName: user.displayName ?? "",

                email: user.email ?? "",

                phone: "",

                cpf: "",

            };

            setProfile(data);

            setFullName(data.fullName);

            setEmail(data.email);

            setPhone(data.phone);

            setCpf(data.cpf);

        } catch (error) {

            console.error(
                "Erro ao carregar o perfil:",
                error
            );

        }

    }

    loadProfile();

}, [user]);

async function handleSave() {

    if (!user) {

        show({
            type: "error",
            title: "Sessão inválida",
            message: "Entre novamente para atualizar seus dados.",
        });

        return;

    }

    const normalizedName = fullName.trim();

    const normalizedEmail = email.trim().toLowerCase();

    const normalizedPhone = phone.trim();

    const normalizedCpf = cpf.trim();

    if (!normalizedName) {

        show({
            type: "error",
            title: "Nome obrigatório",
            message: "Informe seu nome completo.",
        });

        return;

    }

    if (!normalizedEmail) {

        show({
            type: "error",
            title: "E-mail obrigatório",
            message: "Informe um endereço de e-mail.",
        });

        return;

    }

    const emailIsValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailIsValid) {

        show({
            type: "error",
            title: "E-mail inválido",
            message: "Digite um endereço de e-mail válido.",
        });

        return;

    }

    setSaving(true);

    try {

        

        await updateDoc(

            doc(db, "users", user.uid),

            {

                fullName: normalizedName,

                phone: normalizedPhone,

                cpf: normalizedCpf,

            },

        );

        const updatedProfile = {

            fullName: normalizedName,

            email: user.email ?? "",

            phone: normalizedPhone,

            cpf: normalizedCpf,

        };

        setProfile(updatedProfile);

        setFullName(updatedProfile.fullName);

        setEmail(updatedProfile.email);

        setPhone(updatedProfile.phone);

        setCpf(updatedProfile.cpf);

        setEditing(false);

        show({
            type: "success",
            title: "Perfil atualizado",
            message: "Suas informações foram salvas com sucesso.",
        });

    } catch (error) {

            console.error(
                "Erro ao salvar o perfil:",
                error,
            );


        show({

            type: "error",

            title: "Não foi possível salvar",

            message: "Tente novamente em alguns instantes.",

        });

    } finally {

        setSaving(false);

    }

}

async function handleChangePassword() {

    if (!user || !user.email) {

        return;

    }

    if (!currentSecurityPassword.trim()) {

        show({

            type: "error",

            title: "Senha atual obrigatória",

            message: "Informe sua senha atual.",

        });

        return;

    }

    if (!newPassword.trim()) {

        show({

            type: "error",

            title: "Nova senha obrigatória",

            message: "Informe uma nova senha.",

        });

        return;

    }

    if (newPassword.length < 6) {

        show({

            type: "error",

            title: "Senha muito curta",

            message: "A nova senha deve ter pelo menos 6 caracteres.",

        });

        return;

    }

    if (newPassword === currentSecurityPassword) {

        show({

            type: "error",

            title: "Senha inválida",

            message: "A nova senha deve ser diferente da atual.",

        });

        return;

    }

    if (newPassword !== confirmPassword) {

        show({

            type: "error",

            title: "As senhas não conferem",

            message: "Confirme corretamente a nova senha.",

        });

        return;

    }

    setChangingPassword(true);

    try {

        const credential = EmailAuthProvider.credential(

            user.email,

            currentSecurityPassword,

        );

        await reauthenticateWithCredential(

            user,

            credential,

        );

        await updatePassword(

            user,

            newPassword,

        );

        setCurrentSecurityPassword("");

        setNewPassword("");

        setConfirmPassword("");

        show({

            type: "success",

            title: "Senha alterada",

            message: "Sua senha foi atualizada com sucesso.",

        });

    } catch (error: any) {

            console.error(
                "Erro ao alterar senha:",
                error,
            );

            if (

                error.code === "auth/wrong-password" ||

                error.code === "auth/invalid-credential"

            ) {

                show({

                    type: "error",

                    title: "Senha incorreta",

                    message: "A senha atual informada está incorreta.",

                });

            } else {

                show({

                    type: "error",

                    title: "Erro ao alterar senha",

                    message: "Tente novamente em alguns instantes.",

                });

            }

        } finally {

            setChangingPassword(false);

        }

}

async function handleSendResetEmail() {

    if (!user?.email) {

        show({

            type: "error",

            title: "E-mail indisponível",

            message: "Não foi possível localizar o e-mail da sua conta.",

        });

        return;

    }

    setSendingResetEmail(true);

    try {

        await sendPasswordResetEmail(

            auth,

            user.email,

        );

        show({

            type: "success",

            title: "E-mail enviado",

            message: "Verifique sua caixa de entrada para redefinir sua senha.",

        });
        

    } catch (error) {

        console.error(

            "Erro ao enviar e-mail:",

            error,

        );

        show({

            type: "error",

            title: "Erro ao enviar e-mail",

            message: "Não foi possível enviar o e-mail de recuperação.",

        });

        } finally {

            setSendingResetEmail(false);

        }

    

}

function formatPhone(value: string) {

    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length <= 2) {

        return numbers;

    }

    if (numbers.length <= 7) {

        return numbers.replace(

            /^(\d{2})(\d+)/,

            "($1) $2",

        );

    }

    return numbers.replace(

        /^(\d{2})(\d{5})(\d{0,4})$/,

        "($1) $2-$3",

    );

}

function formatCpf(value: string) {

    const numbers = value.replace(/\D/g, "").slice(0, 11);

    return numbers

        .replace(/^(\d{3})(\d)/, "$1.$2")

        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")

        .replace(/\.(\d{3})(\d)/, ".$1-$2");

}

    return (

        <section className="profile">

            <div className="profile-container">

                {/* ===========================
                    SIDEBAR
                ============================ */}

                <aside className="profile-sidebar">

                    <div className="profile-user">

                        <div className="profile-avatar">

                            <User size={46} />

                        </div>

                        <h2>

                            {profile?.fullName
                                ? (() => {

                                    const names = profile.fullName.trim().split(" ");

                                    return names.length > 1
                                        ? `${names[0]} ${names[names.length - 1]}`
                                        : names[0];

                                })()
                                : "Carregando..."}

                        </h2>

                        <span>

                            Conta Pessoal

                        </span>

                    </div>

                    <nav className="profile-menu">

                        <button
                            className={`profile-menu-item ${
                                activeTab === "profile" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("profile")}
                        >

                            Informações pessoais

                        </button>

                        <button
                            className={`profile-menu-item ${
                                activeTab === "security" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("security")}
                        >

                            Segurança

                        </button>

                    </nav>

                </aside>

                {/* ===========================
                    CONTEÚDO
                ============================ */}

                <div className="profile-content">

                    {/* ===========================
                        INFORMAÇÕES PESSOAIS
                    ============================ */}

                    {activeTab === "profile" && (

                    <section className="profile-card">

                        <div className="profile-card-header">

                            <div>

                                <h2>

                                    Meu perfil

                                </h2>

                                <p>

                                    Gerencie suas informações pessoais.

                                </p>

                            </div>

                            <button
                                type="button"
                                className={`profile-edit ${editing ? "active" : ""}`}
                                onClick={() => setEditing(true)}
                            >

                                <Pencil size={18} />

                            </button>

                        </div>

                        <div className="profile-form">

                            <div className="profile-field">

                                <label>

                                    Nome completo

                                </label>

                                <input
                                    type="text"
                                    value={fullName} 
                                    onChange={(e) => setFullName(e.target.value)}
                                    disabled={!editing}
                                />

                            </div>

                            <div className="profile-field">

                                <label>

                                    E-mail

                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                    readOnly
                                />

                            </div>

                            <div className="profile-field">

                                <label>

                                    Telefone

                                </label>

                                <input
                                    type="text"
                                    value={formatPhone(phone)}
                                    onChange={(e) =>

                                        setPhone(

                                            e.target.value.replace(/\D/g, ""),

                                        )

                                    }
                                    disabled={!editing}
                                />

                            </div>

                            <div className="profile-field">

                                <label>

                                    CPF

                                </label>

                                <input
                                    type="text"
                                    value={formatCpf(cpf)}
                                    onChange={(e) =>

                                        setCpf(

                                            e.target.value.replace(/\D/g, ""),

                                        )

                                    }
                                    disabled={!editing}
                                />

                            </div>

                        </div>

                        <button
                            type="button"
                            className="profile-save"
                            onClick={handleSave}
                            disabled={!editing || saving}
                        >

                            {saving
                                ? "Salvando..."
                                : "Salvar alterações"}

                        </button>

                    </section>

                    )}

                   

                    {/* ===========================
                        SEGURANÇA
                    ============================ */}

                     {activeTab === "security" && (

                    <section className="profile-card">

                        <div className="profile-card-header">

                            <div>

                                <h2>

                                    Segurança

                                </h2>

                                <p>

                                    Atualize sua senha para manter sua conta segura.

                                </p>

                            </div>

                            <div className="profile-security-icon">

                                <Shield size={20} />

                            </div>

                        </div>

                        <div className="profile-form">

                            <div className="profile-field profile-field-full">

                                <label>

                                    Senha atual

                                </label>

                                <div className="profile-password">

                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        placeholder="Digite sua senha atual"
                                        value={currentSecurityPassword}
                                        onChange={(e) =>
                                            setCurrentSecurityPassword(e.target.value)
                                        }
                                    />

                                    <button

                                        type="button"

                                        className="profile-password-toggle"

                                        onClick={() =>

                                            setShowCurrentPassword(!showCurrentPassword)

                                        }

                                    >

                                        {showCurrentPassword

                                            ? <EyeOff size={20} />

                                            : <Eye size={20} />}

                                    </button>

                                </div>

                            </div>

                            <div className="profile-field">

                            <label>

                                Nova senha

                            </label>

                            <div className="profile-password">

                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Digite a nova senha"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />

                                <button

                                    type="button"

                                    className="profile-password-toggle"

                                    onClick={() =>

                                        setShowNewPassword(!showNewPassword)

                                    }

                                >

                                    {showNewPassword

                                        ? <EyeOff size={20} />

                                        : <Eye size={20} />}

                                </button>

                            </div>

                        </div>

                            <div className="profile-field">

                                <label>

                                    Confirmar nova senha

                                </label>

                                <div className="profile-password">

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirme a nova senha"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />

                                    <button

                                        type="button"

                                        className="profile-password-toggle"

                                        onClick={() =>

                                            setShowConfirmPassword(!showConfirmPassword)

                                        }

                                    >

                                        {showConfirmPassword

                                            ? <EyeOff size={20} />

                                            : <Eye size={20} />}

                                    </button>

                                </div>

                            </div>

                        </div>

                        <button
                            type="button"
                            className="profile-save"
                            onClick={handleChangePassword}
                            disabled={changingPassword}
                        >

                            {changingPassword
                                ? "Alterando..."
                                : "Alterar senha"}

                        </button>

                        <div className="profile-divider"></div>

                        <div className="profile-recovery">

                            <h3>

                                Recuperação de conta

                            </h3>

                            <p>

                                Esqueceu sua senha? Envie um e-mail para redefini-la com segurança.

                            </p>

                            <button
                                type="button"
                                className="profile-recovery-button"
                                onClick={handleSendResetEmail}
                                disabled={sendingResetEmail}
                            >

                                {sendingResetEmail
                                    ? "Enviando..."
                                    : "Enviar e-mail de recuperação"}

                            </button>

                        </div>

                    </section>

                     )}

                

                </div>

            </div>



           

        </section>


        

                    

    );

}

export default Profile;