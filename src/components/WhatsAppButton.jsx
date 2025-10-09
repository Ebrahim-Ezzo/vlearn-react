// src/components/WhatsAppButton.jsx
import React from "react";
import useContact from "../lib/useContact";
import "../styles/whatsAppButton.css";

// الرقم الهاردكود تبعك (E.164 بدون + داخل المتغير)
const HARDCODED_INTL = "963994080102";

// نبني لينك واتساب بنفس الصيغة اللي كنت تستخدمها
function buildApiWhatsAppLink(intlDigits) {
    // بيطلع: https://api.whatsapp.com/send/?phone=%2B963994080102&text&type=phone_number&app_absent=0
    return `https://api.whatsapp.com/send/?phone=${encodeURIComponent(
        `+${intlDigits}`
    )}&text&type=phone_number&app_absent=0`;
}

export default function WhatsAppButton() {
    const { whatsappHref } = useContact();

    // إذا الـ hook لسه ما جاب الرقم (أو صار فشل)، منستعمل الهاردكود
    const fallbackHref = buildApiWhatsAppLink(HARDCODED_INTL);

    // الـ hook بيرجع رابط بصيغة wa.me؛ ما في مشكلة نستخدمه،
    // وإذا كان فاضي منستعمل الهاردكود لنضمن الزر يظهر فورًا.
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
