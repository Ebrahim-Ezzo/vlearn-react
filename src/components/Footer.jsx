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
            <div className="footer_waves" aria-hidden="true">
                <span className="wave w1"></span>
                <span className="wave w2"></span>
                <span className="wave w3"></span>
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
                    {t(`footer_rights`)} {`©`} {` ${year} - `}
                    <a
                        href="https://vroad-me.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        VRoad
                    </a>
                </p>

                <a
                    href="#top"
                    onClick={scrollToTop}
                    className="footer_topbtn"
                    aria-label="Back to top"
                >
                    ↑
                </a>
            </div>
        </footer>
    );
}
