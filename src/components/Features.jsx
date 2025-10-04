import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import "../styles/features.css";

const resolveImg = (p) => (p.startsWith("/") ? p : new URL(p, import.meta.url).toString());

const METRICS = [
    { value: "200+", labelKey: "features_003" },
    { value: "20+", labelKey: "features_004" },
    { value: "24/7", labelKey: "features_005" },
    { value: "98%", labelKey: "features_006" },
    { value: "600+", labelKey: "features_n1" },
    { value: "1500+", labelKey: "features_n2" },
];

const CARDS_RAW = [
    { img: "/assets/illus/feature-1.webp", titleKey: "features_007", descKey: "features_008" },
    { img: "/assets/illus/feature-2.webp", titleKey: "features_009", descKey: "features_010" },
    { img: "/assets/illus/feature-3.webp", titleKey: "features_011", descKey: "features_012" },
    { img: "/assets/illus/feature-4.webp", titleKey: "features_013", descKey: "features_014" },
    { img: "/assets/illus/feature-5.webp", titleKey: "features_015", descKey: "features_016" },
    { img: "/assets/illus/feature-6.webp", titleKey: "features_017", descKey: "features_018" },
];

function useImagePreloader(urls = []) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                await Promise.all(
                    urls.map((src) => {
                        const img = new Image();
                        img.crossOrigin = "anonymous";
                        img.src = src;
                        return img.decode
                            ? img.decode().catch(() => { })
                            : new Promise((res) => {
                                img.onload = () => res();
                                img.onerror = () => res();
                            });
                    })
                );
            } finally {
                if (!cancelled) setReady(true);
            }
        })();
        return () => { cancelled = true; };
    }, [urls]);
    return ready;
}

export default function Features() {
    const { t } = useTranslation();
    const cards = useMemo(
        () =>
            CARDS_RAW.map((c) => ({
                ...c,
                img: resolveImg(c.img),
                title: t(c.titleKey),
                desc: t(c.descKey),
            })),
        [t]
    );

    const n = cards.length;
    const extended = useMemo(() => [cards[n - 1], ...cards, cards[0]], [cards, n]);

    const [vIdx, setVIdx] = useState(1);
    const [anim, setAnim] = useState(true);
    const [sliding, setSliding] = useState(false);
    const realIdx = (vIdx - 1 + n) % n;          // 0..(n-1)
    const activeMetricIdx = realIdx % METRICS.length;

    const preloadReady = useImagePreloader(cards.map((c) => c.img));

    const timerRef = useRef(null);
    const startAutoplay = useCallback(() => {
        if (timerRef.current || !preloadReady) return;
        timerRef.current = setInterval(() => setVIdx((p) => p + 1), 2000);
    }, [preloadReady]);
    const stopAutoplay = useCallback(() => {
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }, []);
    useEffect(() => { startAutoplay(); return stopAutoplay; }, [startAutoplay, stopAutoplay]);

    useEffect(() => {
        if (anim) setSliding(true);
    }, [vIdx, anim]);

    const startX = useRef(0), dx = useRef(0);
    const onTouchStart = (e) => { startX.current = e.touches[0].clientX; dx.current = 0; };
    const onTouchMove = (e) => { dx.current = e.touches[0].clientX - startX.current; };
    const onTouchEnd = () => {
        if (Math.abs(dx.current) > 50) setVIdx((p) => p + (dx.current < 0 ? 1 : -1));
    };

    const jumpWithoutAnim = (to) => {
        setAnim(false);
        setVIdx(to);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    };

    const onTransitionEnd = (e) => {
        if (e.target !== e.currentTarget) return;
        setSliding(false);
        if (!anim) return;
        if (vIdx === 0) jumpWithoutAnim(n);
        else if (vIdx === n + 1) jumpWithoutAnim(1);
    };

    const trackRef = useRef(null);
    const repaintCurrent = useCallback(async () => {
        setAnim(false);
        const track = trackRef.current;
        if (track) { track.offsetHeight; }
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }, []);
    useEffect(() => {
        const onVis = () => {
            if (document.visibilityState === "visible") { repaintCurrent(); startAutoplay(); }
            else { stopAutoplay(); }
        };
        document.addEventListener("visibilitychange", onVis);
        window.addEventListener("pageshow", onVis);
        window.addEventListener("pagehide", onVis);
        return () => {
            document.removeEventListener("visibilitychange", onVis);
            window.removeEventListener("pageshow", onVis);
            window.removeEventListener("pagehide", onVis);
        };
    }, [repaintCurrent, startAutoplay, stopAutoplay]);

    const isNear = (i) => i === vIdx || i === vIdx - 1 || i === vIdx + 1;

    const handleMetricEnter = (i) => {
        stopAutoplay();
        setVIdx(i + 1);
    };
    const handleMetricLeave = () => {
        startAutoplay();
    };
    /* ▲▲ جديد */

    return (
        <section id="features" className="features">
            <div className="features_container">
                <header className="features_header">
                    <h2 className="features_title">{t("features_001")}</h2>
                    <p className="features_lead">{t("features_002")}</p>
                </header>

                <div className="features_row" data-sliding={sliding ? "1" : "0"}>

                    <ul className="metrics" role="list" aria-label="metrics">
                        {METRICS.map((m, i) => (
                            <li
                                key={i}
                                className={`metric_item ${activeMetricIdx === i ? "is-active" : ""}`}
                                aria-current={activeMetricIdx === i ? "true" : "false"}
                                onMouseEnter={() => handleMetricEnter(i)}
                                onMouseLeave={handleMetricLeave}
                                onFocus={() => handleMetricEnter(i)}
                                onBlur={handleMetricLeave}
                            >
                                <div className="metric_value">{m.value}</div>
                                <div className="metric_label">{t(m.labelKey)}</div>
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
                                ref={trackRef}
                                className="feat_track"
                                onTransitionEnd={onTransitionEnd}
                                style={{
                                    transform: `translate3d(-${vIdx * 100}%, 0, 0)`,
                                    transition: anim ? "transform var(--slide-dur, 0.6s) ease" : "none",
                                }}
                            >
                                {extended.map((c, i) => (
                                    <li key={i} className="feat_slide">
                                        <div className="card">
                                            <div className="card_media">
                                                <img
                                                    src={c.img}
                                                    alt=""
                                                    loading={isNear(i) ? "eager" : "lazy"}
                                                    decoding="async"
                                                    fetchPriority={isNear(i) ? "high" : "auto"}
                                                    crossOrigin="anonymous"
                                                    style={{ display: "block" }}
                                                    aria-hidden="true"
                                                />
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
                                    onClick={() => setVIdx(i + 1)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
