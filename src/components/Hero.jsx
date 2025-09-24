import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Hero() {
    const [role, setRole] = useState("student");
    const { t } = useTranslation();

    return (
        <section className="hero" id="hero">
            <div className="hero_container">

                <div className="side_content">
                    <div className="title">
                        <h1 className="hero_title">VLearn</h1>
                        <p className="hero_tagline">{t('hero_001')}</p>
                    </div>

                    <div className="hero_content">

                        <p className="hero_paragraph">{t('hero_intro')}</p>

                        {/* Tabs */}
                        <div className="hero_tabs" role="tablist">
                            <button
                                className={`tab ${role === "student" ? "active" : ""}`}
                                onClick={() => setRole("student")}
                                role="tab"
                                aria-selected={role === "student"}
                            >{t('hero_002')}</button>
                            <button
                                className={`tab ${role === "teacher" ? "active" : ""}`}
                                onClick={() => setRole("teacher")}
                                role="tab"
                                aria-selected={role === "teacher"}
                            >{t('hero_003')}</button>
                        </div>

                        {/* Tab content */}
                        <div className="tab_content" role="tabpanel">
                            {role === "student" ? (
                                <p className="tab_text">
                                    {t('hero_student_text')}
                                </p>
                            ) : (
                                <p className="tab_text">{t('hero_004')}</p>
                            )}
                        </div>

                        {/* cta */}
                        <div className="hero_buttons">
                            <a href="#downloads" className="btn_primary">
                                {t('hero_005')}
                            </a>
                        </div>

                    </div>
                </div>
                <div className="hero_image">
                    <div className="phone_frame" dir="ltr">
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