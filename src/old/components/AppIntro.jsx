import { useEffect, useRef, useState } from "react";
import "../styles/appIntro.css";

export default function AppIntro() {
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
                    <h2 className="appintro_title">مقدمة عن التطبيق</h2>
                    <p className="appintro_para">
                        منصة <b>VLearn</b> تقدّم دورات تدريبية وتعزيزية مع اختبارات آلية من بنك
                        أسئلة مخصّص للمناهج المعتمدة، وتدعم التعلم الذكي خطوة بخطوة
                    </p>
                    <p className="appintro_para">
                        يصل المعلمون بالطلاب ضمن تجربة سهلة بالعربية، مع اشتراكات مرنة
                        .وتقارير تقدّم فورية لتبقى على إطلاع دائم بنتائجك
                    </p>
                    <a href="#features" className="appintro_btn">
                        تعرّف أكثر
                    </a>
                </div>

                <div className="appintro_visual" ref={ref}>
                    <div className={`intro_phone_frame ${show ? "is-visible" : ""}`}>
                        <img
                            src="/assets/screens/intro.jpg"
                            alt="واجهة تطبيق VLearn"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
