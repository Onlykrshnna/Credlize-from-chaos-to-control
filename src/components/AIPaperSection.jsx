import { useRef, useState, useEffect } from 'react'

const PAPER_ROWS = [
  { product: 'Aashirvaad Atta 5kg', qty: 240, unit: 'bags', confidence: 98 },
  { product: 'Fortune Sunflower Oil 1L', qty: 180, unit: 'bottles', confidence: 95 },
  { product: 'Tata Salt 1kg', qty: 600, unit: 'packs', confidence: 99 },
  { product: 'Maggi 70g Masala', qty: 1200, unit: 'packets', confidence: 97 },
  { product: 'Horlicks Classic 200g', qty: 96, unit: 'jars', confidence: 91 },
  { product: 'Surf Excel 500g', qty: 144, unit: 'packs', confidence: 94 },
]

export default function AIPaperSection() {
  const [scanning, setScanning] = useState(false)
  const [rows, setRows] = useState([])
  const sectionRef = useRef(null)
  const hasRunRef = useRef(false)

  const runDemo = () => {
    if (scanning) return
    setScanning(true)
    setRows([])
    PAPER_ROWS.forEach((row, i) => {
      setTimeout(() => {
        setRows(prev => [...prev, row])
      }, 600 + i * 350)
    })
    setTimeout(() => setScanning(false), 600 + PAPER_ROWS.length * 350 + 500)
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRunRef.current) {
          hasRunRef.current = true
          setTimeout(runDemo, 600)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="ai-paper-section" id="ai-paper" ref={sectionRef}
      style={{ background: 'linear-gradient(180deg, #050505 0%, #070708 100%)' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div className="section-label" style={{ display: 'inline-flex' }}>
            ✦ Hero Feature — AI Paper Upload
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: '1.25rem',
          }}>
            Turn Paper<br />
            <span className="text-gradient">Into Inventory.</span>
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: 480,
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}>
            Photograph your stock register.<br />
            Let AI do the typing.
          </p>
        </div>

        <div className="ai-demo-container">
          {/* Paper image input side */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Simulated paper register */}
              <div style={{
                background: '#f5f0e8',
                margin: '1.5rem',
                borderRadius: 8,
                padding: '1.5rem',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#333',
                position: 'relative',
                lineHeight: 1.8,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                filter: scanning ? 'none' : 'none',
              }}>
                <div style={{ fontWeight: 700, marginBottom: 8, borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
                  STOCK REGISTER — June 2025
                </div>
                {[
                  'Aashirvaad Atta 5kg  . . . . 240 bags',
                  'Fortune Oil 1L  . . . . . . 180 btl',
                  'Tata Salt 1kg  . . . . . . . 600 pcs',
                  'Maggi 70g  . . . . . . . 1200 pkts',
                  'Horlicks 200g  . . . . . . . 96 jars',
                  'Surf Excel 500g  . . . . . . 144 pcs',
                ].map((line, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    {line}
                    {scanning && (
                      <div style={{
                        position: 'absolute',
                        right: 0, top: 0,
                        width: `${70 + i * 4}%`,
                        height: '100%',
                        background: 'rgba(255,107,0,0.12)',
                        borderRadius: 2,
                        animation: `scan-highlight 0.3s ease ${0.5 + i * 0.35}s both`,
                      }} />
                    )}
                  </div>
                ))}

                {/* Scan line animation */}
                {scanning && (
                  <div style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.9), transparent)',
                    boxShadow: '0 0 12px rgba(255,107,0,0.8)',
                    animation: 'scan-line-move 2.5s ease-in-out',
                  }} />
                )}
              </div>

              {/* Upload zone */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  📷 stock_register_june.jpg
                </div>
                <button
                  onClick={runDemo}
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.75rem' }}
                  id="ai-paper-upload-btn"
                >
                  <span>{scanning ? 'Processing...' : 'Upload & Scan'}</span>
                </button>
              </div>
            </div>

            {/* Arrow */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              margin: '1.5rem 0',
              color: 'var(--orange-primary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--orange-primary))' }} />
              AI Processing
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--orange-primary), transparent)' }} />
            </div>
          </div>

          {/* Extracted inventory table */}
          <div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              overflow: 'hidden',
            }}>
              {/* Table header */}
              <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  Extracted Inventory
                </div>
                <div style={{
                  padding: '4px 10px',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: 6,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--success)',
                }}>
                  {rows.length}/{PAPER_ROWS.length} Extracted
                </div>
              </div>

              {/* Column headers */}
              <div style={{
                padding: '0.625rem 1.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr 80px 60px',
                gap: 8,
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border)',
              }}>
                <span>Product</span>
                <span>Quantity</span>
                <span>Conf.</span>
              </div>

              {/* Rows */}
              <div style={{ padding: '0.75rem 0' }}>
                {rows.map((row, i) => (
                  <div
                    key={row.product}
                    style={{
                      padding: '0.625rem 1.5rem',
                      display: 'grid',
                      gridTemplateColumns: '1fr 80px 60px',
                      gap: 8,
                      alignItems: 'center',
                      animation: 'row-appear 0.4s ease both',
                      borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      {row.product}
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      <span style={{
                        padding: '2px 8px',
                        background: 'rgba(255,107,0,0.1)',
                        border: '1px solid rgba(255,107,0,0.2)',
                        borderRadius: 4,
                        color: 'var(--orange-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}>
                        {row.qty}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{row.unit}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      <div style={{
                        height: 4,
                        flex: 1,
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${row.confidence}%`,
                          background: row.confidence > 95 ? 'var(--success)' : 'var(--orange-primary)',
                          borderRadius: 2,
                          transition: 'width 1s var(--ease-out-expo)',
                        }} />
                      </div>
                      <span style={{
                        fontSize: '0.65rem',
                        color: row.confidence > 95 ? 'var(--success)' : 'var(--orange-secondary)',
                        fontWeight: 600,
                      }}>
                        {row.confidence}%
                      </span>
                    </div>
                  </div>
                ))}

                {rows.length === 0 && !scanning && (
                  <div style={{
                    padding: '3rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                  }}>
                    Upload a photo to extract inventory
                  </div>
                )}
              </div>

              {rows.length === PAPER_ROWS.length && (
                <div style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(34,197,94,0.04)',
                }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--success)' }}>
                    ✓ 6 products added to inventory
                  </div>
                  <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.75rem' }} id="ai-confirm-btn">
                    <span>Confirm & Save</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-line-move {
          0% { top: 5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
        @keyframes scan-highlight {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
