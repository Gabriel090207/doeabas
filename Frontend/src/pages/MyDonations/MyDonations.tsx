import "./MyDonations.css";

import { ChevronDown } from "lucide-react";


function MyDonations() {
    return (
        <section className="my-donations">

            <div className="my-donations-header">

                <h1>Minhas Doações</h1>

                <p>
                    Acompanhe todo o histórico das suas doações.
                </p>

            </div>

            <div className="my-donations-tabs">

                <button className="active">

                    Doações Avulsas

                </button>

                <button>

                    Doações Mensais

                </button>

            </div>

            <div className="my-donations-filters">

                <input
                    type="text"
                    placeholder="Buscar campanha..."
                />

                <div className="donation-select">

                    <select>

                        <option>Todos os status</option>

                    </select>

                    <ChevronDown size={18} />

                </div>

               <div className="donation-select">

                    <select>

                        <option>Mais recentes</option>

                    </select>

                    <ChevronDown size={18} />

                </div>

            </div>

            <div className="my-donations-list">

                <div className="donation-item">

                    <div className="donation-row">

                        <h3>Campanha Esperança</h3>

                        <span className="donation-value">
                            R$ 50,00
                        </span>

                    </div>

                    <div className="donation-row">

                        <span>
                            10/06/2025
                        </span>

                        <span className="status success">
                            Concluída
                        </span>

                    </div>

                </div>

                <div className="donation-item">

                    <div className="donation-row">

                        <h3>Natal Solidário</h3>

                        <span className="donation-value">
                            R$ 100,00
                        </span>

                    </div>

                    <div className="donation-row">

                        <span>
                            03/06/2025
                        </span>

                        <span className="status pending">
                            Pendente
                        </span>

                    </div>

                </div>

                <div className="donation-item">

                    <div className="donation-row">

                        <h3>Casa da Criança</h3>

                        <span className="donation-value">
                            R$ 25,00
                        </span>

                    </div>

                    <div className="donation-row">

                        <span>
                            28/05/2025
                        </span>

                        <span className="status success">
                            Concluída
                        </span>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default MyDonations;