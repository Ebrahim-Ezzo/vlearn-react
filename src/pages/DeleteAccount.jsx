import { useTranslation } from "react-i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./DeleteAccount.css";
import MinimalTopBar from "../components/MinimalTopBar";

export default function DeleteAccount() {
    // const { t } = useTranslation();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language.startsWith("ar");

    const [phone, setPhone] = useState("");
    const [agree, setAgree] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [touched, setTouched] = useState(false);
    const [human, setHuman] = useState(false); // ✅ verify human


    useEffect(() => {
        document.title = t("deleteaccount_016");
    }, []);

    const phoneRegex = useMemo(() => /^(?:\+\d{9,12}|0\d{9,12})$/, []);
    const isPhoneValid = phoneRegex.test(phone.trim());
    const canProceed = isPhoneValid && agree && human; // ✅ لازم كمان يتحقق "human"

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
        <>
            <MinimalTopBar />

            <section className="delete-page" aria-labelledby="delete-title">
                <header className="delete-header">
                    <h1 id="delete-title">{t('deleteaccount_001')}</h1>
                    <p>{t('deleteaccount_002')}<Link to="/privacy">{t('deleteaccount_003')}</Link>{t('deleteaccount_004')}<Link to="/terms">{t('deleteaccount_005')}</Link> {t('deleteaccount_013')}
                    </p>
                </header>

                {/* <form className="delete-form" onSubmit={openModal} noValidate> */}
                <form
                    className="delete-form"
                    onSubmit={openModal}
                    noValidate
                    dir={isArabic ? "rtl" : "ltr"}   // 👈 يغير الاتجاه حسب اللغة
                >
                    <div className="field">
                        <label htmlFor="phone">{t('deleteaccount_006')}</label>
                        <input
                            id="phone"
                            className="input"
                            inputMode="tel"
                            dir="ltr"
                            placeholder="+963xxxxxxxxx"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => setTouched(true)}
                            aria-describedby="phone-hint phone-error"
                            maxLength={13}

                        />
                        <div id="phone-hint" className="hint">{t('deleteaccount_007')}</div>
                        {touched && !isPhoneValid && (
                            <div id="phone-error" className="error" role="alert">{t('deleteaccount_008')}</div>
                        )}
                    </div>

                    <label className="agree">
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        <span>{t('deleteaccount_009')}<strong>{t('deleteaccount_010')}</strong>.
                        </span>
                    </label>
                    {/* v */}

                    <label className="verify">
                        <input
                            type="checkbox"
                            checked={human}
                            onChange={(e) => setHuman(e.target.checked)}
                            aria-describedby="verify-hint"
                        />
                        <span>{t('deleteaccount_human')}</span>
                    </label>
                    <div id="verify-hint" className="hint">
                        {t('deleteaccount_human_hint')}
                    </div>


                    {/*  */}
                    <button
                        type="submit"
                        className="btn btn-danger"
                        disabled={!canProceed}
                    >{t('deleteaccount_011')}</button>
                </form>

                {showModal && (
                    <div
                        className="modal-backdrop"
                        role="dialog"
                        aria-modal="true"
                        onClick={() => setShowModal(false)}
                    >
                        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                            <h2 id="modal-title">{t('deleteaccount_012')}</h2>
                            <p>{t('deleteaccount_013')}</p>

                            <div className="modal-actions">
                                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>{t('deleteaccount_014')}</button>
                                <button className="btn btn-danger" onClick={handleConfirm}>{t('deleteaccount_015')}</button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>

    );
}