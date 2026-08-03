import "./MonthlyDonor.css";

import {
    Heart,
    CircleCheck,
    Users,
    ShieldCheck,
    HeartHandshake,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";

import heroBackground from "../../assets/images/hero-background.webp";
import monthlyBunny from "../../assets/images/monthly-bunny.webp";

import SectionDivider from "../../components/home/SectionDivider/SectionDivider";


function MonthlyDonor() {

const navigate = useNavigate();

const { user } = useContext(AuthContext);

const { show } = useToast();

function scrollToPlans() {

    document
        .querySelector(".monthly-donor-plans")
        ?.scrollIntoView({

            behavior: "smooth",

        });

}

function handleDonate() {

    if (!user) {

        show({

            type: "warning",

            title: "Login necessário",

            message: "Faça login para continuar com sua doação.",

        });

        return;

    }

    navigate("/checkout-mensal");

}

    return (

        <>

            <section className="monthly-donor-hero">

                <img
                    src={heroBackground}
                    alt=""
                    className="monthly-donor-background"
                />

                <img
                    src={monthlyBunny}
                    alt="Mascote ABAS"
                    className="monthly-donor-bunny"
                />

                <div className="container">

                    <div className="monthly-donor-wrapper">

                        <div className="monthly-donor-content">

                            <span className="monthly-donor-tag">

                                Faça parte dessa corrente

                            </span>

                            <h1 className="monthly-donor-title">

                                Seja um
                                <span>
                                    doador mensal
                                </span>
                                da Abas

                            </h1>

                            <p className="monthly-donor-description">

                                Sua contribuição recorrente fortalece campanhas
                                durante todo o ano, garantindo apoio contínuo
                                para quem realmente precisa.

                            </p>

                            <ul className="monthly-donor-benefits">

                                <li className="monthly-donor-benefit">

                                    <CircleCheck size={18} />

                                    Apoie pessoas todos os meses.

                                </li>

                                <li className="monthly-donor-benefit">

                                    <CircleCheck size={18} />

                                    Segurança e transparência em cada doação.

                                </li>

                                <li className="monthly-donor-benefit">

                                    <CircleCheck size={18} />

                                    Cancele quando desejar.

                                </li>

                            </ul>

                            <button
                                className="monthly-donor-button"
                                type="button"
                                onClick={scrollToPlans}
                            >

                                <Heart
                                    size={18}
                                    fill="currentColor"
                                />

                                Quero ser doador mensal

                            </button>

                        </div>

                    </div>

                </div>

            </section>

            <section className="monthly-donor-plans">

                <div className="container">

                    <div className="monthly-donor-plans-header">

                        <span className="monthly-donor-plans-badge">

                            <Heart size={18} />

                            Escolha seu apoio

                        </span>

                        <h2>

                            Escolha o valor da sua

                            <span>

                                doação mensal

                            </span>

                        </h2>

                    </div>

                    <div className="monthly-donor-plans-grid">

                        <article className="monthly-donor-plan-card monthly-donor-plan-active">

                            <div className="monthly-donor-plan-icon">

                                <Heart size={34} />

                            </div>

                            <h3>R$ 25</h3>

                            <p>

                                Ajuda a manter o apoio
                                para uma pessoa
                                todos os dias.

                            </p>

                            <button
                                type="button"
                                onClick={handleDonate}
                            >

                                Quero doar

                            </button>

                        </article>

                        <article className="monthly-donor-plan-card">

                            <div className="monthly-donor-plan-icon">

                                <Heart size={34} />

                            </div>

                            <h3>R$ 50</h3>

                            <p>

                                Mais vidas alcançadas
                                e mais esperança
                                gerada.

                            </p>

                            <button>

                                Quero doar

                            </button>

                        </article>

                        <article className="monthly-donor-plan-card">

                            <div className="monthly-donor-plan-icon">

                                <Heart size={34} />

                            </div>

                            <h3>R$ 100</h3>

                            <p>

                                Apoio ainda maior para
                                transformar histórias
                                em todo o Brasil.

                            </p>

                            <button>

                                Quero doar

                            </button>

                        </article>

                        <article className="monthly-donor-plan-card">

                            <div className="monthly-donor-plan-icon">

                                <Heart size={34} />

                            </div>

                            <h3>Outro valor</h3>

                            <p>

                                Você escolhe o valor
                                que faz sentido
                                para você.

                            </p>

                            <button>

                                Quero doar

                            </button>

                        </article>

                    </div>

                </div>

            </section>

            <SectionDivider />

            <section className="monthly-donor-benefits-section">

                <div className="container">

                    <div className="monthly-donor-benefits-header">

                        <span className="monthly-donor-benefits-badge">

                            <Heart size={18} />

                            Nossa missão

                        </span>

                        <h2>

                            Quando você doa todo mês,

                            <span>

                                o impacto é todo dia.

                            </span>

                        </h2>

                        <p>

                            A Abas conecta pessoas que querem ajudar com quem precisa
                            receber. Sua doação mensal fortalece campanhas durante todo
                            o ano, garantindo apoio contínuo para milhares de famílias.

                        </p>

                    </div>

                    <div className="monthly-donor-benefits-grid">

                        <article className="monthly-donor-benefit-item">

                            <div className="monthly-donor-benefit-icon">

                                <Heart size={34} />

                            </div>

                            <h3>Constante</h3>

                            <p>

                                Seu apoio contínuo garante que
                                nenhuma história fique sem ajuda.

                            </p>

                        </article>

                        <article className="monthly-donor-benefit-item">

                            <div className="monthly-donor-benefit-icon">

                                <Users size={34} />

                            </div>

                            <h3>Transparente</h3>

                            <p>

                                Acompanhamento das campanhas
                                e prestação de contas.

                            </p>

                        </article>

                        <article className="monthly-donor-benefit-item">

                            <div className="monthly-donor-benefit-icon">

                                <ShieldCheck size={34} />

                            </div>

                            <h3>Seguro</h3>

                            <p>

                                Plataforma protegida para
                                todas as suas contribuições.

                            </p>

                        </article>

                        <article className="monthly-donor-benefit-item">

                            <div className="monthly-donor-benefit-icon">

                                <HeartHandshake size={34} />

                            </div>

                            <h3>Transformador</h3>

                            <p>

                                Juntos construímos um Brasil
                                mais solidário todos os dias.

                            </p>

                        </article>

                    </div>

                </div>

            </section>

        </>

    );

}

export default MonthlyDonor;