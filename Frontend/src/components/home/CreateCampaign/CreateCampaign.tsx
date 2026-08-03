import "./CreateCampaign.css";

import {
    ArrowRight,
    Heart,
    Pencil,
    Users,
    ShieldCheck,
    BarChart3,
} from "lucide-react";

import bunny from "../../../assets/images/create-campaign-bunny.png";

function CreateCampaign() {
    return (
        <section className="create-campaign">

            {/* Coelho */}

            <img
                src={bunny}
                alt="Mascote ABAS"
                className="create-bunny"
            />

            <div className="container create-container">

                {/* Conteúdo */}

                <div className="create-content">

                    <span className="create-badge">

    <Heart size={16} />

    Crie sua vaquinha

</span>

                    <h2 className="create-title">

                        Crie sua vaquinha
                       

                        agora e <span>transforme </span>
                        

                        vidas com a <span>abas</span>.

                    </h2>

                    <p className="create-description">

                        É rápido, fácil e seguro. Você cria sua
                        campanha, compartilha com quem importa e
                        recebe doações de onde estiver.

                    </p>

                    {/* Benefícios */}

                    <div className="create-features">

                        <div className="create-feature">

                            <div className="feature-icon">

                                <Pencil size={25} />

                            </div>

                            <div className="feature-content">

                                <h3>

                                    Criação simples e rápida

                                </h3>

                                <p>

                                    Em poucos minutos sua vaquinha estará
                                    no ar e pronta para receber doações.

                                </p>

                            </div>

                        </div>

                        <div className="create-feature">

                            <div className="feature-icon">

                                <Users size={25} />

                            </div>

                            <div className="feature-content">

                                <h3>

                                    Compartilhe onde quiser

                                </h3>

                                <p>

                                    Divulgue sua campanha pelas redes
                                    sociais, WhatsApp, e-mail e muito mais.

                                </p>

                            </div>

                        </div>

                        <div className="create-feature">

                            <div className="feature-icon">

                                <ShieldCheck size={25} />

                            </div>

                            <div className="feature-content">

                                <h3>

                                    Segurança que você confia

                                </h3>

                                <p>

                                    Seu dinheiro e seus dados protegidos
                                    durante todo o processo.

                                </p>

                            </div>

                        </div>

                        <div className="create-feature">

                            <div className="feature-icon">

                                <BarChart3 size={25} />

                            </div>

                            <div className="feature-content">

                                <h3>

                                    Acompanhe tudo em tempo real

                                </h3>

                                <p>

                                    Veja doações, comentários e metas
                                    atualizadas sempre que quiser.

                                </p>

                            </div>

                        </div>

                    </div>

                    <button
                        className="create-button"
                        onClick={() =>
                            window.open(
                                "https://wa.me/5586921427920",
                                "_blank",
                                "noopener,noreferrer"
                            )
                        }
                    >

                        Criar minha vaquinha agora

                        <ArrowRight size={20} />

                    </button>

                </div>

            </div>

        </section>
    );
}

export default CreateCampaign;