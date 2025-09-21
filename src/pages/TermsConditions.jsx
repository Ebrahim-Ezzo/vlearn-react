import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import MinimalTopBar from "../components/MinimalTopBar";
import "./TermsConditions.css";

export default function TermsConditions() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t("termsconditions_051");
    }, [t]);

    return (
        <>
            <MinimalTopBar />
            <main className="terms-page" aria-labelledby="terms-title">
                <header className="terms-header">
                    <h1 id="terms-title">{t("termsconditions_001")}</h1>
                    <div className="meta">{t("termsconditions_002")}</div>

                    {/* المقدمة مع رقم الهاتف وكامل السطر ضمن الـ keys */}
                    <p>{t("termsconditions_003")}</p>

                    {/* فقرة: قائمة الشروط... */}
                    <p>{t("termsconditions_004")}</p>
                </header>

                <article className="terms-content">
                    {/* 1) تعريف بالتطبيق وطريقة عمله */}
                    <h2>{t("termsconditions_005")}</h2>
                    <p>{t("termsconditions_006")}</p>

                    {/* 2) الجهة المسؤولة عن التطبيق */}
                    <h2>{t("termsconditions_007")}</h2>
                    <p>{t("termsconditions_008")}</p>

                    {/* 3) الفئات المستهدفة */}
                    <h2>{t("termsconditions_009")}</h2>
                    <ul>
                        <li>{t("termsconditions_010")}</li>
                        <li>{t("termsconditions_011")}</li>
                    </ul>

                    {/* 4) مكونات المنصة */}
                    <h2>{t("termsconditions_012")}</h2>
                    <ul>
                        <li>{t("termsconditions_013")}</li>
                        <li>{t("termsconditions_014")}</li>
                        <li>{t("termsconditions_015")}</li>
                    </ul>

                    {/* 5) هيكلية التطبيق */}
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

                    {/* 6) خدمات التطبيق */}
                    <h2>{t("termsconditions_021")}</h2>
                    <p>{t("termsconditions_022")}</p>

                    {/* 7) حساب المستخدم على المنصة */}
                    <h2>{t("termsconditions_023")}</h2>
                    <ul>
                        <li>{t("termsconditions_024")}</li>
                        <li>{t("termsconditions_025")}</li>
                        <li>{t("termsconditions_026")}</li>
                        <li>{t("termsconditions_027")}</li>
                        <li>{t("termsconditions_028")}</li>
                    </ul>

                    {/* 8) آلية تقديم الخدمة */}
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

                    {/* 9) الاشتراكات */}
                    <h2>{t("termsconditions_038")}</h2>
                    <ul>
                        <li>{t("termsconditions_039")}</li>
                        <li>{t("termsconditions_040")}</li>
                        <li>{t("termsconditions_041")}</li>
                        <li>{t("termsconditions_042")}</li>
                        <li>{t("termsconditions_043")}</li>
                        <li>{t("termsconditions_044")}</li>
                    </ul>

                    {/* 10) دفع الاشتراكات */}
                    <h2>{t("termsconditions_045")}</h2>
                    <ul>
                        <li>{t("termsconditions_046")}</li>
                        <li>{t("termsconditions_047")}</li>
                        <li>{t("termsconditions_048")}</li>
                        <li>{t("termsconditions_049")}</li>
                    </ul>

                    {/* 11) منصة VLearn ديناميكية */}
                    <h2>{t("termsconditions_050")}</h2>
                    <ul>
                        <li>{t("termsconditions_051")}</li>
                        <li>{t("termsconditions_052")}</li>
                    </ul>

                    {/* 12) الشكاوى والمقترحات */}
                    <h2>{t("termsconditions_053")}</h2>
                    <p>{t("termsconditions_054")}</p>

                    {/* 13) التعديلات */}
                    <h2>{t("termsconditions_055")}</h2>
                    <p>{t("termsconditions_056")}</p>
                </article>
            </main>
        </>
    );
}
