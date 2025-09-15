import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import AppIntro from './components/AppIntro';
import Features from './components/Features';
import DownloadInstall from './components/DownloadInstall';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <HowItWorks />
        <AppIntro />
        <Features />
        <DownloadInstall />
        <Footer />
      </main>
    </>
  )

}

export default App
