import { useState, useEffect } from "react";
import "../i18n";
import "../styles/navbar.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaUser } from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import { HashLink } from "react-router-hash-link";   // ✅ الاستيراد يكون هنا فقط

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  if (location.pathname === "/login") {
    return (
      <nav className={`navbar login_nav ${dir === "rtl" ? "navbar_rtl" : "navbar_ltr"}`}>
        <div className="navbar_container">
          <div className="navbar_logo"><img src="/images/logo.svg" alt="VLearn" /></div>
          <Link to="/" className="back_home">{t("navbar_001")}</Link>
        </div>
      </nav>
    );
  }

  return (
    <header className={`navbar ${dir === "rtl" ? "navbar_rtl" : "navbar_ltr"}`}>
      <div className="navbar_container">
        <div className="navbar_logo"><img src="/assets/logo.svg" alt="VLearn logo" /></div>
        <div className="navbar_spacer" />

        <div className="nav-group">
          <button
            className={`navbar_button ${open ? "is-active" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="primary-menu"
          >
            <span className="menu-icon"><span></span><span></span><span></span></span>
          </button>

          <div className="navbar_social item--social">
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://wa.me/xxxxxxxx" target="_blank" rel="noopener" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>

          <div className="item--theme"><ThemeSwitch /></div>

          <nav id="primary-menu" className={`navbar_menu item--links ${open ? "is-open" : ""}`}>
            {/* ✅ استخدم HashLink فقط، بدون أي import داخل JSX */}
            <HashLink smooth to="/#hero" onClick={() => setOpen(false)}>{t("hero")}</HashLink>
            <HashLink smooth to="/#how" onClick={() => setOpen(false)}>{t("how")}</HashLink>
            <HashLink smooth to="/#features" onClick={() => setOpen(false)}>{t("features")}</HashLink>
            <HashLink smooth to="/#downloads" onClick={() => setOpen(false)}>{t("downloads")}</HashLink>

            <div className="account">
              <Link to="/login" className="nav_link account_link">
                <FaUser className="icon_user" size={16} />
                <p>{t("navbar_002")}</p>
              </Link>
            </div>
          </nav>

          <div className="item--lang"><LanguageToggle /></div>
        </div>
      </div>
    </header>
  );
}
