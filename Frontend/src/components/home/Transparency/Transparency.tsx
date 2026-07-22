import "./Transparency.css";

import {
    ShieldCheck,
    BadgeCheck,
    FileCheck2,
    Users,
    HeartHandshake,
} from "lucide-react";

function Transparency() {
    return (
        <section className="transparency">

            {/* Decoração */}

          
            <div className="container">

                <div className="transparency-header">

                    <span className="transparency-badge">

                        <BadgeCheck size={18} />

                        Transparência

                    </span>

                    <h2>

                        Por que a <span>Abas</span> é referência
                   
                        em segurança e transparência
                   
                        no Brasil?

                    </h2>

                    <p>

                        Nossa missão é garantir que cada doação seja destinada
                        corretamente, com acompanhamento, responsabilidade e
                        prestação de contas durante toda a campanha.

                    </p>

                </div>

                <div className="transparency-grid">

                    <article className="transparency-card">

                        <div className="card-icon">

                            <ShieldCheck size={34} />

                        </div>

                        <h3>

                            Curadoria e
                            Verificação
                            Rigorosa

                        </h3>

                        <span className="card-line"></span>

                        <p>

                            Diferente de plataformas abertas,
                            todas as campanhas passam por uma
                            análise criteriosa antes de serem
                            publicadas.

                        </p>

                    </article>

                    <article className="transparency-card">

                        <div className="card-icon">

                            <FileCheck2 size={34} />

                        </div>

                        <h3>

                            Compromisso
                            Firmado em
                            Contrato

                        </h3>

                        <span className="card-line"></span>

                        <p>

                            Os beneficiários assinam contratos,
                            garantindo transparência e uso correto
                            dos recursos arrecadados.

                        </p>

                    </article>

                    <article className="transparency-card">

                        <div className="card-icon">

                            <Users size={34} />

                        </div>

                        <h3>

                            Equipe
                            Profissional
                            Dedicada

                        </h3>

                        <span className="card-line"></span>

                        <p>

                            Advogados, assistentes sociais,
                            comunicadores e administradores
                            acompanham todas as campanhas.

                        </p>

                    </article>

                    <article className="transparency-card">

                        <div className="card-icon">

                            <HeartHandshake size={34} />

                        </div>

                        <h3>

                            Transparência
                            Após Cada
                            Campanha

                        </h3>

                        <span className="card-line"></span>

                        <p>

                            Prestamos contas e mostramos
                            exatamente como cada recurso
                            foi utilizado.

                        </p>

                    </article>

                </div>

            </div>

        </section>
    );
}

export default Transparency;