import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/appIntro.css";

export default function AppIntro() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => e.isIntersecting && setShow(true),
            { threshold: 0.25 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section id="intro" className="appintro">
            <div className="appintro_container">
                <div className="appintro_text">
                    <h2 className="appintro_title">{t('appintro_001')}</h2>
                    <p className="appintro_para">{t('appintro_002')} <b> VLearn </b> {t('appintro_003')}</p>
                    <p className="appintro_para">{t('appintro_004')}</p>
                    <a href="#features" className="appintro_btn">{t('appintro_005')}</a>
                </div>

                <div className="appintro_visual" ref={ref}>
                    <div className={`intro_phone_frame ${show ? "is-visible" : ""}`}>
                        <img
                            src="/assets/screens/intro.jpg"
                            alt={t("appintro_006")}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}