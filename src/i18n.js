import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar/translation.json";
import en from "./locales/en/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: "ar",              // اللغة الافتراضية
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

// ثبّت الاتجاه LTR دايمًا
const applyLangOnly = (lng) => {
  const html = document.documentElement;
  html.setAttribute("dir", "ltr");   // 🔒 دايمًا LTR
  html.setAttribute("lang", lng);    // بس اللانغ تتغير
};

applyLangOnly(i18n.language);
i18n.on("languageChanged", applyLangOnly);

export default i18n;
