import CircuitBackground from './components/CircuitBackground.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ChaosSection from './components/ChaosSection.jsx'
import StoryFlow from './components/StoryFlow.jsx'
import StatsBar from './components/StatsBar.jsx'
import FeaturesSection from './components/FeaturesSection.jsx'
import AIPaperSection from './components/AIPaperSection.jsx'
import PhoneSection from './components/PhoneSection.jsx'
import WhatsAppSection from './components/WhatsAppSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import CTASection from './components/CTASection.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      {/* Fixed full-page PCB circuit board — behind everything */}
      <CircuitBackground />
      <div className="noise" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <ChaosSection />
        <StoryFlow />
        <StatsBar />
        <FeaturesSection />
        <AIPaperSection />
        <PhoneSection />
        <WhatsAppSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default App
