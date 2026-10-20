import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '@content/site'
import { Button } from '@/components/ui/Button'

const CONSENT_KEY = 'dx-consent'

function inject(src: string, attrs: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return
  const s = document.createElement('script')
  s.src = src
  s.defer = true
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v))
  document.head.appendChild(s)
}

function loadGa4(id: string) {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })
  inject(`https://www.googletagmanager.com/gtag/js?id=${id}`)
}

/**
 * Privacy-friendly analytics. Plausible (cookieless) loads directly; GA4 loads only after consent.
 * Provider is chosen in content/site.ts or VITE_ANALYTICS_PROVIDER.
 */
export function Analytics() {
  const { provider, plausibleDomain, ga4Id } = site.analytics
  const [needsConsent, setNeedsConsent] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (provider === 'plausible' && plausibleDomain) inject('https://plausible.io/js/script.js', { 'data-domain': plausibleDomain })
    if (provider === 'ga4' && ga4Id) {
      let consent: string | null = null
      try {
        consent = localStorage.getItem(CONSENT_KEY)
      } catch {
        /* ignore */
      }
      if (consent === 'granted') loadGa4(ga4Id)
      else if (consent !== 'denied') setNeedsConsent(true)
    }
  }, [provider, plausibleDomain, ga4Id])

  useEffect(() => {
    if (provider === 'ga4') window.gtag?.('event', 'page_view', { page_path: pathname })
  }, [pathname, provider])

  if (!needsConsent) return null
  const decide = (value: 'granted' | 'denied') => {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {
      /* ignore */
    }
    if (value === 'granted') loadGa4(ga4Id)
    setNeedsConsent(false)
  }
  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-xl rounded-2xl border border-line bg-paper p-5 shadow-lift md:bottom-6">
      <p className="mb-4 text-fluid-sm text-muted">
        We&apos;d like to use analytics cookies to understand which pages are useful. No advertising, and nothing is set unless you agree.{' '}
        <a href="/privacy" className="underline">
          Privacy policy
        </a>
      </p>
      <div className="flex gap-3">
        <Button onClick={() => decide('granted')}>Accept analytics</Button>
        <Button variant="secondary" onClick={() => decide('denied')}>
          Decline
        </Button>
      </div>
    </div>
  )
}
