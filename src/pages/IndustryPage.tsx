import { useParams } from 'react-router-dom'
import { Seo, serviceLd } from '@/lib/seo'
import { industries } from '@content/industries'
import { PageHeader } from '@/components/PageHeader'
import { WorkflowSteps } from '@/components/diagrams/WorkflowSteps'
import { BookCallButton } from '@/components/booking/BookCallButton'
import { ButtonLink } from '@/components/ui/Button'
import NotFound from './NotFound'

export default function IndustryPage() {
  const { industry = '' } = useParams()
  const ind = industries.find((i) => i.slug === industry)
  if (!ind) return <NotFound />
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: ind.name, path: `/solutions/${ind.slug}` },
  ]
  const blocks = [
    { title: 'What we typically deliver', items: ind.deliverables },
    { title: 'How success can be measured', items: ind.successMeasures },
  ]
  return (
    <>
      <Seo
        title={`${ind.name} Software & AI Solutions`}
        description={`${ind.problem} How Directrix combines ${ind.solutionBundle.slice(0, 3).join(', ').toLowerCase()} and more for ${ind.name}.`}
        path={`/solutions/${ind.slug}`}
        breadcrumbs={crumbs}
        jsonLd={serviceLd(`${ind.name} solutions`, ind.problem, `/solutions/${ind.slug}`)}
      />
      <PageHeader crumbs={crumbs} eyebrow="Industry solution" title={ind.name} lede={ind.problem}>
        <div className="mt-8">
          <BookCallButton source={`industry_${ind.slug}`} />
        </div>
      </PageHeader>
      <section className="section">
        <div className="container max-w-5xl space-y-12">
          <div>
            <h2 className="h-section mb-5">Solution bundle</h2>
            <ul className="flex flex-wrap gap-2">
              {ind.solutionBundle.map((b) => (
                <li key={b} className="chip border-brand/25 bg-brand-tint !text-fluid-sm text-ink">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-section mb-6">Example workflow</h2>
            <div className="card p-6 sm:p-8">
              <WorkflowSteps steps={ind.workflow} label={`Example workflow for ${ind.name}`} />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {blocks.map((b) => (
              <div key={b.title} className="card p-6">
                <h2 className="mb-4 text-fluid-lg">{b.title}</h2>
                <ul className="space-y-2 text-fluid-sm text-muted">
                  {b.items.map((x) => (
                    <li key={x} className="chev-bullet">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-brand/25 bg-brand-tint p-6">
              <h2 className="mb-2 text-fluid-lg">Responsible design</h2>
              <p className="text-ink/80">{ind.designNote}</p>
            </div>
            <div className="card p-6">
              <h2 className="mb-2 text-fluid-lg">Usually involved</h2>
              <p className="text-muted">{ind.buyer}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookCallButton source={`industry_${ind.slug}_bottom`} />
            <ButtonLink to="/solutions" variant="secondary" arrow>
              All industries
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
