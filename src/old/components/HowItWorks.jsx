import "../styles/howItWorks.css";
import {
    FiUserPlus,
    FiLayers,
    FiCheckCircle,
    FiCreditCard,
    FiClipboard,
    FiPercent,
} from "react-icons/fi";

export default function HowItWorks() {
    return (
        <section id="how" className="howitworks">
            <div className="howitworks_container">
                <header className="howitworks_header">
                    <h2 className="howitworks_title">كيف يعمل التطبيق</h2>
                    <p className="howitworks_lead">
                        VLearn خطوات بسيطة لتبدأ رحلتك التعليمية مع
                    </p>
                </header>

                <ul className="howitworks_steps">
                    <li className="step">
                        <span className="step_icon" aria-hidden="true">
                            <FiUserPlus />
                        </span>
                        <div className="step_body">
                            <h3 className="step_title">إنشاء حساب</h3>
                            <p className="step_desc">
                                .سجّل بسهولة برقم هاتفك، ثم أدخل رمز التفعيل
                            </p>
                        </div>
                    </li>

                    <li className="step">
                        <span className="step_icon" aria-hidden="true">
                            <FiLayers />
                        </span>
                        <div className="step_body">
                            <h3 className="step_title">اختيار التخصص</h3>
                            <p className="step_desc">
                                .اختر فرعك الأكاديمي، ومنخصّص لك المحتوى بحسب المواد
                            </p>
                        </div>
                    </li>

                    <li className="step">
                        <span className="step_icon" aria-hidden="true">
                            <FiCheckCircle />
                        </span>
                        <div className="step_body">
                            <h3 className="step_title">الاشتراك</h3>
                            <p className="step_desc">
                                .اشترك بالمادة المطلوبة أو اختر باقاتنا واستفد من العروض
                            </p>
                        </div>
                    </li>

                    <li className="step">
                        <span className="step_icon" aria-hidden="true">
                            <FiCreditCard />
                        </span>
                        <div className="step_body">
                            <h3 className="step_title">الدفع</h3>
                            <p className="step_desc">
                                .اختر طريقة الدفع التي تناسبك
                            </p>
                        </div>
                    </li>

                    <li className="step">
                        <span className="step_icon" aria-hidden="true">
                            <FiClipboard />
                        </span>
                        <div className="step_body">
                            <h3 className="step_title">التعلّم والاختبارات</h3>
                            <p className="step_desc">
                                .ادخل دروسك، جرّب الاختبارات، وخُذ تقييمًا فوريًا
                            </p>
                        </div>
                    </li>

                    <li className="step">
                        <span className="step_icon" aria-hidden="true">
                            <FiPercent />
                        </span>
                        <div className="step_body">
                            <h3 className="step_title">العروض والمسابقات</h3>
                            <p className="step_desc">
                                .تابع جديدنا لتحصل على خصومات وفرص إضافية
                            </p>
                        </div>
                    </li>
                </ul>

                <div className="howitworks_cta">
                    <a href="#downloads" className="howitworks_link">
                        ابدأ الآن ↘
                    </a>
                </div>
            </div>
        </section>
    );
}
