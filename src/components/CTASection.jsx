import { useEffect, useRef } from 'react'

export default function CTASection() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const cx = canvas.width / 2
    const cy = canvas.height / 2

    let frame = 0

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Converged network — logo formation
      const rings = [
        { r: 40, count: 6, color: '#FF6B00', opacity: 0.8 },
        { r: 80, count: 12, color: '#FF8A26', opacity: 0.5 },
        { r: 130, count: 20, color: '#FFB067', opacity: 0.3 },
        { r: 190, count: 30, color: '#FF6B00', opacity: 0.15 },
      ]

      for (const ring of rings) {
        const t = frame * 0.005 * (rings.indexOf(ring) % 2 === 0 ? 1 : -1)
        for (let i = 0; i < ring.count; i++) {
          const angle = (i / ring.count) * Math.PI * 2 + t
          const x = cx + Math.cos(angle) * ring.r
          const y = cy + Math.sin(angle) * ring.r
          const pulse = Math.sin(frame * 0.05 + i) * 0.3 + 0.7

          ctx.beginPath()
          ctx.arc(x, y, 2.5 * pulse, 0, Math.PI * 2)
          ctx.fillStyle = ring.color + Math.round(ring.opacity * 255).toString(16).padStart(2, '0')
          ctx.fill()
        }

        // Ring connections
        for (let i = 0; i < ring.count; i++) {
          const a1 = (i / ring.count) * Math.PI * 2 + t
          const a2 = ((i + 1) / ring.count) * Math.PI * 2 + t
          ctx.beginPath()
          ctx.moveTo(cx + Math.cos(a1) * ring.r, cy + Math.sin(a1) * ring.r)
          ctx.lineTo(cx + Math.cos(a2) * ring.r, cy + Math.sin(a2) * ring.r)
          ctx.strokeStyle = ring.color + Math.round(ring.opacity * 0.4 * 255).toString(16).padStart(2, '0')
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Spokes from center
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + frame * 0.003
        const spokeGrad = ctx.createLinearGradient(cx, cy, 
          cx + Math.cos(angle) * 190, 
          cy + Math.sin(angle) * 190)
        spokeGrad.addColorStop(0, 'rgba(255, 107, 0, 0.5)')
        spokeGrad.addColorStop(1, 'rgba(255, 107, 0, 0)')
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(angle) * 190, cy + Math.sin(angle) * 190)
        ctx.strokeStyle = spokeGrad
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Center core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20)
      coreGrad.addColorStop(0, '#FFD080')
      coreGrad.addColorStop(0.3, '#FF6B00')
      coreGrad.addColorStop(1, 'rgba(255,107,0,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 20, 0, Math.PI * 2)
      ctx.fillStyle = coreGrad
      ctx.shadowBlur = 40
      ctx.shadowColor = '#FF6B00'
      ctx.fill()
      ctx.shadowBlur = 0

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  return (
    <section
      id="demo"
      style={{
        position: 'relative',
        padding: '10rem 2rem',
        textAlign: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #050505 0%, #050505 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
        }}
      />

      {/* Orange radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 700, margin: '0 auto' }}>
        <div className="section-label" style={{ display: 'inline-flex', marginBottom: '2rem' }}>
          ✦ Join 2,400+ Manufacturers
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          marginBottom: '1.5rem',
        }}>
          Ready to Move<br />
          <span className="text-gradient">From Chaos to Control?</span>
        </h2>

        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          maxWidth: 520,
          margin: '0 auto 3rem',
          lineHeight: 1.6,
        }}>
          See your trade network come alive in a personalized 30-minute demo.
          No commitments. No credit card required.
        </p>

        <div className="cta-buttons">
          <a href="#book" className="btn-primary" id="cta-book-demo" style={{ padding: '16px 40px', fontSize: '0.9375rem' }}>
            <span>Book Free Demo</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#tour" className="btn-secondary" id="cta-watch-tour" style={{ padding: '16px 40px', fontSize: '0.9375rem' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 6L12 9L7 12V6Z" fill="currentColor"/>
            </svg>
            <span>Watch Product Tour</span>
          </a>
        </div>

        {/* Trust indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '3rem',
          flexWrap: 'wrap',
        }}>
          {[
            '🔒 SOC 2 Compliant',
            '🇮🇳 Made for India',
            '⚡ 48hr Onboarding',
            '📞 Dedicated Support',
          ].map(item => (
            <div key={item} style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
