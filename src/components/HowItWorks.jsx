import { useTranslation } from "react-i18next";
import "../styles/howItWorks.css";
import {
    FiUserPlus,
    FiLayers,
    FiCheckCircle,
    FiCreditCard,
    FiClipboard,
    FiPercent,
} from "react-icons/fi";

export default function HowItWorks() {
    const { t } = useTranslation();

    return (
        <section id="how" className="howitworks">
            <div className="howitworks_container">
                <header className="howitworks_header">
                    <h2 className="howitworks_title">{t("how_title")}</h2>
                    <p className="howitworks_lead">{t("how_intro")}</p>
                </header>

                <ul className="howitworks_steps">

                    <li className="step glass-card">
                        <span className="step_badge" aria-hidden="true">1</span>
                        <span className="step_icon" aria-hidden="true"><FiUserPlus /></span>
                        <div className="step_body">
                            <h3 className="step_title">{t("how_step_signup")}</h3>
                            <p className="step_desc">{t("how_step_signup_desc")}</p>
                        </div>

                    </li>

                    <li className="step glass-card">
                        <span className="step_badge" aria-hidden="true">2</span>
                        <span className="step_icon" aria-hidden="true"><FiLayers /></span>
                        <div className="step_body">
                            <h3 className="step_title">{t("howitworks_001")}</h3>
                            <p className="step_desc">{t("how_step_choose_desc")}</p>
                        </div>
                    </li>

                    <li className="step glass-card">
                        <span className="step_badge" aria-hidden="true">3</span>
                        <span className="step_icon" aria-hidden="true"><FiCheckCircle /></span>
                        <div className="step_body">
                            <h3 className="step_title">{t("how_step_subscribe")}</h3>
                            <p className="step_desc">{t("how_step_subscribe_desc")}</p>
                        </div>
                    </li>

                    <li className="step glass-card">
                        <span className="step_badge" aria-hidden="true">4</span>
                        <span className="step_icon" aria-hidden="true"><FiCreditCard /></span>
                        <div className="step_body">
                            <h3 className="step_title">{t("howitworks_002")}</h3>
                            <p className="step_desc">{t("how_payment_desc")}</p>
                        </div>
                    </li>

                    <li className="step glass-card">
                        <span className="step_badge" aria-hidden="true">5</span>
                        <span className="step_icon" aria-hidden="true"><FiClipboard /></span>
                        <div className="step_body">
                            <h3 className="step_title">{t("howitworks_003")}</h3>
                            <p className="step_desc">{t("how_learn_desc")}</p>
                        </div>
                    </li>

                    <li className="step glass-card">
                        <span className="step_badge" aria-hidden="true">6</span>
                        <span className="step_icon" aria-hidden="true"><FiPercent /></span>
                        <div className="step_body">
                            <h3 className="step_title">{t("howitworks_004")}</h3>
                            <p className="step_desc">{t("how_offers_desc")}</p>
                        </div>
                    </li>
                </ul>

                <div className="howitworks_cta">
                    <a href="#downloads" className="howitworks_link">{t("howitworks_005")}</a>
                </div>
            </div>
        </section>
    );
}
