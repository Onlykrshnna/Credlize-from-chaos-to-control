import { useEffect, useRef } from 'react'

// ── Chip nodes spread across full page height (~12000px) ──────────────────────
const NODES = [
  // Hero area
  { id:'n1',  x:110,  y:100,   label:'AUTH-GW'  },
  { id:'n2',  x:400,  y:195,   label:'CPU-MAIN' },
  { id:'n3',  x:1075, y:130,   label:'NET-CTRL' },
  { id:'n4',  x:1300, y:325,   label:'SEC-01'   },
  { id:'n5',  x:245,  y:490,   label:'MEM-A'    },
  { id:'n6',  x:765,  y:465,   label:'BUS-00'   },
  // Chaos section (~900-1900)
  { id:'n7',  x:140,  y:1060,  label:'RAM-01'   },
  { id:'n8',  x:595,  y:985,   label:'PCH'      },
  { id:'n9',  x:1165, y:1085,  label:'GPU-A'    },
  { id:'n10', x:345,  y:1530,  label:'SSD-01'   },
  { id:'n11', x:965,  y:1590,  label:'USB-CTRL' },
  // StoryFlow (~2000-5000)
  { id:'n12', x:195,  y:2210,  label:'IO-HUB'   },
  { id:'n13', x:745,  y:2510,  label:'CLK-SRC'  },
  { id:'n14', x:1215, y:2790,  label:'PWR-01'   },
  { id:'n15', x:395,  y:3290,  label:'RAID-C'   },
  { id:'n16', x:1115, y:3580,  label:'NIC-01'   },
  { id:'n17', x:195,  y:4190,  label:'BIOS-ROM' },
  { id:'n18', x:895,  y:4490,  label:'THERM-01' },
  // Features section (~5500-7000)
  { id:'n19', x:495,  y:5660,  label:'CPU-B'    },
  { id:'n20', x:1265, y:5990,  label:'MEM-B'    },
  { id:'n21', x:175,  y:6800,  label:'SSD-02'   },
  { id:'n22', x:795,  y:7160,  label:'PCIe-01'  },
  // AI / Phone / WhatsApp sections (~7500-9500)
  { id:'n23', x:1315, y:7770,  label:'USB-HUB'  },
  { id:'n24', x:345,  y:8490,  label:'PWR-02'   },
  { id:'n25', x:945,  y:8990,  label:'NET-02'   },
  // Testimonials / CTA / Footer (~9500+)
  { id:'n26', x:595,  y:9820,  label:'MAIN-BUS' },
  { id:'n27', x:205,  y:10490, label:'I2C-CTRL' },
  { id:'n28', x:1095, y:10790, label:'HDMI-TX'  },
]

