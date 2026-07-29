import "./FeaturedCampaigns.css";

import { useEffect, useState } from "react";

import { ArrowRight, BookOpen } from "lucide-react";

import { Link } from "react-router-dom";

import CampaignCard from "../CampaignCard/CampaignCard";

import { getFeaturedCampaigns } from "../../../services/campaigns";

function FeaturedCampaigns() {

    const [campaigns, setCampaigns] = useState<any[]>([]);

    useEffect(() => {

        const unsubscribe = getFeaturedCampaigns(
            (data) => {

                setCampaigns(data);

            }
        );

        return () => unsubscribe();

    }, []);

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

                    <Link
                        to="/campanhas"
                        className="featured-button"
                    >

                        Ver todas as campanhas

                        <ArrowRight size={20} />

                    </Link>

                </div>

                <div className="featured-grid">

                    {campaigns.map((campaign) => (

                        <CampaignCard
                            key={campaign.id}
                            slug={campaign.slug}
                            image={campaign.coverImage}
                            category={campaign.category}
                            title={campaign.title}
                            description={campaign.story}
                            raised={campaign.raisedAmount}
                            goal={campaign.goalAmount}
                            duration={campaign.duration}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

}

export default FeaturedCampaigns;