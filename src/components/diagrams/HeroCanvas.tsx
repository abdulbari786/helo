import { useEffect, useRef } from 'react'

/**
 * Lightweight 2D canvas: data packets travel a node network and resolve into the blue chevron.
 * Pauses off-screen and in background tabs; renders one static frame for reduced motion.
 */
const CHEVRON: [number, number][] = [
  [0, 2], [58, 2], [141, 112], [58, 222], [0, 222], [83, 112],
]
const STROKES: [number, number][][] = [
  [[182, 2], [222, 2], [166, 88], [146, 62]],
  [[146, 162], [166, 136], [222, 222], [182, 222]],
]

type Pt = { x: number; y: number }

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

function readColor(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v ? `rgb(${v.replace(/\s+/g, ', ')})` : fallback
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0
    let H = 0
    let dpr = 1
    let nodes: Pt[] = []
    let edges: [number, number][] = []
    let targets: Pt[] = []
    let energy: number[] = []
    let chevPoly: Pt[] = []
    let strokes: Pt[][] = []
    let colors = { brand: '#2862CC', ink: '#17181C', line: '#E2E5EC' }
    type Packet = { from: Pt; to: Pt; t: number; speed: number; target?: number; next?: number }
    let packets: Packet[] = []
    let running = false
    let visible = true
    let raf = 0
    let frame = 0

    const setColors = () => {
      colors = { brand: readColor('--brand', colors.brand), ink: readColor('--ink', colors.ink), line: readColor('--line', colors.line) }
    }

    const layout = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width
      H = r.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Chevron placement: centre-right, ~40% of the shorter side.
      const s = (Math.min(W, H) * 0.42) / 224
      const ox = W * 0.62 - 112 * s
      const oy = H * 0.5 - 112 * s
      const map = ([x, y]: [number, number]) => ({ x: ox + x * s, y: oy + y * s })
      chevPoly = CHEVRON.map(map)
      strokes = STROKES.map((p) => p.map(map))

      // Target points sampled along the chevron outline.
      targets = []
      for (let i = 0; i < chevPoly.length; i++) {
        const a = chevPoly[i]
        const b = chevPoly[(i + 1) % chevPoly.length]
        const len = Math.hypot(b.x - a.x, b.y - a.y)
        const n = Math.max(2, Math.round(len / 14))
        for (let k = 0; k < n; k++) targets.push({ x: a.x + ((b.x - a.x) * k) / n, y: a.y + ((b.y - a.y) * k) / n })
      }
      energy = targets.map(() => (reduced ? 1 : 0))

      // Node network, kept clear of the chevron.
      const rand = rng(7)
      nodes = []
      let guard = 0
      const count = W < 500 ? 16 : 26
      while (nodes.length < count && guard++ < 2000) {
        const p = { x: 16 + rand() * (W - 32), y: 16 + rand() * (H - 32) }
        const inChev = p.x > ox - 20 && p.x < ox + 150 * s && p.y > oy - 20 && p.y < oy + 230 * s
        if (inChev) continue
        if (nodes.every((q) => Math.hypot(q.x - p.x, q.y - p.y) > Math.min(W, H) / 7)) nodes.push(p)
      }
      edges = []
      nodes.forEach((p, i) => {
        nodes
          .map((q, j) => ({ j, d: Math.hypot(q.x - p.x, q.y - p.y) }))
          .filter((o) => o.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
          .forEach(({ j }) => {
            if (!edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) edges.push([i, j])
          })
      })
      packets = []
    }

    const spawn = () => {
      if (!edges.length) return
      const [a, b] = edges[Math.floor(Math.random() * edges.length)]
      const [from, to] = Math.random() < 0.5 ? [nodes[a], nodes[b]] : [nodes[b], nodes[a]]
      const resolve = Math.random() < 0.7
      packets.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.01, next: resolve ? Math.floor(Math.random() * targets.length) : undefined })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      // Edges
      ctx.lineWidth = 1
      ctx.strokeStyle = colors.line
      ctx.beginPath()
      edges.forEach(([a, b]) => {
        ctx.moveTo(nodes[a].x, nodes[a].y)
        ctx.lineTo(nodes[b].x, nodes[b].y)
      })
      ctx.stroke()
      // Nodes
      nodes.forEach((n, i) => {
        ctx.fillStyle = i % 5 === 0 ? colors.brand : colors.ink
        ctx.globalAlpha = i % 5 === 0 ? 0.9 : 0.35
        ctx.beginPath()
        ctx.arc(n.x, n.y, i % 5 === 0 ? 3.5 : 2.5, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // Chevron: fill strength follows how much energy has arrived.
      const avg = energy.reduce((a, b) => a + b, 0) / (energy.length || 1)
      ctx.beginPath()
      chevPoly.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
      ctx.closePath()
      ctx.globalAlpha = Math.min(1, avg * 1.15)
      ctx.fillStyle = colors.brand
      ctx.fill()
      ctx.globalAlpha = 0.25 + avg * 0.5
      ctx.lineWidth = 1.5
      ctx.strokeStyle = colors.brand
      ctx.stroke()
      ctx.globalAlpha = Math.min(1, avg * 1.1)
      ctx.fillStyle = colors.ink
      strokes.forEach((poly) => {
        ctx.beginPath()
        poly.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
        ctx.closePath()
        ctx.fill()
      })
      ctx.globalAlpha = 1
      // Outline sparks
      targets.forEach((p, i) => {
        if (energy[i] < 0.05) return
        ctx.globalAlpha = energy[i] * 0.9
        ctx.fillStyle = colors.brand
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // Packets
      packets.forEach((p) => {
        const x = p.from.x + (p.to.x - p.from.x) * p.t
        const y = p.from.y + (p.to.y - p.from.y) * p.t
        const tx = p.from.x + (p.to.x - p.from.x) * Math.max(0, p.t - 0.08)
        const ty = p.from.y + (p.to.y - p.from.y) * Math.max(0, p.t - 0.08)
        const g = ctx.createLinearGradient(tx, ty, x, y)
        g.addColorStop(0, 'rgba(0,0,0,0)')
        g.addColorStop(1, colors.brand)
        ctx.strokeStyle = g
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.fillStyle = colors.brand
        ctx.beginPath()
        ctx.arc(x, y, 2.6, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const step = () => {
      frame++
      if (packets.length < (W < 500 ? 14 : 24) && frame % 6 === 0) spawn()
      packets = packets.filter((p) => {
        p.t += p.speed
        if (p.t < 1) return true
        if (p.target !== undefined) {
          energy[p.target] = 1
          // light neighbours too, so the shape fills in smoothly
          energy[(p.target + 1) % energy.length] = Math.max(energy[(p.target + 1) % energy.length], 0.7)
          energy[(p.target - 1 + energy.length) % energy.length] = Math.max(energy[(p.target - 1 + energy.length) % energy.length], 0.7)
          return false
        }
        if (p.next !== undefined) {
          p.from = p.to
          p.to = targets[p.next]
          p.target = p.next
          p.next = undefined
          p.t = 0
          p.speed *= 1.3
          return true
        }
        return false
      })
      for (let i = 0; i < energy.length; i++) energy[i] = Math.max(0.55 * Math.min(1, frame / 240), energy[i] - 0.004)
      draw()
      raf = requestAnimationFrame(step)
    }

    const start = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    setColors()
    layout()
    draw()
    start()

    const ro = new ResizeObserver(() => {
      layout()
      draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    const mo = new MutationObserver(() => {
      setColors()
      draw()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
}
