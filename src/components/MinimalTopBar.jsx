import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/MinimalTopBar.css";
import LanguageToggle from "./LanguageToggle";

export default function MinimalTopBar() {
    const { t } = useTranslation();
    return (
        <div className="minimal-topbar" >

            <LanguageToggle />
            <Link className="logo" aria-label={t("minimaltopbar_003")}>
                <img src="/images/logo.svg" alt="VLearn Logo" />
            </Link>
            <Link to="/" className="back-btn" aria-label={t("minimaltopbar_002")}>
                <span className="back-arrow">←</span>
                <span>{t('minimaltopbar_001')}</span>
            </Link>
        </div>
    );
}