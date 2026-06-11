const STOCK_ITEMS = [
  { name: 'Aashirvaad Atta 5kg', qty: 24, unit: 'bags', level: 30, status: 'low' },
  { name: 'Fortune Sunflower 1L', qty: 180, unit: 'btl', level: 75, status: 'high' },
  { name: 'Tata Salt 1kg', qty: 85, unit: 'packs', level: 55, status: 'med' },
  { name: 'Maggi 70g', qty: 340, unit: 'pkts', level: 88, status: 'high' },
  { name: 'Horlicks 200g', qty: 12, unit: 'jars', level: 18, status: 'low' },
]

export default function PhoneSection() {
  return (
    <section
      id="distributor"
      style={{
        padding: 'var(--section-padding)',
        background: 'linear-gradient(135deg, #050505 0%, #080510 100%)',
      }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}>
          {/* Text side */}
          <div>
            <div className="section-label">Distributor PWA</div>
            <div className="section-divider" />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}>
              Faster Than<br />
              <span className="text-gradient">A WhatsApp Voice Note.</span>
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Your distributors get a beautiful progressive web app. 
              Live stock levels, one-tap repeat orders, UPI payments, 
              WhatsApp deep links — all without downloading anything.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📊', title: 'Live Stock Bars', desc: 'Visual, color-coded stock levels updated in real time' },
                { icon: '🔁', title: 'Repeat Last Order', desc: 'Clone previous order in one tap — no typing needed' },
                { icon: '💳', title: 'UPI Payment', desc: 'Pay invoices directly via UPI from the app' },
                { icon: '💬', title: 'WhatsApp Deep Links', desc: 'Contact sales rep instantly via WhatsApp' },
              ].map(feature => (
                <div key={feature.title} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  transition: 'all 0.3s',
                }}>
                  <div style={{
                    width: 40, height: 40,
                    background: 'rgba(255,107,0,0.1)',
                    border: '1px solid rgba(255,107,0,0.2)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: 4 }}>{feature.title}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              {/* Glow behind phone */}
              <div style={{
                position: 'absolute',
                top: '20%', left: '50%',
                transform: 'translateX(-50%)',
                width: 200,
                height: 300,
                background: 'radial-gradient(ellipse, rgba(255,107,0,0.2) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }} />

              <div className="phone-outer">
                <div className="phone-inner">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    {/* Header */}
                    <div className="phone-header">
                      <div className="phone-brand">Credlize</div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: '0.65rem',
                        color: 'var(--success)',
                      }}>
                        <div style={{
                          width: 6, height: 6,
                          background: 'var(--success)',
                          borderRadius: '50%',
                          animation: 'pulse-dot 1.5s ease-in-out infinite',
                        }} />
                        Live
                      </div>
                    </div>

                    {/* Distributor name */}
                    <div style={{
                      padding: '0.5rem 0.75rem',
                      background: 'rgba(255,107,0,0.06)',
                      border: '1px solid rgba(255,107,0,0.12)',
                      borderRadius: 8,
                      marginBottom: '0.75rem',
                      fontSize: '0.7rem',
                    }}>
                      <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Distributor</div>
                      <div style={{ fontWeight: 600, color: '#fff' }}>Sharma Traders, Delhi</div>
                    </div>

                    {/* Stock items */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: '0.5rem',
                      }}>
                        Live Stock
                      </div>
                      {STOCK_ITEMS.map(item => (
                        <div key={item.name} className="phone-stock-bar">
                          <div className="stock-product">
                            <span className="stock-name">{item.name}</span>
                            <span className="stock-qty">{item.qty} {item.unit}</span>
                          </div>
                          <div className="stock-progress">
                            <div
                              className={`stock-bar-fill ${item.status}`}
                              style={{ width: `${item.level}%` }}
                            />
                          </div>
                          {item.status === 'low' && (
                            <div style={{
                              fontSize: '0.5625rem',
                              color: '#ef4444',
                              marginTop: 2,
                              fontWeight: 600,
                            }}>
                              ⚠ Low Stock — Reorder Now
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="phone-action-row">
                      <div className="phone-btn" id="phone-repeat-order-btn">🔁 Repeat Order</div>
                      <div className="phone-btn" id="phone-new-order-btn">+ New Order</div>
                    </div>
                    <div className="phone-action-row" style={{ marginTop: '0.5rem' }}>
                      <div className="phone-btn" id="phone-upi-btn" style={{
                        background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        color: '#3B82F6',
                      }}>
                        💳 Pay via UPI
                      </div>
                      <div className="phone-whatsapp-btn" id="phone-whatsapp-btn">
                        💬 WhatsApp
                      </div>
                    </div>
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
