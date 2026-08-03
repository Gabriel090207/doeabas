import { useState } from "react";
import {
    Headphones,
    MessageCircle,
    Plus,
    ShieldCheck
} from "lucide-react";

import "./Transparency.css";

type FaqItem = {
    question: string;
    answer: string;
};

const faqItems: FaqItem[] = [
    {
        question: "Como funciona a taxa administrativa da Abas?",
        answer:
            "A taxa administrativa é descontada do valor arrecadado e ajuda a manter a plataforma funcionando com segurança, qualidade e transparência. Ela cobre investimentos em tecnologia, atendimento, análise de campanhas e prevenção contra fraudes."
    },
    {
        question: "Existe alguma cobrança além da taxa?",
        answer:
            "Não trabalhamos com cobranças ocultas. Antes de publicar ou movimentar os valores da campanha, todas as informações sobre taxas e possíveis custos relacionados ao pagamento são apresentadas com clareza."
    },
    {
        question: "Quando a taxa é descontada?",
        answer:
            "A taxa é descontada no momento em que os valores arrecadados são processados para a campanha. Dessa forma, o responsável consegue acompanhar quanto foi arrecadado e qual valor estará disponível."
    },
    {
        question: "Quanto tempo leva para aprovar uma campanha?",
        answer:
            "O prazo pode variar de acordo com as informações e documentos enviados. Nossa equipe realiza uma análise cuidadosa para proteger quem cria a campanha e também quem deseja contribuir."
    },
    {
        question: "Posso editar minha campanha depois de publicada?",
        answer:
            "Sim. Algumas informações podem ser atualizadas após a publicação. Alterações mais sensíveis podem passar por uma nova análise para garantir a segurança e a transparência da campanha."
    },
    {
        question: "Como entro em contato com o suporte?",
        answer:
            "Você pode entrar em contato com nossa equipe pelos canais de atendimento disponíveis na plataforma. Estamos preparados para ajudar com dúvidas sobre taxas, campanhas, doações e pagamentos."
    }
];

export default function Transparency() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    function handleFaq(index: number) {
        setActiveFaq((currentFaq) =>
            currentFaq === index ? null : index
        );
    }

    return (
        <main className="transparency-page">
            <section className="transparency-hero">
                <div className="container">
                    <div className="transparency-hero-content">
                        <span className="transparency-badge">
                            <ShieldCheck aria-hidden="true" />
                            Transparência
                        </span>

                        <h1>
                            Taxas e <span>Transparência</span>
                        </h1>

                        <p className="transparency-intro">
                            <strong>Por que a ABAS possui uma taxa operacional?</strong>

                            <br /><br />

                            Na ABAS, acreditamos que uma doação vai muito além de um Pix.

                            <br /><br />

                            Nosso compromisso não é apenas arrecadar recursos, mas garantir que cada campanha seja conduzida com responsabilidade, transparência e cuidado com as pessoas envolvidas.

                            <br /><br />

                            Por isso, <strong>20% de cada doação</strong> são destinados à manutenção da plataforma e de toda a estrutura necessária para que esse trabalho aconteça.

                            <br /><br />

                            Essa estrutura inclui:

                            <br /><br />

                            ✅ Verificação e análise das histórias antes da publicação.
                            <br />
                            ✅ Produção de fotos e vídeos para apresentar cada caso com respeito e transparência.
                            <br />
                            ✅ Acompanhamento da campanha do início ao fim.
                            <br />
                            ✅ Prestação de contas aos doadores e à sociedade.
                            <br />
                            ✅ Tecnologia, hospedagem, segurança e manutenção da plataforma.
                            <br />
                            ✅ Atendimento aos beneficiários e aos doadores.
                            <br />
                            ✅ Remuneração dos Anjos e colaboradores que acompanham as famílias.
                            <br />
                            ✅ Cumprimento das obrigações fiscais e administrativas da ABAS.

                            <br /><br />

                            Além disso, acreditamos que cuidar de uma pessoa é muito mais do que entregar um recurso financeiro.

                            <br /><br />

                            Muitas famílias chegam até nós enfrentando momentos de extrema fragilidade emocional. Por isso, a ABAS busca oferecer acolhimento e apoio durante toda a campanha. Sempre que disponível, disponibilizamos acompanhamento psicológico por meio da nossa equipe ou de parceiros, porque entendemos que recuperar a esperança também faz parte da transformação de uma vida.

                            <br /><br />

                            <strong>Não basta apenas doar. É preciso cuidar de pessoas.</strong>
                        </p>

                      
                    </div>
                </div>
            </section>

            <section className="transparency-faq">
                <div className="container">
                    <div className="faq-header">
                        <div>
                            <span className="faq-badge">
                                <MessageCircle aria-hidden="true" />
                                Tire suas dúvidas
                            </span>

                            <h2>
                                Perguntas <span>frequentes</span>
                            </h2>
                        </div>

                       
                    </div>

                    <div className="faq-list">
                        {faqItems.map((item, index) => {
                            const isActive = activeFaq === index;

                            return (
                                <article
                                    className={`faq-item ${
                                        isActive ? "is-active" : ""
                                    }`}
                                    key={item.question}
                                >
                                    <button
                                        type="button"
                                        className="faq-question"
                                        onClick={() => handleFaq(index)}
                                        aria-expanded={isActive}
                                        aria-controls={`faq-answer-${index}`}
                                    >
                                        <span>{item.question}</span>

                                        <Plus aria-hidden="true" />
                                    </button>

                                    <div
                                        id={`faq-answer-${index}`}
                                        className="faq-answer"
                                        aria-hidden={!isActive}
                                    >
                                        <div className="faq-answer-content">
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="transparency-contact">
                <div className="container">
                    <div className="contact-wrapper">
                        <div className="contact-info">
                            <div className="contact-icon">
                                <Headphones aria-hidden="true" />
                            </div>

                            <div>
                                <h2>Ainda não encontrou o que procura?</h2>

                                <p>
                                    Fale com nossa equipe de atendimento.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="contact-button"
                            onClick={() =>
                                window.open(
                                    "https://wa.me/5586921427920",
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                        >
                            <MessageCircle aria-hidden="true" />
                            Falar com atendimento
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}