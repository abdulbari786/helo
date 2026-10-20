import { posts, testimonials } from '@content/site'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** Renders only when real testimonials exist in content/site.ts. Never shows an empty heading. */
export function Testimonials() {
  if (testimonials.length === 0) return null
  return (
    <section className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading id="testimonials-title" eyebrow="Clients" title="What clients say" />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="card p-6" data-reveal="">
              <figure>
                <blockquote className="mb-5 text-fluid-lg text-ink">“{t.quote}”</blockquote>
                <figcaption className="text-fluid-sm text-muted">
                  <span className="font-semibold text-ink">{t.name}</span>, {t.role}
                  {t.company && `, ${t.company}`}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Renders only when at least 3 posts exist in content/site.ts. */
export function Insights() {
  if (posts.length < 3) return null
  return (
    <section className="section" aria-labelledby="insights-title">
      <div className="container">
        <SectionHeading id="insights-title" eyebrow="Insights" title="Notes from the work" />
        <ul className="grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <li key={p.href} className="card p-6" data-reveal="">
              <p className="mb-2 text-fluid-xs text-muted">{p.date}</p>
              <h3 className="mb-2 text-fluid-lg">
                <a href={p.href} className="hover:text-brand">
                  {p.title}
                </a>
              </h3>
              <p className="text-fluid-sm text-muted">{p.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
