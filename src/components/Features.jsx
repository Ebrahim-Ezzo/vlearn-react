import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import "../styles/features.css";

const METRICS = [
    { value: "2000+", labelKey: "features_003" },
    { value: "500+", labelKey: "features_004" },
    { value: "24/7", labelKey: "features_005" },
    { value: "98%", labelKey: "features_006" },
];

const CARDS = [
    { img: "/assets/illus/feature-1.webp", titleKey: "features_007", descKey: "features_008" },
    { img: "/assets/illus/feature-2.webp", titleKey: "features_009", descKey: "features_010" },
    { img: "/assets/illus/feature-3.webp", titleKey: "features_011", descKey: "features_012" },
    { img: "/assets/illus/feature-4.webp", titleKey: "features_013", descKey: "features_014" },
];

export default function Features() {
    const { t } = useTranslation();
    const metrics = METRICS.map(m => ({ ...m, label: t(m.labelKey) }));
    const cards = CARDS.map(c => ({ ...c, title: t(c.titleKey), desc: t(c.descKey) }));

    // --- إعدادات السلايدر ---
    const n = cards.length;
    // مصفوفة ممتدة: [آخر] + الأصلية + [أول]
    const extended = [cards[n - 1], ...cards, cards[0]];

    // vIdx يبدأ من 1 = أول سلايد حقيقي ضمن extended
    const [vIdx, setVIdx] = useState(1);
    const [anim, setAnim] = useState(true); // تحكم بالtransition
    const realIdx = (vIdx - 1 + n) % n;     // لمزامنة الدوتس

    // --- أوتو بلاي كل 2 ثانية ---
    useEffect(() => {
        const id = setInterval(() => setVIdx(p => p + 1), 2000);
        return () => clearInterval(id);
    }, [n]);

    // --- سوايب موبايل ---
    const startX = useRef(0), dx = useRef(0);
    const onTouchStart = (e) => { startX.current = e.touches[0].clientX; dx.current = 0; };
    const onTouchMove = (e) => { dx.current = e.touches[0].clientX - startX.current; };
    const onTouchEnd = () => {
        if (Math.abs(dx.current) > 50) setVIdx(p => p + (dx.current < 0 ? 1 : -1));
    };

    // --- قفزة بدون أنيميشن عند الوصول للـclones ---
    const jumpWithoutAnim = (to) => {
        // عطّل الترانزيشن، غيّر الموضع مباشرة، رجّع الترانزيشن بعد فريمين (double RAF)
        setAnim(false);
        setVIdx(to);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setAnim(true));
        });
    };

    // --- نحصر transitionend على التراك فقط ووقت وجود transition فعّال ---
    const onTransitionEnd = (e) => {
        if (e.target !== e.currentTarget) return; // تجاهل أحداث من عناصر الأبناء (صور..)
        if (!anim) return;                        // لو الترانزيشن مطفي، ما نعمل شي

        if (vIdx === 0) {
            // قبل أول حقيقي (clone الأخير) → اقفز لآخر حقيقي
            jumpWithoutAnim(n);
        } else if (vIdx === n + 1) {
            // بعد آخر حقيقي (clone الأول) → اقفز لأول حقيقي
            jumpWithoutAnim(1);
        }
    };

    return (
        <section id="features" className="features">
            <div className="features_container">

                <header className="features_header">
                    <h2 className="features_title">{t('features_001')}</h2>
                    <p className="features_lead">{t('features_002')}</p>
                </header>

                {/* Metrics */}
                <ul className="metrics" role="list">
                    {metrics.map((m, i) => (
                        <li key={i} className="metric_item">
                            <div className="metric_value">{m.value}</div>
                            <div className="metric_label">{m.label}</div>
                        </li>
                    ))}
                </ul>

                {/* Carousel */}
                <div className="feat_carousel">
                    <div
                        className="feat_viewport"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <ul
                            className="feat_track"
                            onTransitionEnd={onTransitionEnd}
                            style={{
                                transform: `translate3d(-${vIdx * 100}%, 0, 0)`,
                                transition: anim ? "transform 0.4s ease" : "none",
                            }}
                        >
                            {extended.map((c, i) => (
                                <li key={i} className="feat_slide">
                                    <div className="card">
                                        <div className="card_media">
                                            <img src={c.img} alt="" loading="lazy" aria-hidden="true" />
                                        </div>
                                        <h3 className="card_title">{c.title}</h3>
                                        <p className="card_desc">{c.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="feat_dots" role="tablist" aria-label={t("features_002")}>
                        {cards.map((_, i) => (
                            <button
                                key={i}
                                className={`dot ${realIdx === i ? "is-active" : ""}`}
                                onClick={() => setVIdx(i + 1)} // +1 لأننا ضمن extended
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
