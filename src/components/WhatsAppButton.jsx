import React from "react";
import "../styles/whatsAppButton.css";

export default function WhatsAppButton() {
    const href =
        "https://api.whatsapp.com/send/?phone=%2B963994080102&text&type=phone_number&app_absent=0";

    return (
        <a
            className="wa-fab"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
        >
            <i className="fa-brands fa-whatsapp wa-ico" aria-hidden="true"></i>
            <span className="wa-text">WhatsApp</span>
        </a>
    );
}
