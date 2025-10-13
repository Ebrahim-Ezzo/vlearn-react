// src/components/WhatsAppButton.jsx
import React from "react";
import useContact from "../lib/useContact";
import "../styles/whatsAppButton.css";

const HARDCODED_INTL = "963994080102";

function buildApiWhatsAppLink(intlDigits) {
    return `https://api.whatsapp.com/send/?phone=${encodeURIComponent(
        `+${intlDigits}`
    )}&text&type=phone_number&app_absent=0`;
}

export default function WhatsAppButton() {
    const { whatsappHref } = useContact();

    const fallbackHref = buildApiWhatsAppLink(HARDCODED_INTL);

    const href = whatsappHref || fallbackHref;

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
