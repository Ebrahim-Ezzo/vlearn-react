import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import WhatsAppButton from "../components/WhatsAppButton";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
    const { t, i18n } = useTranslation();
    const [html, setHtml] = useState("");
    const [source, setSource] = useState("loading"); // "api" | "local" | "loading"
    const [err, setErr] = useState("");

    useEffect(() => { document.title = t("privacy_001"); }, [t]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setErr("");
                setSource("loading");
                const res = await api.get("/api/privacy_policy");
                const data = res?.data?.data || {};
                const pickAr = i18n.language?.startsWith("ar");
                const raw = pickAr
                    ? (data.privacy_policy_ar || data.privacy_policy_en || "")
                    : (data.privacy_policy_en || data.privacy_policy_ar || "");
                const cleaned = String(raw || "").trim();

                if (mounted) {
                    if (cleaned.length > 0) {
                        setHtml(cleaned);
                        setSource("api");
                    } else {
                        setSource("local");
                    }
                }
            } catch (e) {
                if (mounted) {
                    setErr(e?.message || "Request failed");
                    setSource("local");
                }
            }
        })();
        return () => { mounted = false; };
    }, [i18n.language]);

    const dir = i18n.language?.startsWith("ar") ? "rtl" : "ltr";

    return (
        <main className="privacy-page" dir={dir}>
            {source === "api" ? (
                <section className="privacy-content">
                    <div className="policy-html" dangerouslySetInnerHTML={{ __html: html }} />
                </section>
            ) : (
                <section className="privacy-content">
                    {err && <div style={{ color: "#b00", marginBottom: 8 }}>Offline fallback • {String(err)}</div>}

                    <header className="privacy-header">
                        <h1>{t("privacy_001")}</h1>
                        <div className="meta">{t("privacy_002")}</div>
                    </header>

                    <p>{t("privacy_003")}</p>
                    <p>{t("privacy_004")} <strong>{t("privacy_005")}</strong></p>
                    <p>{t("privacy_006")}</p>
                    <p>{t("privacy_007")}</p>

                    <h2>{t("privacy_008")}</h2>
                    <ul>
                        <li>{t("privacy_009")}</li>
                        <li>{t("privacy_010")}</li>
                        <li>{t("privacy_011")}</li>
                    </ul>

                    <h2>{t("privacy_012")}</h2>
                    <p>{t("privacy_013")}</p>
                    <p>{t("privacy_014")}</p>

                    <h2>{t("privacy_015")}</h2>
                    <p>{t("privacy_016")}</p>

                    <h2>{t("privacy_017")}</h2>
                    <ul>
                        <li>{t("privacy_018")}</li>
                        <li>{t("privacy_019")}</li>
                        <li>{t("privacy_020")}</li>
                        <li>{t("privacy_021")}</li>
                    </ul>

                    <h2>{t("privacy_022")}</h2>
                    <p>{t("privacy_023")}</p>
                </section>
            )}

            <WhatsAppButton />
        </main>
    );
}
