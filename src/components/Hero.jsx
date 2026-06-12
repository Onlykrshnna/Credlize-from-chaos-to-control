import { useEffect, useRef } from 'react'

const INFRA_PANELS = [
  { id: 'order-board',  x: 900,  y: 60,  w: 300, h: 200, label: 'Order Management', content: 'orders'   },
  { id: 'invoice-feed', x: 960,  y: 310, w: 260, h: 185, label: 'Invoice Tracker',   content: 'invoices' },
  { id: 'ai-brief',    x: 930,  y: 530, w: 280, h: 140, label: 'AI Morning Brief',  content: 'ai'       },
  { id: 'payment-feed',x: 130,  y: 290, w: 240, h: 165, label: 'Payment Feed',      content: 'payments' },
  { id: 'network-map', x: 100,  y: 55,  w: 270, h: 200, label: 'Network Status',    content: 'network'  },
]

function PanelContent({ type }) {
  if (type === 'orders') return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      {[
        { id:'ORD-9842', buyer:'Sharma Traders', status:'confirmed',  color:'#22C55E' },
        { id:'ORD-9843', buyer:'Patel & Sons',   status:'dispatched', color:'#3B82F6' },
        { id:'ORD-9844', buyer:'Verma Agencies', status:'pending',    color:'#FF6B00' },
        { id:'ORD-9845', buyer:'Royal Agro',     status:'confirmed',  color:'#22C55E' },
      ].map(o => (
        <div key={o.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'5px 8px', background:'rgba(255,255,255,0.05)', borderRadius:6, border:'1px solid rgba(255,255,255,0.09)' }}>
          <span style={{ fontFamily:'monospace', fontSize:10, color:'rgba(255,255,255,0.45)' }}>{o.id}</span>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.8)', flex:1, marginLeft:8 }}>{o.buyer}</span>
          <span style={{ fontSize:10, fontWeight:700, color:o.color }}>{o.status}</span>
        </div>
      ))}
    </div>
  )
  if (type === 'invoices') return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      {[
        { id:'INV-4412', date:'11 Jun', amt:'₹1,20,500', paid:true  },
        { id:'INV-4410', date:'09 Jun', amt:'₹45,200',   paid:false },
        { id:'INV-4408', date:'06 Jun', amt:'₹2,10,000', paid:true  },
        { id:'INV-4405', date:'02 Jun', amt:'₹86,000',   paid:false },
      ].map(inv => (
        <div key={inv.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 8px', background:'rgba(255,255,255,0.05)', borderRadius:6, border:'1px solid rgba(255,255,255,0.09)' }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:inv.paid?'#22C55E':'#EF4444', flexShrink:0, boxShadow: inv.paid?'0 0 6px #22C55E':'0 0 6px #EF4444' }} />
          <span style={{ fontFamily:'monospace', fontSize:10, color:'rgba(255,255,255,0.45)', flexShrink:0 }}>{inv.id}</span>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.55)', flex:1 }}>{inv.date}</span>
          <span style={{ fontSize:10, fontWeight:600, color:inv.paid?'#22C55E':'rgba(255,255,255,0.7)' }}>{inv.amt}</span>
        </div>
      ))}
    </div>
  )
  if (type === 'ai') return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      {[
        { icon:'⚠️', label:'Stockout Alert',  msg:'Fortune Oil · Delhi · 3 days',  color:'#EF4444' },
        { icon:'📈', label:'Demand Spike',    msg:'Gujarat +34% next week',         color:'#FF6B00' },
        { icon:'💳', label:'Credit Risk',     msg:'Verma Agencies · 42d overdue',  color:'#EAB308' },
      ].map(a => (
        <div key={a.label} style={{ display:'flex', gap:8, alignItems:'flex-start', padding:'6px 8px', background:'rgba(255,255,255,0.05)', borderRadius:6, border:`1px solid ${a.color}40` }}>
          <span style={{ fontSize:11 }}>{a.icon}</span>
          <div>
            <div style={{ fontSize:9, fontWeight:700, color:a.color, textTransform:'uppercase', letterSpacing:'0.05em' }}>{a.label}</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.65)', marginTop:1 }}>{a.msg}</div>
          </div>
        </div>
      ))}
    </div>
  )
  if (type === 'payments') return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      {[
        { id:'PAY-1104', from:'Royal Agro',     amt:'₹2,10,000', done:true  },
        { id:'PAY-1103', from:'Patel & Sons',   amt:'₹45,200',   done:true  },
        { id:'PAY-1102', from:'Sharma Traders', amt:'₹1,20,500', done:false },
        { id:'PAY-1101', from:'Verma Agencies', amt:'₹86,000',   done:false },
      ].map(p => (
        <div key={p.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 8px', background:'rgba(255,255,255,0.05)', borderRadius:6, border:'1px solid rgba(255,255,255,0.09)' }}>
          <span style={{ fontSize:10, color:p.done?'#22C55E':'#FF6B00' }}>{p.done?'✓':'⏳'}</span>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.8)', flex:1 }}>{p.from}</span>
          <span style={{ fontSize:10, fontWeight:600, color:p.done?'#22C55E':'rgba(255,255,255,0.6)' }}>{p.amt}</span>
        </div>
      ))}
    </div>
  )
  if (type === 'network') return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
        <span style={{ fontSize:9, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Active Nodes</span>
        <span style={{ fontSize:12, fontWeight:700, color:'#22C55E' }}>18 / 18</span>
      </div>
      {[
        { name:'Sharma Traders', region:'Delhi NCR' },
        { name:'Patel & Sons',   region:'Ahmedabad' },
        { name:'Verma Agencies', region:'Lucknow'   },
        { name:'Royal Agro',     region:'Mumbai'    },
        { name:'Karan Agencies', region:'Kolkata'   },
      ].map(n => (
        <div key={n.name} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 8px', background:'rgba(255,255,255,0.03)', borderRadius:5 }}>
          <div style={{ width:5, height:5, borderRadius:'50%', background:'#22C55E', boxShadow:'0 0 6px #22C55E', flexShrink:0 }} />
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.78)', flex:1 }}>{n.name}</span>
          <span style={{ fontSize:9, color:'rgba(255,255,255,0.35)' }}>{n.region}</span>
        </div>
      ))}
    </div>
  )
  return null
}

