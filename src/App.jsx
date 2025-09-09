import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import AppIntro from './components/AppIntro';
import Features from './components/Features';
import DownloadInstall from './components/DownloadInstall';

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

      </main>
    </>
  )

}

export default App
