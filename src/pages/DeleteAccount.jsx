import { useTranslation } from "react-i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./DeleteAccount.css";
import BackHomeButton from "./BackHomeButton";
import WhatsAppButton from "../components/WhatsAppButton";

const SITE_KEY =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeaxtQrAAAAAG_PiEPGK168eT5ZOl57h5yug1C-";

const PREFIX = "+963";
const PREFIX_LEN = PREFIX.length;

function normalizeSyPhone(raw) {
    const s = (raw || "").replace(/\s+/g, "");
    if (s.startsWith(PREFIX)) {
        return PREFIX + s.slice(PREFIX_LEN).replace(/\D/g, "").slice(0, 9);
    }
    if (s.startsWith("+") && !s.startsWith(PREFIX)) {
        return PREFIX;
    }
    let digits = s.replace(/\D/g, "");
    if (digits.startsWith("00963")) digits = digits.slice(5);
    else if (digits.startsWith("963")) digits = digits.slice(3);
    else if (digits.startsWith("09")) digits = digits.slice(1);
    return PREFIX + digits.slice(0, 9);
}

export default function DeleteAccount() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language.startsWith("ar");

    const [phone, setPhone] = useState(PREFIX);
    const [agree, setAgree] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [touched, setTouched] = useState(false);
    const [captchaOk, setCaptchaOk] = useState(false);

    useEffect(() => {
        document.title = t("deleteaccount_016");
    }, [t]);

    const phoneRegex = useMemo(() => /^\+963\d{9}$/, []);
    const isPhoneValid = phoneRegex.test(phone.trim());
    const canProceed = isPhoneValid && agree && captchaOk;

    const openModal = (e) => {
        e.preventDefault();
        setTouched(true);
        if (canProceed) setShowModal(true);
    };

    const handleConfirm = () => {
        const support = "support@vlearn.sy";
        const subject = encodeURIComponent(t("deleteaccount_017"));
        const body = encodeURIComponent(
            `مرحبًا فريق VLearn،

أودّ حذف حسابي نهائيًا.

رقم الهاتف المرتبط بالحساب: ${phone}

أقرّ بأني أفهم أن الحذف نهائي وقد أفقد كل البيانات/المزايا المرتبطة بالحساب.

شكرًا لكم.`
        );
        window.location.href = `mailto:${support}?subject=${subject}&body=${body}`;
        setShowModal(false);
    };

    const guardPrefixKeydown = (e) => {
        const input = e.target;
        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? start;
        const touchesPrefix =
            (e.key === "Backspace" && start <= PREFIX_LEN) ||
            (e.key === "Delete" && start < PREFIX_LEN) ||
            (start < PREFIX_LEN && end > 0);
        if (touchesPrefix) {
            e.preventDefault();
            requestAnimationFrame(() => {
                input.setSelectionRange(PREFIX_LEN, PREFIX_LEN);
            });
        }
    };

    const handlePhoneChange = (e) => {
        setPhone(normalizeSyPhone(e.target.value));
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData?.getData("text") || "").trim();
        setPhone(normalizeSyPhone(pasted));
    };

    return (
        <section className="delete-page" aria-labelledby="delete-title">
            <header className="delete-header">
                <h1 id="delete-title">{t("deleteaccount_001")}</h1>
                <p>
                    {t("deleteaccount_002")}
                    <Link to="/privacy">{t("deleteaccount_003")}</Link>
                    {t("deleteaccount_004")}
                    <Link to="/terms">{t("deleteaccount_005")}</Link>{" "}
                    {t("deleteaccount_013")}
                </p>
            </header>

            <form
                className="delete-form"
                onSubmit={openModal}
                noValidate
                dir={isArabic ? "rtl" : "ltr"}
            >
                <div className="field">
                    <label htmlFor="phone">{t("deleteaccount_006")}</label>
                    <input
                        id="phone"
                        className="input"
                        inputMode="tel"
                        dir="ltr"
                        placeholder="+963XXXXXXXXX"
                        value={phone}
                        onChange={handlePhoneChange}
                        onPaste={handlePaste}
                        onKeyDown={guardPrefixKeydown}
                        onBlur={() => setTouched(true)}
                        maxLength={PREFIX_LEN + 9}
                    />
                    <div id="phone-hint" className="hint">
                        {t("deleteaccount_007")}
                    </div>
                    {touched && !isPhoneValid && (
                        <div id="phone-error" className="error" role="alert">
                            {t("deleteaccount_008")}
                        </div>
                    )}
                </div>

                <label className="agree">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span>
                        {t("deleteaccount_009")}
                        <strong>{t("deleteaccount_010")}</strong>.
                    </span>
                </label>

                <div className="captcha">
                    <ReCAPTCHA
                        sitekey={SITE_KEY}
                        onChange={(token) => setCaptchaOk(!!token)}
                        onExpired={() => setCaptchaOk(false)}
                        onError={() => setCaptchaOk(false)}
                    />
                </div>

                <button type="submit" className="btn btn-danger" disabled={!canProceed}>
                    {t("deleteaccount_011")}
                </button>
            </form>

            {showModal && (
                <div
                    className="modal-backdrop"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setShowModal(false)}
                >
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2 id="modal-title">{t("deleteaccount_012")}</h2>
                        <p>{t("deleteaccount_013")}</p>

                        <div className="modal-actions">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                                {t("deleteaccount_014")}
                            </button>
                            <button className="btn btn-danger" onClick={handleConfirm}>
                                {t("deleteaccount_015")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <BackHomeButton />
            <WhatsAppButton />
        </section>
    );
}
