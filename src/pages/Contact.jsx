// src/pages/Contact.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MinimalTopBar from "../components/MinimalTopBar";
import "./contact.css";

export default function Contact() {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language?.startsWith("ar");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        agree: false,
    });
    const [status, setStatus] = useState({ ok: false, err: "" });
    const [submitting, setSubmitting] = useState(false);

    const onChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const validate = () => {
        if (!form.name.trim()) return t("contact.validation.name_required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return t("contact.validation.email_invalid");
        if (!form.subject.trim()) return t("contact.validation.subject_required");
        if (!form.message.trim() || form.message.trim().length < 10) return t("contact.validation.message_min");
        if (!form.agree) return t("contact.validation.agree_required");
        return "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ok: false, err: "" });
        const err = validate();
        if (err) {
            setStatus({ ok: false, err });
            return;
        }
        setSubmitting(true);
        try {
            await new Promise((r) => setTimeout(r, 800));
            setStatus({ ok: true, err: "" });
            setForm({ name: "", email: "", phone: "", subject: "", message: "", agree: false });
        } catch {
            setStatus({ ok: false, err: t("contact.alerts.error_generic") });
        } finally {
            setSubmitting(false);
        }
    };

    const agreeFull = t("contact.form.agree");
    const privacyText = t("footer_003");
    const idx = agreeFull.indexOf(privacyText);
    const agreePrefix = idx >= 0 ? agreeFull.slice(0, idx) : "";
    const agreeSuffix = idx >= 0 ? agreeFull.slice(idx + privacyText.length) : "";

    return (
        <>
            <MinimalTopBar />
            <main className="contact-page" dir={isAr ? "rtl" : "ltr"}>
                
                <section className="contact-hero">
                    <h1>{t("contact.title")}</h1>
                    <p>{t("contact.intro")}</p>
                </section>

                <section className="contact-grid">
                    {/* Form */}
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
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="email">{t("contact.form.email")}</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={onChange}
                                    placeholder={t("contact.form.placeholders.email")}
                                    dir="ltr"
                                    required
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
                                    placeholder={t("contact.form.placeholders.phone")}
                                    dir="ltr"
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
                            />
                        </div>

                        <div className="cont">

                            <label className="check">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    checked={form.agree}
                                    onChange={onChange}
                                />
                                <span>
                                    {agreePrefix}
                                    <Link
                                        to="/privacy"
                                        className="inline-link"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {privacyText}
                                    </Link>
                                    {agreeSuffix}
                                </span>
                            </label>

                            {status.err && <p className="alert error">{status.err}</p>}
                            {status.ok && <p className="alert success">{t("contact.alerts.success")}</p>}

                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? t("contact.form.sending") : t("contact.form.send")}
                            </button>

                        </div>

                    </form>

                    {/* Side info */}
                    <aside className="contact-info">
                        <div className="card">
                            <h3>{t("contact.info.title")}</h3>
                            <ul>
                                <li>
                                    <strong>{t("contact.info.email")}:</strong>{" "}
                                    <a href="mailto:support@vlearn.com">support@vlearn.com</a>
                                </li>
                                <li>
                                    <strong>{t("contact.info.phone")}:</strong>{" "}
                                    <a href="tel:+963994080102">+963 994 080 102</a>
                                </li>
                                <li>
                                    <strong>{t("contact.info.social")}:</strong>
                                    <span className="social">
                                        <a href="#" aria-label="Facebook">Facebook</a>
                                        <a href="#" aria-label="Instagram">Instagram</a>
                                        <a href="#" aria-label="Telegram">Telegram</a>
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
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </aside>
                </section>
            </main>
        </>
    );
}
