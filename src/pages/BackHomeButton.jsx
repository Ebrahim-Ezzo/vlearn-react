import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./backHomeButton.css";

export default function BackHomeButton() {
    const { t } = useTranslation();
    return (
        <div className="back_home_wrapper">
            <Link
                to="/"
                className="back_home_btn"
                style={{ display: "inline-block" }}
            >
                {t("back_home", "العودة للرئيسية")}
            </Link>
        </div>
    );
}
