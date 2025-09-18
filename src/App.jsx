// src/App.jsx
import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import AppIntro from "./components/AppIntro";
import Features from "./components/Features";
import DownloadInstall from "./components/DownloadInstall";
import MinimalTopBar from "./components/MinimalTopBar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import DeleteAccount from "./pages/DeleteAccount";

import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  const { pathname } = useLocation();

  // المسارات اللي ما بدنا فيها هيدر/فوتر
  const HIDE_CHROME_ROUTES = ["/delete-account", "/privacy", "/terms"];
  const hideChrome = HIDE_CHROME_ROUTES.includes(pathname);

  return (
    <>
      {!hideChrome && <NavBar />}

      <Routes>
        {/* الصفحة الرئيسية */}
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <HowItWorks />
              <AppIntro />
              <Features />
              <DownloadInstall />
            </main>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>

      {!hideChrome && <Footer />}
    </>
  );
}
