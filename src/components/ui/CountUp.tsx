import { useEffect, useRef, useState } from 'react'
import { useInViewOnce } from '@/lib/hooks'

/** Counts up once when visible. The final number is in the HTML for crawlers and no-JS visitors. */
export function CountUp({ to, duration = 1400, suffix = '' }: { to: number; duration?: number; suffix?: string }) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>()
  const [value, setValue] = useState(to)
  const reduced = useRef(false)
  const started = useRef(false)

  // Below-the-fold counters start from 0 once JS runs; the server HTML keeps the final value.
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced.current) setValue(0)
  }, [])

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    if (reduced.current) return setValue(to)
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      setValue(to)
    }
  }, [inView, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}
