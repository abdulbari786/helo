import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { hero } from '@content/copy'
import { site } from '@content/site'
import { BookCallButton } from '@/components/booking/BookCallButton'
import { ButtonLink } from '@/components/ui/Button'
import { Chev, ChevronMark } from '@/components/ui/Brand'
import { Icon } from '@/components/ui/Icon'
import { track } from '@/lib/analytics'

const HeroCanvas = lazy(() => import('@/components/diagrams/HeroCanvas'))

export function Hero() {
  const [ready, setReady] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false)
  const visual = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    // Defer the canvas until the browser is idle so it never competes with first paint.
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number }
    const idle = w.requestIdleCallback ? w.requestIdleCallback(() => setShowCanvas(true)) : window.setTimeout(() => setShowCanvas(true), 300)
    return () => {
      cancelAnimationFrame(id)
      if (!w.requestIdleCallback) window.clearTimeout(idle)
    }
  }, [])

  // Subtle mouse parallax on the visual (fine pointers, motion allowed).
  useEffect(() => {
    const el = visual.current
    if (!el || !window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 14
        const y = (e.clientY / window.innerHeight - 0.5) * 10
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const words = hero.headline.split(' ')

  return (
    <section className="grain relative overflow-hidden pb-14 pt-[calc(var(--nav-h)+2.5rem)] sm:pb-20 lg:min-h-[92vh] lg:pt-[calc(var(--nav-h)+4rem)]" aria-labelledby="hero-title">
      <div className="mesh absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="container grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-6">
        <div>
          <p className="eyebrow mb-6">
            <Chev />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className={`hero-title text-fluid-3xl text-balance ${ready ? 'hero-in' : ''}`}>
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <span className="hero-word inline-block" style={{ ['--i' as string]: i }}>
                  {i === words.length - 1 ? <span className="text-brand">{w}</span> : w}
                </span>
                {i < words.length - 1 && ' '}
              </span>
            ))}
          </h1>
          <p className="lede mt-6" data-reveal="" style={{ ['--d' as string]: '350ms' }}>
            {hero.sub}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal="" style={{ ['--d' as string]: '450ms' }}>
            <BookCallButton label="Book a Discovery Call" source="hero" magnetic />
            <ButtonLink to="/work" variant="secondary" arrow onClick={() => track('cta_click', { cta: 'explore_work', source: 'hero' })}>
              Explore Our Work
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-3 border-t border-line pt-6 text-fluid-sm text-muted sm:grid-cols-3" data-reveal="" style={{ ['--d' as string]: '550ms' }}>
            {hero.proof.map((p) => (
              <li key={p} className="flex gap-2">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-brand" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div ref={visual} className="relative aspect-[5/4] w-full transition-transform duration-300 ease-out lg:aspect-square">
            <div className="absolute inset-0 rounded-3xl border border-line bg-surface/60 shadow-soft backdrop-blur-[2px]" />
            {/* Static chevron shown until the canvas loads (and for no-JS visitors). */}
            {!showCanvas && <ChevronMark className="absolute left-1/2 top-1/2 h-2/5 w-2/5 -translate-x-[38%] -translate-y-1/2 opacity-90" />}
            {showCanvas && (
              <Suspense fallback={null}>
                <div className="absolute inset-0">
                  <HeroCanvas />
                </div>
              </Suspense>
            )}
            <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-line bg-paper/90 px-3 py-2 font-mono text-[11px] leading-5 text-muted shadow-soft sm:left-6 sm:top-6">
              <span className="text-brand">→</span> docs · crm · apis · data
              <br />
              <span className="text-brand">→</span> scoped · evaluated · owned by you
            </div>
          </div>
        </div>
      </div>

      {/* Contact strip directly under the hero */}
      <div className="container mt-12 lg:mt-16">
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface/80 px-5 py-4 text-fluid-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">Prefer to talk it through? Reach us directly.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={site.contact.phoneHref} className="flex items-center gap-2 font-semibold hover:text-brand" onClick={() => track('contact_click', { method: 'phone', source: 'hero_strip' })}>
              <Icon name="phone" size={16} /> {site.contact.phoneDisplay}
            </a>
            <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand" onClick={() => track('contact_click', { method: 'whatsapp', source: 'hero_strip' })}>
              <Icon name="whatsapp" size={16} /> WhatsApp
            </a>
            <a href={site.contact.emailHref} className="flex items-center gap-2 hover:text-brand" onClick={() => track('contact_click', { method: 'email', source: 'hero_strip' })}>
              <Icon name="mail" size={16} /> {site.contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
