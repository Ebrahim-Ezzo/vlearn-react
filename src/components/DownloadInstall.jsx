// src/components/DownloadInstall.jsx
import "../styles/downloadInstall.css";
import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function DownloadInstall() {
    return (
        <section id="downloads" className="dl">
            <div className="dl_container">
                {/* النص + الأزرار */}
                <div className="dl_text">
                    <h2 className="dl_title">التنزيل والتثبيت السريع</h2>
                    <p className="dl_lead">
                        نزّل التطبيق وابدأ مباشرة بخطوات بسيطة لتفعل حسابك وتتصفح الدروس وتختار
                        اشتراكك المناسب
                    </p>

                    <ul className="dl_steps">
                        <li>نزل التطبيق من المتجر</li>
                        <li>
                            سجل برقم هاتفك وأدخل رقم التفعيل
                        </li>
                        <li>
                            اختر فرعك واشترك بالمادة اوالباقة المناسبة
                        </li>
                        <li>
                            ابدأ التعلم وجرب الإختبارات اليومية
                        </li>
                    </ul>

                    <div className="dl_cta">
                        <a
                            href=""
                            className="store_btn play"
                        >
                            <FaGooglePlay aria-hidden="true" />
                            <span>Google Play</span>
                        </a>
                        <a
                            href=""
                            className="store_btn ios"
                        >
                            <FaApple aria-hidden="true" />
                            <span>App Store</span>
                        </a>
                    </div>
                </div>
                <div className="dl_visual">
                    <div className="phone_frame">
                        <img
                            src="/assets/screens/install.jpg"
                            alt="شاشة من تطبيق VLearn"
                            loading="lazy"
                        />
                    </div>
                    <span className="blob blob-a" aria-hidden="true"></span>
                    <span className="blob blob-b" aria-hidden="true"></span>
                </div>
            </div>
        </section>
    );
}
