import { useEffect, useState } from 'react'
import { site } from '@content/site'
import { ContactOptions } from '@/components/contact/ContactOptions'
import { ButtonLink } from '@/components/ui/Button'

/**
 * Inline Cal.com / Calendly embed. Falls back to call / WhatsApp / email + enquiry form when the
 * booking link is still the placeholder, is unset, or fails to load within 10 seconds.
 */
export function BookingEmbed({ compact }: { compact?: boolean }) {
  const url = site.booking.url
  const usable = Boolean(url) && !site.booking.isPlaceholder
  const [state, setState] = useState<'loading' | 'ready' | 'failed'>(usable ? 'loading' : 'failed')

  useEffect(() => {
    if (!usable) return
    const t = window.setTimeout(() => setState((s) => (s === 'loading' ? 'failed' : s)), 10000)
    return () => window.clearTimeout(t)
  }, [usable])

  const src = usable ? `${url}${url.includes('?') ? '&' : '?'}embed=true&hide_gdpr_banner=1` : ''

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className={`overflow-hidden rounded-2xl border border-line bg-surface ${state === 'failed' ? '' : 'min-h-[420px]'}`}>
        {state !== 'failed' ? (
          <>
            {state === 'loading' && <p className="p-6 text-fluid-sm text-muted">Loading the calendar…</p>}
            <iframe
              title="Book a discovery call with Directrix Technologies"
              src={src}
              className={state === 'ready' ? 'block h-[640px] w-full' : 'h-0 w-full'}
              loading="lazy"
              onLoad={() => setState('ready')}
              onError={() => setState('failed')}
            />
          </>
        ) : (
          <div className="flex h-full flex-col justify-center gap-4 p-6 sm:p-8">
            <h3 className="text-fluid-xl">Let&apos;s find a time</h3>
            <p className="text-muted">
              Call or message us on WhatsApp and we&apos;ll set up a discovery call, or send a short enquiry and we&apos;ll reply with times.
            </p>
            {!compact && (
              <div>
                <ButtonLink to="/contact#enquiry" arrow>
                  Send an enquiry
                </ButtonLink>
              </div>
            )}
          </div>
        )}
      </div>
      <aside aria-label="Other ways to reach us" className="min-w-0 space-y-4">
        <p className="font-display text-fluid-sm font-semibold">Prefer to talk now?</p>
        <ContactOptions stacked />
        <p className="text-fluid-xs text-muted">{site.contact.responseTime}</p>
      </aside>
    </div>
  )
}
