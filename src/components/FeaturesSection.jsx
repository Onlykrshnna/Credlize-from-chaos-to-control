import { useRef, useState, useEffect } from 'react'

const CLUSTERS = [
  {
    id: 'inventory',
    icon: '📦',
    title: 'Inventory',
    color: '#FF6B00',
    items: [
      { label: 'Live Stock Bars', desc: 'Real-time visual stock levels per SKU' },
      { label: 'AI Paper Upload', desc: 'Photograph register → instant inventory' },
      { label: 'Low Stock Alerts', desc: 'Automated reorder triggers & notifications' },
      { label: 'Multi-warehouse', desc: 'Manage across locations in one view' },
    ],
    gradient: 'from-orange-500/10 to-transparent',
  },
  {
    id: 'orders',
    icon: '🔄',
    title: 'Orders',
    color: '#FF8A26',
    items: [
      { label: 'Order Management', desc: 'One-tap order creation, edit and dispatch' },
      { label: 'Order Clone', desc: 'Repeat last order with one click' },
      { label: 'Order Tracking', desc: 'Live status from creation to delivery' },
      { label: 'Route Optimisation', desc: 'AI-suggested delivery routing' },
    ],
    gradient: 'from-amber-500/10 to-transparent',
  },
  {
    id: 'payments',
    icon: '💳',
    title: 'Payments',
    color: '#22C55E',
    items: [
      { label: 'Ledgers', desc: 'Live running balances per distributor' },
      { label: 'Credit Limits', desc: 'Automated credit exposure controls' },
      { label: 'UPI Collection', desc: 'Direct UPI payment links per invoice' },
      { label: 'Overdue Alerts', desc: 'Automated payment reminder sequences' },
    ],
    gradient: 'from-green-500/10 to-transparent',
  },
  {
    id: 'intelligence',
    icon: '🤖',
    title: 'Intelligence',
    color: '#3B82F6',
    items: [
      { label: 'Morning Brief', desc: 'AI-generated daily operations summary' },
      { label: 'Relationship Score', desc: 'Distributor health & engagement scoring' },
      { label: 'Demand Memory', desc: 'AI learns seasonal & cyclical patterns' },
      { label: 'AI Insights', desc: 'Proactive anomaly detection & forecasting' },
    ],
    gradient: 'from-blue-500/10 to-transparent',
  },
]

function ClusterCard({ cluster }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      className="feature-cluster"
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.4s, box-shadow 0.4s, background 0.4s',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial hover glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${cluster.color}10 0%, transparent 60%)`,
        borderRadius: 20,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      <div className="cluster-icon">
        <span style={{ fontSize: '1.375rem' }}>{cluster.icon}</span>
      </div>

      <h3 className="cluster-title" style={{ color: hovered ? cluster.color : '#fff', transition: 'color 0.3s' }}>
        {cluster.title}
      </h3>

      <div className="cluster-items">
        {cluster.items.map((item, i) => (
          <div
            key={item.label}
            className="cluster-item"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-10px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.08}s, transform 0.4s ease ${0.1 + i * 0.08}s`,
            }}
          >
            <div className="cluster-item-dot" style={{ background: cluster.color }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: hovered ? '100%' : '0%',
        height: 2,
        background: `linear-gradient(90deg, ${cluster.color}, transparent)`,
        borderRadius: '0 0 20px 20px',
        transition: 'width 0.4s var(--ease-out-expo)',
      }} />
    </div>
  )
}

export default function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-label">Platform Features</div>
        <div className="section-divider" />

        <div className="features-header-grid">
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}>
              Every Tool<br />
              <span className="text-gradient">Your Team Needs.</span>
            </h2>
          </div>
          <div>
            <p className="features-header-desc">
              Four interconnected modules that form a complete operating 
              system for manufacturer–distributor trade. Not disconnected tools 
              — one living platform.
            </p>
          </div>
        </div>

        <div className="features-grid">
          {CLUSTERS.map(cluster => (
            <ClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </div>
    </section>
  )
}
