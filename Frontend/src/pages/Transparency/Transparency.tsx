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
                            Somos uma plataforma comprometida com a transparência e ficamos felizes pelo seu interesse em entender como tudo funciona por aqui.
                            <br /><br />
                            A Abas é uma empresa com propósito social. Não somos uma organização sem fins lucrativos, mas uma equipe que acredita no poder da solidariedade para transformar vidas por meio da tecnologia. Nosso objetivo é conectar pessoas que precisam de ajuda àquelas que desejam fazer a diferença, oferecendo uma plataforma segura, confiável e acessível.
                            <br /><br />
                            Para manter essa estrutura funcionando com qualidade, contamos com uma taxa administrativa aplicada sobre o valor arrecadado. Esse recurso é destinado à manutenção da plataforma, investimentos em tecnologia, segurança, atendimento, infraestrutura e melhorias contínuas, garantindo uma experiência cada vez melhor para toda a comunidade.
                            <br /><br />
                            Antes de uma campanha ser publicada, nossa equipe realiza uma análise cuidadosa das informações enviadas. Esse processo ajuda a reduzir fraudes, aumentar a confiança dos doadores e proporcionar mais segurança para todos os envolvidos.
                            <br /><br />
                            Também investimos constantemente em inovação, desenvolvimento da plataforma, proteção de dados, suporte aos usuários e ferramentas que ampliam a visibilidade das campanhas, aumentando suas oportunidades de arrecadação.
                            <br /><br />
                            Nossa política é baseada na clareza. Todas as informações sobre taxas e funcionamento da plataforma são apresentadas de forma transparente, sem cobranças ocultas ou custos inesperados. Acreditamos que confiança, segurança e transparência são essenciais para criar uma comunidade forte e fazer com que cada contribuição tenha ainda mais impacto.
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

                        <button type="button" className="contact-button">
                            <MessageCircle aria-hidden="true" />
                            Falar com atendimento
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}