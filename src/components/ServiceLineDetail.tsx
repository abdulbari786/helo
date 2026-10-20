import type { ServiceLine } from '@content/types'
import { servicesForLine } from '@content/serviceLines'
import { ButtonLink } from '@/components/ui/Button'
import { indicativeFrom } from '@/lib/pricing'
import { track } from '@/lib/analytics'
import { publicBoundary } from '@content/copy'

/** Full detail of a service line: used in the home drawer and on /services/:line. */
export function ServiceLineDetail({ line, headingLevel = 'h3' }: { line: ServiceLine; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel
  const items = servicesForLine(line.slug)
  return (
    <div className="space-y-6">
      {items.map((s) => {
        const price = indicativeFrom(s.indicativeOneTime)
        return (
          <article key={s.id} className="card p-5 sm:p-7" id={s.slug}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {s.featured && <span className="chip border-brand/30 bg-brand-tint text-brand">Recommended starting point</span>}
              <span className="chip">{s.engagement}</span>
            </div>
            <H className="mb-3 text-fluid-xl">{s.name}</H>
            <p className="mb-5 text-muted">{s.whatWeDo}</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="mb-2 font-display text-fluid-sm font-semibold">What you get</p>
                <ul className="space-y-1.5 text-fluid-sm text-muted">
                  {s.deliverables.map((d) => (
                    <li key={d} className="chev-bullet">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 text-fluid-sm">
                <div>
                  <p className="mb-1 font-display font-semibold">Sounds familiar?</p>
                  <p className="text-muted">{s.exampleProblems}</p>
                </div>
                <div>
                  <p className="mb-1 font-display font-semibold">Usually for</p>
                  <p className="text-muted">{s.idealBuyer}</p>
                </div>
                <div>
                  <p className="mb-1 font-display font-semibold">What we&apos;ll need from you</p>
                  <p className="text-muted">{s.clientInputs}</p>
                </div>
              </div>
            </div>
            <p className="mt-5 border-t border-line pt-4 text-fluid-xs text-muted">
              <span className="font-semibold text-ink">Good to know:</span> {publicBoundary[s.id] ?? s.boundaries}
            </p>
            {price && <p className="mt-2 text-fluid-sm font-semibold text-ink">{price}</p>}
          </article>
        )
      })}
      <div className="flex flex-wrap gap-3">
        <ButtonLink to={`/contact?interest=${line.slug}#enquiry`} arrow onClick={() => track('cta_click', { cta: 'discuss_service', line: line.slug })}>
          Discuss {line.short.toLowerCase()}
        </ButtonLink>
      </div>
    </div>
  )
}
