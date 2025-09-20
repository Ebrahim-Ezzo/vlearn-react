import "../styles/footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer" id="footer">
            <div className="footer_container">
                <ul className="footer_contact">

                    <li className="delet">
                        <Link to="/delete-account">حذف الحساب</Link>
                    </li>

                    <li><Link to="/terms">الشروط والأحكام</Link></li>
                    <li><Link to="/privacy">سياسة الخصوصية</Link></li>
                </ul>
                <p>© {year} جميع الحقوق محفوظة — VRoad</p>
            </div>
        </footer>
    );
}