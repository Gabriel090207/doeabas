import "./About.css";

import {
    Heart,
    Target,
    Eye,
    Star,
    CircleCheck,
    Rocket,
    Users,
    Gift,
    Smile,
    Inbox,
    SearchCheck,
    BadgeCheck,
    FileSignature,
    Megaphone,
    Clapperboard,
    HandCoins,
    HandHeart,
} from "lucide-react";

import heroBackground from "../../assets/images/hero-background.webp";
import bunny from "../../assets/images/about-bunny.webp";
import ctaBunny from "../../assets/images/about-cta-bunny.webp";
import SectionDivider from "../../components/home/SectionDivider/SectionDivider";

function About() {

    return (

        <>

        <section className="about-hero">

            <img
                src={heroBackground}
                alt=""
                className="about-background"
            />

            <img
                src={bunny}
                alt="Mascote ABAS"
                className="about-bunny"
            />

            <div className="container">

                <div className="about-container">

                    <div className="about-content">

                        <span className="about-tag">

                            

                            Sobre nós

                        </span>

                        <h1 className="about-title">

                            Unidos para

                            <span>

                                transformar vidas.

                            </span>

                        </h1>

                        <p className="about-description">

                            A Abas nasceu para conectar quem precisa com quem quer ajudar.
                            Juntos, construímos histórias de esperança, cuidado e
                            transformação.

                        </p>

                        <button className="about-button">

                            <Heart
                                size={18}
                                fill="currentColor"
                            />

                            Como trabalhamos

                        </button>

                    </div>

                </div>

            </div>

        </section>



        <section className="mission">

                <div className="container">

                    <div className="mission-header">

                        <span className="mission-badge">

                            <Heart
                                size={18}
                            />

                            O que nos move

                        </span>

                        <h2>

                            Nossa <span>Missão, Visão </span>
                            e <span>Valores</span>

                        </h2>

                        <p>

                            A Abas acredita que solidariedade, transparência e
                            responsabilidade caminham juntas. Estes princípios
                            orientam todas as nossas ações e fortalecem a confiança
                            de quem ajuda e de quem recebe.

                        </p>

                    </div>

                    <div className="mission-grid">

                        {/* Missão */}

                        <article className="mission-card">

                            <div className="card-icon">

                                <Target size={34} />

                            </div>

                            <h3>

                                Missão

                            </h3>

                            <p>

                                Conectar pessoas para transformar
                                realidades, promovendo a solidariedade
                                e o impacto positivo na vida de quem
                                mais precisa.

                            </p>

                        </article>

                        {/* Visão */}

                        <article className="mission-card">

                            <div className="card-icon">

                                <Eye size={34} />

                            </div>

                            <h3>

                                Visão

                            </h3>

                            <p>

                                Ser a maior e mais confiável plataforma
                                de vaquinhas do Brasil, reconhecida
                                pela transparência, tecnologia e
                                impacto social.

                            </p>

                        </article>

                        {/* Valores */}

                        <article className="mission-card">

                            <div className="card-icon">

                                <Star size={34} />

                            </div>

                            <h3>

                                Valores

                            </h3>

                            <ul className="mission-list">

                                <li>

                                    <CircleCheck size={18} />

                                    Transparência em tudo que fazemos

                                </li>

                                <li>

                                    <CircleCheck size={18} />

                                    Empatia e respeito com cada história

                                </li>

                                <li>

                                    <CircleCheck size={18} />

                                    Inovação para facilitar o bem

                                </li>

                                <li>

                                    <CircleCheck size={18} />

                                    Compromisso com resultados reais

                                </li>

                            </ul>

                        </article>

                    </div>

                </div>

            </section>


             <SectionDivider />


            <section className="history">

                <div className="container">

                    <span className="history-badge">

                        <Heart
                            size={18}
                        />

                        Nossa história

                    </span>

                    <div className="history-content">

                        <div className="history-left">

                            <h2>

                                Um movimento que não para
                                de <span>crescer</span>.

                            </h2>

                            <p>

                                A Abas começou com um propósito claro:
                                usar a tecnologia para aproximar
                                corações e transformar vidas.
                                Hoje somos um ecossistema de
                                solidariedade que impacta milhares
                                de pessoas todos os dias.

                            </p>

                        </div>

                        <div className="history-right">

                            <div className="timeline">

                                <article className="timeline-item">

                                    <div className="timeline-icon">

                                        <Heart size={28} />

                                    </div>

                                    <span className="timeline-year">

                                        2021

                                    </span>

                                    <h4>

                                        O começo

                                    </h4>

                                    <p>

                                        A Abas nasceu com o sonho
                                        de tornar as doações mais
                                        simples, seguras e transparentes.

                                    </p>

                                </article>

                                <article className="timeline-item">

                                    <div className="timeline-icon">

                                        <Rocket size={28} />

                                    </div>

                                    <span className="timeline-year">

                                        2022

                                    </span>

                                    <h4>

                                        Primeiros voos

                                    </h4>

                                    <p>

                                        Crescemos, aprimoramos nossa
                                        plataforma e tocamos milhares
                                        de histórias.

                                    </p>

                                </article>

                                <article className="timeline-item">

                                    <div className="timeline-icon">

                                        <Users size={28} />

                                    </div>

                                    <span className="timeline-year">

                                        2023

                                    </span>

                                    <h4>

                                        Comunidade forte

                                    </h4>

                                    <p>

                                        Mais pessoas, mais campanhas
                                        e um impacto social cada vez maior.

                                    </p>

                                </article>

                                <article className="timeline-item">

                                    <div className="timeline-icon">

                                        <Heart size={28} />

                                    </div>

                                    <span className="timeline-year">

                                        Hoje

                                    </span>

                                    <h4>

                                        Evoluindo sempre

                                    </h4>

                                    <p>

                                        Seguimos inovando e ampliando
                                        nosso alcance para transformar
                                        ainda mais vidas.

                                    </p>

                                </article>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            <section className="stats">

                <div className="container">

                    <div className="stats-wrapper">

                        <div className="stat-item">

                            <Users size={28} />

                            <div>

                                <h3>+ 250 mil</h3>

                                <p>doadores ativos</p>

                            </div>

                        </div>

                        <div className="stat-item">

                            <Heart size={28} />

                            <div>

                                <h3>+ 35 mil</h3>

                                <p>campanhas realizadas</p>

                            </div>

                        </div>

                        <div className="stat-item">

                            <Gift size={28} />

                            <div>

                                <h3>+ R$ 250 milhões</h3>

                                <p>arrecadados</p>

                            </div>

                        </div>

                        <div className="stat-item">

                            <Smile size={28} />

                            <div>

                                <h3>+ 6 milhões</h3>

                                <p>de pessoas impactadas</p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>



            <section className="workflow">

                <div className="container">

                   <div className="workflow-header">

                        <span className="workflow-badge">

                            <Heart
                                size={18}
                               
                            />

                            Como trabalhamos 

                        </span>

                        <h2>

                            Como <span>transformamos</span> histórias
                            em campanhas que geram impacto.

                        </h2>

                        <p>

                            Cada campanha passa por um processo de curadoria antes de ser publicada.
                            Nossa equipe acompanha todas as etapas, desde a análise inicial até a
                            prestação de contas, garantindo transparência, segurança e confiança
                            para quem doa e para quem recebe.

                        </p>

                    </div>

                    <div className="workflow-grid">

                        <article className="workflow-card">

                            <div className="workflow-icon">

                                <Inbox size={34} />

                            </div>

                            <span className="workflow-number">1</span>

                            <h3>Chegada da história</h3>

                            <p>

                                Recebemos a história de quem precisa de ajuda.

                            </p>

                        </article>

                        <article className="workflow-card">

                            <div className="workflow-icon">

                                <SearchCheck size={34} />

                            </div>

                            <span className="workflow-number">2</span>

                            <h3>Curadoria e verificação</h3>

                            <p>

                                Nossa equipe analisa cuidadosamente todas as informações.

                            </p>

                        </article>

                        <article className="workflow-card">

                            <div className="workflow-icon">

                                <BadgeCheck size={34} />

                            </div>

                            <span className="workflow-number">3</span>

                            <h3>Validação da campanha</h3>

                            <p>

                                Conferimos documentos e aprovamos a campanha.

                            </p>

                        </article>

                        <article className="workflow-card">

                            <div className="workflow-icon">

                                <FileSignature size={34} />

                            </div>

                            <span className="workflow-number">4</span>

                            <h3>Assinatura do contrato</h3>

                            <p>

                                Formalizamos nosso compromisso com transparência.

                            </p>

                        </article>

                        <article className="workflow-card">

                            <div className="workflow-icon">

                                <Megaphone size={34} />

                            </div>

                            <span className="workflow-number">5</span>

                            <h3>Estratégia de divulgação</h3>

                            <p>

                                Planejamos como a campanha alcançará mais pessoas.

                            </p>

                        </article>

                        <article className="workflow-card">

                            <div className="workflow-icon">

                                <Clapperboard size={34} />

                            </div>

                            <span className="workflow-number">6</span>

                            <h3>Produção de conteúdo</h3>

                            <p>

                                Criamos conteúdos reais para apresentar a história.

                            </p>

                        </article>

                        <article className="workflow-card">

                            <div className="workflow-icon">

                                <HandCoins size={34} />

                            </div>

                            <span className="workflow-number">7</span>

                            <h3>Arrecadação e repasse</h3>

                            <p>

                                Quando a meta é atingida, o valor é transferido com segurança.

                            </p>

                        </article>

                        <article className="workflow-card">

                            <div className="workflow-icon">

                                <HandHeart size={34} />

                            </div>

                            <span className="workflow-number">8</span>

                            <h3>Prestação de contas</h3>

                            <p>

                                Acompanhamos o resultado e publicamos o desfecho da campanha.

                            </p>

                        </article>

                    </div>

                </div>

            </section>



            <section className="about-cta">

                <img
                    src={heroBackground}
                    alt=""
                    className="about-cta-background"
                />

                <img
                    src={ctaBunny}
                    alt=""
                    className="about-cta-bunny"
                />

                <div className="container">

                    <div className="about-cta-container">

                        <div className="about-cta-content">

                            <h2>

                                Aqui, cada doação
                                <span> ganha asas </span>
                                e vai mais longe.

                            </h2>

                            <p>

                                Junte-se a nós e faça parte dessa corrente
                                do bem que transforma histórias todos os dias.

                            </p>

                            <button>

                                <Heart size={18} fill="currentColor"/>

                                Criar minha vaquinha

                            </button>

                        </div>

                    </div>

                </div>

            </section>





        </>

        




    );

}

export default About;