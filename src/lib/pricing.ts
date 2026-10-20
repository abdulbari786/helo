import { flags } from '@content/site'

/** "₹40,000–₹1,50,000" → "Indicative from ₹40,000, subject to discovery". Null when hidden or unavailable. */
export function indicativeFrom(range: string | undefined, suffix = ''): string | null {
  if (!flags.SHOW_PRICING || !range) return null
  const m = range.match(/₹[\d,]+/)
  return m ? `Indicative from ${m[0]}${suffix}, subject to discovery` : null
}
