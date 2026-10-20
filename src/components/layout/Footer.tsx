import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@content/site'
import { serviceLines } from '@content/serviceLines'
import { industries } from '@content/industries'
import { projects } from '@content/projects'
import { Logo, ChevronMark } from '@/components/ui/Brand'
import { Icon, type IconName } from '@/components/ui/Icon'

export function Footer() {
  const year = new Date().getFullYear()
  const social = Object.entries(site.social).filter(([, url]) => Boolean(url)) as [IconName, string][]
  const columns = [
    { title: 'Services', links: serviceLines.slice(0, 6).map((l) => ({ to: `/services/${l.slug}`, label: l.short })).concat({ to: '/services', label: 'All services' }) },
    { title: 'Solutions', links: industries.slice(0, 6).map((i) => ({ to: `/solutions/${i.slug}`, label: i.name })).concat({ to: '/solutions', label: 'All solutions' }) },
    { title: 'Work', links: projects.filter((p) => p.featured).map((p) => ({ to: `/work/${p.slug}`, label: p.shortTitle })).concat({ to: '/work', label: 'All case studies' }) },
    {
      title: 'Company',
      links: [
        { to: '/about', label: 'About' },
        { to: '/process', label: 'How we work' },
        { to: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { to: '/privacy', label: 'Privacy Policy' },
        { to: '/terms', label: 'Terms of Use' },
      ],
    },
  ]
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface pb-28 pt-16 md:pb-10">
      <ChevronMark className="pointer-events-none absolute -right-16 -top-10 h-80 w-80 opacity-[0.04]" />
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_2.4fr]">
          <div className="space-y-5">
            <Link to="/" className="block h-7" aria-label="Directrix Technologies home">
              <Logo className="h-full" />
            </Link>
            <p className="max-w-sm text-muted">{site.tagline}</p>
            <address className="space-y-2 not-italic">
              <a href={site.contact.phoneHref} className="flex items-center gap-2 font-semibold hover:text-brand">
                <Icon name="phone" size={16} /> {site.contact.phoneDisplay}
              </a>
              <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand">
                <Icon name="whatsapp" size={16} /> WhatsApp us
              </a>
              <a href={site.contact.emailHref} className="flex items-center gap-2 hover:text-brand">
                <Icon name="mail" size={16} /> {site.contact.email}
              </a>
              {site.contact.location && <p className="text-muted">{site.contact.location}</p>}
            </address>
            {social.length > 0 && (
              <ul className="flex gap-2" aria-label="Social profiles">
                {social.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-brand hover:text-brand">
                      <Icon name={name} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {site.newsletterEndpoint && <Newsletter endpoint={site.newsletterEndpoint} />}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h2 className="mb-4 font-display text-fluid-sm font-semibold">{c.title}</h2>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-fluid-sm text-muted transition-colors hover:text-brand">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-fluid-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {year} {site.legal.entityName}. All rights reserved.
          </p>
          <p>Prices and timelines are confirmed after discovery and a written scope.</p>
        </div>
      </div>
    </footer>
  )
}

function Newsletter({ endpoint }: { endpoint: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'err'>('idle')
  return (
    <form
      className="max-w-sm"
      onSubmit={async (e) => {
        e.preventDefault()
        const email = new FormData(e.currentTarget).get('email')
        try {
          const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
          setState(r.ok ? 'ok' : 'err')
        } catch {
          setState('err')
        }
      }}
    >
      <label htmlFor="nl-email" className="field-label">
        Occasional notes on practical AI and software
      </label>
      <div className="flex gap-2">
        <input id="nl-email" name="email" type="email" required className="field" placeholder="you@company.com" />
        <button className="btn btn-primary">Subscribe</button>
      </div>
      {state === 'ok' && <p className="mt-2 text-fluid-xs text-success">Thanks, you&apos;re subscribed.</p>}
      {state === 'err' && <p className="mt-2 text-fluid-xs text-danger">That didn&apos;t work. Please try again later.</p>}
    </form>
  )
}
