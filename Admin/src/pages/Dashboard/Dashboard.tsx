import {
    CircleDollarSign,
    CreditCard,
    HeartHandshake,
    UserRound,
    Users,
    Wallet,
} from "lucide-react";

import { SiPix } from "react-icons/si";

import "./Dashboard.css";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";

import { db } from "../../services/firebase";

interface Donation {

    id: string;

    donorName: string;

    campaignTitle: string;

    amount: number;

    paymentMethod: string;

    createdAt?: any;

}

interface Campaign {

    id: string;

    raisedAmount: number;

}

interface User {

    id: string;

}

export function Dashboard() {

    const [campaigns, setCampaigns] =
        useState<Campaign[]>([]);

    const [users, setUsers] =
        useState<User[]>([]);

    const [donations, setDonations] =
        useState<Donation[]>([]);

    useEffect(() => {

        const unsubscribeCampaigns =
            onSnapshot(

                query(

                    collection(
                        db,
                        "campaigns"
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

                        })) as Campaign[];

                    setCampaigns(data);

                }

            );

        const unsubscribeUsers =
            onSnapshot(

                collection(
                    db,
                    "users"
                ),

                (snapshot) => {

                    const data =
                        snapshot.docs.map(doc => ({

                            id: doc.id,

                            ...doc.data()

                        })) as User[];

                    setUsers(data);

                }

            );

        const unsubscribeDonations =
            onSnapshot(

                query(

                    collection(
                        db,
                        "donations"
                    ),

                    where(
                        "status",
                        "==",
                        "approved"
                    ),

                    orderBy(
                        "createdAt",
                        "desc"
                    ),

                    limit(5)

                ),

                (snapshot) => {

                 

                    const data =
                        snapshot.docs.map(doc => ({

                            id: doc.id,

                            ...doc.data()

                        })) as Donation[];

                    

                    setDonations(data);

                },

                (error) => {

                    console.error(error);

                }

            );

        return () => {

            unsubscribeCampaigns();

            unsubscribeUsers();

            unsubscribeDonations();

        };

    }, []);

    const totalRaised =
        useMemo(() => {

            return campaigns.reduce(

                (total, campaign) =>

                    total +
                    (campaign.raisedAmount || 0),

                0

            );

        }, [

            campaigns

        ]);

    const donationsToday =
        useMemo(() => {

            const today =
                new Date();

            return donations.filter(

                donation => {

                    if(
                        !donation.createdAt
                    ){

                        return false;

                    }

                    const date =
                        donation.createdAt.toDate();

                    return (

                        date.getDate() ===
                        today.getDate()

                        &&

                        date.getMonth() ===
                        today.getMonth()

                        &&

                        date.getFullYear() ===
                        today.getFullYear()

                    );

                }

            ).length;

        }, [

            donations

        ]);

    const stats = [

        {

            title:
                "Usuários",

            value:
                users.length.toString(),

            icon:
                Users

        },

        {

            title:
                "Campanhas",

            value:
                campaigns.length.toString(),

            icon:
                HeartHandshake

        },

        {

            title:
                "Arrecadado",

            value:
                totalRaised.toLocaleString(

                    "pt-BR",

                    {

                        style:
                            "currency",

                        currency:
                            "BRL"

                    }

                ),

            icon:
                CircleDollarSign

        },

        {

            title:
                "Doações Hoje",

            value:
                donationsToday.toString(),

            icon:
                HeartHandshake

        }

    ];

    return (

        <section className="dashboard">

            <div className="dashboard-header">

                <h1>

                    Dashboard

                </h1>

                <p>

                    Bem-vindo ao painel administrativo da ABAS.

                </p>

            </div>

            <div className="dashboard-stats">

                {stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="dashboard-card"
                        >

                            <div className="dashboard-card-icon">

                                <Icon size={24} />

                            </div>

                            <div>

                                <span>

                                    {item.title}

                                </span>

                                <h2>

                                    {item.value}

                                </h2>

                            </div>

                        </div>

                    );

                })}

            </div>

            <div className="dashboard-donations">

                <div className="dashboard-card-header">

                    <h2>

                        Últimas doações

                    </h2>

                </div>

                <div className="dashboard-table">

                    {donations.length === 0 && (

                            <div className="dashboard-empty">

                                <HeartHandshake size={42} />

                                <h3>Nenhuma doação encontrada</h3>

                                <p>
                                    Assim que uma nova doação for realizada,
                                    ela aparecerá aqui automaticamente.
                                </p>

                            </div>

                        )}

                    {donations.map((donation) => (

                        <div
                            key={donation.id}
                            className="dashboard-row"
                        >

                            <div className="dashboard-donor">

                                <UserRound size={18} />

                                <span>

                                    {donation.donorName}

                                </span>

                            </div>

                            <span className="dashboard-campaign">

                                {donation.campaignTitle}

                            </span>

                            <div
                                className={`dashboard-method ${donation.paymentMethod}`}
                            >

                                {donation.paymentMethod === "pix" && (

                                    <>

                                        <SiPix />

                                        PIX

                                    </>

                                )}

                                {donation.paymentMethod === "credit_card" && (

                                    <>

                                        <CreditCard size={16} />

                                        Cartão

                                    </>

                                )}

                                {donation.paymentMethod === "wallet" && (

                                    <>

                                        <Wallet size={16} />

                                        Carteira

                                    </>

                                )}

                            </div>

                            <strong className="dashboard-value">

                                {(donation.amount || 0).toLocaleString(

                                    "pt-BR",

                                    {

                                        style: "currency",

                                        currency: "BRL"

                                    }

                                )}

                            </strong>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}