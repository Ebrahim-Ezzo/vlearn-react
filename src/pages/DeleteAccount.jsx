import { useTranslation } from "react-i18next";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./DeleteAccount.css";
import WhatsAppButton from "../components/WhatsAppButton";
import { api } from "../lib/api";

const SITE_KEY =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeaxtQrAAAAAG_PiEPGK168eT5ZOl57h5yug1C-";

const DELETE_ACCOUNT_PATH = "/delete-account-requests";

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

function classifyAxiosError(err) {
    if (err?.code === "ECONNABORTED") return { type: "timeout" };
    if (err?.response) {
        const s = err.response.status;
        if (s === 404) return { type: "not_found", status: s };
        if (s === 401 || s === 403) return { type: "auth", status: s };
        if (s >= 500) return { type: "server", status: s };
        return { type: "bad_request", status: s };
    }
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
        return { type: "offline" };
    }
    return { type: "network" };
}

function interpretDeleteApiResponse(res) {
    const s = res?.status;
    const d = res?.data || {};
    const raw = (d.code || d.status || d.result || d.state || "").toString().toLowerCase();

    if (s === 404 || raw === "no_account" || raw.includes("not_found") || d.hasAccount === false) {
        return { case: "no_account", serverMsg: d.message };
    }
    if (s === 409 || raw === "duplicate" || raw.includes("already") || d.alreadyRequested === true) {
        return { case: "duplicate", serverMsg: d.message };
    }
    if ((s >= 200 && s < 300) || raw === "created" || raw.includes("accepted") || d.created === true) {
        return { case: "created", serverMsg: d.message };
    }
    return null;
}

export default function DeleteAccount() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language?.startsWith("ar");

    const [phone, setPhone] = useState(PREFIX);
    const [agree, setAgree] = useState(false);
    const [touched, setTouched] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [sending, setSending] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [apiError, setApiError] = useState(null); // { type, status?, details?, reqId? }
    const [resultCase, setResultCase] = useState(null); // "created" | "duplicate" | "no_account"
    const recaptchaRef = useRef(null);

    useEffect(() => {
        document.title = t("deleteaccount_016");
    }, [t]);

    const phoneRegex = useMemo(() => /^\+963\d{9}$/, []);
    const isPhoneValid = phoneRegex.test(phone.trim());
    const canProceed = isPhoneValid && agree && !!captchaToken;

    const openModal = (e) => {
        e.preventDefault();
        setTouched(true);
        if (!canProceed) return;
        setShowModal(true);
        setSending(false);
        setApiError(null);
        setResultCase(null);
    };

    const handleConfirm = async () => {
        setSending(true);
        setApiError(null);
        setResultCase(null);
        try {
            const payload = { phone: phone, recaptcha_token: captchaToken };
            const res = await api.post(DELETE_ACCOUNT_PATH, payload, {
                timeout: 15000,
                validateStatus: () => true, // خلّيها true لنفسّر 404/409 كمان
                headers: { "Content-Type": "application/json" },
            });
            const interpreted = interpretDeleteApiResponse(res);
            if (interpreted) {
                setResultCase(interpreted.case);
            } else {
                setApiError({ type: "unknown", details: res?.data?.message, status: res?.status });
            }
        } catch (e) {
            const cls = classifyAxiosError(e);
            const serverMsg = e?.response?.data?.message || e?.message || "";
            const reqId = e?.response?.headers?.["x-request-id"];
            setApiError({ ...cls, details: serverMsg, reqId });
        } finally {
            try { recaptchaRef.current?.reset(); } catch { }
            setCaptchaToken(null);
            setSending(false);
        }
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
            requestAnimationFrame(() => input.setSelectionRange(PREFIX_LEN, PREFIX_LEN));
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData?.getData("text") || "").trim();
        setPhone(normalizeSyPhone(pasted));
    };

    const errorMsg = (() => {
        if (!apiError) return "";
        switch (apiError.type) {
            case "timeout": return t("privacy_err_timeout", "انتهت مهلة الاتصال. يرجى المحاولة لاحقًا");
            case "offline": return t("privacy_err_offline", "يبدو أنك غير متصل بالإنترنت");
            case "network": return t("privacy_err_network", "تعذّر الوصول للخادم (Network/CORS)");
            case "server": return t("privacy_err_server", "خطأ خادوم");
            case "auth": return t("privacy_err_auth", "غير مصرّح");
            case "not_found": return t("privacy_err_not_found", "المحتوى غير موجود (404)");
            case "bad_request": return t("privacy_err_bad_request", "طلب غير صحيح");
            default: return t("privacy_err_unknown", "حدث خطأ غير معروف");
        }
    })();

    return (
        <section className="delete-page" aria-labelledby="delete-title">
            <header className="delete-header">
                <h1 id="delete-title">{t("deleteaccount_001")}</h1>
                <p>
                    {t("deleteaccount_002")}
                    <Link to="/privacy">{t("deleteaccount_003")}</Link>
                    {t("deleteaccount_004")}
                    <Link to="/terms">{t("deleteaccount_005")}</Link>{" "}
                    {t("deleteaccount_313")}
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
                        onChange={(e) => setPhone(normalizeSyPhone(e.target.value))}
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
                        ref={recaptchaRef}
                        sitekey={SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        onExpired={() => setCaptchaToken(null)}
                        onError={() => setCaptchaToken(null)}
                    />
                </div>

                {!captchaToken && touched && (
                    <div className="error" role="alert">
                        {t("delete_err_captcha", "يرجى اجتياز اختبار reCAPTCHA")}
                    </div>
                )}

                <button type="submit" className="btn btn-danger" disabled={!canProceed}>
                    {t("deleteaccount_011")}
                </button>
            </form>

            {showModal && (
                <div
                    className="modal-backdrop"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => !sending && setShowModal(false)}
                >
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2 id="modal-title">{t("deleteaccount_012")}</h2>

                        {!resultCase && !apiError && !sending && (
                            <p>{t("deleteaccount_013")}</p>
                        )}

                        {sending && (
                            <p>{t("deleting_pls_wait", "جارٍ الإرسال...")}</p>
                        )}

                        {resultCase === "created" && (
                            <div className="alert success compact" role="status" aria-live="polite">
                                <p className="title">{t("delete_case_created")}</p>
                            </div>
                        )}

                        {resultCase === "duplicate" && (
                            <div className="alert info compact" role="status" aria-live="polite">
                                <p className="title">{t("delete_case_duplicate")}</p>
                            </div>
                        )}

                        {resultCase === "no_account" && (
                            <div className="alert warning compact" role="status" aria-live="polite">
                                <p className="title">{t("delete_case_no_account")}</p>
                            </div>
                        )}

                        {apiError && (
                            <div className="alert error compact" role="alert" aria-live="polite">
                                <p className="title">{errorMsg}</p>
                                {apiError?.details && <small className="muted">{String(apiError.details)}</small>}
                                {apiError?.reqId && <small className="muted">Request-ID: {apiError.reqId}</small>}
                            </div>
                        )}

                        <div className="modal-actions">
                            {!resultCase && !sending && !apiError && (
                                <>
                                    <button
                                        className="btn btn-ghost"
                                        onClick={() => setShowModal(false)}
                                        disabled={sending}
                                    >
                                        {t("deleteaccount_014")}
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleConfirm}
                                        disabled={sending}
                                    >
                                        {t("deleteaccount_015")}
                                    </button>
                                </>
                            )}

                            {(!!resultCase || !!apiError) && (
                                <>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => setShowModal(false)}
                                    >
                                        {t("ok_got_it", "تم")}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <WhatsAppButton />
        </section>
    );
}
