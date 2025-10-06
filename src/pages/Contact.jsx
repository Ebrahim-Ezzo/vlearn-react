import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import BackHomeButton from "./BackHomeButton";
import WhatsAppButton from "../components/WhatsAppButton";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"; // 👈 إضافة الإمبورت للآيكونات

import "./contact.css";

const LIMITS = {
    name: 60,
    class: 100,
    subject: 40,
    message: 1000,
};

export default function Contact() {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language?.startsWith("ar");

    const [form, setForm] = useState({
        name: "",
        class: "",
        phone: "09",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState({ ok: false, err: "" });
    const [submitting, setSubmitting] = useState(false);

    const onChange = (e) => {
        const { name, value, maxLength } = e.target;

        if (name === "phone") {
            let digits = value.replace(/\D+/g, "");
            if (!digits.startsWith("09")) {
                digits = "09" + digits.replace(/^0+/, "");
            }
            if (digits.length > 10) digits = digits.slice(0, 10);
            setForm((prev) => ({ ...prev, phone: digits }));
            return;
        }

        let next = value;
        if (typeof next === "string" && maxLength && next.length > maxLength) {
            next = next.slice(0, maxLength);
        }
        setForm((prev) => ({ ...prev, [name]: next }));
    };

    const onPhoneKeyDown = useCallback((e) => {
        const keysToBlock = ["Backspace", "Delete"];
        if (!keysToBlock.includes(e.key)) return;

        const start = e.currentTarget.selectionStart ?? 0;
        const end = e.currentTarget.selectionEnd ?? 0;

        if (start <= 2 && end <= 2) {
            e.preventDefault();
        }
    }, []);

    const onPhonePaste = useCallback((e) => {
        e.preventDefault();
        const pasted = (e.clipboardData.getData("text") || "").replace(/\D+/g, "");
        let digits = "09" + pasted.replace(/^0+/, "");
        if (digits.length > 10) digits = digits.slice(0, 10);
        setForm((prev) => ({ ...prev, phone: digits }));
    }, []);

    const validate = () => {
        if (!form.name.trim()) return t("contact.validation.name_required");

        // class is required
        if (!form.class.trim()) return t("contact.validation.class_required");

        // phone required and format
        const phoneRaw = form.phone.trim();
        if (!phoneRaw || phoneRaw === "09") {
            return t("contact.validation.phone_required");
        }
        if (!/^09\d{8}$/.test(phoneRaw)) {
            return t("contact.validation.phone_invalid");
        }

        if (!form.subject.trim()) return t("contact.validation.subject_required");

        const msg = form.message.trim();
        if (!msg || msg.length < 10) return t("contact.validation.message_min");

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
            setForm({
                name: "",
                class: "",
                phone: "09",
                subject: "",
                message: "",
            });
        } catch {
            setStatus({ ok: false, err: t("contact.alerts.error_generic") });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
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
                            {status.err && (
                                <p className="alert error" role="alert">
                                    {status.err}
                                </p>
                            )}
                            {status.ok && (
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
                                    <strong>{t("contact.info.phone")}: </strong>
                                    <a href="tel:+963994080102" dir="ltr">
                                        +963 994 080 102
                                    </a>
                                </li>
                                <li>
                                    <strong>{t("contact.info.social")}: </strong>
                                    <span className="social">
                                        <a
                                            href="https://www.facebook.com/vlearn.sy?rdid=bKjvfyaZyrG6goZm&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BoSoMzUGg%2F#"
                                            aria-label="Facebook"
                                        >
                                            <FaFacebookF size={18} />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/vlearn.sy?igsh=MXZ1ejdhYzJmMXF3Ng%3D%3D"
                                            aria-label="Instagram"
                                        >
                                            <FaInstagram size={18} />
                                        </a>
                                        <a
                                            href="https://api.whatsapp.com/send/?phone=%2B963994080102&text&type=phone_number&app_absent=0"
                                            aria-label="WhatsApp"
                                        >
                                            <FaWhatsapp size={18} />
                                        </a>
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
                {/* <BackHomeButton /> */}
                <WhatsAppButton />
            </main>
        </>
    );
}
