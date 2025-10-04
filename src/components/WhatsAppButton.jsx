import React from "react";
import "../styles/whatsAppButton.css";

export default function WhatsAppButton() {
    const phone = "9635XXXXXXXX";
    const msg = encodeURIComponent("Hello, I have a question about VLearn.");
    const href = `https://wa.me/${phone}?text=${msg}`;

    return (
        <a
            className="wa-fab"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
        >
            <i className="fa-brands fa-whatsapp wa-ico" aria-hidden="true"></i>
            <span className="wa-text">WhatsApp</span>
        </a>
    );
}
