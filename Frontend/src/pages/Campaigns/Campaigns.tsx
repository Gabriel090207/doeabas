import "./Campaigns.css";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    ChevronDown,
} from "lucide-react";

import CampaignCard from "../../components/home/CampaignCard/CampaignCard";

import { getCampaigns } from "../../services/campaigns";

function Campaigns() {

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [sort, setSort] = useState("");

    const [campaigns, setCampaigns] = useState<any[]>([]);

    const [status, setStatus] = useState("");

    const ITEMS_PER_PAGE = 8;

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

    async function loadCampaigns() {

        const data = await getCampaigns();

        setCampaigns(data);

    }

    loadCampaigns();

}, []);

    const filteredCampaigns = useMemo(() => {

            let data = campaigns.filter((campaign) => {

                const matchesSearch =
                    campaign.title
                        .toLowerCase()
                        .includes(search.toLowerCase());

                const matchesCategory =
                    !category ||
                    campaign.category === category;

                const createdAt = campaign.createdAt?.toDate();

                const endDate = new Date(createdAt);

                endDate.setDate(
                    endDate.getDate() + parseInt(campaign.duration, 10)
                );

                const remainingDays = Math.max(
                    Math.ceil(
                        (endDate.getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    ),
                    0
                );

                const currentStatus =
                    campaign.status === "Pausada"
                        ? "Pausada"
                        : campaign.status === "Encerrada" || remainingDays === 0
                        ? "Encerrada"
                        : "Ativa";

                const matchesStatus =
                    !status ||
                    currentStatus === status;

                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesStatus
                );

            });

            if (sort === "antigas") {

                data = [...data].reverse();

            }

            if (sort === "arrecadacao") {

                data = [...data].sort(
                    (a, b) => b.raisedAmount - a.raisedAmount
                );

            }

            return data;

        }, [
            campaigns,
            search,
            category,
            status,
            sort,
        ]);

        const totalPages = Math.ceil(
            filteredCampaigns.length / ITEMS_PER_PAGE
        );

        const paginatedCampaigns = filteredCampaigns.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );

        useEffect(() => {

            setCurrentPage(1);

        }, [
            search,
            category,
            status,
            sort,
        ]);

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

                            <option value="Animais">
                                Animais
                            </option>

                            <option value="Emergência">
                                Emergência
                            </option>

                            <option value="Social">
                                Social
                            </option>

                            <option value="Esporte">
                                Esporte
                            </option>

                            <option value="Outro">
                                Outro
                            </option>

                        </select>

                        <ChevronDown size={18} />

                    </div>

                    <div className="campaign-select">

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <option value="">
                            Todos os status
                        </option>

                        <option value="Ativa">
                            Ativa
                        </option>

                        <option value="Pausada">
                            Pausada
                        </option>

                        <option value="Encerrada">
                            Encerrada
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

                            <option value="antigas">
                                Mais antigas
                            </option>

                        </select>

                        <ChevronDown size={18} />

                    </div>

                </div>

                <div className="campaigns-grid">

                {filteredCampaigns.length > 0 ? (

                    paginatedCampaigns.map((campaign) => (

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
                            createdAt={campaign.createdAt}
                            status={campaign.status}
                        />

                    ))

                ) : (

                    <div className="campaigns-empty">

                        <h3>Nenhuma campanha encontrada</h3>

                        <p>

                            Tente alterar os filtros ou pesquisar por outro termo.

                        </p>

                    </div>

                )}

            </div>

                <div className="campaigns-pagination">

                <button
                    onClick={() =>
                        setCurrentPage((page) => Math.max(page - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (

                    <button
                        key={page}
                        className={
                            currentPage === page
                                ? "active"
                                : ""
                        }
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>

                ))}

                <button
                    onClick={() =>
                        setCurrentPage((page) =>
                            Math.min(page + 1, totalPages)
                        )
                    }
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>

            </div>
            </div>

        </section>

    );

}

export default Campaigns;