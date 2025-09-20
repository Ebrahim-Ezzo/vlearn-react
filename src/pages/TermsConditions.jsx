import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import MinimalTopBar from "../components/MinimalTopBar";
import "./TermsConditions.css";

export default function TermsConditions() {
    const { t } = useTranslation();
    useEffect(() => { document.title=t("termsconditions_051"); }, []);

    return (
        <>
            <MinimalTopBar />
            <main className="terms-page" aria-labelledby="terms-title">
                <header className="terms-header">
                    <h1 id="terms-title">{t('termsconditions_001')}</h1>
                    <div className="meta">{t('termsconditions_002')}</div>
                    <p>{t('termsconditions_003')}<strong>{t('termsconditions_004')}</strong> — هذه الصفحة تتضمن الشروط والأحكام الخاصة
                        باستخدام خدمات المنصة والاستفادة من الدورات المقدمة من مقدمي الخدمة.
                        يرجى قراءة هذه الشروط بعناية قبل تفعيل حسابك. لأي استفسار، تواصل معنا على الرقم
                        <strong> 0994080104</strong>{t('termsconditions_005')}</p>
                    <p>{t('termsconditions_006')}<strong>{t('termsconditions_007')}</strong>. عند إنشاء حسابك الخاص على المنصة فإنك تؤكد أنك تقبل بهذه الشروط والأحكام.
                    </p>
                </header>

                <article className="terms-content">
                    <h2>1) تعريف بالتطبيق وطريقة عمله</h2>
                    <p>
                        t("termsconditions_052") هي منصة إلكترونية توفر مجموعة من دورات التدريب والتقوية بالإضافة إلى
                        الاختبارات المؤتمتة والمولدة من بنك أسئلة وذلك فيما يختص بالمنهاج المعتمد في التعليم
                        الأساسي والثانوي. وهي صلة ربط بين مقدمي الخدمة (المدرسين المختصين أصحاب المحتوى ضمن التطبيق)
                        وبين المستخدمين (طلاب التعليم الأساسي والثانوي) ممن يبحثون عن دورات إعداد وتقوية وإجراء اختبارات.
                        تتيح المنصة اشتراكات متعددة للمستخدمين وإمكانيات الدفع الإلكتروني وتوفر عروضاً ترويجية.
                    </p>

                    <h2>2) الجهة المسؤولة عن التطبيق</h2>
                    <p>{t('termsconditions_008')}</p>

                    <h2>3) الفئات المستهدفة</h2>
                    <ul>
                        <li>{t('termsconditions_009')}</li>
                        <li>{t('termsconditions_010')}</li>
                    </ul>

                    <h2>4) مكونات المنصة</h2>
                    <ul>
                        <li>{t('termsconditions_011')}<em>Dashboard</em>{t('termsconditions_012')}</li>
                        <li>{t('termsconditions_013')}</li>
                        <li>{t('termsconditions_014')}</li>
                    </ul>

                    <h2>5) هيكلية التطبيق</h2>
                    <ul>
                        <li>
                            <strong>{t('termsconditions_015')}</strong>{t('termsconditions_016')}</li>
                        <li>
                            <strong>{t('termsconditions_017')}</strong>{t('termsconditions_018')}</li>
                        <li>
                            <strong>{t('termsconditions_019')}</strong>{t('termsconditions_020')}</li>
                        <li>
                            <strong>{t('termsconditions_021')}</strong>{t('termsconditions_022')}</li>
                    </ul>

                    <h2>6) خدمات التطبيق</h2>
                    <p>{t('termsconditions_023')}</p>

                    <h2>7) حساب المستخدم على المنصة</h2>
                    <ul>
                        <li>{t('termsconditions_024')}</li>
                        <li>{t('termsconditions_025')}</li>
                        <li>{t('termsconditions_026')}</li>
                        <li>{t('termsconditions_027')}</li>
                        <li>{t('termsconditions_028')}</li>
                    </ul>

                    <h2>8) آلية تقديم الخدمة</h2>
                    <p><strong>{t('termsconditions_029')}</strong></p>
                    <ul>
                        <li>{t('termsconditions_030')}</li>
                        <li>{t('termsconditions_031')}</li>
                        <li>{t('termsconditions_032')}</li>
                    </ul>
                    <p><strong>{t('termsconditions_033')}</strong></p>
                    <ul>
                        <li>{t('termsconditions_034')}</li>
                        <li>{t('termsconditions_035')}</li>
                        <li>{t('termsconditions_036')}</li>
                    </ul>

                    <h2>9) الاشتراكات</h2>
                    <ul>
                        <li>{t('termsconditions_037')}</li>
                        <li>{t('termsconditions_038')}</li>
                        <li>{t('termsconditions_039')}</li>
                        <li>{t('termsconditions_040')}</li>
                        <li>{t('termsconditions_041')}</li>
                        <li>{t('termsconditions_042')}</li>
                    </ul>

                    <h2>10) دفع الاشتراكات</h2>
                    <ul>
                        <li>{t('termsconditions_043')}</li>
                        <li>{t('termsconditions_044')}</li>
                        <li>{t('termsconditions_045')}</li>
                        <li>{t('termsconditions_046')}</li>
                    </ul>

                    <h2>11) منصة VLearn ديناميكية</h2>
                    <ul>
                        <li>{t('termsconditions_047')}</li>
                        <li>{t('termsconditions_048')}</li>
                    </ul>

                    <h2>12) الشكاوى والمقترحات</h2>
                    <p>{t('termsconditions_049')}</p>

                    <h2>13) التعديلات</h2>
                    <p>{t('termsconditions_050')}</p>
                </article>
            </main>
        </>
    );
}