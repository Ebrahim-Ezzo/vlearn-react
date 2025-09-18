import "./login.css";
import { useState } from "react";

export default function LoginPage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [showMsgs, setShowMsgs] = useState(true);
    const [success, setSuccess] = useState(false);

    const nameMsg = "الاسم 2–20 حرف (حروف ومسافات فقط)";
    const phoneMsg = "رقم الموبايل 9–13 أرقام";

    const isNameValid = (v) => /^[\u0621-\u064Aa-zA-Z\s]{2,20}$/.test(v.trim());
    const isPhoneValid = (v) => /^\d{9,13}$/.test(v.trim());

    const handleSubmit = (e) => {
        e.preventDefault();
        const okName = isNameValid(name);
        const okPhone = isPhoneValid(phone);
        if (!okName) { e.currentTarget.name.focus(); return; }
        if (!okPhone) { e.currentTarget.phone.focus(); return; }

        // خزن بيانات المستخدم
        sessionStorage.setItem("user", JSON.stringify({ name, phone }));

        setShowMsgs(false);
        setSuccess(true);
    };

    return (
        <main className="login_page">
            <div className="login_card">
                <h2 className="login_title">تسجيل الدخول</h2>

                <form className="login_form" noValidate onSubmit={handleSubmit}>
                    <div className="form_group">
                        <label htmlFor="name">الاسم</label>
                        <input
                            id="name"
                            name="name"
                            placeholder="ادخل اسمك"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => {
                                const v = e.target.value
                                    .replace(/[^ \u0621-\u064Aa-zA-Z]/g, "")
                                    .slice(0, 20);
                                setName(v);
                            }}
                            className={showMsgs && !isNameValid(name) ? "error" : ""}
                        />
                        {showMsgs && <p className="error_text">{nameMsg}</p>}
                    </div>

                    <div className="form_group">
                        <label htmlFor="phone">رقم الموبايل</label>
                        <input
                            id="phone"
                            name="phone"
                            placeholder="09xxxxxxxx"
                            autoComplete="tel"
                            inputMode="numeric"
                            value={phone}
                            onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, "").slice(0, 13);
                                setPhone(v);
                            }}
                            className={showMsgs && !isPhoneValid(phone) ? "error" : ""}
                        />
                        {showMsgs && <p className="error_text">{phoneMsg}</p>}
                    </div>

                    <button type="submit" className="login_btn">التسجيل</button>
                </form>

                {/* رسالة نجاح */}
                {success && (
                    <p className="success_text">
                        ✅ اهلا <span className="username">{name}</span>، تم تسجيل الدخول بنجاح
                    </p>
                )}
            </div>
        </main>
    );
}
