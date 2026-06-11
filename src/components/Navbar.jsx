import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        <svg className="nav-logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="var(--bg-primary)" stroke="var(--orange-primary)" strokeWidth="1"/>
          <path d="M16 5 L23 9.5 L23 22.5 L16 27 L9 22.5 L9 9.5 Z" fill="none" stroke="var(--orange-primary)" strokeWidth="1.2"/>
          <circle cx="16" cy="16" r="3.5" fill="var(--orange-primary)"/>
          <line x1="16" y1="5" x2="16" y2="12.5" stroke="var(--orange-primary)" strokeWidth="0.8" opacity="0.5"/>
          <line x1="23" y1="9.5" x2="18.5" y2="13.5" stroke="var(--orange-primary)" strokeWidth="0.8" opacity="0.5"/>
          <line x1="23" y1="22.5" x2="18.5" y2="18.5" stroke="var(--orange-primary)" strokeWidth="0.8" opacity="0.5"/>
          <line x1="16" y1="27" x2="16" y2="19.5" stroke="var(--orange-primary)" strokeWidth="0.8" opacity="0.5"/>
          <line x1="9" y1="22.5" x2="13.5" y2="18.5" stroke="var(--orange-primary)" strokeWidth="0.8" opacity="0.5"/>
          <line x1="9" y1="9.5" x2="13.5" y2="13.5" stroke="var(--orange-primary)" strokeWidth="0.8" opacity="0.5"/>
        </svg>
        <span className="nav-logo-text">Credlize</span>
      </a>

      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#ai-paper">AI Paper</a></li>
        <li><a href="#distributor">Distributors</a></li>
        <li><a href="#pricing">Pricing</a></li>
      </ul>

      <div className="nav-cta">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <a href="#demo" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>
          <span>Watch Tour</span>
        </a>
        <a href="#demo" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>
          <span>Book Demo</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </nav>
  )
}