export default function Hero() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const heroRef   = useRef(null)
  const panelRefs = useRef([])

  // ── Canvas: smoke + sunlight god rays ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Smoke puffs ────────────────────────────────────────────────────────
    // [r, g, b, opacity, scaleX, scaleY, startXpct, startYpct]
    const PUFF_DEFS = [
      [70,  20, 140, 0.22, 1.5, 0.8,  0.15, 0.30],
      [50,  10,  100, 0.18, 1.0, 1.2,  0.30, 0.55],
      [90,  25, 160, 0.16, 1.7, 0.65, 0.55, 0.70],
      [30,   8,  70, 0.24, 1.1, 1.0,  0.70, 0.40],
      [60,  15, 120, 0.20, 0.9, 1.3,  0.80, 0.60],
      [20,   5,  55, 0.22, 1.3, 0.9,  0.45, 0.25],
      [80,  22, 150, 0.14, 1.6, 0.7,  0.10, 0.65],
      [40,  10,  90, 0.19, 1.2, 1.1,  0.65, 0.20],
      // warm orange wisps to echo the logo
      [130, 40,   5, 0.13, 1.4, 0.6,  0.50, 0.50],
      [100, 30,   5, 0.11, 1.0, 0.9,  0.25, 0.45],
      [110, 35,   5, 0.10, 1.6, 0.5,  0.75, 0.65],
      // blue-violet accent
      [20,  20,  90, 0.16, 1.2, 1.0,  0.40, 0.80],
      [15,  15,  70, 0.18, 0.9, 1.2,  0.85, 0.30],
    ]

    const puffs = PUFF_DEFS.map(([r, g, b, op, sx, sy, px, py]) => ({
      x:     px * window.innerWidth,
      y:     py * window.innerHeight * 1.4,
      baseR: 230 + Math.random() * 280,
      vx:   (Math.random() - 0.5) * 0.14,
      vy:   (Math.random() - 0.5) * 0.09,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0005 + Math.random() * 0.0009,
      op, r, g, b, sx, sy,
    }))

    // ── God-ray beams from top-right corner ───────────────────────────────
    // Each beam is an angle range emanating from (W, 0)
    const BEAM_COUNT = 9
    const beams = Array.from({ length: BEAM_COUNT }, (_, i) => ({
      // angles spread from ~200° to ~260° (pointing down-left from top-right)
      angle:     (200 + i * 8 + Math.random() * 5) * Math.PI / 180,
      width:     (1.5 + Math.random() * 3.5) * Math.PI / 180,  // beam spread in radians
      opacity:   0.03 + Math.random() * 0.055,
      length:    1600 + Math.random() * 500,
      phase:     Math.random() * Math.PI * 2,
      speed:     0.0003 + Math.random() * 0.0005,
      // warm white-to-orange color
      warm:      Math.random() > 0.4,
    }))

    let frame = 0

    const draw = () => {
      frame++
      const w = canvas.width
      const h = canvas.height

      // ── 1. Dark base ──────────────────────────────────────────────────────
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, w, h)

      // ── 2. Smoke puffs ────────────────────────────────────────────────────
      for (const p of puffs) {
        p.phase += p.speed
        p.x += p.vx + Math.sin(p.phase * 0.7) * 0.12
        p.y += p.vy + Math.cos(p.phase * 0.5) * 0.09

        if (p.x < -p.baseR * 2) p.x = w + p.baseR
        if (p.x > w + p.baseR * 2) p.x = -p.baseR
        if (p.y < -p.baseR * 2) p.y = h + p.baseR
        if (p.y > h + p.baseR * 2) p.y = -p.baseR

        const breathe = 1 + Math.sin(p.phase) * 0.07
        const rx = p.baseR * p.sx * breathe
        const ry = p.baseR * p.sy * breathe

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.scale(rx / p.baseR, ry / p.baseR)

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.baseR)
        grad.addColorStop(0,    `rgba(${p.r},${p.g},${p.b},${p.op})`)
        grad.addColorStop(0.4,  `rgba(${p.r},${p.g},${p.b},${p.op * 0.5})`)
        grad.addColorStop(1,    `rgba(${p.r},${p.g},${p.b},0)`)

        ctx.beginPath()
        ctx.arc(0, 0, p.baseR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()
      }

      // ── 3. Sun glow at top-right corner ──────────────────────────────────
      const sunX = w * 0.96
      const sunY = -20

      // Core sun halo
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 420)
      sunGlow.addColorStop(0,    'rgba(255, 220, 140, 0.28)')
      sunGlow.addColorStop(0.15, 'rgba(255, 160,  60, 0.18)')
      sunGlow.addColorStop(0.40, 'rgba(200,  80,  20, 0.09)')
      sunGlow.addColorStop(0.70, 'rgba(120,  30,  10, 0.04)')
      sunGlow.addColorStop(1,    'rgba(0,     0,   0, 0)')
      ctx.beginPath()
      ctx.arc(sunX, sunY, 420, 0, Math.PI * 2)
      ctx.fillStyle = sunGlow
      ctx.fill()

      // Inner bright core
      const sunCore = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 90)
      sunCore.addColorStop(0,   'rgba(255, 240, 200, 0.55)')
      sunCore.addColorStop(0.4, 'rgba(255, 180,  80, 0.20)')
      sunCore.addColorStop(1,   'rgba(255, 120,  20, 0)')
      ctx.beginPath()
      ctx.arc(sunX, sunY, 90, 0, Math.PI * 2)
      ctx.fillStyle = sunCore
      ctx.fill()

      // ── 4. God rays (volumetric light beams) ─────────────────────────────
      ctx.save()
      ctx.globalCompositeOperation = 'screen'  // light blending

      for (const beam of beams) {
        beam.phase += beam.speed
        // Gentle shimmer
        const shimmer = 1 + Math.sin(beam.phase) * 0.25
        const op = beam.opacity * shimmer

        const halfW = beam.width / 2
        const angle1 = beam.angle - halfW
        const angle2 = beam.angle + halfW
        const len    = beam.length

        // Beam tip points
        const x1 = sunX + Math.cos(angle1) * len
        const y1 = sunY + Math.sin(angle1) * len
        const x2 = sunX + Math.cos(angle2) * len
        const y2 = sunY + Math.sin(angle2) * len

        // Mid of the far edge for gradient
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2

        const beamGrad = ctx.createLinearGradient(sunX, sunY, mx, my)
        if (beam.warm) {
          beamGrad.addColorStop(0,   `rgba(255, 200, 100, ${op * 2.5})`)
          beamGrad.addColorStop(0.25, `rgba(255, 160,  60, ${op})`)
          beamGrad.addColorStop(0.6,  `rgba(200, 100,  20, ${op * 0.4})`)
          beamGrad.addColorStop(1,    `rgba(100,  40,   5, 0)`)
        } else {
          beamGrad.addColorStop(0,   `rgba(255, 240, 200, ${op * 2})`)
          beamGrad.addColorStop(0.3,  `rgba(255, 220, 160, ${op * 0.7})`)
          beamGrad.addColorStop(0.7,  `rgba(200, 180, 120, ${op * 0.2})`)
          beamGrad.addColorStop(1,    `rgba(100,  80,  40, 0)`)
        }

        ctx.beginPath()
        ctx.moveTo(sunX, sunY)
        ctx.lineTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.closePath()
        ctx.fillStyle = beamGrad
        ctx.fill()
      }
      ctx.restore()

      // ── 5. Vignette ───────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.35, w * 0.08, w * 0.5, h * 0.35, w * 0.85)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.65)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  // ── Panel proximity reveal ──────────────────────────────────────────────────
  // Default: opacity 0.45, blur 4px — clearly readable ghost
  // Hover peak: opacity 0.88, blur 1.5px — almost fully sharp
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      panelRefs.current.forEach((el, idx) => {
        if (!el) return
        const p = INFRA_PANELS[idx]
        const pcx = p.x + p.w / 2
        const pcy = p.y + p.h / 2
        const dist = Math.sqrt((mx - pcx) ** 2 + (my - pcy) ** 2)
        const maxDist = 380
        const t = Math.max(0, 1 - dist / maxDist)
        const ease = t * t * (3 - 2 * t)

        el.style.opacity   = 0.45 + ease * 0.43        // 0.45 → 0.88
        el.style.filter    = `blur(${4 - ease * 2.5}px)` // 4px → 1.5px
        el.style.transform = `scale(${0.98 + ease * 0.02})`
      })
    }

    const onLeave = () => {
      panelRefs.current.forEach(el => {
        if (!el) return
        el.style.opacity   = '0.45'
        el.style.filter    = 'blur(4px)'
        el.style.transform = 'scale(0.98)'
      })
    }

    hero.addEventListener('mousemove',  onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove',  onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      className="hero"
      id="home"
      ref={heroRef}
      style={{ position:'relative', overflow:'hidden', cursor:'default' }}
    >
      {/* Smoke + God Ray canvas */}
      <canvas
        ref={canvasRef}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, display:'block' }}
      />

      {/* ── Infrastructure panels ── */}
      {INFRA_PANELS.map((panel, i) => (
        <div
          key={panel.id}
          ref={el => panelRefs.current[i] = el}
          className="hero-infra-panel"
          style={{
            position:      'absolute',
            left:          panel.x,
            top:           panel.y,
            width:         panel.w,
            zIndex:        2,
            opacity:       0.45,
            filter:        'blur(4px)',
            transform:     'scale(0.98)',
            transition:    'opacity 0.35s ease, filter 0.35s ease, transform 0.35s ease',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            background:     'rgba(10,10,16,0.88)',
            border:         '1px solid rgba(255,255,255,0.13)',
            borderRadius:   12,
            overflow:       'hidden',
            boxShadow:      '0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}>
            <div style={{ padding:'9px 12px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', gap:7 }}>
              <div style={{ display:'flex', gap:4 }}>
                {[0,1,2].map(j => (
                  <div key={j} style={{ width:7, height:7, borderRadius:'50%', background:'rgba(255,255,255,0.12)' }} />
                ))}
              </div>
              <span style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginLeft:4 }}>
                {panel.label}
              </span>
              <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:4 }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:'#22C55E', boxShadow:'0 0 6px #22C55E' }} />
                <span style={{ fontSize:9, color:'#22C55E', fontWeight:600 }}>LIVE</span>
              </div>
            </div>
            <div style={{ padding:'10px 12px' }}>
              <PanelContent type={panel.content} />
            </div>
          </div>
        </div>
      ))}

      {/* ── Hero text ── */}
      <div className="hero-content" style={{ position:'relative', zIndex:10 }}>
        <div className="hero-eyebrow">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill="#FF6B00" />
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

        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
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
                <path d="M2 5L4 7L8 3" stroke="#FF6B00" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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
