import { site } from '@content/site'

type Props = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Fire an analytics event. No-op when analytics is disabled or not yet loaded. */
export function track(event: 'cta_click' | 'form_submit' | 'form_error' | 'case_study_view' | 'booking_open' | 'contact_click', props: Props = {}) {
  if (typeof window === 'undefined') return
  try {
    if (site.analytics.provider === 'plausible') window.plausible?.(event, { props })
    if (site.analytics.provider === 'ga4') window.gtag?.('event', event, props)
  } catch {
    /* analytics must never break the page */
  }
}
