// src/pages/PrivacyPolicy.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import { api } from "../lib/api";
import WhatsAppButton from "../components/WhatsAppButton";
import "./PrivacyPolicy.css";

const REQ_TIMEOUT_MS = 15000;

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

function cleanWordHtml(raw) {
    if (!raw) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div id="root">${raw}</div>`, "text/html");
    const root = doc.getElementById("root");

    const walker = doc.createTreeWalker(root, NodeFilter.SHOW_COMMENT, null);
    const comments = [];
    while (walker.nextNode()) comments.push(walker.currentNode);
    comments.forEach((n) => n.remove());

    root.querySelectorAll("o\\:p").forEach((n) => n.remove());

    root.querySelectorAll("*").forEach((el) => {
        if (el.hasAttribute("style")) {
            const style = el.getAttribute("style") || "";
            const cleaned =
                style
                    .split(";")
                    .map((s) => s.trim())
                    .filter((s) => s && !/^mso-/i.test(s)) // احذف mso-*
                    .join("; ") || "";
            if (cleaned) el.setAttribute("style", cleaned);
            else el.removeAttribute("style");
        }
        if (el.className && /(^|\s)Mso/i.test(el.className)) el.removeAttribute("class");
        if (el.hasAttribute("align")) el.removeAttribute("align");

        if (el.tagName === "SPAN" && (el.textContent || "").replace(/\u00A0/g, " ").trim() === "") {
            el.remove();
        }
    });

    (function fixText(node) {
        node.childNodes.forEach((child) => {
            if (child.nodeType === 3) {
                let t = child.nodeValue || "";
                t = t.replace(/\u00A0|&nbsp;|&#160;/g, " ");
                t = t.replace(/ {2,}/g, " ");
                t = t.replace(/\s*-\s*/g, " - ");
                child.nodeValue = t;
            } else {
                fixText(child);
            }
        });
    })(root);

    root.querySelectorAll("p,h1,h2,h3,h4,h5,h6").forEach((el) => {
        if ((el.textContent || "").trim() === "") el.remove();
    });

    root.querySelectorAll("[style*='text-indent']").forEach((el) => {
        el.style.textIndent = "0";
    });

    return (root.innerHTML || "").trim();
}

function ensureParagraphsIfPlain(s) {
    if (!s) return "";
    if (/(<(p|br|h\d|ul|ol|li|div)\b)/i.test(s)) return s;
    const blocks = s.split(/\n{2,}/).map(x => x.trim()).filter(Boolean);
    if (blocks.length > 1) return `<p>${blocks.join("</p><p>")}</p>`;
    return s.replace(/\n/g, "<br>");
}

function pickHtml(data, langIsAr) {
    const d = data?.data || {};
    if (langIsAr) {
        return String(d.privacy_policy_ar || d.privacy_policy_en || "").trim();
    }
    return String(d.privacy_policy_en || d.privacy_policy_ar || "").trim();
}

export default function PrivacyPolicy() {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language?.startsWith("ar");
    const dir = isAr ? "rtl" : "ltr";

    const [status, setStatus] = useState("loading"); // loading | success | error
    const [html, setHtml] = useState("");
    const [error, setError] = useState(null); // { type, status?, details? }

    useEffect(() => { document.title = t("privacy_001"); }, [t]);

    const fetchPolicy = useCallback(async (signal) => {
        setStatus("loading");
        setError(null);
        try {
            const res = await api.get("/api/privacy_policy", {
                timeout: REQ_TIMEOUT_MS,
                signal,
                validateStatus: (s) => s >= 200 && s < 300,
            });

            // تنظيف + تعقيم
            const raw = pickHtml(res.data, isAr);
            let cleaned = cleanWordHtml(raw);
            cleaned = ensureParagraphsIfPlain(cleaned);
            const safe = DOMPurify.sanitize(cleaned);

            if (!safe) {
                setStatus("error");
                setError({ type: "empty" });
                return;
            }
            setHtml(safe);
            setStatus("success");
        } catch (e) {
            if (signal?.aborted) return;
            const cls = classifyAxiosError(e);
            const serverMsg = e?.response?.data?.message || e?.message || "";
            const reqId = e?.response?.headers?.["x-request-id"];
            setError({ ...cls, details: serverMsg, reqId });
            setStatus("error");
        }
    }, [isAr]);

    useEffect(() => {
        const ac = new AbortController();
        fetchPolicy(ac.signal);
        return () => ac.abort();
    }, [fetchPolicy, i18n.language]);

    const errorMsg = useMemo(() => {
        if (!error) return "";
        switch (error.type) {
            case "timeout": return t("privacy_err_timeout", "انتهت مهلة الاتصال. يرجى المحاولة لاحقًا");
            case "offline": return t("privacy_err_offline", "يبدو أنك غير متصل بالإنترنت");
            case "network": return t("privacy_err_network", "تعذّر الوصول للخادم (Network/CORS)");
            case "server": return t("privacy_err_server", `خطأ خادوم (HTTP ${error.status ?? ""})`);
            case "auth": return t("privacy_err_auth", `غير مصرّح (HTTP ${error.status ?? ""})`);
            case "not_found": return t("privacy_err_not_found", "المحتوى غير موجود 404");
            case "bad_request": return t("privacy_err_bad_request", `طلب غير صحيح (HTTP ${error.status ?? ""})`);
            case "empty": return t("privacy_err_empty", "المحتوى غير متاح الآن");
            default: return t("privacy_err_unknown", "حدث خطأ غير معروف");
        }
    }, [error, t]);

    return (
        <main className="privacy-page" dir={dir}>
            {status === "loading" && (
                <section className="privacy-content">
                    <div className="skeleton" />
                </section>
            )}

            {status === "success" && (
                <section className="privacy-content">
                    <div
                        className={`policy-html ${isAr ? "rtl" : "ltr"}`}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </section>
            )}

            {status === "error" && (
                <section className="privacy-content is-error">
                    <div className="alert error compact" role="alert" aria-live="polite">
                        <p className="title">{errorMsg}</p>
                        {error?.details && <small className="muted">{String(error.details)}</small>}
                        {error?.reqId && <small className="muted">Request-ID: {error.reqId}</small>}
                        <button
                            className="btn-primary"
                            onClick={() => {
                                const ac = new AbortController();
                                fetchPolicy(ac.signal);
                            }}
                        >
                            {t("retry", "إعادة المحاولة")}
                        </button>
                    </div>
                </section>
            )}

            <WhatsAppButton />
        </main>
    );
}
