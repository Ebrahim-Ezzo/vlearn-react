import { useState, useRef } from "react";
import "../styles/features.css";

const METRICS = [
    { value: "2000+", label: "درس" },
    { value: "500+", label: "معلّم" },
    { value: "24/7", label: "دعم" },
    { value: "98%", label: "رضا المستخدمين" },
];

const CARDS = [
    { img: "/assets/illus/feature-1.webp", title: "خطط دراسة ذكية", desc: ".تنظيم تلقائي للدروس مع تذكيرات ومتابعة تقدّمك" },
    { img: "/assets/illus/feature-2.webp", title: "دروس مباشرة ومسجّلة", desc: ".انضم للبث أو راجع التسجيلات أي وقت" },
    { img: "/assets/illus/feature-3.webp", title: "اختبارات فورية", desc: ".نتائج لحظية مع شرح للأجوبة ونِقاط للتحفيز" },
    { img: "/assets/illus/feature-4.webp", title: "تقارير تقدّم", desc: ".لوحة تحليلات بسيطة تفهمك مستواك بسرعة" },
];

export default function Features() {
    const [idx, setIdx] = useState(0);
    const n = CARDS.length;

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
                    <h2 className="features_title">الميزات الرئيسية</h2>
                    <p className="features_lead">.أرقام تلخص التجربة, وتفاصيل تدعمها</p>
                </header>

                {/* Metrics */}
                <ul className="metrics" role="list">
                    {METRICS.map((m, i) => (
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
                            style={{ transform: `translateX(-${idx * 100}%)` }}
                            role="list"
                        >
                            {CARDS.map((c, i) => (
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
                    <div className="feat_dots" role="tablist" aria-label="الشرائح">
                        {CARDS.map((_, i) => (
                            <button
                                key={i}
                                className={`dot ${idx === i ? "is-active" : ""}`}
                                onClick={() => setIdx(i)}
                                aria-current={idx === i}
                                aria-label={`شريحة ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
