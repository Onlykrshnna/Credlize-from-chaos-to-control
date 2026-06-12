import { useEffect, useRef, useState } from 'react'

const STORY_STEPS = [
  {
    id: 'connection',
    number: '02',
    label: 'Connection',
    headline: 'Every Distributor.\nEvery Order.\nConnected.',
    body: 'Credlize creates a living network across your entire distribution chain. Every distributor, every territory, every SKU — all connected in real time.',
    color: '#FF6B00',
    type: 'network',
  },
  {
    id: 'visibility',
    number: '03',
    label: 'Visibility',
    headline: 'Every Order.\nEvery Invoice.\nEvery Payment. Visible.',
    body: 'Orange = Orders flowing. Green = Payments clearing. Blue = Invoices moving. See the entire financial pulse of your trade network in one living view.',
    color: '#FF6B00',
    type: 'flow',
    colors: { orders: '#FF6B00', payments: '#22C55E', invoices: '#3B82F6' },
  },
  {
    id: 'intelligence',
    number: '04',
    label: 'Intelligence',
    headline: 'Intelligence\nAbove Operations.',
    body: "Credlize's AI scans your network, identifies patterns invisible to humans, and surfaces predictions before problems occur — low stock alerts, demand forecasts, relationship scores.",
    color: '#FF8A26',
    type: 'scan',
  },
  {
    id: 'control',
    number: '05',
    label: 'Control',
    headline: 'Trade Runs Better\nWhen Everything\nConnects.',
    body: 'From chaos to complete control. One platform. Every manufacturer. Every distributor. Every transaction. Organized, visible, intelligent.',
    color: '#FFB067',
    type: 'converge',
  },
]

function NetworkCanvas({ type, colors }) {
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

    const nodes = []
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 30 + Math.random() * Math.min(canvas.width, canvas.height) * 0.35
      nodes.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 3 + 1,
        phase: Math.random() * Math.PI * 2,
        color: type === 'flow'
          ? [colors.orders, colors.payments, colors.invoices][Math.floor(Math.random() * 3)]
          : '#FF6B00',
      })
    }

    const pulses = []
    let frame = 0

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 20 || n.x > canvas.width - 20) n.vx *= -1
        if (n.y < 20 || n.y > canvas.height - 20) n.vy *= -1
        n.vx *= 0.99
        n.vy *= 0.99
        n.phase += 0.02
      }

      // Draw connections
      const DIST = type === 'scan' ? 100 : 150
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < DIST) {
            const alpha = (1 - d / DIST) * 0.25

            let lineColor = `rgba(255, 107, 0, ${alpha})`
            if (type === 'flow') {
              // use node color
              lineColor = nodes[i].color + Math.round(alpha * 255).toString(16).padStart(2, '0')
            } else if (type === 'scan') {
              // Scan wave sweeping
              const waveX = (frame * 3) % canvas.width
              const midX = (nodes[i].x + nodes[j].x) / 2
              const scanAlpha = alpha * (0.3 + 0.7 * Math.max(0, 1 - Math.abs(midX - waveX) / 100))
              lineColor = `rgba(59, 130, 246, ${scanAlpha})`
            }

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = Math.sin(n.phase) * 0.3 + 0.8

        if (type === 'scan') {
          const waveX = (frame * 3) % canvas.width
          const scanAmt = Math.max(0, 1 - Math.abs(n.x - waveX) / 60)
          const gGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4)
          gGrad.addColorStop(0, `rgba(59, 130, 246, ${0.3 + scanAmt * 0.5})`)
          gGrad.addColorStop(1, 'rgba(59, 130, 246, 0)')
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * (3 + scanAmt * 4), 0, Math.PI * 2)
          ctx.fillStyle = gGrad
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = n.color + 'CC'
        ctx.fill()
      }

      // Center node
      const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 10)
      cGrad.addColorStop(0, '#FFB067')
      cGrad.addColorStop(1, 'rgba(255,107,0,0.2)')
      ctx.beginPath()
      ctx.arc(cx, cy, 8, 0, Math.PI * 2)
      ctx.fillStyle = cGrad
      ctx.shadowBlur = 20
      ctx.shadowColor = '#FF6B00'
      ctx.fill()
      ctx.shadowBlur = 0

      // Flow pulses
      if (type !== 'scan' && frame % 40 === 0 && nodes.length > 0) {
        const target = nodes[Math.floor(Math.random() * nodes.length)]
        pulses.push({
          x: cx, y: cy,
          tx: target.x, ty: target.y,
          p: 0, speed: 0.015,
          color: type === 'flow' ? target.color : '#FF6B00',
        })
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i]
        pulse.p += pulse.speed
        const px = pulse.x + (pulse.tx - pulse.x) * pulse.p
        const py = pulse.y + (pulse.ty - pulse.y) * pulse.p
        const pGrad = ctx.createRadialGradient(px, py, 0, px, py, 6)
        pGrad.addColorStop(0, pulse.color + 'EE')
        pGrad.addColorStop(1, pulse.color + '00')
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fillStyle = pGrad
        ctx.fill()
        if (pulse.p >= 1) pulses.splice(i, 1)
      }

      // Converge effect
      if (type === 'converge') {
        for (const n of nodes) {
          n.vx += (cx - n.x) * 0.0005
          n.vy += (cy - n.y) * 0.0005
        }
      }

      // Scan line for intelligence
      if (type === 'scan') {
        const scanX = (frame * 3) % canvas.width
        const scanGrad = ctx.createLinearGradient(scanX - 40, 0, scanX + 40, 0)
        scanGrad.addColorStop(0, 'rgba(59,130,246,0)')
        scanGrad.addColorStop(0.5, 'rgba(59,130,246,0.15)')
        scanGrad.addColorStop(1, 'rgba(59,130,246,0)')
        ctx.fillStyle = scanGrad
        ctx.fillRect(scanX - 40, 0, 80, canvas.height)

        // AI insight bubbles
        if (frame % 120 === 0) {
          // Could add floating text labels here
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [type, colors])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.5,
      }}
    />
  )
}

