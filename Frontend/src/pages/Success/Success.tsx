import "./Success.css";

import {
    CheckCircle2,
    Heart,
    ArrowRight
} from "lucide-react";

import {
    Link
} from "react-router-dom";


function Success(){

    return (

        <main className="success-page">


            <section className="success-card">


                <div className="success-icon">

                    <CheckCircle2
                        size={72}
                    />

                </div>



                <h1>

                    Doação confirmada

                </h1>



                <p>

                    Obrigado por apoiar esta causa.
                    Sua contribuição foi registrada com sucesso
                    e já faz parte dessa transformação.

                </p>



                <div className="success-info">


                    <Heart
                        size={22}
                    />


                    <span>

                        Sua ajuda faz a diferença.

                    </span>


                </div>



                <div className="success-actions">


                    <Link
                        to="/campanhas"
                        className="success-primary"
                    >

                        Ver campanhas


                        <ArrowRight
                            size={18}
                        />


                    </Link>



                    <Link
                        to="/"
                        className="success-secondary"
                    >

                        Voltar ao início


                    </Link>


                </div>


            </section>


        </main>

    );

}


export default Success;