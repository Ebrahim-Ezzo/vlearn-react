import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import MinimalTopBar from "../components/MinimalTopBar";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = t("privacy_001");
    }, [t]);

    return (
        <>
            <MinimalTopBar />
            <main className="privacy-page">
                <header className="privacy-header">
                    <h1>{t("privacy_001")}</h1>
                    <div className="meta">{t("privacy_002")}</div>
                </header>

                <section className="privacy-content">
                    <p>{t("privacy_003")}</p>
                    <p>
                        {t("privacy_004")} <strong>{t("privacy_005")}</strong>
                    </p>
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
            </main>
        </>
    );
}
