import { Link, useNavigate } from 'react-router-dom'
import type { MouseEvent } from 'react'
import type { Project } from '@content/types'
import { orgLine } from '@content/projects'
import { Icon } from '@/components/ui/Icon'
import { navigateWithTransition } from '@/lib/viewTransition'

export function ProjectCard({ project: p, headingLevel = 'h3' }: { project: Project; headingLevel?: 'h2' | 'h3' }) {
  const navigate = useNavigate()
  const H = headingLevel
  const org = orgLine(p)
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    navigateWithTransition(navigate, `/work/${p.slug}`, `[data-case="${p.slug}"]`)
  }
  return (
    <article
      className="card spotlight group relative flex h-full flex-col p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-fluid-xs font-semibold uppercase tracking-wider text-brand">{p.categoryGroup}</span>
        {p.featured && <span className="chip">Featured</span>}
      </div>
      <H className="mb-1 text-fluid-xl" style={{ ['viewTransitionName' as string]: `case-${p.slug}` }}>
        <Link to={`/work/${p.slug}`} onClick={onClick} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
          {p.shortTitle}
        </Link>
      </H>
      <p className="mb-3 text-fluid-sm font-medium text-ink/70">{p.subtitle}</p>
      {org && <p className="mb-3 text-fluid-xs text-muted">{org}</p>}
      <p className="mb-6 text-fluid-sm text-muted">{p.cardSummary}</p>
      <div className="mt-auto flex items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <li key={t} className="chip !px-2.5 !py-0.5">
              {t}
            </li>
          ))}
        </ul>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white group-has-[:focus-visible]:outline group-has-[:focus-visible]:outline-2 group-has-[:focus-visible]:outline-brand">
          <Icon name="arrow" size={18} className="-translate-x-1 transition-transform duration-300 group-hover:translate-x-0" />
        </span>
      </div>
    </article>
  )
}
