import { Link } from 'react-router-dom'
import { Seo } from '@/lib/seo'
import { industries } from '@content/industries'
import { PageHeader } from '@/components/PageHeader'
import { Packages } from '@/sections/Packages'
import { Industries } from '@/sections/Industries'
import { FinalCta } from '@/sections/FinalCta'
import { Icon } from '@/components/ui/Icon'

export default function SolutionsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
  ]
  return (
    <>
      <Seo
        title="Solutions & Packages by Industry"
        description="Fixed-scope packages (knowledge assistant pilot, workflow automation, MVP build, dashboards and more) and solution patterns for e-commerce, healthtech, fintech, SaaS, education, manufacturing, real estate and more."
        path="/solutions"
        breadcrumbs={crumbs}
      />
      <PageHeader crumbs={crumbs} eyebrow="Solutions" title="Packages and industry solutions" lede="Start with a fixed-scope package, or see how we combine services for your sector." />
      <Packages />
      <Industries />
      <section className="section" aria-labelledby="all-industries">
        <div className="container">
          <h2 id="all-industries" className="h-section mb-8">
            Explore by industry
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link to={`/solutions/${i.slug}`} className="card group flex h-full flex-col p-6 transition-shadow hover:shadow-lift">
                  <span className="mb-2 font-display text-fluid-lg font-semibold group-hover:text-brand">{i.name}</span>
                  <span className="mb-4 text-fluid-sm text-muted">{i.problem}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-fluid-sm font-semibold text-brand">
                    See the solution <Icon name="arrow" size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  )
}
