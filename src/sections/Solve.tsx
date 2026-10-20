import { Link } from 'react-router-dom'
import { problems } from '@content/copy'
import { projects } from '@content/projects'
import { services } from '@content/services'
import { processStages } from '@content/process'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { CountUp } from '@/components/ui/CountUp'
import { Icon } from '@/components/ui/Icon'
import { Chev } from '@/components/ui/Brand'

export function Solve() {
  const stats = [
    { n: projects.length, label: 'case studies across AI, enterprise, ML and mobile' },
    { n: services.length, label: 'services across software, AI, data and cloud' },
    { n: processStages.length, label: 'delivery stages, from qualification to support' },
  ]
  return (
    <section className="section" aria-labelledby="solve-title">
      <div className="container">
        <SectionHeading
          id="solve-title"
          eyebrow="What we solve"
          title="Practical systems for the problems slowing your team down"
          lede="Most teams don't need more AI hype. They need one painful workflow fixed properly, measured honestly, and owned by them."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <SpotlightCard key={p.pain} className="flex flex-col p-6 sm:p-7" data-reveal="" style={{ ['--d' as string]: `${i * 90}ms` }}>
              <p className="mb-2 text-fluid-xs font-semibold uppercase tracking-wider text-muted">The problem</p>
              <h3 className="mb-3 text-fluid-xl">{p.pain}</h3>
              <p className="mb-6 text-muted">{p.detail}</p>
              <div className="mt-auto rounded-xl bg-brand-tint p-4">
                <p className="mb-1 flex items-center gap-2 font-display font-semibold text-brand">
                  <Chev /> {p.outcome}
                </p>
                <p className="text-fluid-sm text-ink/80">{p.outcomeDetail}</p>
              </div>
              <Link to={`/services/${p.line}`} className="mt-5 inline-flex items-center gap-1.5 text-fluid-sm font-semibold text-ink hover:text-brand">
                How we approach it <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </SpotlightCard>
          ))}
        </div>
        <dl className="mt-14 grid gap-6 border-t border-line pt-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal="" style={{ ['--d' as string]: `${i * 90}ms` }}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-fluid-3xl font-semibold text-ink">
                  <CountUp to={s.n} />
                </span>
                <span className="mt-1 block text-fluid-sm text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
