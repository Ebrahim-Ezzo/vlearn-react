import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./DeleteAccount.css";
import MinimalTopBar from "../components/MinimalTopBar";


export default function DeleteAccount() {
    const [phone, setPhone] = useState("");
    const [agree, setAgree] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        document.title = "حذف الحساب — VLearn";
    }, []);

    // Regex مبسّط لصيغة دولية E.164 تقريبا
    const phoneRegex = useMemo(() => /^\+?[1-9]\d{7,14}$/, []);
    const isPhoneValid = phoneRegex.test(phone.trim());
    const canProceed = isPhoneValid && agree;

    const openModal = (e) => {
        e.preventDefault();
        setTouched(true);
        if (canProceed) setShowModal(true);
    };

    const handleConfirm = () => {
        const support = "support@vlearn.sy";
        const subject = encodeURIComponent("طلب حذف حساب");
        const body = encodeURIComponent(
            `مرحبًا فريق VLearn،

أودّ حذف حسابي نهائيًا.

رقم الهاتف المرتبط بالحساب: ${phone}

أقرّ بأني أفهم أن الحذف نهائي وقد أفقد كل البيانات/المزايا المرتبطة بالحساب.

شكرًا لكم.`
        );
        window.location.href = `mailto:${support}?subject=${subject}&body=${body}`;
        setShowModal(false);
    };

    return (
            <>
        <MinimalTopBar />

        <section dir="rtl" className="delete-page" aria-labelledby="delete-title">
            <header className="delete-header">
                <h1 id="delete-title">حذف الحساب</h1>
                <p>
                    يرجى قراءة النقاط التالية قبل المتابعة. بحذفك للحساب سيتم إزالة بياناتك
                    الشخصية وفقًا لـ <Link to="/privacy">سياسة الخصوصية</Link> و{" "}
                    <Link to="/terms">الشروط والأحكام</Link>. قد تفقد بشكل نهائي أي
                    تقدّم/نقاط/قوائم محفوظة. لا يمكن التراجع عن هذه العملية.
                </p>
            </header>

            <form className="delete-form" onSubmit={openModal} noValidate>
                <div className="field">
                    <label htmlFor="phone">رقم الهاتف المرتبط بالحساب</label>
                    <input
                        id="phone"
                        className="input"
                        inputMode="tel"
                        dir="ltr"
                        placeholder="+9715xxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => setTouched(true)}
                        aria-describedby="phone-hint phone-error"
                        aria-invalid={touched && !isPhoneValid}
                    />
                    <div id="phone-hint" className="hint">
                        اكتب الرقم بصيغة دولية (مثال: ‎+9715xxxxxxx). أرقام فقط.
                    </div>
                    {touched && !isPhoneValid && (
                        <div id="phone-error" className="error" role="alert">
                            الرجاء إدخال رقم هاتف صالح.
                        </div>
                    )}
                </div>

                <label className="agree">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        aria-label="أقرّ بأن عملية الحذف نهائية"
                    />
                    <span>
                        أقرّ أني أفهم أن عملية الحذف <strong>نهائية وغير قابلة للاسترجاع</strong>.
                    </span>
                </label>

                <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={!canProceed}
                    aria-disabled={!canProceed}
                >
                    حذف الحساب
                </button>
            </form>

            {showModal && (
                <div
                    className="modal-backdrop"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onClick={() => setShowModal(false)}
                >
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2 id="modal-title">تأكيد حذف الحساب</h2>
                        <p>
                            بحذفك للحساب، قد تفقد بياناتك ومزاياك بشكل نهائي، وقد تبقى بعض
                            البيانات لفترة محدودة لأغراض الامتثال القانوني. هل تريد المتابعة؟
                        </p>

                        <div className="modal-actions">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                                إلغاء
                            </button>
                            <button className="btn btn-danger" onClick={handleConfirm}>
                                تأكيد الحذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </section>
        </>

    );
}
