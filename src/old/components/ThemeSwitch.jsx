import { useEffect, useState } from "react";
import "../styles/themeSwitch.css";

export default function ThemeSwitch() {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (checked) {
            root.setAttribute("data-theme", "alt");
        } else {
            root.removeAttribute("data-theme");
        }
    }, [checked]);

    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <span className="slider"></span>
        </label>
    );
}
