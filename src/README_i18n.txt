Integration notes:

1) We added `i18n.js` and locale files at `locales/en/translation.json` and `locales/ar/translation.json`.
2) We wired translations into key UI areas:
   - NavBar: menu links now use t("hero"/"how"/"features"/"downloads"), login label t("login"); language buttons call i18n.changeLanguage("ar"/"en").
   - Hero: tab labels and intro text use translation keys.
   - HowItWorks: section title and 3 steps (titles + descriptions) use keys.
   - Features, DownloadInstall, Footer: section titles / rights line use keys.
3) Document direction (RTL/LTR) automatically updates when language changes.
4) To initialize i18n globally, import `./i18n` one time in your app entry (e.g., main.jsx). As a safety net we import it in NavBar/MinimalTopBar.
5) Extend translations by adding keys to the JSON files and replacing literals with `t("...")` in components.

Drag & drop:
- Replace your `src` with this folder content.
- Ensure your bundler supports JSON imports (Vite/CRA do).