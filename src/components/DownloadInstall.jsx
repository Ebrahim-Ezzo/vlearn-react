import { useTranslation } from "react-i18next";
// src/components/DownloadInstall.jsx
import "../styles/downloadInstall.css";
import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function DownloadInstall() {
    const { t } = useTranslation();
    return (
        <section id="downloads" className="dl">
            <div className="dl_container">
                <div className="dl_text">
                    <h2 className="dl_title">{t('downloadinstall_001')}</h2>
                    <p className="dl_lead">{t('downloadinstall_002')}</p>

                    <ul className="dl_steps">
                        <li>{t('downloadinstall_003')}</li>
                        <li>{t('downloadinstall_004')}</li>
                        <li>{t('downloadinstall_005')}</li>
                        <li>{t('downloadinstall_006')}</li>
                    </ul>

                    <div className="dl_cta">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.vroad.vlearn"
                            className="store_btn play"
                        >
                            <FaGooglePlay aria-hidden="true" />
                            <span>Google Play</span>
                        </a>
                        <a
                            href="https://apps.apple.com/au/app/vlearn/id6737718962"
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
                            alt={t("downloadinstall_007")}
                            loading="lazy"
                        />
                    </div>
                    {/* <span className="blob blob-a" aria-hidden="true"></span> */}
                    {/* <span className="blob blob-b" aria-hidden="true"></span> */}
                </div>
            </div>
        </section>
    );
}