import { useState, useEffect } from "react";
import "../i18n";
import "../styles/navbar.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaUser } from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import { HashLink } from "react-router-hash-link";

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const onLang = () => setOpen(false);
    i18n.on("languageChanged", onLang);
    return () => i18n.off("languageChanged", onLang);
  }, [i18n]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (location.pathname === "/login") {
    return (
      <nav className="vnav vnav--login">
        <div className="vnav__inner">
          <div className="vnav__logo"><img src="/assets/logo.svg" alt="VLearn" /></div>
          <Link to="/" className="vnav__back-home">{t("navbar_001")}</Link>
        </div>
      </nav>
    );
  }

  return (
    <header className="vnav">
      <div className="vnav__inner">
        <div className="vnav__logo">
          <img src="/assets/logo.svg" alt="VLearn" />
        </div>

        <nav
          id="primary-menu"
          className={`vnav__links ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <HashLink smooth to="/#hero" onClick={() => setOpen(false)}>{t("hero")}</HashLink>
          <HashLink smooth to="/#how" onClick={() => setOpen(false)}>{t("how")}</HashLink>
          <HashLink smooth to="/#features" onClick={() => setOpen(false)}>{t("features")}</HashLink>
          <HashLink smooth to="/#downloads" onClick={() => setOpen(false)}>{t("downloads")}</HashLink>

        </nav>

        <div className="vnav__utils">
          <button
            type="button"
            className={`vnav__toggle ${open ? "is-active" : ""}`}
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="primary-menu"
          >
            <span className="vnav__menu-icon"><span></span><span></span><span></span></span>
          </button>

          <div className="vnav__theme"><ThemeSwitch /></div>
          <div className="vnav__lang"><LanguageToggle /></div>

          <div className="vnav__social">
            <a href="https://www.facebook.com/vlearn.sy?rdid=9IxQn09V4O8fIIc7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BoSoMzUGg%2F#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com/vlearn.sy?igsh=MXZ1ejdhYzJmMXF3Ng%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://api.whatsapp.com/send/?phone=%2B963994080102&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>
    </header>
  );
}
