import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const particlesRef = useRef([])
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const animRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 3
        this.vy = (Math.random() - 0.5) * 3 - 1
        this.life = 1
        this.decay = Math.random() * 0.03 + 0.02
        this.size = Math.random() * 3 + 1
        this.color = `hsl(${20 + Math.random() * 20}, 100%, ${50 + Math.random() * 30}%)`
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.05
        this.life -= this.decay
        this.size *= 0.97
      }
      draw() {
        ctx.globalAlpha = this.life * 0.8
        ctx.fillStyle = this.color
        ctx.shadowBlur = 6
        ctx.shadowColor = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let lastX = 0, lastY = 0

    const onMove = (e) => {
      const mx = e.clientX
      const my = e.clientY
      mouseRef.current = { x: mx, y: my }

      if (dot) {
        dot.style.left = mx + 'px'
        dot.style.top = my + 'px'
      }

      const dx = mx - lastX
      const dy = my - lastY
      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > 2) {
        const count = Math.min(Math.floor(speed / 2), 5)
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(mx, my))
        }
      }
      lastX = mx
      lastY = my
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // smooth ring follow
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12

      if (ring) {
        ring.style.left = ringPosRef.current.x + 'px'
        ring.style.top = ringPosRef.current.y + 'px'
      }

      // update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()
        if (particles[i].life <= 0) {
          particles.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      animRef.current = requestAnimationFrame(animate)
    }

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99997,
          mixBlendMode: 'screen'
        }}
      />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
