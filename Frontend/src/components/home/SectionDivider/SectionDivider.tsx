import "./SectionDivider.css";

import logo from "../../../assets/images/logo.webp";

function SectionDivider() {
    return (
        <div className="section-divider">

            <div className="divider-line"></div>

            <img
                src={logo}
                alt="ABAS"
                className="divider-logo"
            />

            <div className="divider-line"></div>

        </div>
    );
}

export default SectionDivider;