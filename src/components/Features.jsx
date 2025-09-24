import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
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
    const [idx, setIdx] = useState(0);
    const n = cards.length;

    const startX = useRef(0), dx = useRef(0);
    const onTouchStart = (e) => { startX.current = e.touches[0].clientX; dx.current = 0; };
    const onTouchMove = (e) => { dx.current = e.touches[0].clientX - startX.current; };
    const onTouchEnd = () => {
        if (Math.abs(dx.current) > 50) setIdx(p => (dx.current < 0 ? (p + 1) % n : (p - 1 + n) % n));
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
                            style={{ transform: `translate3d(-${idx * 100}%, 0, 0)` }}

                        >
                            {cards.map((c, i) => (
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
                                className={`dot ${idx === i ? "is-active" : ""}`}
                                onClick={() => setIdx(i)}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}