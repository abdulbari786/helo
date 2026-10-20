import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/lib/seo'
import { orgLine, projectBySlug, projects } from '@content/projects'
import { PageHeader } from '@/components/PageHeader'
import { ArchitectureDiagram } from '@/components/diagrams/ArchitectureDiagram'
import { BookCallButton } from '@/components/booking/BookCallButton'
import { Icon } from '@/components/ui/Icon'
import { track } from '@/lib/analytics'
import NotFound from './NotFound'

export default function CaseStudyPage() {
  const { slug = '' } = useParams()
  const p = projectBySlug(slug)

  useEffect(() => {
    if (p) track('case_study_view', { slug: p.slug })
  }, [p])

  if (!p) return <NotFound />
  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]
  const org = orgLine(p)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: p.shortTitle, path: `/work/${p.slug}` },
  ]
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    about: p.tags,
    description: p.cardSummary,
    creator: { '@type': 'Organization', name: 'Directrix Technologies' },
  }

  return (
    <article data-case={p.slug}>
      <Seo title={p.title} description={`${p.cardSummary} ${p.outcome}`.slice(0, 300)} path={`/work/${p.slug}`} type="article" breadcrumbs={crumbs} jsonLd={ld} />
      <PageHeader crumbs={crumbs} eyebrow={p.categoryGroup} title={p.shortTitle} titleProps={{ style: { viewTransitionName: `case-${p.slug}` } }} lede={p.subtitle}>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {org && <span className="chip !text-ink">{org}</span>}
          {p.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </PageHeader>

      {p.diagram && (
        <section className="container pt-14" aria-labelledby="arch-title">
          <h2 id="arch-title" className="mb-5 font-display text-fluid-sm font-semibold uppercase tracking-wider text-muted">
            Architecture at a glance
          </h2>
          <ArchitectureDiagram kind={p.diagram} />
        </section>
      )}

      <div className="container grid gap-12 py-16 lg:grid-cols-[1fr_300px] lg:py-20">
        <div className="prose-dx max-w-[72ch] [&>section:first-child>h2]:mt-0">
          <section>
            <h2>Overview</h2>
            {p.overview.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </section>
          <section>
            <h2>What we built</h2>
            <ul>
              {p.whatWeBuilt.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>How we built it</h2>
            {p.howWeBuiltIt.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </section>
          {p.techStack && p.techStack.length > 0 && (
            <section>
              <h2>Technology stack</h2>
              <ul className="!space-y-0 flex flex-wrap gap-2">
                {p.techStack.map((t) => (
                  <li key={t} className="chip !pl-3 before:hidden">
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section>
            <h2>Project outcome</h2>
            <p className="rounded-2xl border border-brand/25 bg-brand-tint p-5 !text-ink">{p.outcome}</p>
          </section>
          {p.potentialApplications && (
            <section>
              <h2>Potential applications</h2>
              <ul>
                {p.potentialApplications.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          )}
          {p.disclaimer && (
            <aside className="mt-8 rounded-xl border border-line bg-surface p-4 text-fluid-sm text-muted" role="note">
              <span className="font-semibold text-ink">Disclaimer:</span> {p.disclaimer}
            </aside>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card space-y-5 p-6">
            <p className="font-display text-fluid-lg font-semibold">Need something similar?</p>
            <p className="text-fluid-sm text-muted">Tell us about your workflow and we&apos;ll suggest the smallest sensible first step.</p>
            <BookCallButton source={`case_${p.slug}`} className="w-full" />
            {p.links?.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full">
                {l.label} <Icon name="external" size={16} />
              </a>
            ))}
          </div>
        </aside>
      </div>

      <div className="container pb-20">
        <Link to={`/work/${next.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-line p-6 hover:border-brand">
          <span>
            <span className="block text-fluid-xs text-muted">Next case study</span>
            <span className="font-display text-fluid-xl font-semibold group-hover:text-brand">{next.title}</span>
          </span>
          <Icon name="arrow" className="shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
