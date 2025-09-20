import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import MinimalTopBar from "../components/MinimalTopBar";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = t("privacypolicy_019");
    }, []);

    return (
        <>
            <MinimalTopBar />
            <main className="privacy-page">
                <header className="privacy-header">
                    <h1>{t('privacypolicy_001')}</h1>
                    <div className="meta">{t('privacypolicy_002')}</div>
                </header>

                <section className="privacy-content">
                    <p>{t('privacypolicy_003')}</p>
                    <p>{t('privacypolicy_004')}<strong> 0994080102 </strong>{t('privacypolicy_005')}</p>
                    <p>{t('privacypolicy_006')}</p>
                    <p>{t('privacypolicy_007')}</p>

                    <h2>1- جمع المعلومات</h2>
                    <ul>
                        <li>{t('privacypolicy_008')}</li>
                        <li>{t('privacypolicy_009')}</li>
                        <li>{t('privacypolicy_010')}</li>
                    </ul>

                    <h2>2- معالجة المعلومات</h2>
                    <p>{t('privacypolicy_011')}</p>
                    <p>{t('privacypolicy_012')}</p>

                    <h2>3- الاحتفاظ بالمعلومات</h2>
                    <p>{t('privacypolicy_013')}</p>

                    <h2>4- الكشف عن المعلومات</h2>
                    <ul>
                        <li>{t('privacypolicy_014')}</li>
                        <li>{t('privacypolicy_015')}</li>
                        <li>{t('privacypolicy_016')}</li>
                        <li>{t('privacypolicy_017')}</li>
                    </ul>

                    <h2>5- تعديل سياسة الخصوصية</h2>
                    <p>{t('privacypolicy_018')}</p>
                </section>
            </main>
        </>
    );
}