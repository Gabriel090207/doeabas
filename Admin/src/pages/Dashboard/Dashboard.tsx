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

const stats = [
    {
        title: "Usuários",
        value: "248",
        icon: Users,
    },
    {
        title: "Campanhas",
        value: "18",
        icon: HeartHandshake,
    },
    {
        title: "Arrecadado",
        value: "R$ 82.450,00",
        icon: CircleDollarSign,
    },
    {
        title: "Doações Hoje",
        value: "26",
        icon: HeartHandshake,
    },
];

const donations = [
    {
        donor: "João Silva",
        campaign: "Campanha Escolar",
        value: "R$ 150,00",
        method: "pix",
    },
    {
        donor: "Maria Souza",
        campaign: "Natal Solidário",
        value: "R$ 80,00",
        method: "cartao",
    },
    {
        donor: "Carlos Lima",
        campaign: "Construção",
        value: "R$ 500,00",
        method: "carteira",
    },
    {
        donor: "Ana Paula",
        campaign: "Material Escolar",
        value: "R$ 120,00",
        method: "pix",
    },
];

export function Dashboard() {

    return (

        <section className="dashboard">

            <div className="dashboard-header">

                <h1>Dashboard</h1>

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

                    {donations.map((donation, index) => (

                        <div
                            key={index}
                            className="dashboard-row"
                        >

                            <div className="dashboard-donor">

                                <UserRound size={18} />

                                <span>
                                    {donation.donor}
                                </span>

                            </div>

                            <span className="dashboard-campaign">
                                {donation.campaign}
                            </span>

                            <div
                                className={`dashboard-method ${donation.method}`}
                            >

                                {donation.method === "pix" && (
                                    <>
                                        <SiPix />
                                        PIX
                                    </>
                                )}

                                {donation.method === "cartao" && (
                                    <>
                                        <CreditCard size={16} />
                                        Cartão
                                    </>
                                )}

                                {donation.method === "carteira" && (
                                    <>
                                        <Wallet size={16} />
                                        Carteira
                                    </>
                                )}

                            </div>

                            <strong className="dashboard-value">
                                {donation.value}
                            </strong>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}