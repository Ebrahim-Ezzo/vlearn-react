import { Link } from "react-router-dom";
import "../styles/MinimalTopBar.css";

export default function MinimalTopBar() {
    return (
        <div className="minimal-topbar">

            <Link to="/" className="back-btn" aria-label="العودة إلى الصفحة الرئيسية">
                <span className="back-arrow">←</span>
                <span>رجوع للرئيسية</span>
            </Link>

            <Link to="/" className="logo" aria-label="العودة إلى الرئيسية">
                {/* لوغو من public/images */}
                <img src="/images/logo.svg" alt="VLearn Logo" />
            </Link>
        </div>
    );
}
