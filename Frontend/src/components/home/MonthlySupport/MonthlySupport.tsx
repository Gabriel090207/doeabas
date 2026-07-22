import "./MonthlySupport.css";

import {
    ArrowRight,
    Star
} from "lucide-react";

import monthlyBackground from "../../../assets/images/monthly-background.png";
import monthlyBunny from "../../../assets/images/monthly-bunny.png";

function MonthlySupport() {

    return (

        <section className="monthly-support">

            {/* ===========================
                BACKGROUND
            ============================ */}

            <img
                src={monthlyBackground}
                alt=""
                className="monthly-background"
            />

            {/* ===========================
                COELHO
            ============================ */}

            <img
                src={monthlyBunny}
                alt="Mascote ABAS"
                className="monthly-bunny"
            />

            {/* ===========================
                CONTEÚDO
            ============================ */}

            <div className="container monthly-container">

                <div className="monthly-content">

                    <span className="monthly-badge">

                        <Star size={16} fill="currentColor" />

                        Novidade!

                    </span>

                    <h2 className="monthly-title">

                        Seja um <span>membro Abas</span> e
                     
                        ajude mensalmente a
                      
                        mudar vidas.

                    </h2>

                    <p className="monthly-description">

                        Você escolhe um valor fixo para doar
                        mensalmente e ele será destinado para
                        campanhas verificadas da plataforma
                        ABAS.

                    </p>

                    <button className="monthly-button">

                        Saiba mais

                        <ArrowRight size={20} />

                    </button>

                </div>

                

            </div>

        </section>

    );

}

export default MonthlySupport;