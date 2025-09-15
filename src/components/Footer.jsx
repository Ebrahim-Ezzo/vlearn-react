import "../styles/footer.css";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";


export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer" id="footer">
            <div className="footer_container">
                    <ul className="footer_contact">
                        <li><a href="mailto:support@vlearn.sy">support@vlearn.sy</a></li>
                        <li><a href="tel:+963994080102">WhatssApp</a></li>
                        <li><a href="#">سياسة الخصوصية</a></li>
                    </ul>
                    <p>© {year} جميع الحقوق محفوظة — VLearn</p>
                </div>

        </footer>
    );
}