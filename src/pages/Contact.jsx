// src/pages/Contact.jsx
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import useContact from "../lib/useContact";
import WhatsAppButton from "../components/WhatsAppButton";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import "./contact.css";

const LIMITS = { name: 60, class: 20, subject: 40, message: 1000 };

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";
const API_URL = `${API_BASE}/contact-messages`;

const FALLBACK = Object.freeze({
    email: "info@vlearn.sy",
    phoneIntl: "963994080102",
    whatsappNumber: "963994080102",
    links: {
        facebook:
            "https://www.facebook.com/vlearn.sy?rdid=bKjvfyaZyrG6goZm&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BoSoMzUGg%2F#",
        instagram:
            "https://www.instagram.com/vlearn.sy?igsh=MXZ1ejdhYzJmMXF3Ng%3D%3D",
    },
});

function toIntlDigits(v) {
    return (v || "").toString().replace(/\D+/g, "").replace(/^0+/, "");
}

const LETTER_RE = /\p{L}/u;
const DIGIT_RE = /[0-9\u0660-\u0669\u06F0-\u06F9]/;
const isLetter = (ch) => LETTER_RE.test(ch);
const isDigit = (ch) => DIGIT_RE.test(ch);
const isSpace = (ch) => ch === " ";
const isNewline = (ch) => ch === "\n" || ch === "\r";
const isComma = (ch) => ch === "," || ch === "،";
const isDot = (ch) => ch === "." || ch === "۔";

function filterName(str) {
    let out = "";
    for (const ch of str || "") if (isLetter(ch) || isSpace(ch)) out += ch;
    return out;
}
function filterSubject(str) {
    let out = "";
    for (const ch of str || "")
        if (isLetter(ch) || isSpace(ch) || isComma(ch) || isDot(ch)) out += ch;
    return out;
}
function filterMessage(str) {
    let out = "";
    for (const ch of str || "")
        if (
            isLetter(ch) ||
            isDigit(ch) ||
            isSpace(ch) ||
            isNewline(ch) ||
            isComma(ch) ||
            isDot(ch)
        )
            out += ch;
    return out;
}
function filterClass(str) {
    let out = "";
    for (const ch of str || "") if (isLetter(ch) || isDigit(ch) || isSpace(ch)) out += ch;
    return out;
}
/* ==================================== */

function classifyAxiosError(err) {
    if (err?.code === "ECONNABORTED") return { type: "timeout" };
    if (err?.response) {
        const s = err.response.status;
        if (s === 404) return { type: "not_found", status: s };
        if (s === 401 || s === 403) return { type: "auth", status: s };
        if (s === 429) return { type: "rate_limit", status: s };
        if (s >= 500) return { type: "server", status: s };
        return { type: "bad_request", status: s };
    }
    if (typeof navigator !== "undefined" && navigator.onLine === false)
        return { type: "offline" };
    return { type: "network" };
}

function collectServerValidation(res) {
    const d = res?.data;
    const ct = (res?.headers?.["content-type"] || "").toLowerCase();
    if (!ct.includes("application/json") || !d || typeof d !== "object") return "";
    if (Array.isArray(d?.errors)) return d.errors.join(" • ");
    if (d?.errors && typeof d.errors === "object") {
        const all = [];
        for (const v of Object.values(d.errors)) {
            if (Array.isArray(v)) all.push(...v);
            else if (v) all.push(String(v));
        }
        return all.join(" • ");
    }
    return d?.message || "";
}

