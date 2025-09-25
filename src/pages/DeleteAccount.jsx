import { useTranslation } from "react-i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./DeleteAccount.css";
import BackHomeButton from "./BackHomeButton";

// 🔑 إذا عندك إنفايرونمنت فاريابل رح يُستعمل تلقائيًا.
// إذا ما عندك، حط المفتاح مكان النص بين علامتَي التنصيص.
const SITE_KEY =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY || "PASTE_YOUR_SITE_KEY_HERE";

export default function DeleteAccount() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language.startsWith("ar");

    const [phone, setPhone] = useState("09");
    const [agree, setAgree] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [touched, setTouched] = useState(false);
    const [captchaOk, setCaptchaOk] = useState(false); // ✅ نتيجة الكابتشا

    useEffect(() => {
        document.title = t("deleteaccount_016");
    }, [t]);

    const phoneRegex = useMemo(() => /^(?:\+\d{9,12}|0\d{9,12})$/, []);
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
                        placeholder=""
                        value={phone}
                        onChange={(e) => {
                            let val = e.target.value;

                            // ثبّت "09" بالبداية
                            if (!val.startsWith("09")) {
                                val = "09" + val.replace(/^0+/, "");
                            }
                            // أرقام فقط
                            val = val.replace(/[^\d]/g, "");
                            // اسمح بثماني أرقام فقط بعد "09" (إجمالي 10)
                            if (val.length > 10) {
                                val = val.slice(0, 10);
                            }

                            setPhone(val);
                        }}
                        onBlur={() => setTouched(true)}
                        aria-describedby="phone-hint phone-error"
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

                {/* ✅ reCAPTCHA */}
                <div className="captcha">
                    <ReCAPTCHA
                        sitekey="6LeaxtQrAAAAAG_PiEPGK168eT5ZOl57h5yug1C-" // ← حط المفتاح مكان "PASTE_YOUR_SITE_KEY_HERE" إذا بدك تدخله يدويًا
                        onChange={(token) => setCaptchaOk(!!token)}
                        onExpired={() => setCaptchaOk(false)}
                        onError={() => setCaptchaOk(false)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={!canProceed}
                >
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
        </section>
    );
}
