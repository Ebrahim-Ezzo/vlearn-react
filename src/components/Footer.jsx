import React from "react";
import "../styles/footer.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer" id="footer" dir="auto">
            {/* موجة خفيفة أعلى الفوتر */}

            <div className="footer_wave" aria-hidden="true">
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,80 
      L0,55  L180,80
      L360,55 L540,80
      L720,55 L900,80
      L1080,55 L1260,80
      L1440,55 L1440,80 Z"/>
                </svg>
            </div>

            <div className="footer_container">
                <ul className="footer_links" role="list">
                    <li className="delet">
                        <Link to="/delete-account">{t("footer_001")}</Link>
                    </li>
                    <li>
                        <Link to="/terms">{t("footer_002")}</Link>
                    </li>
                    <li>
                        <Link to="/privacy">{t("footer_003")}</Link>
                    </li>
                    <li>
                        <Link to="/Contact">{t("footer_004")}</Link>
                    </li>
                </ul>

                <p className="footer_copy">
                    © {year} {t("footer_rights")} — VRoad
                </p>

                <a href="#top" onClick={scrollToTop} className="footer_topbtn" aria-label="Back to top">
                    ↑
                </a>
            </div>
        </footer>
    );
}
