import { useState } from "react";

import {
    CircleDollarSign,
    CreditCard,
    Wallet
} from "lucide-react";

import "./MyWallet.css";

type WalletTab = "monthly" | "cards";

interface MonthlyDonation {
    id: number;
    campaign: string;
    amount: string;
    active: boolean;
}

interface SavedCard {
    id: number;
    brand: string;
    number: string;
    holder: string;
    expires: string;
}

const initialMonthlyDonations: MonthlyDonation[] = [

    {
        id: 1,
        campaign: "Ajude Crianças",
        amount: "R$ 50,00",
        active: true
    },

    {
        id: 2,
        campaign: "Projeto Esperança",
        amount: "R$ 25,00",
        active: false
    },

    {
        id: 3,
        campaign: "Alimento Para Todos",
        amount: "R$ 35,00",
        active: true
    }

];

const savedCards: SavedCard[] = [

    {
        id: 1,
        brand: "Visa",
        number: "•••• •••• •••• 4587",
        holder: "João Silva",
        expires: "09/29"
    },

    {
        id: 2,
        brand: "Mastercard",
        number: "•••• •••• •••• 8125",
        holder: "João Silva",
        expires: "11/27"
    }

];

function MyWallet() {

    const [activeTab, setActiveTab] = useState<WalletTab>("monthly");

    const [monthlyDonations, setMonthlyDonations] =
        useState<MonthlyDonation[]>(initialMonthlyDonations);

    function handleToggleDonation(donationId: number) {

        setMonthlyDonations(currentDonations =>

            currentDonations.map(donation =>

                donation.id === donationId

                    ? {
                        ...donation,
                        active: !donation.active
                    }

                    : donation

            )

        );

    }

    return (

        <section className="my-wallet">

            <div className="my-wallet-container">

                <header className="my-wallet-header">

                    <h1>
                        Minha <span>Carteira</span>
                    </h1>

                    <p>
                        Consulte seu saldo, gerencie suas doações mensais
                        e visualize seus cartões salvos.
                    </p>

                </header>

                <div className="wallet-balance-card">

                    <div className="wallet-balance-content">

                        <span>Saldo disponível</span>

                        <h2>R$ 150,00</h2>

                        <small>Atualizado agora</small>

                    </div>

                    <div className="wallet-balance-icon">

                        <CircleDollarSign size={38} />

                    </div>

                </div>

                <div className="wallet-tabs">

                    <button
                        type="button"
                        className={activeTab === "monthly" ? "active" : ""}
                        onClick={() => setActiveTab("monthly")}
                    >

                        <Wallet size={19} />

                        Doações Mensais

                    </button>

                    <button
                        type="button"
                        className={activeTab === "cards" ? "active" : ""}
                        onClick={() => setActiveTab("cards")}
                    >

                        <CreditCard size={19} />

                        Meus Cartões

                    </button>

                </div>

                <div className="wallet-content">

                    {

                        activeTab === "monthly"

                            ? (

                                <div className="wallet-list">

                                    {

                                        monthlyDonations.map(donation => (

                                            <article
                                                className="wallet-item"
                                                key={donation.id}
                                            >

                                                <div className="wallet-item-header">

                                                    <div>

                                                        <span className="wallet-item-label">
                                                            Campanha
                                                        </span>

                                                        <h3>{donation.campaign}</h3>

                                                    </div>

                                                    <div className="wallet-donation-control">

                                                        <span
                                                            className={
                                                                donation.active
                                                                    ? "wallet-status active"
                                                                    : "wallet-status inactive"
                                                            }
                                                        >

                                                            {
                                                                donation.active
                                                                    ? "Ativa"
                                                                    : "Inativa"
                                                            }

                                                        </span>

                                                        <button
                                                            type="button"
                                                            className={
                                                                donation.active
                                                                    ? "wallet-toggle active"
                                                                    : "wallet-toggle"
                                                            }
                                                            role="switch"
                                                            aria-checked={donation.active}
                                                            aria-label={
                                                                donation.active
                                                                    ? `Desativar doação para ${donation.campaign}`
                                                                    : `Ativar doação para ${donation.campaign}`
                                                            }
                                                            onClick={() =>
                                                                handleToggleDonation(donation.id)
                                                            }
                                                        >

                                                            <span />

                                                        </button>

                                                    </div>

                                                </div>

                                                <div className="wallet-item-footer">

                                                    <span>Valor mensal</span>

                                                    <strong>{donation.amount}</strong>

                                                </div>

                                            </article>

                                        ))

                                    }

                                </div>

                            )

                            : (

                                <div className="wallet-cards-grid">

                                    {

                                        savedCards.map(card => (

                                            <article
                                                className="saved-card"
                                                key={card.id}
                                            >

                                                <div className="saved-card-header">

                                                    <div className="saved-card-icon">

                                                        <CreditCard size={23} />

                                                    </div>

                                                    <strong>{card.brand}</strong>

                                                </div>

                                                <p className="saved-card-number">
                                                    {card.number}
                                                </p>

                                                <div className="saved-card-footer">

                                                    <div>

                                                        <span>Titular</span>

                                                        <strong>{card.holder}</strong>

                                                    </div>

                                                    <div>

                                                        <span>Validade</span>

                                                        <strong>{card.expires}</strong>

                                                    </div>

                                                </div>

                                            </article>

                                        ))

                                    }

                                </div>

                            )

                    }

                </div>

            </div>

        </section>

    );

}

export default MyWallet;