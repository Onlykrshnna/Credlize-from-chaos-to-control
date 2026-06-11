import { useEffect, useRef } from 'react'

const CHAOS_ICONS = [
  { label: 'WhatsApp', color: '#25D366', symbol: '💬' },
  { label: 'Excel', color: '#217346', symbol: '📊' },
  { label: 'Register', color: '#A8A8A8', symbol: '📓' },
  { label: 'Invoice', color: '#FFB067', symbol: '📄' },
  { label: 'Phone', color: '#FF6B00', symbol: '📞' },
  { label: 'Tally', color: '#3B82F6', symbol: '💹' },
  { label: 'Email', color: '#EF4444', symbol: '📧' },
  { label: 'SMS', color: '#8B5CF6', symbol: '💬' },
]

export default function ChaosSection() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Chaotic floating elements (higher density and speed)
    const elements = []
    const COUNT = 75

    for (let i = 0; i < COUNT; i++) {
      const icon = CHAOS_ICONS[Math.floor(Math.random() * CHAOS_ICONS.length)]
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        size: Math.random() * 24 + 18,
        opacity: Math.random() * 0.45 + 0.15,
        icon,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const el of elements) {
        el.x += el.vx
        el.y += el.vy
        el.rotation += el.rotationSpeed
        el.phase += 0.01

        // Wrap around
        if (el.x < -50) el.x = canvas.width + 50
        if (el.x > canvas.width + 50) el.x = -50
        if (el.y < -50) el.y = canvas.height + 50
        if (el.y > canvas.height + 50) el.y = -50

        const floatY = Math.sin(el.phase) * 8
        const alpha = el.opacity * (0.5 + Math.sin(el.phase * 0.7) * 0.2)

        ctx.save()
        ctx.translate(el.x, el.y + floatY)
        ctx.rotate(el.rotation)
        ctx.globalAlpha = alpha

        // Background square
        ctx.fillStyle = `${el.icon.color}12`
        ctx.strokeStyle = `${el.icon.color}25`
        ctx.lineWidth = 1
        const size = el.size
        ctx.beginPath()
        ctx.roundRect(-size/2, -size/2, size, size, 4)
        ctx.fill()
        ctx.stroke()

        // Icon text
        ctx.fillStyle = el.icon.color
        ctx.font = `${size * 0.65}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(el.icon.symbol, 0, 0)

        ctx.restore()
      }

      // Chaotic connections between nearby items
      for (let i = 0; i < 20; i++) {
        const a = elements[Math.floor(Math.random() * elements.length)]
        const b = elements[Math.floor(Math.random() * elements.length)]
        if (a === b) continue
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          ctx.save()
          ctx.globalAlpha = 0.03
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 0.5
          ctx.setLineDash([3, 6])
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
          ctx.restore()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <section
      className="chaos-section"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0A0505 100%)',
        position: 'relative',
        minHeight: '110vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        className="chaos-canvas"
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      />

      {/* Red vignette overlay for chaos feel */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(5,0,0,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="story-grid">
          {/* Left Column: Context, Problem statement & Core metrics */}
          <div>
            <div className="section-label">01 — The Problem</div>
            <div className="section-divider" />
            <h2 className="story-headline" style={{ marginBottom: '1.5rem' }}>
              Your Business Lives<br />
              <span style={{ color: 'var(--text-muted)' }}>In Too Many Places.</span>
            </h2>
            <p className="story-body" style={{ marginBottom: '1.5rem' }}>
              WhatsApp for orders, Excel for stock levels, paper ledgers for credits,
              and phone calls for payment collection. Your distribution data is scattered
              across siloed systems. You are losing margins everyday to leakages, miscalculations,
              and stockouts.
            </p>

            <div className="chaos-audit-grid">
              <div className="chaos-audit-card">
                <div className="chaos-audit-val">₹2.4L</div>
                <div className="chaos-audit-label">Avg. Overdue Debt Per Distributor</div>
              </div>
              <div className="chaos-audit-card">
                <div className="chaos-audit-val">7+</div>
                <div className="chaos-audit-label">Siloed & Disconnected Channels</div>
              </div>
              <div className="chaos-audit-card">
                <div className="chaos-audit-val">3.5h</div>
                <div className="chaos-audit-label">Daily Manual Entry Alignment Loss</div>
              </div>
              <div className="chaos-audit-card">
                <div className="chaos-audit-val">4.2%</div>
                <div className="chaos-audit-label">Average Order Leakage & Dispute Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Status Quo Legacy Chaos */}
          <div>
            <div className="dashboard-status-quo">
              {/* WhatsApp Bubble Widget */}
              <div className="whatsapp-bubble-mock">
                <div className="whatsapp-sender">💬 Sharma Traders (WhatsApp)</div>
                <div className="whatsapp-text">
                  “Pls dispatch 50 bags Atta and 10 tins Fortune Oil to warehouse today. Rate normal. Delivery by evening. Confirm pls.”
                </div>
                <div className="whatsapp-time">
                  11:42 AM · <span style={{ color: '#EF4444', fontWeight: 600 }}>🔴 UNENTERED IN TALLY</span>
                </div>
              </div>

              {/* Excel Mockup Widget */}
              <div className="excel-mockup">
                <div className="excel-title">📊 INVENTORY_MASTER_2026.xlsx</div>
                <div className="excel-grid">
                  <div className="excel-cell header">SKU</div>
                  <div className="excel-cell header">Stock</div>
                  <div className="excel-cell header">Allocated</div>
                  <div className="excel-cell header">Status</div>

                  <div className="excel-cell">Aashirvaad Atta</div>
                  <div className="excel-cell err">-14</div>
                  <div className="excel-cell">50</div>
                  <div className="excel-cell err">#REF!</div>

                  <div className="excel-cell">Fortune Oil</div>
                  <div className="excel-cell">0</div>
                  <div className="excel-cell">10</div>
                  <div className="excel-cell err">OUT_STOCK</div>

                  <div className="excel-cell">Tata Salt</div>
                  <div className="excel-cell">840</div>
                  <div className="excel-cell">120</div>
                  <div className="excel-cell">OK</div>
                </div>
              </div>

              {/* Overdue Payment Warning Box */}
              <div className="overdue-alert">
                <div className="overdue-icon">⚠️</div>
                <div className="overdue-meta">
                  <div className="overdue-title">Overdue Credit Risk Exposure</div>
                  <div className="overdue-desc">
                    <strong>Patel Distributors (Gujarat NCR)</strong> is overdue by <strong>42 days</strong>. 
                    Outstanding: ₹1,85,000. No alert was sent.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