// ── Connections between nodes ─────────────────────────────────────────────────
// s: 'H' = horizontal-first L-path, 'V' = vertical-first L-path
// c: 'o' orange, 'b' blue, 'g' green
const CONNS = [
  // Hero cluster
  { a:'n1',  b:'n2',  s:'H', c:'o' },
  { a:'n2',  b:'n3',  s:'V', c:'o' },
  { a:'n3',  b:'n4',  s:'H', c:'b' },
  { a:'n2',  b:'n5',  s:'V', c:'o' },
  { a:'n5',  b:'n6',  s:'H', c:'o' },
  { a:'n6',  b:'n3',  s:'V', c:'b' },
  { a:'n1',  b:'n5',  s:'V', c:'g' },
  // Hero → Chaos
  { a:'n6',  b:'n8',  s:'V', c:'o' },
  { a:'n4',  b:'n9',  s:'V', c:'b' },
  { a:'n5',  b:'n7',  s:'V', c:'g' },
  // Chaos cluster
  { a:'n7',  b:'n8',  s:'H', c:'o' },
  { a:'n8',  b:'n9',  s:'H', c:'b' },
  { a:'n8',  b:'n10', s:'V', c:'o' },
  { a:'n9',  b:'n11', s:'V', c:'b' },
  { a:'n10', b:'n11', s:'H', c:'o' },
  // Chaos → Story
  { a:'n10', b:'n12', s:'V', c:'o' },
  { a:'n11', b:'n13', s:'V', c:'b' },
  { a:'n9',  b:'n14', s:'V', c:'g' },
  // Story cluster
  { a:'n12', b:'n13', s:'H', c:'o' },
  { a:'n13', b:'n14', s:'H', c:'b' },
  { a:'n13', b:'n15', s:'V', c:'o' },
  { a:'n14', b:'n16', s:'V', c:'b' },
  { a:'n15', b:'n16', s:'H', c:'o' },
  { a:'n15', b:'n17', s:'V', c:'o' },
  { a:'n16', b:'n18', s:'V', c:'b' },
  { a:'n17', b:'n18', s:'H', c:'g' },
  // Story → Features
  { a:'n17', b:'n19', s:'V', c:'o' },
  { a:'n18', b:'n20', s:'V', c:'b' },
  // Features cluster
  { a:'n19', b:'n20', s:'H', c:'o' },
  { a:'n19', b:'n21', s:'V', c:'g' },
  { a:'n20', b:'n22', s:'V', c:'b' },
  { a:'n21', b:'n22', s:'H', c:'o' },
  { a:'n22', b:'n23', s:'H', c:'b' },
  { a:'n22', b:'n24', s:'V', c:'o' },
  { a:'n23', b:'n25', s:'V', c:'b' },
  { a:'n24', b:'n25', s:'H', c:'o' },
  // Lower sections
  { a:'n25', b:'n26', s:'V', c:'o' },
  { a:'n26', b:'n27', s:'H', c:'g' },
  { a:'n26', b:'n28', s:'H', c:'b' },
  { a:'n27', b:'n28', s:'V', c:'o' },
]

// ── Color palette ─────────────────────────────────────────────────────────────
const COL = {
  o: { trace:'rgba(255,107,0,0.18)',   via:'rgba(255,130,40,0.45)',  sig:[255,140,50]  },
  b: { trace:'rgba(59,130,246,0.14)',  via:'rgba(80,150,255,0.40)', sig:[90,165,255]  },
  g: { trace:'rgba(34,197,94,0.12)',   via:'rgba(50,220,100,0.38)', sig:[55,220,105]  },
}

// ── Signal position along orthogonal L-path ───────────────────────────────────
function sigPos(nA, nB, style, progress) {
  if (style === 'H') {
    const s1 = Math.abs(nB.x - nA.x)
    const s2 = Math.abs(nB.y - nA.y)
    const total = s1 + s2 || 1
    const d = progress * total
    if (d <= s1) return { x: nA.x + (nB.x - nA.x) * (d / (s1 || 1)), y: nA.y }
    return { x: nB.x, y: nA.y + (nB.y - nA.y) * ((d - s1) / (s2 || 1)) }
  } else {
    const s1 = Math.abs(nB.y - nA.y)
    const s2 = Math.abs(nB.x - nA.x)
    const total = s1 + s2 || 1
    const d = progress * total
    if (d <= s1) return { x: nA.x, y: nA.y + (nB.y - nA.y) * (d / (s1 || 1)) }
    return { x: nA.x + (nB.x - nA.x) * ((d - s1) / (s2 || 1)), y: nB.y }
  }
}

// ── Build node map & pre-create signals ───────────────────────────────────────
const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))

const SIGNALS = []
CONNS.forEach((conn, idx) => {
  const count = 1 + (idx % 3 === 0 ? 1 : 0)   // some traces carry 2 signals
  for (let k = 0; k < count; k++) {
    SIGNALS.push({
      ci:  idx,
      p:   (k / count + Math.random() * 0.15) % 1,
      spd: 0.0006 + Math.random() * 0.001,
    })
  }
})

