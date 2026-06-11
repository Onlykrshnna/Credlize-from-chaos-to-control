const LINKS = {
  Platform: ['Inventory', 'Orders', 'Payments', 'Intelligence', 'WhatsApp Automation', 'Distributor PWA'],
  Company: ['About', 'Careers', 'Press', 'Blog', 'Contact'],
  Resources: ['Documentation', 'API Reference', 'Case Studies', 'Privacy Policy', 'Terms of Service'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="#050505" stroke="#FF6B00" strokeWidth="1"/>
                <path d="M16 5 L23 9.5 L23 22.5 L16 27 L9 22.5 L9 9.5 Z" fill="none" stroke="#FF6B00" strokeWidth="1.2"/>
                <circle cx="16" cy="16" r="3.5" fill="#FF6B00"/>
              </svg>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}>
                Credlize
              </span>
            </div>
            <p>
              AI-powered Manufacturer–Distributor Operating Platform. 
              From chaos to control — one connected system for Indian trade.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {['𝕏', 'in', '▶', '📧'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: 34, height: 34,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <div className="footer-heading">{heading}</div>
              <ul className="footer-links">
                {links.map(link => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div>
            © 2025 Credlize Technologies Pvt. Ltd. Made with ♥ for Indian manufacturers.
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 6,
              fontSize: '0.7rem',
              color: 'var(--success)',
            }}>
              <div style={{
                width: 6, height: 6,
                background: 'var(--success)',
                borderRadius: '50%',
                animation: 'pulse-dot 1.5s ease-in-out infinite',
              }} />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
