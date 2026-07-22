import "./Hero.css";

import {
    Heart,
    Info,
   
} from "lucide-react";

import heroBackground from "../../../assets/images/hero-background.png";
import heroBunny from "../../../assets/images/hero-bunny.png";

function Hero() {
    return (
        <section className="hero">

            <img
                src={heroBackground}
                alt=""
                className="hero-background"
            />

            <img
                src={heroBunny}
                alt="Mascote ABAS"
                className="hero-bunny"
            />

            <div className="container hero-container">

                <div className="hero-content">

                    <span className="hero-tag">
                        Unidos para transformar vidas.
                    </span>

                    <h1 className="hero-title">
                        Toda ajuda
                        <br />
                        começa com
                        <br />
                        <span>uma história.</span>
                    </h1>

                    <p className="hero-description">
                        Na ABAS, cada campanha é verificada com transparência para
                        que sua solidariedade chegue a quem realmente precisa.
                    </p>

                    <div className="hero-buttons">

                        <button className="hero-primary">
                            <Heart size={20} fill="currentColor" />
                            Quero ajudar
                        </button>

                        <button className="hero-secondary">
                            <Info size={20} />
                            Conhecer sobre
                        </button>

                    </div>

                </div>

            </div>


         

        </section>
    );
}

export default Hero;