// ── Component ─────────────────────────────────────────────────────────────────
export default function CircuitBackground() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Scale factor: circuit was designed for 1440px wide — scale x positions on narrow screens
    const getScale = () => Math.min(1, window.innerWidth / 1440)

    const GRID = 36   // PCB substrate dot spacing

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const scrollY = window.scrollY

      ctx.clearRect(0, 0, W, H)

      // ── 1. PCB grid dots (in viewport space — fixed pattern, no scroll) ──
      ctx.fillStyle = 'rgba(255,107,0,0.055)'
      for (let gx = (scrollY * 0.4) % GRID; gx < W; gx += GRID) {
        for (let gy = 0; gy < H; gy += GRID) {
          ctx.fillRect(gx, gy, 1.5, 1.5)
        }
      }

      // ── Translate everything else with the page scroll ──
      ctx.save()
      const sx = getScale()
      // Scale x axis for narrow screens; y stays in page coords
      ctx.translate(0, -scrollY)
      if (sx < 1) ctx.scale(sx, 1)

      // ── 2. Traces ────────────────────────────────────────────────────────
      ctx.lineWidth = 1.2
      for (const conn of CONNS) {
        const a = nodeMap[conn.a]
        const b = nodeMap[conn.b]
        const col = COL[conn.c]

        ctx.strokeStyle = col.trace
        ctx.beginPath()

        if (conn.s === 'H') {
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, a.y)
          ctx.lineTo(b.x, b.y)
        } else {
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(a.x, b.y)
          ctx.lineTo(b.x, b.y)
        }
        ctx.stroke()

        // Via dot at the corner bend
        const viaX = conn.s === 'H' ? b.x : a.x
        const viaY = conn.s === 'H' ? a.y : b.y
        ctx.beginPath()
        ctx.arc(viaX, viaY, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = col.via
        ctx.fill()
      }

      // ── 3. Chip nodes ────────────────────────────────────────────────────
      for (const node of NODES) {
        const W2 = 36, H2 = 16
        // Board pad lines (like IC legs)
        ctx.strokeStyle = 'rgba(255,107,0,0.20)'
        ctx.lineWidth = 0.8
        for (let px = 0; px < 4; px++) {
          const padX = node.x - W2/2 + 5 + px * 9
          ctx.beginPath()
          ctx.moveTo(padX, node.y - H2/2 - 5)
          ctx.lineTo(padX, node.y - H2/2)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(padX, node.y + H2/2)
          ctx.lineTo(padX, node.y + H2/2 + 5)
          ctx.stroke()
        }

        // Chip body
        ctx.fillStyle = 'rgba(8,8,14,0.92)'
        ctx.strokeStyle = 'rgba(255,107,0,0.28)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(node.x - W2/2, node.y - H2/2, W2, H2, 2)
        ctx.fill()
        ctx.stroke()

        // Pin-1 marker
        ctx.fillStyle = 'rgba(255,107,0,0.5)'
        ctx.beginPath()
        ctx.arc(node.x - W2/2 + 4, node.y - H2/2 + 4, 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.32)'
        ctx.font = 'bold 6.5px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.label, node.x, node.y)
      }

      // ── 4. Signal pulses ─────────────────────────────────────────────────
      for (const sig of SIGNALS) {
        sig.p += sig.spd
        if (sig.p > 1) sig.p = 0

        const conn = CONNS[sig.ci]
        const a = nodeMap[conn.a]
        const b = nodeMap[conn.b]
        const { x, y } = sigPos(a, b, conn.s, sig.p)
        const [sr, sg, sb] = COL[conn.c].sig

        // Check if within viewport vertically (optimization: skip if not visible)
        if (y < scrollY - 20 || y > scrollY + H + 20) continue

        // Outer glow
        ctx.shadowBlur  = 10
        ctx.shadowColor = `rgba(${sr},${sg},${sb},0.8)`
        ctx.fillStyle   = `rgba(${sr},${sg},${sb},0.9)`
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Bright core
        ctx.shadowBlur  = 0
        ctx.fillStyle   = `rgba(255,255,255,0.95)`
        ctx.beginPath()
        ctx.arc(x, y, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.shadowBlur = 0
      ctx.restore()

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100%',
        height:        '100%',
        zIndex:        0,
        pointerEvents: 'none',
        display:       'block',
      }}
    />
  )
}
