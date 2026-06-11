const TESTIMONIALS = [
  {
    text: '"Before Credlize, I was managing 200 distributors on WhatsApp and Excel. Now everything is in one place and I can see who hasn\'t paid in seconds."',
    name: 'Rajesh Gupta',
    role: 'GM Operations, Amrit Foods',
    initial: 'R',
  },
  {
    text: '"The AI paper upload feature alone saved us 4 hours a day. Our stock entry person used to work till 10 PM. Now she leaves at 5."',
    name: 'Priya Sharma',
    role: 'Founder, Sharma FMCG',
    initial: 'P',
  },
  {
    text: '"Our distributors actually love using the app. Repeat order in one tap — they call it their favorite button."',
    name: 'Vikram Nair',
    role: 'Director, Kerala Spice Co.',
    initial: 'V',
  },
  {
    text: '"The morning brief from Credlize AI is the first thing I read every day. It tells me exactly where to focus."',
    name: 'Sangeeta Agarwal',
    role: 'CEO, Sunrise Distributors',
    initial: 'S',
  },
  {
    text: '"Collection efficiency went from 68% to 94% in 90 days. The automated payment reminders are incredibly effective."',
    name: 'Mohit Patel',
    role: 'CFO, Gujarat Provisions',
    initial: 'M',
  },
  {
    text: '"We tried 3 other platforms before Credlize. None of them understood how Indian manufacturing actually works."',
    name: 'Deepak Singh',
    role: 'Managing Director, Singh & Sons',
    initial: 'D',
  },
]

// Duplicate for infinite scroll
const ALL_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS]

export default function TestimonialsSection() {
  return (
    <section style={{ padding: 'var(--section-padding)', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ display: 'inline-flex' }}>
            Customer Stories
          </div>
          <div className="section-divider" style={{ margin: '1rem auto' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
          }}>
            Trusted by Manufacturers<br />
            <span className="text-gradient">Across India.</span>
          </h2>
        </div>
      </div>

      {/* Scrolling testimonials */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: 200,
          background: 'linear-gradient(90deg, #050505, transparent)',
          zIndex: 10,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          right: 0, top: 0, bottom: 0,
          width: 200,
          background: 'linear-gradient(270deg, #050505, transparent)',
          zIndex: 10,
          pointerEvents: 'none',
        }} />

        <div style={{ overflow: 'hidden' }}>
          <div className="testimonials-track">
            {ALL_TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                {/* Stars */}
                <div style={{ display: 'flex', gap: 3, marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#FF6B00">
                      <path d="M7 0L8.79 5.51H14.51L9.86 8.91L11.65 14.41L7 11.01L2.35 14.41L4.14 8.91L-0.51 5.51H5.21L7 0Z"/>
                    </svg>
                  ))}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
