import { useEffect, useRef } from 'react'

const MESSAGES = [
  {
    type: 'outgoing',
    label: 'auto',
    labelText: 'Credlize Auto',
    text: '✅ Order #2847 from Sharma Traders has been APPROVED. 48 units dispatched.',
    time: '09:14 AM',
  },
  {
    type: 'incoming',
    label: 'system',
    labelText: 'System Generated',
    text: '📄 Invoice #INV-2847 has been generated. ₹48,600 due in 30 days.',
    time: '09:14 AM',
  },
  {
    type: 'outgoing',
    label: 'auto',
    labelText: 'Credlize Auto',
    text: '⚠️ Payment Reminder: ₹1,20,000 due from Patel Distributors in 3 days.',
    time: '10:00 AM',
  },
  {
    type: 'incoming',
    label: 'system',
    labelText: 'System Generated',
    text: '📦 Aashirvaad Atta 5kg is BACK IN STOCK. 240 bags available.',
    time: '11:30 AM',
  },
  {
    type: 'outgoing',
    label: 'auto',
    labelText: 'Credlize Auto',
    text: '🔁 Reorder Reminder: Tata Salt 1kg running low at Gupta Traders. Last ordered 18 days ago.',
    time: '02:00 PM',
  },
]

export default function WhatsAppSection() {
  const sectionRef = useRef(null)
  const msgsRef = useRef(null)

  useEffect(() => {
    const msgs = msgsRef.current
    if (!msgs) return

    const bubbles = msgs.querySelectorAll('.msg-bubble')
    let visible = false

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true
          bubbles.forEach((b, i) => {
            setTimeout(() => b.classList.add('visible'), i * 500)
          })
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding)',
        background: 'linear-gradient(180deg, #080510 0%, #050505 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', right: '-10%',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(37, 211, 102, 0.08) 0%, transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}>
          {/* Messages visualization */}
          <div>
            {/* WhatsApp-style header */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              overflow: 'hidden',
              maxWidth: 480,
            }}>
              {/* Chat header */}
              <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(37,211,102,0.05)',
              }}>
                <div style={{
                  width: 36, height: 36,
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>
                  💬
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Credlize Automation</div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <div style={{
                      width: 6, height: 6,
                      background: '#25D366',
                      borderRadius: '50%',
                      animation: 'pulse-dot 1.5s ease-in-out infinite',
                    }} />
                    Active
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Today
                </div>
              </div>

              {/* Messages */}
              <div
                ref={msgsRef}
                className="message-flow"
                style={{
                  padding: '1.5rem',
                  margin: 0,
                  maxHeight: 460,
                  overflowY: 'auto',
                }}
              >
                {MESSAGES.map((msg, i) => (
                  <div
                    key={i}
                    className={`msg-bubble ${msg.type}`}
                    style={{
                      animation: 'none',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: 'all 0.5s var(--ease-out-expo)',
                    }}
                  >
                    <div className={`msg-label ${msg.label}`}>{msg.labelText}</div>
                    <div style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{msg.text}</div>
                    <div style={{
                      fontSize: '0.625rem',
                      color: 'var(--text-muted)',
                      marginTop: 4,
                      textAlign: 'right',
                    }}>
                      {msg.time} ✓✓
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div className="section-label">WhatsApp Automation</div>
            <div className="section-divider" />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}>
              Your Business<br />
              <span className="text-gradient">Talks Automatically.</span>
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Stop spending time sending manual messages. Credlize automatically 
              sends the right message at the right time — across your entire 
              distributor network.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { emoji: '✅', text: 'Order approved notifications' },
                { emoji: '📄', text: 'Invoice generated & shared' },
                { emoji: '⚠️', text: 'Payment due reminders' },
                { emoji: '📦', text: 'Back in stock alerts' },
                { emoji: '🔁', text: 'Automated reorder nudges' },
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  fontSize: '0.9375rem',
                }}>
                  <span>{item.emoji}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .msg-bubble.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  )
}
