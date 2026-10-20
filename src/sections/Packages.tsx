import { useRef } from 'react'
import { packages } from '@content/packages'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { indicativeFrom } from '@/lib/pricing'
import { track } from '@/lib/analytics'

// Aligns the first card with the page container and keeps snapping inside that gutter.
const gutter = 'max(1rem, calc((100vw - 1280px) / 2 + 2rem))'

export function Packages() {
  const track_ = useRef<HTMLUListElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = track_.current
    if (!el) return
    const card = el.querySelector('li')
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 16), behavior: 'smooth' })
  }
  return (
    <section id="packages" className="section overflow-hidden" aria-labelledby="packages-title">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="packages-title"
            eyebrow="Solutions & packages"
            title="Fixed-scope ways to start"
            lede="Each package has a clear scope and a typical timeline. Final scope and quote follow a short discovery, so you only pay for what the problem needs."
            className="!mb-0"
          />
          <div className="hidden gap-2 lg:flex">
            <button type="button" onClick={() => scroll(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-ink/40" aria-label="Previous packages">
              <Icon name="chevron" className="rotate-180" />
            </button>
            <button type="button" onClick={() => scroll(1)} className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-ink/40" aria-label="Next packages">
              <Icon name="chevron" />
            </button>
          </div>
        </div>
      </div>
      <ul
        ref={track_}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-6"
        style={{ paddingInline: gutter, scrollPaddingInline: gutter }}
        aria-label="Packages"
        data-lenis-prevent-wheel=""
      >
        {packages.map((p, i) => {
          const price = indicativeFrom(p.indicativeFee)
          const shown = p.included.slice(0, 5)
          return (
            <li key={p.slug} className="w-[86vw] max-w-[380px] shrink-0 snap-start" data-reveal="" style={{ ['--d' as string]: `${Math.min(i, 4) * 70}ms` }}>
              <article className="card flex h-full flex-col p-6 transition-shadow hover:shadow-lift">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-display text-fluid-sm font-semibold text-brand">{String(i + 1).padStart(2, '0')}</span>
                  <span className="chip">
                    <Icon name="calendar" size={14} className="mr-1.5" />
                    {p.timeline}
                  </span>
                </div>
                <h3 className="mb-2 text-fluid-lg">{p.name}</h3>
                <p className="mb-5 text-fluid-sm text-muted">
                  <span className="font-semibold text-ink">Best for:</span> {p.bestFor}
                </p>
                <ul className="mb-6 space-y-1.5 text-fluid-sm text-muted">
                  {shown.map((x) => (
                    <li key={x} className="chev-bullet">
                      {x}
                    </li>
                  ))}
                  {p.included.length > shown.length && <li className="pl-6 text-fluid-xs">+ {p.included.length - shown.length} more included</li>}
                </ul>
                {price && <p className="mb-4 text-fluid-sm font-semibold">{price}</p>}
                <div className="mt-auto">
                  <ButtonLink
                    to={`/contact?package=${p.slug}#enquiry`}
                    variant="secondary"
                    arrow
                    className="w-full"
                    onClick={() => track('cta_click', { cta: 'discuss_package', package: p.slug })}
                  >
                    Discuss this package
                  </ButtonLink>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
