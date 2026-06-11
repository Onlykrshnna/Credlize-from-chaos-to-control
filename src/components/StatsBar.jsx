import { useRef, useEffect, useState } from 'react'

const STATS = [
  { value: '2,400+', label: 'Active Distributors' },
  { value: '₹180Cr', label: 'Orders Processed' },
  { value: '99.8%', label: 'Uptime' },
  { value: '4.2×', label: 'Faster Order Cycles' },
]

export default function StatsBar() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="stat-item"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
