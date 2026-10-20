import { useEffect, useRef } from 'react'
import { processStages } from '@content/process'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BookCallButton } from '@/components/booking/BookCallButton'
import { Icon } from '@/components/ui/Icon'
import { publicSafeguard } from '@content/copy'

const emphasis = [
  { title: 'Discovery before build', body: 'Uncertain or multi-system work starts with a paid discovery phase, so estimates rest on evidence.' },
  { title: 'Success criteria agreed in advance', body: 'Pilots are judged against criteria we set together before any code is written.' },
  { title: 'Your repo, your accounts', body: 'Code and critical cloud accounts stay client-owned wherever practicable.' },
]

export function Process({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const fill = el.querySelector<HTMLElement>('[data-process-fill]')
    const stages = Array.from(el.querySelectorAll<HTMLElement>('[data-stage]'))
    if (!fill) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fill.style.transform = 'scaleY(1)'
      stages.forEach((s) => s.classList.add('is-active'))
      return
    }
    let ctx: { revert: () => void } | undefined
    let cancelled = false
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el.querySelector('[data-process-track]'), start: 'top 60%', end: 'bottom 60%', scrub: 0.4 } },
        )
        stages.forEach((s) =>
          ScrollTrigger.create({ trigger: s, start: 'top 62%', end: 'bottom 62%', toggleClass: { targets: s, className: 'is-active' }, onLeave: () => s.classList.add('is-done'), onEnterBack: () => s.classList.remove('is-done') }),
        )
      }, el)
    })
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <div className="container" ref={root}>
        <SectionHeading
          as={headingAs}
          id="process-title"
          eyebrow="How we work"
          title="Six stages, with a clear exit gate at each one"
          lede="You always know what happens next, what it produces, and what we need from you. You can stop, adjust or continue at every gate."
        />
        <ul className="mb-14 grid gap-4 md:grid-cols-3">
          {emphasis.map((e, i) => (
            <li key={e.title} className="rounded-2xl border border-brand/25 bg-brand-tint p-5" data-reveal="" style={{ ['--d' as string]: `${i * 80}ms` }}>
              <p className="mb-1 flex items-center gap-2 font-display font-semibold text-ink">
                <Icon name="check" size={18} className="text-brand" />
                {e.title}
              </p>
              <p className="text-fluid-sm text-muted">{e.body}</p>
            </li>
          ))}
        </ul>

        <div className="relative" data-process-track="">
          <div className="absolute bottom-6 left-[19px] top-6 w-[2px] bg-line sm:left-[23px]" aria-hidden="true">
            <div data-process-fill="" className="h-full w-full origin-top scale-y-0 bg-brand" />
          </div>
          <ol className="space-y-6">
            {processStages.map((s) => (
              <li key={s.step} data-stage="" className="process-stage group relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-[48px_1fr] sm:gap-6">
                <span className="process-dot relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-line bg-paper font-display text-fluid-sm font-semibold text-muted transition-colors duration-300 sm:h-12 sm:w-12">
                  {s.step}
                </span>
                <article className="process-card card p-5 transition-[border-color,box-shadow] duration-300 sm:p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h3 className="text-fluid-xl">{s.title}</h3>
                    <span className="chip">{s.duration}</span>
                  </div>
                  <p className="mb-5 text-muted">{s.activities}</p>
                  <div className="grid gap-5 text-fluid-sm md:grid-cols-2">
                    <div>
                      <p className="mb-1 font-display font-semibold">What you get</p>
                      <p className="text-muted">{s.outputs}</p>
                    </div>
                    <div>
                      <p className="mb-1 font-display font-semibold">What we need from you</p>
                      <p className="text-muted">{s.clientNeeds}</p>
                    </div>
                  </div>
                  <p className="mt-5 border-t border-line pt-4 text-fluid-xs text-muted">
                    <span className="font-semibold text-ink">Safeguard:</span> {publicSafeguard[s.step] ?? s.safeguard}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <BookCallButton source="process" />
          <p className="text-fluid-sm text-muted">Stage 1 starts with a free call.</p>
        </div>
      </div>
    </section>
  )
}
