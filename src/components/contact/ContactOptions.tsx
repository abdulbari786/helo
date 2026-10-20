import { site } from '@content/site'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { track } from '@/lib/analytics'

/** Call / WhatsApp / email links, all read from content/site.ts. */
export function ContactOptions({ stacked, className }: { stacked?: boolean; className?: string }) {
  const c = site.contact
  const items = [
    { icon: 'phone' as const, label: 'Call', value: c.phoneDisplay, href: c.phoneHref, kind: 'phone' },
    { icon: 'whatsapp' as const, label: 'WhatsApp', value: c.phoneDisplay, href: c.whatsappHref, kind: 'whatsapp' },
    { icon: 'mail' as const, label: 'Email', value: c.email, href: c.emailHref, kind: 'email' },
  ]
  return (
    <ul className={cn('grid min-w-0 gap-3', !stacked && 'sm:grid-cols-3', className)}>
      {items.map((i) => (
        <li key={i.kind} className="min-w-0">
          <a
            href={i.href}
            onClick={() => track('contact_click', { method: i.kind })}
            {...(i.kind === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex min-h-[56px] items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-brand"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
              <Icon name={i.icon} size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-fluid-xs text-muted">{i.label}</span>
              <span className="block break-all text-fluid-sm font-semibold text-ink group-hover:text-brand">{i.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
