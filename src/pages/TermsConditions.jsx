import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import BackHomeButton from "./BackHomeButton";
import "./TermsConditions.css";
import WhatsAppButton from "../components/WhatsAppButton";

export default function TermsConditions() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t("termsconditions_051");
    }, [t]);

    return (
        <>
            <main className="terms-page" aria-labelledby="terms-title">
                <header className="terms-header">
                    <h1 id="terms-title">{t("termsconditions_001")}</h1>
                    <div className="meta">{t("termsconditions_002")}</div>

                    <p>{t("termsconditions_003")}</p>

                    <p>{t("termsconditions_004")}</p>
                </header>

                <article className="terms-content">
                    <h2>{t("termsconditions_005")}</h2>
                    <p>{t("termsconditions_006")}</p>

                    <h2>{t("termsconditions_007")}</h2>
                    <p>{t("termsconditions_008")}</p>

                    <h2>{t("termsconditions_009")}</h2>
                    <ul>
                        <li>{t("termsconditions_010")}</li>
                        <li>{t("termsconditions_011")}</li>
                    </ul>

                    <h2>{t("termsconditions_012")}</h2>
                    <ul>
                        <li>{t("termsconditions_013")}</li>
                        <li>{t("termsconditions_014")}</li>
                        <li>{t("termsconditions_015")}</li>
                    </ul>

                    <h2>{t("termsconditions_016")}</h2>
                    <ul>
                        <li>
                            <strong>{t("termsconditions_017")}</strong>
                            {t("termsconditions_018")}
                        </li>
                        <li>
                            <strong>{t("termsconditions_019")}</strong>
                            {t("termsconditions_020")}
                        </li>
                        <li>
                            <strong>{t("termsconditions_021")}</strong>
                            {t("termsconditions_022")}
                        </li>
                    </ul>

                    <h2>{t("termsconditions_021")}</h2>
                    <p>{t("termsconditions_022")}</p>

                    <h2>{t("termsconditions_023")}</h2>
                    <ul>
                        <li>{t("termsconditions_024")}</li>
                        <li>{t("termsconditions_025")}</li>
                        <li>{t("termsconditions_026")}</li>
                        <li>{t("termsconditions_027")}</li>
                        <li>{t("termsconditions_028")}</li>
                    </ul>

                    <h2>{t("termsconditions_029")}</h2>
                    <p><strong>{t("termsconditions_030")}</strong></p>
                    <ul>
                        <li>{t("termsconditions_031")}</li>
                        <li>{t("termsconditions_032")}</li>
                        <li>{t("termsconditions_033")}</li>
                    </ul>
                    <p><strong>{t("termsconditions_034")}</strong></p>
                    <ul>
                        <li>{t("termsconditions_035")}</li>
                        <li>{t("termsconditions_036")}</li>
                        <li>{t("termsconditions_037")}</li>
                    </ul>

                    <h2>{t("termsconditions_038")}</h2>
                    <ul>
                        <li>{t("termsconditions_039")}</li>
                        <li>{t("termsconditions_040")}</li>
                        <li>{t("termsconditions_041")}</li>
                        <li>{t("termsconditions_042")}</li>
                        <li>{t("termsconditions_043")}</li>
                        <li>{t("termsconditions_044")}</li>
                    </ul>

                    <h2>{t("termsconditions_045")}</h2>
                    <ul>
                        <li>{t("termsconditions_046")}</li>
                        <li>{t("termsconditions_047")}</li>
                        <li>{t("termsconditions_048")}</li>
                        <li>{t("termsconditions_049")}</li>
                    </ul>

                    <h2>{t("termsconditions_050")}</h2>
                    <ul>
                        <li>{t("termsconditions_051")}</li>
                        <li>{t("termsconditions_052")}</li>
                    </ul>

                    <h2>{t("termsconditions_053")}</h2>
                    <p>{t("termsconditions_054")}</p>
                    <h2>{t("termsconditions_055")}</h2>
                    <p>{t("termsconditions_056")}</p>
                </article>
                {/* <BackHomeButton /> */}
                <WhatsAppButton />
            </main>
        </>
    );
}
