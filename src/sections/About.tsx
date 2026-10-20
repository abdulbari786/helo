import { site, team } from '@content/site'
import { values } from '@content/copy'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'

export function About({ headingAs = 'h2', showLink = true }: { headingAs?: 'h1' | 'h2'; showLink?: boolean }) {
  return (
    <section id="about" className="section bg-surface" aria-labelledby="about-title">
      <div className="container grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading as={headingAs} id="about-title" eyebrow="About" title="An engineering team that builds to be handed over" />
          {/* OWNER APPROVAL PENDING: draft about line from the projects file (site.about.approved = false). */}
          <p className="mb-6 text-fluid-lg text-ink" data-reveal="">
            {site.about.line}
          </p>
          <p className="mb-8 text-muted" data-reveal="">
            Our mission is simple: help organisations put software and AI to work on real problems, with scope, evidence and
            ownership that hold up after launch. We start small, measure honestly, and grow only when the first delivery proves its value.
          </p>
          {showLink && (
            <ButtonLink to="/about" variant="secondary" arrow>
              More about us
            </ButtonLink>
          )}
        </div>
        <ul className="grid content-start gap-4">
          {values.map((v, i) => (
            <li key={v.title} className="card p-6" data-reveal="" style={{ ['--d' as string]: `${i * 80}ms` }}>
              <h3 className="mb-1 text-fluid-lg">{v.title}</h3>
              <p className="text-fluid-sm text-muted">{v.body}</p>
            </li>
          ))}
        </ul>
      </div>
      {team.length > 0 && (
        <div className="container mt-16">
          <h3 className="mb-6 text-fluid-xl">The team</h3>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name} className="card overflow-hidden">
                {m.photo && <img src={m.photo} alt={`${m.name}, ${m.role}`} width={400} height={400} loading="lazy" className="aspect-square w-full object-cover" />}
                <div className="p-5">
                  <p className="font-display font-semibold">{m.name}</p>
                  <p className="text-fluid-sm text-muted">{m.role}</p>
                  {m.bio && <p className="mt-2 text-fluid-sm text-muted">{m.bio}</p>}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-fluid-sm font-semibold text-brand">
                      LinkedIn
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
