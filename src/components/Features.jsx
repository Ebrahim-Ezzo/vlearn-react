import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import "../styles/features.css";

const resolveImg = (p) => (p.startsWith("/") ? p : new URL(p, import.meta.url).toString());

const METRICS = [
    { value: "2000+", labelKey: "features_003" },
    { value: "500+", labelKey: "features_004" },
    { value: "24/7", labelKey: "features_005" },
    { value: "98%", labelKey: "features_006" },
];

const CARDS_RAW = [
    { img: "/assets/illus/feature-1.webp", titleKey: "features_007", descKey: "features_008" },
    { img: "/assets/illus/feature-2.webp", titleKey: "features_009", descKey: "features_010" },
    { img: "/assets/illus/feature-3.webp", titleKey: "features_011", descKey: "features_012" },
    { img: "/assets/illus/feature-4.webp", titleKey: "features_013", descKey: "features_014" },
];

// preload + decode
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
                        return img.decode ? img.decode().catch(() => { }) : new Promise((res) => {
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
    const cards = useMemo(() => CARDS_RAW.map(c => ({
        ...c,
        img: resolveImg(c.img),
        title: t(c.titleKey),
        desc: t(c.descKey),
    })), [t]);

    const n = cards.length;
    const extended = useMemo(() => [cards[n - 1], ...cards, cards[0]], [cards, n]);

    const [vIdx, setVIdx] = useState(1);
    const [anim, setAnim] = useState(true);
    const realIdx = (vIdx - 1 + n) % n;

    const preloadReady = useImagePreloader(cards.map(c => c.img));

    // ---- Autoplay (start/stop آمنين مع التبويب) ----
    const timerRef = useRef(null);
    const startAutoplay = useCallback(() => {
        if (timerRef.current || !preloadReady) return;
        timerRef.current = setInterval(() => setVIdx(p => p + 1), 2000);
    }, [preloadReady]);
    const stopAutoplay = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => { // يبدأ بعد الجاهزية
        startAutoplay();
        return stopAutoplay;
    }, [startAutoplay, stopAutoplay]);

    // ---- Touch ----
    const startX = useRef(0), dx = useRef(0);
    const onTouchStart = (e) => { startX.current = e.touches[0].clientX; dx.current = 0; };
    const onTouchMove = (e) => { dx.current = e.touches[0].clientX - startX.current; };
    const onTouchEnd = () => {
        if (Math.abs(dx.current) > 50) setVIdx(p => p + (dx.current < 0 ? 1 : -1));
    };

    // ---- Clones jump بدون أنيميشن ----
    const jumpWithoutAnim = (to) => {
        setAnim(false);
        setVIdx(to);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    };
    const onTransitionEnd = (e) => {
        if (e.target !== e.currentTarget || !anim) return;
        if (vIdx === 0) jumpWithoutAnim(n);
        else if (vIdx === n + 1) jumpWithoutAnim(1);
    };

    // ---- إصلاح “رجعت من تبويب ثاني” (Page Visibility) ----
    const trackRef = useRef(null);

    const repaintCurrent = useCallback(async () => {
        // أوقف الأنيميشن مؤقتًا، أجبر reflow، وأعيد decode للصور القريبة
        setAnim(false);
        const track = trackRef.current;
        if (track) {
            // force reflow
            // eslint-disable-next-line no-unused-expressions
            track.offsetHeight;

            const near = [vIdx - 1, vIdx, vIdx + 1];
            near.forEach((i) => {
                const idx = Math.max(0, Math.min(i, track.children.length - 1));
                const img = track.children[idx]?.querySelector("img");
                if (img?.decode) img.decode().catch(() => { });
                if (img) {
                    // nudge بسيط ليجبر GPU يرسم
                    img.style.transform = "translateZ(0.0001px)";
                    requestAnimationFrame(() => { img.style.transform = ""; });
                }
            });
        }
        // رجّع الأنيميشن فريمين بعد ما يرسُم
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }, [vIdx]);

    useEffect(() => {
        const onVis = () => {
            if (document.visibilityState === "visible") {
                // رجعنا للتبويب: ثبّت الصور ثم شغّل autoplay
                repaintCurrent();
                startAutoplay();
            } else {
                // خرجنا: وقّف autoplay
                stopAutoplay();
            }
        };
        document.addEventListener("visibilitychange", onVis);
        window.addEventListener("pageshow", onVis); // للعودة من back/forward cache
        window.addEventListener("pagehide", onVis);
        return () => {
            document.removeEventListener("visibilitychange", onVis);
            window.removeEventListener("pageshow", onVis);
            window.removeEventListener("pagehide", onVis);
        };
    }, [repaintCurrent, startAutoplay, stopAutoplay]);

    const isNear = (i) => i === vIdx || i === vIdx - 1 || i === vIdx + 1;

    return (
        <section id="features" className="features">
            <div className="features_container">
                <header className="features_header">
                    <h2 className="features_title">{t('features_001')}</h2>
                    <p className="features_lead">{t('features_002')}</p>
                </header>

                <ul className="metrics" role="list">
                    {METRICS.map((m, i) => (
                        <li key={i} className="metric_item">
                            <div className="metric_value">{m.value}</div>
                            <div className="metric_label">{t(m.labelKey)}</div>
                        </li>
                    ))}
                </ul>

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
                                transition: anim ? "transform 0.4s ease" : "none",
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
                                                fetchPriority={isNear(i) ? "high" : "auto"}  // ✅ بدل fetchpriority
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
        </section>
    );
}
