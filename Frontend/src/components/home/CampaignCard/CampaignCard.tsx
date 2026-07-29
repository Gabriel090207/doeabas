import "./CampaignCard.css";
import { Link } from "react-router-dom";

import { Heart } from "lucide-react";

interface CampaignCardProps {
    slug: string;
    image: string;
    category: string;
    title: string;
    description: string;
    raised: number;
    goal: number;
    duration: string;
}

function CampaignCard({
    slug,
    image,
    category,
    title,
    description,
    raised,
    goal,
    duration
}: CampaignCardProps) {

    const progress = Math.min(Math.round((raised / goal) * 100), 100);

    const formatCurrency = (value: number) =>
        value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 0
        });

    return (

        <article className="campaign-card">

            {/* ===========================
                IMAGEM
            ============================ */}

            <div className="campaign-image">

                <img
                    src={image}
                    alt={title}
                />

                <span className="campaign-category">
                    {category}
                </span>

            </div>

            {/* ===========================
                CONTEÚDO
            ============================ */}

            <div className="campaign-body">

                <h3 className="campaign-title">
                    {title}
                </h3>

                <p className="campaign-description">
                    {description}
                </p>

                {/* ===========================
                    PROGRESSO
                ============================ */}

                <div className="campaign-progress">

                    <div className="campaign-progress-info">

                        <span className="campaign-duration">
                            Tempo restante: {duration}
                        </span>

                        <span className="campaign-progress-value">
                            {progress}%
                        </span>

                    </div>

                    <div className="campaign-progress-bar">

                        <div
                            className="campaign-progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                </div>

                {/* ===========================
                    VALORES
                ============================ */}

                <div className="campaign-values">

                    <div>

                        <span className="campaign-label">
                            Arrecadado
                        </span>

                        <strong>
                            {formatCurrency(raised)}
                        </strong>

                    </div>

                    <div>

                        <span className="campaign-label">
                            Meta
                        </span>

                        <strong>
                            {formatCurrency(goal)}
                        </strong>

                    </div>

                </div>

                {/* ===========================
                    BOTÕES
                ============================ */}

                <div className="campaign-actions">

                    <Link
                        to={`/campanha/${slug}`}
                        className="campaign-button"
                    >
                        Apoiar campanha
                    </Link>

                    <button className="campaign-favorite">

                        <Heart size={22} />

                    </button>

                </div>

            </div>

        </article>

    );

}

export default CampaignCard;