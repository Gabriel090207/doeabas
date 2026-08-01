import "./Donations.css";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    ChevronDown,
    UserRound,
    CreditCard,
    Wallet,
    Trash2,
} from "lucide-react";

import { SiPix } from "react-icons/si";

import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    runTransaction,
} from "firebase/firestore";

import { db } from "../../services/firebase";



import { DeleteDonationModal } from "../../components/DeleteDonationModal/DeleteDonationModal";

import { useToast } from "../../hooks/useToast";

interface Donation {

    id: string;

    donorName: string;

    donorEmail: string;

    campaignTitle: string;

    amount: number;

    paymentMethod: string;

    status: string;

    createdAt: any;

    campaignId: string;

}

export function Donations() {

    const [donations, setDonations] =
        useState<Donation[]>([]);

    const [search, setSearch] =
        useState("");

    const [method, setMethod] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [sort, setSort] =
        useState("recent");


    const { show } = useToast();

    const [donationToDelete, setDonationToDelete] =
        useState<Donation | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    useEffect(() => {

        const unsubscribe =

            onSnapshot(

                query(

                    collection(
                        db,
                        "donations"
                    ),

                    orderBy(
                        "createdAt",
                        "desc"
                    )

                ),

                (snapshot) => {

                    const data =
                        snapshot.docs.map(doc => ({

                            id: doc.id,

                            ...doc.data()

                        })) as Donation[];

                    setDonations(data);

                }

            );

        return () => {

            unsubscribe();

        };

    }, []);

    const filteredDonations =
        useMemo(() => {

            let data = donations.filter(

                donation => {

                    const matchesSearch =

                        donation.donorName
                            ?.toLowerCase()
                            .includes(search.toLowerCase())

                        ||

                        donation.donorEmail
                            ?.toLowerCase()
                            .includes(search.toLowerCase())

                        ||

                        donation.campaignTitle
                            ?.toLowerCase()
                            .includes(search.toLowerCase());

                    const matchesMethod =

                        !method ||

                        donation.paymentMethod === method;

                    const matchesStatus =

                        !status ||

                        donation.status === status;

                    return (

                        matchesSearch &&

                        matchesMethod &&

                        matchesStatus

                    );

                }

            );

            if (sort === "oldest") {

                data = [...data].reverse();

            }

            if (sort === "highest") {

                data = [...data].sort(

                    (a, b) =>

                        b.amount - a.amount

                );

            }

            if (sort === "lowest") {

                data = [...data].sort(

                    (a, b) =>

                        a.amount - b.amount

                );

            }

            return data;

        }, [

            donations,

            search,

            method,

            status,

            sort

        ]);


    async function handleDeleteDonation() {

    if (!donationToDelete) return;

    try {

        setDeleting(true);

        const donationRef = doc(

            db,

            "donations",

            donationToDelete.id

        );

        await runTransaction(

            db,

            async (transaction) => {

                const donationSnapshot =
                    await transaction.get(donationRef);

                if (!donationSnapshot.exists()) {

                    throw new Error(
                        "A doação não foi encontrada."
                    );

                }

                const donationData =
                    donationSnapshot.data();

                const campaignId =
                    donationData.campaignId;

                const amount =
                    Number(donationData.amount || 0);

                const donationStatus =
                    donationData.status;

                /*
                 * Se a doação estiver aprovada,
                 * precisamos descontar seu valor
                 * da campanha.
                 */

                if (
                    donationStatus === "approved" &&
                    campaignId
                ) {

                    const campaignRef = doc(

                        db,

                        "campaigns",

                        campaignId

                    );

                    const campaignSnapshot =
                        await transaction.get(campaignRef);

                    if (!campaignSnapshot.exists()) {

                        throw new Error(
                            "A campanha vinculada não foi encontrada."
                        );

                    }

                    const campaignData =
                        campaignSnapshot.data();

                    const currentRaisedAmount =
                        Number(
                            campaignData.raisedAmount || 0
                        );

                    const newRaisedAmount =
                        Math.max(

                            currentRaisedAmount - amount,

                            0

                        );

                    transaction.update(

                        campaignRef,

                        {

                            raisedAmount:
                                newRaisedAmount

                        }

                    );

                }

                transaction.delete(
                    donationRef
                );

            }

        );

        show({

            type: "success",

            title: "Doação excluída",

            message:
                "A doação foi excluída e o valor arrecadado da campanha foi atualizado.",

        });

        setDonationToDelete(null);

    } catch (error) {

        console.error(error);

        show({

            type: "error",

            title: "Erro ao excluir",

            message:
                error instanceof Error
                    ? error.message
                    : "Não foi possível excluir a doação.",

        });

    } finally {

        setDeleting(false);

    }

}

    return (

        <section className="donations">

            <div className="donations-header">

                <div>

                    <h1>

                        Doações

                    </h1>

                    <p>

                        Gerencie todas as doações realizadas na plataforma.

                    </p>

                </div>

            </div>

            <div className="donations-filters">

                <div className="donations-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Buscar doador ou campanha..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="donations-filter">

                    <select
                        value={method}
                        onChange={(e) =>
                            setMethod(
                                e.target.value
                            )
                        }
                    >

                        <option value="">

                            Todos os métodos

                        </option>

                        <option value="pix">

                            PIX

                        </option>

                        <option value="credit_card">

                            Cartão

                        </option>

                        <option value="wallet">

                            Carteira

                        </option>

                    </select>

                    <ChevronDown size={18} />

                </div>

                <div className="donations-filter">

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }
                    >

                        <option value="">

                            Todos os status

                        </option>

                        <option value="approved">

                            Aprovado

                        </option>

                        <option value="pending">

                            Pendente

                        </option>

                        <option value="cancelled">

                            Cancelado

                        </option>

                    </select>

                    <ChevronDown size={18} />

                </div>

                <div className="donations-filter">

                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(
                                e.target.value
                            )
                        }
                    >

                        <option value="recent">

                            Mais recentes

                        </option>

                        <option value="oldest">

                            Mais antigas

                        </option>

                        <option value="highest">

                            Maior valor

                        </option>

                        <option value="lowest">

                            Menor valor

                        </option>

                    </select>

                    <ChevronDown size={18} />

                </div>

            </div>

            <div className="donations-list">

                {filteredDonations.length === 0 ? (

                    <div className="donations-empty">

                        <h3>

                            Nenhuma doação encontrada

                        </h3>

                        <p>

                            Não existem doações para os filtros selecionados.

                        </p>

                    </div>

                ) : (

                    filteredDonations.map(

                        donation => (

                            <div
                                key={donation.id}
                                className="donation-card"
                            >

                                <div className="donation-top">

                                    <div className="donation-info">

                                        <div className="donation-avatar">

                                            <UserRound size={28} />

                                        </div>

                                        <div>

                                            <h2>

                                                {donation.donorName}

                                            </h2>

                                            <p>

                                                {donation.donorEmail}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="donation-actions">

                                       <button
                                            type="button"
                                            className="donation-delete"
                                            onClick={() =>
                                                setDonationToDelete(donation)
                                            }
                                            aria-label={`Excluir doação de ${donation.donorName}`}
                                        >

                                            <Trash2 size={18} />

                                        </button>

                                    </div>

                                </div>

                                <div className="donation-bottom">

                                    <div>

                                        <span>

                                            Campanha

                                        </span>

                                        <strong>

                                            {donation.campaignTitle}

                                        </strong>

                                    </div>

                                    <div>

                                        <span>

                                            Método

                                        </span>

                                        <div
                                            className={`method ${donation.paymentMethod}`}
                                        >

                                            {donation.paymentMethod === "pix" && (

                                                <>
                                                    <SiPix size={16} />
                                                    <span>PIX</span>
                                                </>

                                            )}

                                            {donation.paymentMethod === "credit_card" && (

                                                <>
                                                    <CreditCard size={16} />
                                                    <span>Cartão</span>
                                                </>

                                            )}

                                            {donation.paymentMethod === "wallet" && (

                                                <>
                                                    <Wallet size={16} />
                                                    <span>Carteira</span>
                                                </>

                                            )}

                                        </div>

                                    </div>

                                    <div>

                                        <span>

                                            Status

                                        </span>

                                        <strong
                                            className={`status ${donation.status}`}
                                        >

                                            {donation.status === "approved" && "Aprovado"}

                                            {donation.status === "pending" && "Pendente"}

                                            {donation.status === "cancelled" && "Cancelado"}

                                        </strong>

                                    </div>

                                    <div>

                                        <span>

                                            Valor

                                        </span>

                                        <strong>

                                            {donation.amount.toLocaleString(

                                                "pt-BR",

                                                {

                                                    style: "currency",

                                                    currency: "BRL"

                                                }

                                            )}

                                        </strong>

                                    </div>

                                    <div>

                                        <span>

                                            Data

                                        </span>

                                        <strong>

                                            {donation.createdAt
                                                ?.toDate()
                                                .toLocaleDateString("pt-BR")}

                                        </strong>

                                    </div>

                                </div>

                            </div>

                        )

                    )

                )}

            </div>


            <DeleteDonationModal
                open={donationToDelete !== null}
                loading={deleting}
                donorName={donationToDelete?.donorName}
                onCancel={() =>
                    setDonationToDelete(null)
                }
                onConfirm={handleDeleteDonation}
            />

        </section>

    );

}
