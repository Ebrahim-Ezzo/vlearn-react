import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar/translation.json";
import en from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
  },
  lng: "ar",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const applyHtmlAttrs = (lng) => {
  const html = document.documentElement;
  const dir = i18n.dir(lng);
  html.setAttribute("dir", dir);
  html.setAttribute("lang", lng);
};

applyHtmlAttrs(i18n.language);
i18n.on("languageChanged", applyHtmlAttrs);

export default i18n;
