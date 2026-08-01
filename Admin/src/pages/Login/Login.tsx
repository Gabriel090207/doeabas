import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";

import background from "../../assets/images/background.png";
import bunny from "../../assets/images/bunny.png";

import "./Login.css";

import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);


const { login, loading } = useAuth();

const { show } = useToast();

async function handleLogin(
    event: FormEvent<HTMLFormElement>,
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

        await login(email, password);

        show({
            type: "success",
            title: "Login realizado",
            message: "Bem-vindo ao painel.",
        });

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
      className="admin-login"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* ===========================
          LEFT
      =========================== */}

      <div className="admin-login-left">
        <div className="admin-login-card">
          <div className="admin-login-badge">
            <ShieldCheck size={17} />

            <span>Acesso restrito</span>
          </div>

          <div className="admin-login-heading">
            <h1>Painel Administrativo</h1>

            <div className="admin-login-line" />

            <p>
              Entre com suas credenciais para acessar o gerenciamento da
              plataforma.
            </p>
          </div>

          <form
            className="admin-login-form"
            onSubmit={handleLogin}
          >
            {/* E-mail */}

            <div className="admin-input-group">
              <label htmlFor="admin-email">
                E-mail
              </label>

              <div className="admin-input-control">
                <Mail size={20} />

                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />
              </div>
            </div>

            {/* Senha */}

            <div className="admin-input-group">
              <label htmlFor="admin-password">
                Senha
              </label>

              <div className="admin-input-control">
                <Lock size={20} />

                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="admin-show-password"
                  onClick={() =>
                    setShowPassword(
                      (currentValue) => !currentValue,
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

            <button
                type="submit"
                className="admin-login-button"
                disabled={loading}
            >
                {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="admin-login-footer">
            Área exclusiva para administradores autorizados.
          </p>
        </div>
      </div>

      {/* ===========================
          RIGHT
      =========================== */}

      <div className="admin-login-right">
        <div className="admin-login-text">
          <h2>
            Gestão que
            <span> transforma </span>
            vidas.
          </h2>

          <div className="admin-login-line" />

          <p>
            Organização, cuidado e transparência para acompanhar cada ação da
            plataforma.
          </p>
        </div>

        <img
          src={bunny}
          alt="Coelho da ABAS"
          className="admin-login-bunny"
        />
      </div>
    </section>
  );
}

export default Login;