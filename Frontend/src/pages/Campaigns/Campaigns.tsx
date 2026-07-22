import "./Campaigns.css";

import { useState } from "react";

import { Search, ChevronDown } from "lucide-react";

import CampaignCard from "../../components/home/CampaignCard/CampaignCard";

function Campaigns() {

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [sort, setSort] = useState("");

    const campaigns = [
        {
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
            category: "Saúde",
            title: "Ajude Dona Maria a continuar seu tratamento",
            description: "Dona Maria precisa realizar um tratamento especializado para seguir lutando pela vida.",
            raised: 5240,
            goal: 10000
        },
        {
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
            category: "Educação",
            title: "Vamos garantir um futuro melhor para o João",
            description: "Ajude João a continuar seus estudos e realizar o sonho de ser engenheiro.",
            raised: 7800,
            goal: 10000
        },
        {
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
            category: "Animais",
            title: "Ajude a Luna a se recuperar",
            description: "Luna foi atropelada e precisa de uma cirurgia urgente.",
            raised: 3150,
            goal: 10500
        },
        {
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            category: "Saúde",
            title: "Karine esperança depois dos exames",
            description: "Karine pede apoio para um tratamento que irá salvar sua vida.",
            raised: 13592,
            goal: 397000
        },
        {
            image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
            category: "Emergências",
            title: "Ajuda para famílias atingidas pelas enchentes",
            description: "Doe e ajude famílias que perderam tudo e precisam de itens básicos.",
            raised: 13200,
            goal: 20000
        },
        {
            image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
            category: "Educação",
            title: "Transporte escolar para crianças",
            description: "Precisamos de apoio para garantir o transporte diário dessas crianças.",
            raised: 4400,
            goal: 10000
        },
        {
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            category: "Saúde",
            title: "Seu Carlos precisa de uma cirurgia cardíaca",
            description: "Vamos nos unir para ajudar Seu Carlos a realizar sua cirurgia.",
            raised: 18200,
            goal: 20000
        },
        {
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
            category: "Moradia",
            title: "Vamos construir um lar digno para essa família",
            description: "Esta família sonha com um lar seguro para recomeçar com dignidade.",
            raised: 9600,
            goal: 16000
        }
    ];

    return (

        <section className="campaigns">

            <div className="container">

                <div className="campaigns-header">

                    <h1>

                        Campanhas que <span>precisam da sua ajuda</span>

                    </h1>

                    <p>

                        Descubra histórias reais, feitas por pessoas que precisam
                        de apoio para seguir em frente.

                    </p>

                </div>

                <div className="campaigns-filters">

                    <div className="campaign-search">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Busque campanhas, causas ou pessoas..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="campaign-select">

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >

                            <option value="">
                                Todas as categorias
                            </option>

                            <option value="Saúde">
                                Saúde
                            </option>

                            <option value="Educação">
                                Educação
                            </option>

                            <option value="Moradia">
                                Moradia
                            </option>

                            <option value="Animais">
                                Animais
                            </option>

                        </select>

                        <ChevronDown size={18} />

                    </div>

                    <div className="campaign-select">

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >

                            <option value="">
                                Mais recentes
                            </option>

                            <option value="recentes">
                                Mais recentes
                            </option>

                            <option value="antigas">
                                Mais antigas
                            </option>

                            <option value="arrecadacao">
                                Maior arrecadação
                            </option>

                        </select>

                        <ChevronDown size={18} />

                    </div>

                </div>

                <div className="campaigns-grid">

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

                <div className="campaigns-pagination">

                    <button>&lt;</button>

                    <button className="active">1</button>

                    <button>2</button>

                    <button>3</button>
                   

                    <button>&gt;</button>

                </div>

            </div>

        </section>

    );

}

export default Campaigns;