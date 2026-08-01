import "./MyDonations.css";

import {
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    ChevronDown,
} from "lucide-react";

import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import { db } from "../../services/firebase";

import { AuthContext } from "../../contexts/AuthContext";

interface Donation {

    id: string;

    campaignTitle: string;

    amount: number;

    status: string;

    paymentMethod: string;

    createdAt: any;

}

function MyDonations() {

const { user } =
    useContext(AuthContext);

const [donations, setDonations] =
    useState<Donation[]>([]);

const [activeTab, setActiveTab] =
    useState<"single" | "monthly">("single");

const [search, setSearch] =
    useState("");

const [statusFilter, setStatusFilter] =
    useState("");

const [sort, setSort] =
    useState("recent");

useEffect(() => {

    if (!user?.email) {

        setDonations([]);

        

        return;

    }

    const collectionName =

        activeTab === "single"
            ? "donations"
            : "monthlyDonations";

    const unsubscribe = onSnapshot(

        query(

            collection(
                db,
                collectionName
            ),

            where(
                "donorEmail",
                "==",
                user.email
            )

        ),

        (snapshot) => {

           const data =
            snapshot.docs
                .map(doc => ({

                    id: doc.id,

                    ...doc.data()

                }))
                .sort(

                    (a: any, b: any) =>

                        b.createdAt?.seconds -
                        a.createdAt?.seconds

                ) as Donation[];

            setDonations(data);

        },

        (error) => {

            console.error(error);

        }

    );

    return () => {

        unsubscribe();

    };

}, [

    user,

    activeTab

]);


useEffect(() => {

    setSearch("");

    setStatusFilter("");

    setSort("recent");

}, [

    activeTab

]);


const filteredDonations = useMemo(() => {

    let data = donations.filter((donation) => {

        const matchesSearch =

            donation.campaignTitle
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );

        const matchesStatus =

            !statusFilter ||

            donation.status === statusFilter;

        return (

            matchesSearch &&

            matchesStatus

        );

    });

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

    statusFilter,

    sort

]);

const donationStatus = {

    approved: {

        label: "Aprovada",

        className: "success"

    },

    pending: {

        label: "Pendente",

        className: "pending"

    },

    cancelled: {

        label: "Cancelada",

        className: "cancelled"

    },

    rejected: {

        label: "Recusada",

        className: "cancelled"

    }

};

    return (
        <section className="my-donations">

            <div className="my-donations-header">

                <h1>Minhas Doações</h1>

                <p>
                    Acompanhe todo o histórico das suas doações.
                </p>

            </div>

            <div className="my-donations-tabs">

                <button
                    className={
                        activeTab === "single"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("single")
                    }
                >

                    Doações Avulsas

                </button>

                <button
                    className={
                        activeTab === "monthly"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("monthly")
                    }
                >

                    Doações Mensais

                </button>

            </div>

            <div className="my-donations-filters">

                <div className="donation-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Buscar campanha..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="donation-select">

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >

                        <option value="">
                            Todos os status
                        </option>

                        <option value="approved">
                            Aprovada
                        </option>

                        <option value="pending">
                            Pendente
                        </option>

                        <option value="cancelled">
                            Cancelada
                        </option>

                    </select>

                    <ChevronDown size={18} />

                </div>

               <div className="donation-select">

                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
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

                <div className="my-donations-list">

                    {filteredDonations.length === 0 ? (

                        <div className="my-donations-empty">

                            <h3>

                                Nenhuma doação encontrada

                            </h3>

                            <p>

                                Você ainda não possui doações nesta categoria.

                            </p>

                        </div>

                    ) : (

                        filteredDonations.map((donation) => (

                            <div
                                key={donation.id}
                                className="donation-item"
                            >

                                <div className="donation-row">

                                    <h3>

                                        {donation.campaignTitle}

                                    </h3>

                                    <span className="donation-value">

                                        {(donation.amount || 0).toLocaleString(

                                            "pt-BR",

                                            {

                                                style: "currency",

                                                currency: "BRL"

                                            }

                                        )}

                                    </span>

                                </div>

                                <div className="donation-row">

                                    <span>

                                        {donation.createdAt?.toDate().toLocaleDateString(
                                            "pt-BR"
                                        )}

                                    </span>

                                   <span
                                        className={`status ${

                                            donationStatus[
                                                donation.status as keyof typeof donationStatus
                                            ]?.className || "pending"

                                        }`}
                                    >

                                        {

                                            donationStatus[
                                                donation.status as keyof typeof donationStatus
                                            ]?.label || donation.status

                                        }

                                    </span>

                                </div>

                            </div>

                        ))

                    )}

                </div>
            

        </section>
    );
}

export default MyDonations;