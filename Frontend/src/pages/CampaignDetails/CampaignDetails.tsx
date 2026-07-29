import "./CampaignDetails.css";

import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import { db } from "../../services/firebase";

import {
    ArrowLeft,
    BadgeCheck,
    CalendarDays,
    Heart,
    MapPin,
    ShieldCheck,
    Tag,
} from "lucide-react";

import {
    FaFacebookF,
    FaLink,
    FaWhatsapp,
    FaXTwitter,
} from "react-icons/fa6";

function CampaignDetails() {

const { slug } = useParams();

const [campaign, setCampaign] = useState<any>(null);

useEffect(() => {

    if (!slug) return;


    const q = query(

        collection(db, "campaigns"),

        where(
            "slug",
            "==",
            slug
        )

    );


    const unsubscribe = onSnapshot(

        q,

        (snapshot) => {

            if (snapshot.empty) return;


            setCampaign(
                snapshot.docs[0].data()
            );

        }

    );


    return () => unsubscribe();


}, [slug]);


if (!campaign) {

    return null;

}

const progress = Math.min(
    Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
    100
);

const createdAt = campaign.createdAt?.toDate();

const endDate = new Date(createdAt);

endDate.setDate(
    endDate.getDate() + parseInt(campaign.duration, 10)
);

const remainingDays = Math.max(

    Math.ceil(
        (endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    ),

    0

);

    return (

        <section className="campaign-details">

            <div className="container campaign-details-container">

                <Link
                    to="/campanhas"
                    className="campaign-details-back"
                >

                    <ArrowLeft size={18} />

                    Voltar para campanhas

                </Link>

                <div className="campaign-details-content">

                    {/* =====================================
                        LEFT
                    ====================================== */}

                    <div className="campaign-details-left">

                        <header className="campaign-details-header">

                            <h1 className="campaign-details-title">

                                {campaign.title}

                            </h1>

                            <p className="campaign-details-description">

                                Cada doação representa um passo importante para alcançar esta meta. Conheça a história da campanha e faça parte dessa transformação.

                            </p>

                            <div className="campaign-details-info">

                                <div className="campaign-details-info-item">

                                    <CalendarDays size={18} />

                                    <span>

                                        Criada em {
                                            campaign.createdAt?.toDate().toLocaleDateString("pt-BR", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })
                                        }

                                    </span>

                                </div>

                                <div className="campaign-details-info-item">

                                    <Tag size={18} />

                                    <span>

                                        {campaign.category}

                                    </span>

                                </div>

                                <div className="campaign-details-info-item">

                                    <MapPin size={18} />

                                    <span>

                                        {campaign.city} - {campaign.state}

                                    </span>

                                </div>

                            </div>

                        </header>

                        {/* =====================================
                            BANNER
                        ====================================== */}

                        <div className="campaign-details-banner">

                            <img
                                className="campaign-details-banner-image"
                                src={campaign.coverImage}
                                alt={campaign.title}
                            />

                        </div>

                        {/* =====================================
                            VERIFICAÇÃO
                        ====================================== */}

                        <div className="campaign-details-verification">

                            <div className="campaign-details-verification-item">

                                <ShieldCheck size={18} />

                                Campanha verificada

                            </div>

                            <div className="campaign-details-verification-item">

                                <BadgeCheck size={18} />

                                Documentos verificados

                            </div>

                        </div>

                        {/* =====================================
                            HISTÓRIA
                        ====================================== */}

                        <section className="campaign-details-story">

                           

                            <h2 className="campaign-details-story-title">

                                Entenda a história

                            </h2>

                            <p className="campaign-details-story-text">

                                {campaign.story}

                            </p>

                            <div className="campaign-details-tags">

                                {campaign.topics?.map((topic: string) => (

                                    <span
                                        key={topic}
                                        className="campaign-details-tag"
                                    >

                                        {topic}

                                    </span>

                                ))}

                            </div>

                        </section>

                        {/* =====================================
                            COMENTÁRIOS
                        ====================================== */}

                        <section className="campaign-details-comments">

                            <span className="campaign-details-comments-badge">

                                Comentários

                            </span>

                            <h2 className="campaign-details-comments-title">

                                Mensagens de apoio

                            </h2>

                            <div className="campaign-details-comments-list">

                                <div className="campaign-details-comment">

                                    <div className="campaign-details-comment-avatar">

                                        M

                                    </div>

                                    <div className="campaign-details-comment-content">

                                        <h4 className="campaign-details-comment-author">

                                            Maria Oliveira

                                        </h4>

                                        <p className="campaign-details-comment-message">

                                            Estamos em oração por vocês.
                                            Vai dar tudo certo!

                                        </p>

                                    </div>

                                </div>

                                <div className="campaign-details-comment">

                                    <div className="campaign-details-comment-avatar">

                                        J

                                    </div>

                                    <div className="campaign-details-comment-content">

                                        <h4 className="campaign-details-comment-author">

                                            João Pedro

                                        </h4>

                                        <p className="campaign-details-comment-message">

                                            Feliz em poder contribuir.
                                            Força nessa caminhada.

                                        </p>

                                    </div>

                                </div>

                                <div className="campaign-details-comment">

                                    <div className="campaign-details-comment-avatar">

                                        F

                                    </div>

                                    <div className="campaign-details-comment-content">

                                        <h4 className="campaign-details-comment-author">

                                            Fernanda Costa

                                        </h4>

                                        <p className="campaign-details-comment-message">

                                            Que Deus abençoe toda a família.

                                        </p>

                                    </div>

                                </div>

                            </div>

                            <button
                                type="button"
                                className="campaign-details-comments-button"
                            >

                                Ver mais comentários

                            </button>

                        </section>

                    </div>


                    {/* =====================================
                        RIGHT
                    ====================================== */}

                    <aside className="campaign-details-right">

                        <div className="campaign-details-donation-card">

                            <span className="campaign-details-card-label">

                                Arrecadado

                            </span>

                            <h2 className="campaign-details-raised">

                                {campaign.raisedAmount.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}

                            </h2>

                           <p className="campaign-details-goal">

                                De {campaign.goalAmount.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}

                            </p>

                            <div className="campaign-details-progress">

                                <div
                                    className="campaign-details-progress-fill"
                                    style={{
                                        width: `${progress}%`
                                    }}
                                />

                            </div>

                            <div className="campaign-details-progress-info">

                                <span className="campaign-details-duration">

                                    {remainingDays} dias restantes

                                </span>

                                <span className="campaign-details-progress-value">

                                    {progress}%

                                </span>

                            </div>

                            <Link
                                to={`/checkout/${slug}`}
                                className="campaign-details-donate-button"
                            >

                                <span>

                                    Quero doar

                                </span>

                                <Heart size={18} />

                            </Link>

                        </div>


                        <section className="campaign-details-security">

                            <div className="campaign-details-security-icon">

                                <ShieldCheck size={28} />

                            </div>

                            <div className="campaign-details-security-content">

                                <h4>

                                    Vaquinha verificada pela ABAS

                                </h4>

                                <p>

                                    Essa campanha passou por uma análise completa da nossa equipe.
                                    Sua doação é segura e transparente.

                                </p>

                            </div>

                        </section>

                        {/* =====================================
                            DOADORES
                        ====================================== */}

                        <section className="campaign-details-donors">

                            <span className="campaign-details-donors-badge">

                                Doadores

                            </span>

                            <h3 className="campaign-details-donors-title">

                                Doações recentes

                            </h3>

                            <div className="campaign-details-donor">

                                <strong>

                                    Maria Oliveira

                                </strong>

                                <span>

                                    Doou R$ 100

                                </span>

                            </div>

                            <div className="campaign-details-donor">

                                <strong>

                                    João Pedro

                                </strong>

                                <span>

                                    Doou R$ 50

                                </span>

                            </div>

                            <div className="campaign-details-donor">

                                <strong>

                                    Fernanda Costa

                                </strong>

                                <span>

                                    Doou R$ 200

                                </span>

                            </div>

                            <div className="campaign-details-donor">

                                <strong>

                                     Alexandro Silva

                                </strong>

                                <span>

                                    Doou R$ 20

                                </span>

                            </div>



                            <div className="campaign-details-donor">

                                <strong>

                                    Gabriela Silveira

                                </strong>

                                <span>

                                    Doou R$ 500

                                </span>

                            </div>

                        </section>

                        {/* =====================================
                            COMPARTILHAR
                        ====================================== */}

                        <section className="campaign-details-share">

                            <h4 className="campaign-details-share-title">

                                Compartilhe e ajude mais pessoas

                            </h4>

                            <p className="campaign-details-share-description">

                                Quanto mais pessoas souberem,
                                mais perto chegamos da meta.

                            </p>

                            <div className="campaign-details-socials">

                                <button
                                    type="button"
                                    className="campaign-details-social"
                                >

                                    <FaWhatsapp />

                                </button>

                                <button
                                    type="button"
                                    className="campaign-details-social"
                                >

                                    <FaFacebookF />

                                </button>

                                <button
                                    type="button"
                                    className="campaign-details-social"
                                >

                                    <FaXTwitter />

                                </button>

                                <button
                                    type="button"
                                    className="campaign-details-social"
                                >

                                    <FaLink />

                                </button>

                            </div>

                        </section>

                    </aside>

                </div>

            </div>

        </section>

    );

}

export default CampaignDetails;