export default function Contact() {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language?.startsWith("ar");

    const { mailHref, telHref, whatsappHref, email, phone } = useContact();

    const srvEmail = email || "";
    const srvPhoneIntl = toIntlDigits(phone);
    const uiEmail = srvEmail || FALLBACK.email;
    const uiPhoneIntl = srvPhoneIntl || FALLBACK.phoneIntl;
    const uiMailHref = mailHref || (uiEmail ? `mailto:${uiEmail}` : "");
    const uiTelHref = telHref || (uiPhoneIntl ? `tel:+${uiPhoneIntl}` : "");
    const uiWhatsappHref =
        whatsappHref ||
        (FALLBACK.whatsappNumber ? `https://wa.me/${FALLBACK.whatsappNumber}` : "");

    const [form, setForm] = useState({
        name: "",
        class: "",
        phone: "09",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState({ ok: false, err: "" });
    const [apiError, setApiError] = useState(null); // { type, status?, details?, reqId? }
    const [submitting, setSubmitting] = useState(false);

    const onChange = (e) => {
        const { name, value, maxLength } = e.target;

        if (name === "phone") {
            let digits = value.replace(/\D+/g, "");
            if (!digits.startsWith("09")) digits = "09" + digits.replace(/^0+/, "");
            if (digits.length > 10) digits = digits.slice(0, 10);
            setForm((p) => ({ ...p, phone: digits }));
            return;
        }

        const clip = (s) =>
            typeof s === "string" && maxLength && s.length > maxLength
                ? s.slice(0, maxLength)
                : s;

        if (name === "name") return setForm((p) => ({ ...p, name: clip(filterName(value)) }));
        if (name === "subject")
            return setForm((p) => ({ ...p, subject: clip(filterSubject(value)) }));
        if (name === "message")
            return setForm((p) => ({ ...p, message: clip(filterMessage(value)) }));
        if (name === "class")
            return setForm((p) => ({ ...p, class: clip(filterClass(value)) }));

        setForm((p) => ({ ...p, [name]: clip(value) }));
    };

    const onPhoneKeyDown = useCallback((e) => {
        const keysToBlock = ["Backspace", "Delete"];
        if (!keysToBlock.includes(e.key)) return;
        const start = e.currentTarget.selectionStart ?? 0;
        const end = e.currentTarget.selectionEnd ?? 0;
        if (start <= 2 && end <= 2) e.preventDefault();
    }, []);

    const onPhonePaste = useCallback((e) => {
        e.preventDefault();
        const pasted = (e.clipboardData.getData("text") || "").replace(/\D+/g, "");
        let digits = "09" + pasted.replace(/^0+/, "");
        if (digits.length > 10) digits = digits.slice(0, 10);
        setForm((p) => ({ ...p, phone: digits }));
    }, []);

    const validate = () => {
        if (!form.name.trim()) return t("contact.validation.name_required");
        if (!form.class.trim()) return t("contact.validation.class_required");
        const phoneRaw = form.phone.trim();
        if (!phoneRaw || phoneRaw === "09") return t("contact.validation.phone_required");
        if (!/^09\d{8}$/.test(phoneRaw)) return t("contact.validation.phone_invalid");
        if (!form.subject.trim()) return t("contact.validation.subject_required");
        const msg = form.message.trim();
        if (!msg || msg.length < 10) return t("contact.validation.message_min");
        return "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ok: false, err: "" });
        setApiError(null);

        const err = validate();
        if (err) return setStatus({ ok: false, err });

        setSubmitting(true);
        try {
            const payload = {
                full_name: form.name.trim(),
                grade: form.class.trim(),
                phone: form.phone.trim(), // 09xxxxxxxx
                subject: form.subject.trim(),
                message: form.message.trim(),
            };

            const res = await axios.post(API_URL, payload, {
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                timeout: 15000,
                validateStatus: () => true,
            });

            if (res.status >= 200 && res.status < 300) {
                setStatus({ ok: true, err: "" });
                setForm({ name: "", class: "", phone: "09", subject: "", message: "" });
            } else if (res.status === 429) {
                setApiError({ type: "rate_limit", status: 429, details: res?.data?.message });
            } else if (res.status === 422) {
                const details = collectServerValidation(res) || res?.data?.message;
                setApiError({ type: "bad_request", status: 422, details });
            } else if (res.status === 404) {
                setApiError({ type: "not_found", status: 404, details: res?.data?.message });
            } else if (res.status === 401 || res.status === 403) {
                setApiError({ type: "auth", status: res.status, details: res?.data?.message });
            } else if (res.status >= 500) {
                setApiError({ type: "server", status: res.status, details: res?.data?.message });
            } else {
                setApiError({ type: "bad_request", status: res.status, details: res?.data?.message });
            }
        } catch (e) {
            const cls = classifyAxiosError(e);
            const serverMsg = e?.response?.data?.message || e?.message || "";
            const reqId = e?.response?.headers?.["x-request-id"];
            setApiError({ ...cls, details: serverMsg, reqId });
        } finally {
            setSubmitting(false);
        }
    };

    const errorMsg = (() => {
        if (!apiError) return "";
        switch (apiError.type) {
            case "timeout": return t("privacy_err_timeout");
            case "offline": return t("privacy_err_offline");
            case "network": return t("privacy_err_network");
            case "server": return t("privacy_err_server");
            case "auth": return t("privacy_err_auth");
            case "not_found": return t("privacy_err_not_found");
            case "bad_request": return t("privacy_err_bad_request");
            case "rate_limit": return t("contact_err_rate_limit");
            default: return t("privacy_err_unknown");
        }
    })();

    const showDetails =
        !!apiError && !["offline", "network", "timeout", "rate_limit"].includes(apiError.type);

    return (
        <main className="contact-page" dir={isAr ? "rtl" : "ltr"}>
            <section className="contact-hero">
                <h1>{t("contact.title")}</h1>
                <p>{t("contact.intro")}</p>
            </section>

            <section className="contact-grid">
                <form className="contact-form" onSubmit={onSubmit} noValidate>
                    <div className="row">
                        <div className="field">
                            <label htmlFor="name">{t("contact.form.full_name")}</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={onChange}
                                placeholder={t("contact.form.placeholders.name")}
                                required
                                maxLength={LIMITS.name}
                                autoComplete="name"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="class">{t("contact.form.class")}</label>
                            <input
                                id="class"
                                name="class"
                                type="text"
                                value={form.class}
                                onChange={onChange}
                                placeholder={t("contact.form.placeholders.class")}
                                required
                                maxLength={LIMITS.class}
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="field">
                            <label htmlFor="phone">{t("contact.form.phone_optional")}</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={onChange}
                                onKeyDown={onPhoneKeyDown}
                                onPaste={onPhonePaste}
                                placeholder={t("contact.form.placeholders.phone")}
                                dir="ltr"
                                inputMode="numeric"
                                pattern="^09\\d{8}$"
                                maxLength={10}
                                autoComplete="tel"
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="subject">{t("contact.form.subject")}</label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                value={form.subject}
                                onChange={onChange}
                                placeholder={t("contact.form.placeholders.subject")}
                                required
                                maxLength={LIMITS.subject}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="message">{t("contact.form.message")}</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={form.message}
                            onChange={onChange}
                            placeholder={t("contact.form.placeholders.message")}
                            dir={isAr ? "rtl" : "ltr"}
                            style={{ textAlign: isAr ? "right" : "left" }}
                            required
                            maxLength={LIMITS.message}
                        />
                        <div className="char-counter" aria-live="polite">
                            {form.message.length}/{LIMITS.message}
                        </div>
                    </div>

                    <div className="cont">
                        {status.err && !apiError && (
                            <p className="alert error" role="alert">
                                {status.err}
                            </p>
                        )}
                        {apiError && (
                            <div className="alert error" role="alert" aria-live="polite">
                                <p className="title">{errorMsg}</p>
                                {showDetails && apiError?.details && (
                                    <small className="muted">{String(apiError.details)}</small>
                                )}
                                {apiError?.reqId && (
                                    <small className="muted">Request-ID: {apiError.reqId}</small>
                                )}
                            </div>
                        )}
                        {status.ok && !apiError && (
                            <p className="alert success" role="status">
                                {t("contact.alerts.success")}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="Contact-btn btn-primary"
                            disabled={submitting}
                            aria-busy={submitting}
                        >
                            {submitting ? t("contact.form.sending") : t("contact.form.send")}
                        </button>
                    </div>
                </form>

                <aside className="contact-info">
                    <div className="card">
                        <h3>{t("contact.info.title")}</h3>
                        <ul>
                            <li>
                                <strong>{t("contact.info.phone")}:</strong>
                                {uiTelHref ? (
                                    <a href={uiTelHref} dir="ltr" rel="noopener noreferrer">
                                        +{uiPhoneIntl}
                                    </a>
                                ) : (
                                    <span dir="ltr">+{uiPhoneIntl}</span>
                                )}
                            </li>

                            <li>
                                <strong>{t("contact.info.email")}:</strong>
                                {uiMailHref ? (
                                    <a href={uiMailHref} rel="noopener noreferrer">
                                        {uiEmail}
                                    </a>
                                ) : (
                                    <span>{uiEmail}</span>
                                )}
                            </li>

                            <li>
                                <strong>{t("contact.info.social")}:</strong>
                                <span className="social">
                                    <a
                                        href={FALLBACK.links.facebook}
                                        aria-label="Facebook"
                                        rel="noopener noreferrer"
                                    >
                                        <FaFacebookF size={18} />
                                    </a>
                                    <a
                                        href={FALLBACK.links.instagram}
                                        aria-label="Instagram"
                                        rel="noopener noreferrer"
                                    >
                                        <FaInstagram size={18} />
                                    </a>
                                    {uiWhatsappHref && (
                                        <a
                                            href={uiWhatsappHref}
                                            aria-label="WhatsApp"
                                            rel="noopener noreferrer"
                                        >
                                            <FaWhatsapp size={18} />
                                        </a>
                                    )}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="card">
                        <h3>{t("contact.info.location_title")}</h3>
                        <p>{t("contact.info.location_value")}</p>
                        <iframe
                            title={t("contact.map_title") || "VLearn Location"}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.6904163626034!2d36.29528024959545!3d33.51985454129444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e73abd220519%3A0x589b9432947672a7!2sVRoad%20LLC!5e1!3m2!1sar!2sjp!4v1758463478362!5m2!1sar!2sjp"
                        />
                    </div>
                </aside>
            </section>

            <WhatsAppButton />
        </main>
    );
}
