import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronMark, Logo } from '@/components/ui/Brand'

/**
 * Observes [data-reveal] and .line-mask elements and adds .is-in when they enter the viewport.
 * Re-scans on route change and when new nodes are added (filters, drawers).
 */
export function RevealController() {
  const { pathname } = useLocation()
  useEffect(() => {
    const root = document.documentElement
    if (!('IntersectionObserver' in window)) {
      root.classList.remove('js')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    const scan = () => document.querySelectorAll('[data-reveal]:not(.is-in), .line-mask:not(.is-in)').forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(() => scan())
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])
  return null
}

/** Scroll to top (or to the hash target) on navigation. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }))
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/** Lenis smooth scrolling, loaded lazily on desktop with motion allowed. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    let destroyed = false
    let cleanup = () => {}
    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -80 } })
      let raf = 0
      const loop = (t: number) => {
        lenis.raf(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      const stopWhenLocked = new MutationObserver(() => {
        const locked = document.documentElement.style.overflow === 'hidden'
        if (locked) lenis.stop()
        else lenis.start()
      })
      stopWhenLocked.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
      cleanup = () => {
        cancelAnimationFrame(raf)
        stopWhenLocked.disconnect()
        lenis.destroy()
      }
    })
    return () => {
      destroyed = true
      cleanup()
    }
  }, [])
  return null
}

/**
 * Brief logo reveal, once per session, skippable, under 1.2 s, skipped for reduced motion.
 * The overlay is in the server HTML and is only shown when the inline head script adds `html.intro`,
 * so there is no flash of content beforehand. CSS fades it out by itself even if JS fails.
 */
export function IntroLoader() {
  useEffect(() => {
    const html = document.documentElement
    if (!html.classList.contains('intro')) return
    try {
      sessionStorage.setItem('dx-intro', '1')
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => html.classList.remove('intro'), 1200)
    return () => window.clearTimeout(t)
  }, [])
  return (
    <div className="intro-overlay" aria-hidden="true" onClick={() => document.documentElement.classList.remove('intro')}>
      <div className="intro-logo">
        <ChevronMark className="intro-chev h-12 w-12" />
        <Logo priority className="intro-word h-9 sm:h-11" />
      </div>
    </div>
  )
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-ink px-4 py-2 font-semibold text-paper transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  )
}
