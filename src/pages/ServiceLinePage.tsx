import { Link, useParams } from 'react-router-dom'
import { Seo, serviceLd } from '@/lib/seo'
import { lineBySlug, serviceLines } from '@content/serviceLines'
import { projectBySlug } from '@content/projects'
import { PageHeader } from '@/components/PageHeader'
import { ServiceLineDetail } from '@/components/ServiceLineDetail'
import { ProjectCard } from '@/components/ProjectCard'
import { BookCallButton } from '@/components/booking/BookCallButton'
import { Icon } from '@/components/ui/Icon'
import NotFound from './NotFound'

/** Case studies that illustrate each service line. */
const related: Record<string, string[]> = {
  'ai-strategy-governance': ['modelops-console', 'documind'],
  'ai-knowledge-conversational': ['documind', 'knowledge-navigator', 'cineassist'],
  'ai-workflow-document': ['documind', 'cineassist'],
  'voice-vision-personalisation': ['speakmart', 'fingercheck-2', 'smartfind'],
  'custom-software-mobile': ['nusqa', 'speakmart', 'imdad-ul-fuqaraa-website', 'cinegear-digital'],
  'integration-modernisation': ['enterprise-launch-workflow-platform', 'cinegear-digital'],
  'data-analytics': ['workforceiq', 'modelops-console'],
  'cloud-devops-qa-security': ['modelops-console', 'enterprise-launch-workflow-platform'],
  'consulting-team-extension': ['enterprise-launch-workflow-platform'],
}

export default function ServiceLinePage() {
  const { line: slug = '' } = useParams()
  const line = lineBySlug(slug)
  if (!line) return <NotFound />
  const idx = serviceLines.indexOf(line)
  const next = serviceLines[(idx + 1) % serviceLines.length]
  const cases = (related[line.slug] ?? []).map(projectBySlug).filter(Boolean)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: line.name, path: `/services/${line.slug}` },
  ]
  return (
    <>
      <Seo title={line.name} description={`${line.summary} ${line.outcome}`} path={`/services/${line.slug}`} breadcrumbs={crumbs} jsonLd={serviceLd(line.name, line.summary, `/services/${line.slug}`)} />
      <PageHeader crumbs={crumbs} eyebrow={`Service line ${line.number}`} title={line.name} lede={line.summary}>
        <p className="mt-4 max-w-prose text-fluid-base text-ink">
          <span className="font-semibold">Outcome:</span> {line.outcome}
        </p>
        <div className="mt-8">
          <BookCallButton source={`service_${line.slug}`} />
        </div>
      </PageHeader>
      <section className="section" aria-label={`${line.name} services`}>
        <div className="container max-w-5xl">
          <ServiceLineDetail line={line} headingLevel="h2" />
        </div>
      </section>
      {cases.length > 0 && (
        <section className="section bg-surface" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" className="h-section mb-8">
              Related work
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((p) => (
                <li key={p!.slug}>
                  <ProjectCard project={p!} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <div className="container py-12">
        <Link to={`/services/${next.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-line p-6 hover:border-brand">
          <span>
            <span className="block text-fluid-xs text-muted">Next service line</span>
            <span className="font-display text-fluid-xl font-semibold group-hover:text-brand">{next.name}</span>
          </span>
          <Icon name="arrow" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  )
}
