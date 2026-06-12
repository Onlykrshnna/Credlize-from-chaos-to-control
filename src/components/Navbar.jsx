import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <header className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav-pill" role="navigation" aria-label="Main navigation">

          {/* Logo */}
          <a href="/" className="nav-logo" aria-label="Credlize home">
            <svg className="nav-logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="#050505" stroke="#FF6B00" strokeWidth="1"/>
              <path d="M16 5 L23 9.5 L23 22.5 L16 27 L9 22.5 L9 9.5 Z" fill="none" stroke="#FF6B00" strokeWidth="1.2"/>
              <circle cx="16" cy="16" r="3.5" fill="#FF6B00"/>
              <line x1="16" y1="5"  x2="16" y2="12.5" stroke="#FF6B00" strokeWidth="0.8" opacity="0.5"/>
              <line x1="23" y1="9.5" x2="18.5" y2="13.5" stroke="#FF6B00" strokeWidth="0.8" opacity="0.5"/>
              <line x1="23" y1="22.5" x2="18.5" y2="18.5" stroke="#FF6B00" strokeWidth="0.8" opacity="0.5"/>
              <line x1="16" y1="27" x2="16" y2="19.5" stroke="#FF6B00" strokeWidth="0.8" opacity="0.5"/>
              <line x1="9"  y1="22.5" x2="13.5" y2="18.5" stroke="#FF6B00" strokeWidth="0.8" opacity="0.5"/>
              <line x1="9"  y1="9.5" x2="13.5" y2="13.5" stroke="#FF6B00" strokeWidth="0.8" opacity="0.5"/>
            </svg>
            <span className="nav-logo-text">Credlize</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links" role="list">
            <li><a href="#features">Features</a></li>
            <li><a href="#ai-paper">AI Paper</a></li>
            <li><a href="#distributor">Distributors</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>

          {/* Desktop CTA */}
          <div className="nav-cta">
            <a href="#demo" className="btn-secondary nav-btn-sm">
              <span>Watch Tour</span>
            </a>
            <a href="#demo" className="btn-primary nav-btn-sm" id="nav-book-demo">
              <span>Book Demo</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </nav>
      </header>

      {/* ── Mobile slide-down menu ── */}
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          <li><a href="#features"    onClick={() => setMenuOpen(false)}>Features</a></li>
          <li><a href="#ai-paper"    onClick={() => setMenuOpen(false)}>AI Paper</a></li>
          <li><a href="#distributor" onClick={() => setMenuOpen(false)}>Distributors</a></li>
          <li><a href="#pricing"     onClick={() => setMenuOpen(false)}>Pricing</a></li>
        </ul>
        <div className="nav-mobile-cta">
          <a href="#demo" className="btn-secondary" onClick={() => setMenuOpen(false)}>Watch Tour</a>
          <a href="#demo" className="btn-primary"   onClick={() => setMenuOpen(false)}>
            <span>Book Demo</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