export default function StoryFlow() {
  return (
    <>
      {STORY_STEPS.map((step, idx) => {
        const isOdd = idx % 2 !== 0

        // Render the corresponding visual widget for each step
        const renderWidget = () => {
          switch (step.id) {
            case 'connection':
              return (
                <div className="network-inspector">
                  <div className="connection-item">
                    <div className="connection-details">
                      <span className="connection-name">Sharma Traders</span>
                      <span className="connection-meta">Delhi NCR · Tally ERP 9 Unified</span>
                    </div>
                    <div className="connection-status">
                      <span className="connection-dot"></span>
                      ACTIVE
                    </div>
                  </div>
                  <div className="connection-item">
                    <div className="connection-details">
                      <span className="connection-name">Patel & Sons</span>
                      <span className="connection-meta">Ahmedabad · Custom ERP API</span>
                    </div>
                    <div className="connection-status">
                      <span className="connection-dot"></span>
                      ACTIVE
                    </div>
                  </div>
                  <div className="connection-item">
                    <div className="connection-details">
                      <span className="connection-name">Verma Agencies</span>
                      <span className="connection-meta">Lucknow · WhatsApp Order Stream</span>
                    </div>
                    <div className="connection-status">
                      <span className="connection-dot"></span>
                      ACTIVE
                    </div>
                  </div>
                  <div className="connection-item">
                    <div className="connection-details">
                      <span className="connection-name">Royal Agro Distributors</span>
                      <span className="connection-meta">Mumbai · Excel Sync Agent</span>
                    </div>
                    <div className="connection-status">
                      <span className="connection-dot"></span>
                      ACTIVE
                    </div>
                  </div>
                  <div className="connection-item">
                    <div className="connection-details">
                      <span className="connection-name">Karan Agencies</span>
                      <span className="connection-meta">Kolkata Cluster · Ledger Sync</span>
                    </div>
                    <div className="connection-status">
                      <span className="connection-dot"></span>
                      ACTIVE
                    </div>
                  </div>
                </div>
              )
            case 'visibility':
              return (
                <div className="visibility-streams">
                  {/* Column 1: Orders (Orange) */}
                  <div className="stream-column" style={{ borderColor: 'rgba(255, 107, 0, 0.2)' }}>
                    <div className="stream-header">
                      <span className="stream-title" style={{ color: '#FF6B00' }}>Orders</span>
                      <span className="stream-pulse" style={{ background: '#FF6B00' }}></span>
                    </div>
                    <div className="ticker-container">
                      <div className="ticker-item" style={{ borderLeft: '2.5px solid #FF6B00' }}>
                        <div className="ticker-left">
                          <span className="ticker-code">ORD-9842</span>
                          <span className="ticker-buyer">Sharma Traders</span>
                        </div>
                        <span className="ticker-amount">₹1.2L</span>
                      </div>
                      <div className="ticker-item" style={{ borderLeft: '2.5px solid #FF6B00' }}>
                        <div className="ticker-left">
                          <span className="ticker-code">ORD-9843</span>
                          <span className="ticker-buyer">Patel & Sons</span>
                        </div>
                        <span className="ticker-amount">₹45k</span>
                      </div>
                      <div className="ticker-item" style={{ borderLeft: '2.5px solid #FF6B00' }}>
                        <div className="ticker-left">
                          <span className="ticker-code">ORD-9844</span>
                          <span className="ticker-buyer">Verma Agencies</span>
                        </div>
                        <span className="ticker-amount">₹86k</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Invoices (Blue) */}
                  <div className="stream-column" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                    <div className="stream-header">
                      <span className="stream-title" style={{ color: '#3B82F6' }}>Invoices</span>
                      <span className="stream-pulse" style={{ background: '#3B82F6' }}></span>
                    </div>
                    <div className="ticker-container">
                      <div className="ticker-item" style={{ borderLeft: '2.5px solid #3B82F6' }}>
                        <div className="ticker-left">
                          <span className="ticker-code">INV-4412</span>
                          <span className="ticker-buyer">Sharma Traders</span>
                        </div>
                        <span className="ticker-amount">₹1.2L</span>
                      </div>
                      <div className="ticker-item" style={{ borderLeft: '2.5px solid #3B82F6' }}>
                        <div className="ticker-left">
                          <span className="ticker-code">INV-4413</span>
                          <span className="ticker-buyer">Verma Agencies</span>
                        </div>
                        <span className="ticker-amount">₹86k</span>
                      </div>
                      <div className="ticker-item" style={{ borderLeft: '2.5px solid #3B82F6' }}>
                        <div className="ticker-left">
                          <span className="ticker-code">INV-4414</span>
                          <span className="ticker-buyer">Royal Agro</span>
                        </div>
                        <span className="ticker-amount">₹2.1L</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Payments (Green) */}
                  <div className="stream-column" style={{ borderColor: 'rgba(34, 197, 94, 0.2)' }}>
                    <div className="stream-header">
                      <span className="stream-title" style={{ color: '#22C55E' }}>Payments</span>
                      <span className="stream-pulse" style={{ background: '#22C55E' }}></span>
                    </div>
                    <div className="ticker-container">
                      <div className="ticker-item" style={{ borderLeft: '2.5px solid #22C55E' }}>
                        <div className="ticker-left">
                          <span className="ticker-code">PAY-1102</span>
                          <span className="ticker-buyer">Sharma Traders</span>
                        </div>
                        <span className="ticker-amount" style={{ color: '#22C55E', fontWeight: 600 }}>✓ Settled</span>
                      </div>
                      <div className="ticker-item" style={{ borderLeft: '2.5px solid #22C55E' }}>
                        <div className="ticker-left">
                          <span className="ticker-code">PAY-1103</span>
                          <span className="ticker-buyer">Patel & Sons</span>
                        </div>
                        <span className="ticker-amount" style={{ color: '#22C55E', fontWeight: 600 }}>✓ Settled</span>
                      </div>
                      <div className="ticker-item" style={{ borderLeft: '2.5px solid #22C55E' }}>
                        <div className="ticker-left">
                          <span className="ticker-code">PAY-1104</span>
                          <span className="ticker-buyer">Royal Agro</span>
                        </div>
                        <span className="ticker-amount" style={{ color: '#22C55E', fontWeight: 600 }}>✓ Settled</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            case 'intelligence':
              return (
                <div className="ai-brief-card">
                  <div className="ai-brief-header">
                    <span className="ai-brief-title">🧠 AI Morning Brief</span>
                    <span className="ai-brief-spark">⭐ Active Scanner</span>
                  </div>
                  <div className="ai-brief-list">
                    <div className="ai-brief-item">
                      <div className="ai-brief-icon-box" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>⚠️</div>
                      <div className="ai-brief-content">
                        <div className="ai-brief-label" style={{ color: '#EF4444' }}>Critical Stockout Warning</div>
                        <p className="ai-brief-text">Aashirvaad Atta inventory down to 12% at Delhi Hub. Estimated depletion in 3 days.</p>
                        <div className="ai-brief-conf" style={{ color: 'var(--text-muted)' }}>Confidence: 96% · <span className="ai-brief-action">Auto-Reorder</span></div>
                      </div>
                    </div>
                    <div className="ai-brief-item">
                      <div className="ai-brief-icon-box" style={{ background: 'rgba(255, 107, 0, 0.1)', color: '#FF6B00' }}>📈</div>
                      <div className="ai-brief-content">
                        <div className="ai-brief-label" style={{ color: '#FF6B00' }}>Demand Spike Forecast</div>
                        <p className="ai-brief-text">Gujarat territory shows +34% demand surge next week for Fortune Refined Oil.</p>
                        <div className="ai-brief-conf" style={{ color: 'var(--text-muted)' }}>Confidence: 89% · <span className="ai-brief-action">Pre-allocate SKU</span></div>
                      </div>
                    </div>
                    <div className="ai-brief-item">
                      <div className="ai-brief-icon-box" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}>💳</div>
                      <div className="ai-brief-content">
                        <div className="ai-brief-label" style={{ color: '#22C55E' }}>Credit Risk Optimization</div>
                        <p className="ai-brief-text">Verma Agencies credit aging at 42 days (Limit: 45). Grace limit extension recommended.</p>
                        <div className="ai-brief-conf" style={{ color: 'var(--text-muted)' }}>Confidence: 91% · <span className="ai-brief-action">Review Account</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            case 'control':
              return (
                <div className="manufacturer-cockpit">
                  <div className="cockpit-radar">
                    <div className="cockpit-radar-line"></div>
                  </div>
                  <div className="cockpit-volume-display">
                    <div className="cockpit-volume-val">₹4.8 Cr</div>
                    <div className="cockpit-volume-label">Unified Trade Volume Processed (30d)</div>
                  </div>
                  <div className="cockpit-status-grid">
                    <div className="cockpit-status-pill active">
                      ● AI Autopilot: ON
                    </div>
                    <div className="cockpit-status-pill active">
                      ● Sync State: NOMINAL
                    </div>
                    <div className="cockpit-status-pill">
                      0 Disputes Pending
                    </div>
                    <div className="cockpit-status-pill">
                      99.8% Sync Match
                    </div>
                  </div>
                </div>
              )
            default:
              return null
          }
        }

        // Left-side metrics panel depending on the step
        const renderSubMetrics = () => {
          switch (step.id) {
            case 'connection':
              return (
                <div className="chaos-audit-grid">
                  <div className="chaos-audit-card" style={{ background: 'rgba(255, 107, 0, 0.01)', borderColor: 'rgba(255, 107, 0, 0.15)' }}>
                    <div className="chaos-audit-val" style={{ color: 'var(--orange-primary)' }}>18/18</div>
                    <div className="chaos-audit-label">Distributors Syncing In Network</div>
                  </div>
                  <div className="chaos-audit-card" style={{ background: 'rgba(255, 107, 0, 0.01)', borderColor: 'rgba(255, 107, 0, 0.15)' }}>
                    <div className="chaos-audit-val" style={{ color: 'var(--orange-primary)' }}>100%</div>
                    <div className="chaos-audit-label">Integration Sync Coverage</div>
                  </div>
                </div>
              )
            case 'visibility':
              return (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Orders', color: '#FF6B00' },
                    { label: 'Payments', color: '#22C55E' },
                    { label: 'Invoices', color: '#3B82F6' },
                  ].map(item => (
                    <div key={item.label} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 14px',
                      background: `${item.color}08`,
                      border: `1px solid ${item.color}20`,
                      borderRadius: 8,
                      fontSize: '0.8125rem',
                      color: item.color,
                      fontWeight: 600,
                    }}>
                      <div style={{
                        width: 6, height: 6,
                        borderRadius: '50%',
                        background: item.color,
                        animation: 'pulse-dot 1.5s ease-in-out infinite',
                      }} />
                      {item.label}
                    </div>
                  ))}
                </div>
              )
            case 'intelligence':
              return (
                <div className="ai-console-logs">
                  <div className="ai-console-line">[AI Engine] Booting predictive scanning loop...</div>
                  <div className="ai-console-line">[Engine] Scanning 850 SKUs across 5 core hubs...</div>
                  <div className="ai-console-line">[Forecast] High probability of stockout on SKU "Fortune Oil"</div>
                  <div className="ai-console-line">[Credit-Scan] Aging balance check completed for Uttar Pradesh East</div>
                </div>
              )
            case 'control':
              return (
                <div className="chaos-audit-grid">
                  <div className="chaos-audit-card" style={{ background: 'rgba(34, 197, 94, 0.01)', borderColor: 'rgba(34, 197, 94, 0.15)' }}>
                    <div className="chaos-audit-val" style={{ color: 'var(--success)' }}>&lt; 150ms</div>
                    <div className="chaos-audit-label">Average Order Dispatch Latency</div>
                  </div>
                  <div className="chaos-audit-card" style={{ background: 'rgba(34, 197, 94, 0.01)', borderColor: 'rgba(34, 197, 94, 0.15)' }}>
                    <div className="chaos-audit-val" style={{ color: 'var(--success)' }}>99.4%</div>
                    <div className="chaos-audit-label">Auto-Reconciliation Accuracy</div>
                  </div>
                </div>
              )
            default:
              return null
          }
        }

        return (
          <section
            key={step.id}
            id={step.id}
            className="story-section"
            style={{
              background: idx % 2 === 0
                ? 'rgba(5,5,5,0.82)'
                : 'rgba(8,8,12,0.78)',
              position: 'relative',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <NetworkCanvas type={step.type} colors={step.colors} />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: isOdd
                  ? 'linear-gradient(270deg, rgba(5,5,5,0.88) 50%, rgba(5,5,5,0.45) 100%)'
                  : 'linear-gradient(90deg, rgba(5,5,5,0.88) 50%, rgba(5,5,5,0.45) 100%)',
                pointerEvents: 'none',
              }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
              <div className="story-grid">
                {/* Odd/Even alignment logic: Odd steps put the dashboard on Left, Text on Right. Even steps put Text on Left, Dashboard on Right. */}
                {isOdd ? (
                  <>
                    {/* Left Column: Dashboard Widget */}
                    <div>{renderWidget()}</div>

                    {/* Right Column: Context Content */}
                    <div>
                      <div className="section-label">
                        {step.number} — {step.label}
                      </div>
                      <div className="section-divider" />
                      <h2
                        className="story-headline"
                        style={{ whiteSpace: 'pre-line', marginBottom: '1.5rem' }}
                      >
                        {step.headline.split('\n').map((line, i, arr) => (
                          <span key={i}>
                            {i === arr.length - 1
                              ? <span className="text-gradient">{line}</span>
                              : <>{line}<br /></>
                            }
                          </span>
                        ))}
                      </h2>
                      <p className="story-body" style={{ marginBottom: '1.5rem' }}>{step.body}</p>
                      {renderSubMetrics()}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left Column: Context Content */}
                    <div>
                      <div className="section-label">
                        {step.number} — {step.label}
                      </div>
                      <div className="section-divider" />
                      <h2
                        className="story-headline"
                        style={{ whiteSpace: 'pre-line', marginBottom: '1.5rem' }}
                      >
                        {step.headline.split('\n').map((line, i, arr) => (
                          <span key={i}>
                            {i === arr.length - 1
                              ? <span className="text-gradient">{line}</span>
                              : <>{line}<br /></>
                            }
                          </span>
                        ))}
                      </h2>
                      <p className="story-body" style={{ marginBottom: '1.5rem' }}>{step.body}</p>
                      {renderSubMetrics()}
                    </div>

                    {/* Right Column: Dashboard Widget */}
                    <div>{renderWidget()}</div>
                  </>
                )}
              </div>
            </div>

            <div className="story-number">{step.number}</div>
          </section>
        )
      })}
    </>
  )
}
