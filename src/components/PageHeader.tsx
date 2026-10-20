import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Crumb } from '@/lib/seo'
import { Chev } from '@/components/ui/Brand'

export function PageHeader({ crumbs, eyebrow, title, lede, children, titleProps }: { crumbs: Crumb[]; eyebrow?: string; title: string; lede?: ReactNode; children?: ReactNode; titleProps?: Record<string, unknown> }) {
  return (
    <header className="grain relative overflow-hidden border-b border-line pb-14 pt-[calc(var(--nav-h)+2.5rem)] sm:pb-20 sm:pt-[calc(var(--nav-h)+4rem)]">
      <div className="mesh absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-fluid-xs text-muted">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <Chev className="text-line" />}
                {i < crumbs.length - 1 ? (
                  <Link to={c.path} className="hover:text-brand">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="eyebrow mb-4">
            <Chev />
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl text-fluid-3xl text-balance" {...titleProps}>
          {title}
        </h1>
        {lede && <p className="lede mt-6">{lede}</p>}
        {children}
      </div>
    </header>
  )
}
