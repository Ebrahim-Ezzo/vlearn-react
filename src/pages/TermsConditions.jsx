import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import WhatsAppButton from "../components/WhatsAppButton";
import DOMPurify from "dompurify";
import "./TermsConditions.css";

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
                    .filter((s) => s && !/^mso-/i.test(s))
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
    if (/(<(p|br|h\d|ul|ol|li|div)\b)/i.test(s)) return s; // فيه HTML
    const blocks = s.split(/\n{2,}/).map(x => x.trim()).filter(Boolean);
    if (blocks.length > 1) return `<p>${blocks.join("</p><p>")}</p>`;
    return s.replace(/\n/g, "<br>");
}

export default function TermsConditions() {
    const { t, i18n } = useTranslation();
    const [status, setStatus] = useState("loading"); // loading | api | local
    const [html, setHtml] = useState("");
    const [err, setErr] = useState("");

    useEffect(() => { document.title = t("termsconditions_051"); }, [t]);

    useEffect(() => {
        let aborted = false;
        const controller = new AbortController();

        (async () => {
            setStatus("loading");
            setErr("");
            try {
                const res = await api.get("/api/terms", { signal: controller.signal });
                const data = res?.data?.data || {};
                const pickAr = i18n.language?.startsWith("ar");
                const raw = pickAr
                    ? (data.terms_ar || data.terms_en || data.terms || "")
                    : (data.terms_en || data.terms_ar || data.terms || "");

                let cleaned = cleanWordHtml(String(raw || ""));
                if (!cleaned) cleaned = "";
                cleaned = ensureParagraphsIfPlain(cleaned);

                if (aborted) return;
                if (cleaned) {
                    const safe = DOMPurify.sanitize(cleaned);
                    setHtml(safe);
                    setStatus("api");
                } else {
                    setStatus("local");
                }
            } catch (e) {
                if (aborted) return;
                setErr(e?.message || "Request failed");
                setStatus("local");
            }
        })();

        return () => { aborted = true; controller.abort(); };
    }, [i18n.language]);

    const isAr = i18n.language?.startsWith("ar");
    const dir = isAr ? "rtl" : "ltr";

    return (
        <main className="terms-page" dir={dir} aria-labelledby="terms-title">
            {status === "loading" && (
                <section className="terms-content"><div className="skeleton" /></section>
            )}

            {status === "api" && (
                <section className="terms-content">
                    <div
                        className={`policy-html ${isAr ? "rtl" : "ltr"}`}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </section>
            )}

            {status === "local" && (
                <section className="terms-content">
                    {err && <div style={{ color: "#b00", marginBottom: 8 }}>Offline fallback • {String(err)}</div>}
                    <header className="terms-header">
                        <h1 id="terms-title">{t("termsconditions_001")}</h1>
                        <div className="meta">{t("termsconditions_002")}</div>
                        <p>{t("termsconditions_003")}</p>
                        <p>{t("termsconditions_004")}</p>
                    </header>
                    <article className="terms-content">
                        <h2>{t("termsconditions_005")}</h2>
                        <p>{t("termsconditions_006")}</p>
                    </article>
                </section>
            )}
            <WhatsAppButton />
        </main>
    );
}
