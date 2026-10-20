/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_BOOKING_URL?: string
  readonly VITE_ANALYTICS_PROVIDER?: 'none' | 'plausible' | 'ga4'
  readonly VITE_PLAUSIBLE_DOMAIN?: string
  readonly VITE_GA4_ID?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
