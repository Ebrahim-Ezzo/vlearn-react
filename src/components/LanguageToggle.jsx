import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
import "../styles/languageToggle.css";

function LanguageToggle({ showNext = false, className = "" }) {
    const { i18n } = useTranslation();

    const current = i18n.language?.startsWith("ar") ? "ar" : "en";
    const next = current === "ar" ? "en" : "ar";
    const label = (showNext ? next : current).toUpperCase();

    const handleClick = () => {
        i18n.changeLanguage(next);
    };

    return (
        <button
            type="button"
            className={`lang-toggle ${className}`}
            onClick={handleClick}
            aria-label={current === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            title={current === "ar" ? "EN" : "AR"}
        >
            <FaGlobe className="icon-globe" aria-hidden="true" />
            <span className="lang-code">{label}</span>
        </button>
    );
}

export default memo(LanguageToggle);
