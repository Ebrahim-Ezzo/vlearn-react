import { useState, useEffect } from "react";
import "../styles/navbar.css";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
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

          <Link to="/" className="back_home">
            العودة للرئيسية
          </Link>
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
              <Link to="/" className="nav_link">الرئيسية</Link>
            ) : (
              <>
                <a href="#hero">الرئيسية</a>
                <a href="#how">كيف يعمل</a>
                <a href="#features">الميزات</a>
                <a href="#downloads">التنزيلات</a>
                <div className="account">
                  <Link to="/login" className="nav_link account_link">
                    <FaUser className="icon_user" />
                    <p>الحساب</p>
                  </Link>
                </div>
              </>
            )}
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
