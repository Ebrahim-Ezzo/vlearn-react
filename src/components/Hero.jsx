import { useState } from "react";
import "../styles/hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Hero() {
    const [role, setRole] = useState("student");

    return (
        <section className="hero" id="hero">
            <div className="hero_container">

                <div className="side_content">
                    <div className="title">
                        <h1 className="hero_title">Vlearn</h1>
                        <p className="hero_tagline">منصتك الذكية للتعليم الافتراضي</p>
                    </div>

                    <div className="hero_content">

                        <p className="hero_paragraph">
                            VLearn تطبيق التعليم الافتراضي الذي يضمن لك النجاح والتفوق في
                            الامتحان. ابدأ اليوم وكن من المتفوقين مع مجموعة من المعلمين
                            المتميزين.
                        </p>

                        {/* Tabs */}
                        <div className="hero_tabs" role="tablist">
                            <button
                                className={`tab ${role === "student" ? "active" : ""}`}
                                onClick={() => setRole("student")}
                                role="tab"
                                aria-selected={role === "student"}
                            >
                                طالب
                            </button>
                            <button
                                className={`tab ${role === "teacher" ? "active" : ""}`}
                                onClick={() => setRole("teacher")}
                                role="tab"
                                aria-selected={role === "teacher"}
                            >
                                معلّم
                            </button>
                        </div>

                        {/* Tab content */}
                        <div className="tab_content" role="tabpanel">
                            {role === "student" ? (
                                <p className="tab_text">
                                    خطط دراسة ذكية، اختبارات فورية، وتقارير تقدّم لحظة بلحظة — كل شي
                                    بمكان واحد.
                                </p>
                            ) : (
                                <p className="tab_text">
                                    أنشئ صفوفك بسهولة، تابع أداء الطلاب، وشارك دروس مباشرة ومسجّلة.
                                </p>
                            )}
                        </div>

                        {/* cta */}
                        <div className="hero_buttons">
                            <button className="btn_primary">ابدأ الآن</button>
                        </div>
                    </div>
                </div>
                <div className="hero_image">
                    <div className="phone_frame">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            slidesPerView={1}
                            spaceBetween={12}
                            navigation
                            loop
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            className="hero_swiper"
                        >
                            <SwiperSlide>
                                <img src="/assets/screens/shot-1.png" alt="screen 1" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/assets/screens/shot-2.jpg" alt="screen 2" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/assets/screens/shot-3.jpg" alt="screen 3" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
