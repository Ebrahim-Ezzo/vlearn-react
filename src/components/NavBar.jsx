import { useState } from "react";
import "../styles/navbar.css";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";


export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar_container">
        {/* menu button */}

        <div className="nav-group">
          <button
            className={`navbar_button ${open ? "is-active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <div className="navbar_social">
            {/* <FaFacebook />
          <FaInstagram />
          <FaWhatsapp /> */}
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://wa.me/xxxxxxxx" target="_blank" rel="noopener" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>

          {/* links*/}
          <nav className={`navbar_menu ${open ? "is-open" : ""}`}>
            <a href="#downloads">التنزيلات</a>
            <a href="#features">الميزات</a>
            <a href="#how">كيف يعمل</a>
            <a href="#hero">الرئيسية</a>
          </nav>
        </div>
        {/* logo*/}
        <div className="navbar_logo">
          <img src="/assets/logo.svg" alt="VLearn logo" />
        </div>
      </div>
    </header>
  );
}
