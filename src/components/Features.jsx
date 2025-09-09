// src/components/Features.jsx
import "../styles/features.css";

const METRICS = [
    { value: "2000+", label: "درس" },
    { value: "500+", label: "معلّم" },
    { value: "24/7", label: "دعم" },
    { value: "98%", label: "رضا المستخدمين" },
];

const CARDS = [
    {
        img: "/assets/illus/feature-1.webp",
        title: "خطط دراسة ذكية",
        desc: ".تنظيم تلقائي للدروس مع تذكيرات ومتابعة تقدّمك"
    },
    {
        img: "/assets/illus/feature-2.webp",
        title: "دروس مباشرة ومسجّلة",
        desc: ".انضم للبث أو راجع التسجيلات أي وقت"
    },
    {
        img: "/assets/illus/feature-3.webp",
        title: "اختبارات فورية",
        desc: ".نتائج لحظية مع شرح للأجوبة ونِقاط للتحفيز"
    },
    {
        img: "/assets/illus/feature-4.webp",
        title: "تقارير تقدّم",
        desc: ".لوحة تحليلات بسيطة تفهمك مستواك بسرعة"
    },
];

export default function Features() {
    return (
        <section id="features" className="features">
            <div className="features_container">

                <header className="features_header">
                    <h2 className="features_title">الميزات الرئيسية</h2>
                    <p className="features_lead">
                        .أرقام تلخص التجربة, وتفاصيل تدعمها
                    </p>
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

                {/* Cards — horizontal scroll */}
                <div className="cards_scroller_wrap">
                    <ul className="cards_scroller" role="list">
                        {CARDS.map((c, i) => (
                            <li key={i} className="card">
                                <div className="card_media">
                                    <img src={c.img} alt="" loading="lazy" aria-hidden="true" />
                                </div>
                                <h3 className="card_title">{c.title}</h3>
                                <p className="card_desc">{c.desc}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}