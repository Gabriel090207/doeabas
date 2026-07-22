import "./FeaturedCampaigns.css";

import { ArrowRight, BookOpen } from "lucide-react";

import CampaignCard from "../CampaignCard/CampaignCard";

function FeaturedCampaigns() {

    const campaigns = [
        {
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
            category: "Saúde",
            title: "Ajude a Luna a voltar a andar",
            description:
                "Luna foi atropelada e precisa de uma cirurgia urgente para recuperar seus movimentos.",
            raised: 3560,
            goal: 8000
        },
        {
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
            category: "Alimentação",
            title: "Cestas básicas para famílias",
            description:
                "Sua doação leva alimento e esperança para famílias que mais precisam.",
            raised: 7890,
            goal: 15000
        },
        {
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
            category: "Educação",
            title: "Material escolar transforma",
            description:
                "Ajude a garantir materiais escolares para crianças e adolescentes estudarem.",
            raised: 2410,
            goal: 6000
        },
        {
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
            category: "Educação",
            title: "Material escolar transforma",
            description:
                "Ajude a garantir materiais escolares para crianças e adolescentes estudarem.",
            raised: 2410,
            goal: 6000
        }
    ];

    return (

        <section className="featured-campaigns">

            <div className="container">

                <div className="featured-header">

                    <div className="featured-header-content">

                        <span className="featured-badge">

                            <BookOpen size={16} />

                            Histórias que inspiram

                        </span>

                        <h2 className="featured-title">

                            Campanhas em destaque

                        </h2>

                    </div>

                    <button className="featured-button">

                        Ver todas as campanhas

                        <ArrowRight size={20} />

                    </button>

                </div>

                <div className="featured-grid">

                    {campaigns.map((campaign, index) => (

                        <CampaignCard
                            key={index}
                            image={campaign.image}
                            category={campaign.category}
                            title={campaign.title}
                            description={campaign.description}
                            raised={campaign.raised}
                            goal={campaign.goal}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

}

export default FeaturedCampaigns;