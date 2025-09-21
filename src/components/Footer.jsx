import "../styles/footer.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();
    return (
        <footer className="footer" id="footer">
            <div className="footer_container">
                <ul className="footer_contact">

                    <li className="delet">
                        <Link to="/delete-account">{t('footer_001')}</Link>
                    </li>

                    <li><Link to="/terms">{t('footer_002')}</Link></li>
                    <li><Link to="/privacy">{t('footer_003')}</Link></li>
                    <li><Link to="/Contact">{t('footer_004')}</Link></li>
                </ul>
                <p>© {year} {t('footer_rights')} — VRoad</p>
            </div>
        </footer>
    );
}