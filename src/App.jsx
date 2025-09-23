import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import AppIntro from "./components/AppIntro";
import Features from "./components/Features";
import DownloadInstall from "./components/DownloadInstall";
// import MinimalTopBar from "./components/MinimalTopBar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import DeleteAccount from "./pages/DeleteAccount";
import Contact from "./pages/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles = {
      "/": "VLearn - الصفحة الرئيسية",
      "/delete-account": "حذف الحساب — VLearn",
      "/privacy": "سياسة الخصوصية — VLearn",
      "/terms": "الشروط والأحكام — VLearn",
      "/login": "تسجيل الدخول — VLearn",
    };
    document.title = titles[pathname] || "VLearn";
  }, [pathname]);

  return (
    <>
      <NavBar />

      <Routes>
        {/* الصفحة الرئيسية */}
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <WhatsAppButton />
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
        <Route path="/Contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}
