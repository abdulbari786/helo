import { technologies } from '@content/projects'

/** Infinite CSS marquee of technologies used across our projects. Pauses on hover/focus. */
export function TechMarquee() {
  const row = [...technologies, ...technologies]
  return (
    <section aria-labelledby="tech-title" className="border-y border-line bg-surface py-8">
      <div className="container mb-5 flex items-center justify-between gap-4">
        <h2 id="tech-title" className="font-display text-fluid-sm font-semibold text-muted">
          Technologies used across our delivered projects
        </h2>
      </div>
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" tabIndex={0} aria-label="Technology list (hover or focus to pause)">
        <ul className="marquee-track flex w-max gap-3">
          {row.map((t, i) => (
            <li key={i} aria-hidden={i >= technologies.length ? true : undefined} className="rounded-full border border-line bg-paper px-5 py-2.5 font-display text-fluid-sm font-medium text-ink/80">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
