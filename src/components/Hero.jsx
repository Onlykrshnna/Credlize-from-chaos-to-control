import { useState } from 'react'

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section 
      className="hero" 
      id="home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`hero-infra-bg ${isHovered ? 'visible' : ''}`}>
        <div className="infra-grid"></div>
        <div className="infra-beam"></div>
        <div className="infra-glow"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-eyebrow">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill="var(--orange-primary)" />
          </svg>
          AI-Powered Manufacturer–Distributor Platform
        </div>

        <h1 className="hero-title">
          <span className="text-gradient-white">From Chaos</span>
          <br />
          <span className="text-gradient">To Control.</span>
        </h1>

        <p className="hero-subtitle">
          Replace WhatsApp orders, notebooks, invoices and payment confusion 
          with one connected operating system.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#demo" className="btn-primary" id="hero-book-demo">
            <span>Book Demo</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#tour" className="btn-secondary" id="hero-watch-tour">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 5.5L11 8L6 10.5V5.5Z" fill="currentColor"/>
            </svg>
            <span>Watch Product Tour</span>
          </a>
        </div>

        <div className="hero-tools">
          {['WhatsApp', 'Excel', 'Registers', 'Tally', 'Phone Calls'].map(tool => (
            <div key={tool} className="hero-tool-badge">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5L4 7L8 3" stroke="var(--orange-primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {tool}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll to discover</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
