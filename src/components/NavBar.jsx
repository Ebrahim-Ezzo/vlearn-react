import { useState, useEffect } from "react";
import "../i18n";
import "../styles/navbar.css";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
import LanguageToggle from "./LanguageToggle";


export default function NavBar() {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener?.("change", onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
    };
  }, []);

  if (location.pathname === "/login") {
    return (
      <nav className="navbar login_nav">
        <div className="navbar_container">

          <div className="logo">
            <img src="/images/logo.svg" alt="VLearn" />
          </div>

          <Link to="/" className="back_home">{t('navbar_001')}</Link>
        </div>
      </nav>
    );
  }

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
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://wa.me/xxxxxxxx" target="_blank" rel="noopener" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
          <ThemeSwitch />

          {/* links*/}
          <nav className={`navbar_menu ${open ? "is-open" : ""}`}>
            {location.pathname === "/login" ? (
              <Link to="/" className="nav_link">{t("hero")}</Link>
            ) : (
              <>
                <a href="#hero">{t("hero")}</a>
                <a href="#how">{t("how")}</a>
                <a href="#features">{t("features")}</a>
                <a href="#downloads">{t("downloads")}</a>

                <div className="account">
                  <Link to="/login" className="nav_link account_link">
                    <FaUser className="icon_user" size={16} />
                    <p>{t('navbar_002')}</p>
                  </Link>
                </div>
              </>
            )}
          </nav>

          {/* language */}
          {/* <button
            className="lang-toggle"
            onClick={() => {
              const next = i18n.language === "ar" ? "en" : "ar";
              i18n.changeLanguage(next);
            }}
          >
            <i className="fa-solid fa-globe"></i>
            <span className="lang-code">
              {i18n.language.toUpperCase()}
            </span>
          </button> */}
          <LanguageToggle />

          {/*  */}

        </div>
        {/* logo*/}
        <div className="navbar_logo">
          <img src="/assets/logo.svg" alt="VLearn logo" />
        </div>
      </div>
    </header>
  );
}