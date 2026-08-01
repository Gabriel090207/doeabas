import {
    ChevronDown,
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react";

import "./Campaigns.css";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";


import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";

import { db } from "../../services/firebase";

import { deleteCampaignCover } from "../../services/storage";

import { useToast } from "../../hooks/useToast";

import { DeleteCampaignModal } from "../../components/DeleteCampaignModal/DeleteCampaignModal";

interface Campaign {

    id: string;
    
    slug: string;

    title: string;

    story: string;

    coverImage: string;

    category: string;

    raisedAmount: number;

    goalAmount: number;

    status: string;

    donationsCount: number;

}

export function Campaigns() {

    const navigate = useNavigate();

    const { show } = useToast();

    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    const [donationsCount, setDonationsCount] = useState<
        Record<string, number>
    >({});

    const [search, setSearch] = useState("");

    const [categoryFilter, setCategoryFilter] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const [orderFilter, setOrderFilter] = useState("recent");

    const [loading, setLoading] = useState(true);

    const [campaignToDelete, setCampaignToDelete] =
        useState<Campaign | null>(null);

    const [deleting, setDeleting] = useState(false);


    async function handleDeleteCampaign() {

        if (!campaignToDelete) return;

        try {

            setDeleting(true);

            await deleteCampaignCover(
                campaignToDelete.coverImage
            );

            await deleteDoc(
                doc(
                    db,
                    "campaigns",
                    campaignToDelete.id
                )
            );

            show({

                type: "success",

                title: "Campanha excluída",

                message:
                    "A campanha foi excluída com sucesso.",

            });

            setCampaignToDelete(null);

        } catch (error) {

                console.error(error);

                show({

                    type: "error",

                    title: "Erro ao excluir",

                    message:
                        "Não foi possível excluir a campanha.",

                });

            } finally {

            setDeleting(false);

        }

    }

    useEffect(() => {

        function loadCampaigns() {

            const campaignsRef = collection(
                db,
                "campaigns"
            );

            const q = query(
                campaignsRef,
                orderBy("createdAt", "desc")
            );

            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {

                    const data = snapshot.docs.map(doc => ({

                        id: doc.id,

                        ...doc.data(),

                    })) as Campaign[];

                    setCampaigns(data);

                    setLoading(false);

                },
                (error) => {

                    console.error(error);

                    setLoading(false);

                }
            );

            return unsubscribe;

        }


        function listenDonationsCount() {

            return onSnapshot(

                collection(db, "donations"),

                (snapshot) => {

                    const counts: Record<string, number> = {};

                    snapshot.docs.forEach((doc) => {

                        const donation = doc.data();

                        if (!donation.campaignId) return;

                        counts[donation.campaignId] =
                            (counts[donation.campaignId] || 0) + 1;

                    });

                    setDonationsCount(counts);

                }

            );

        }

        const unsubscribeDonations =
            listenDonationsCount();

        const unsubscribe =
            loadCampaigns();

      

       return () => {

            unsubscribe();

            unsubscribeDonations();

        };

    }, []);

    const filteredCampaigns = useMemo(() => {

        let data = campaigns.filter((campaign) => {

            const matchesSearch =
                campaign.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                !categoryFilter ||
                campaign.category === categoryFilter;

            const matchesStatus =
                !statusFilter ||
                campaign.status === statusFilter;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );

        });

        if (orderFilter === "old") {

            data = [...data].reverse();

        }

        return data;

    }, [
        campaigns,
        search,
        categoryFilter,
        statusFilter,
        orderFilter,
    ]);

    return (

        <section className="campaigns">

            <div className="campaigns-header">

                <div>

                    <h1>Campanhas</h1>

                    <p>
                        Gerencie todas as campanhas da plataforma.
                    </p>

                </div>

                <button
                    className="campaigns-create-button"
                    onClick={() => navigate("/campanhas/criar")}
                >

                    <Plus size={18} />

                    Nova campanha

                </button>

            </div>

            <div className="campaigns-filters">

                <div className="campaign-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Pesquisar campanha..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="campaign-filter">

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Todas as categorias</option>

                        <option value="Saúde">Saúde</option>

                        <option value="Educação">Educação</option>

                        <option value="Animais">Animais</option>

                        <option value="Emergência">Emergência</option>

                        <option value="Social">Social</option>

                        <option value="Esporte">Esporte</option>

                        <option value="Outro">Outro</option>
                    </select>

                    <ChevronDown size={18} />

                </div>

                <div className="campaign-filter">

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Todos os status</option>

                        <option value="Ativa">Ativa</option>

                        <option value="Pausada">Pausada</option>

                        <option value="Encerrada">Encerrada</option>
                    </select>

                    <ChevronDown size={18} />

                </div>

                <div className="campaign-filter">

                    <select
                        value={orderFilter}
                        onChange={(e) => setOrderFilter(e.target.value)}
                    >

                        <option value="recent">
                            Mais recentes
                        </option>

                        <option value="old">
                            Mais antigas
                        </option>

                    </select>

                    <ChevronDown size={18} />

                </div>

            </div>

            <div className="campaigns-list">

                {loading && (

                    <p>Carregando campanhas...</p>

                )}

                {!loading && filteredCampaigns.length === 0 && (

                    <p>Nenhuma campanha encontrada.</p>

                )}

                {!loading && filteredCampaigns.map((campaign) => (

                    <div
                        key={campaign.id}
                        className="campaign-card"
                    >

                        <div className="campaign-top">

                            <div className="campaign-title">

                                <div className="campaign-icon">

                                    <img
                                        src={campaign.coverImage}
                                        alt={campaign.title}
                                    />

                                </div>

                                <div>

                                    <h2>{campaign.title}</h2>

                                    <p>{campaign.story}</p>

                                </div>

                            </div>

                            <div className="campaign-info">

                                <span className="campaign-category">

                                    {campaign.category}

                                </span>

                                <span
                                    className={`campaign-status ${
                                        campaign.status === "Ativa"
                                            ? "active"
                                            : campaign.status === "Pausada"
                                            ? "paused"
                                            : "closed"
                                    }`}
                                >

                                    {campaign.status}

                                </span>

                            </div>

                        </div>

                        <div className="campaign-bottom">

                            <div>

                                <span>Arrecadado</span>

                                <strong className="campaign-value">

                                    {campaign.raisedAmount.toLocaleString(
                                        "pt-BR",
                                        {
                                            style: "currency",
                                            currency: "BRL",
                                        }
                                    )}

                                </strong>

                            </div>


                            <div>

                                <span>Meta</span>

                                <strong className="campaign-value">

                                    {campaign.goalAmount.toLocaleString(
                                        "pt-BR",
                                        {
                                            style: "currency",
                                            currency: "BRL",
                                        }
                                    )}

                                </strong>

                            </div>

                            <div>

                                <span>Doações</span>

                                <strong className="campaign-value">
                                    {donationsCount[campaign.id] || 0}
                                </strong>

                            </div>

                            <div className="campaign-actions">

                                <button
                                    onClick={() =>
                                        navigate(`/campanhas/${campaign.slug}/editar`)
                                    }
                                >

                                    <Pencil size={18} />

                                </button>

                                <button
                                    className="delete"
                                    onClick={() => setCampaignToDelete(campaign)}
                                >

                                    <Trash2 size={18} />

                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>



            <DeleteCampaignModal
                open={campaignToDelete !== null}
                loading={deleting}
                campaignTitle={campaignToDelete?.title}
                onCancel={() => setCampaignToDelete(null)}
                onConfirm={handleDeleteCampaign}
            />

        </section>

    );

}