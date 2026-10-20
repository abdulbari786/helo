/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DIRECTRIX TECHNOLOGIES — SITE CONFIG
 *  This is the one file the owner edits for company details, feature flags and
 *  placeholders. Every value marked `PLACEHOLDER` must be confirmed before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Post, TeamMember, Testimonial } from './types'

/** Vite exposes VITE_* variables from .env at build time. */
const env = import.meta.env

export const site = {
  name: 'Directrix Technologies',
  shortName: 'Directrix',
  tagline: 'Software and AI that move your business forward.',
  description:
    'Directrix Technologies designs and builds custom software, AI knowledge assistants, workflow automation, data dashboards and cloud systems, scoped against measurable acceptance criteria.',

  /** Production URL, used for canonical links, sitemap and Open Graph. PLACEHOLDER until the domain is live. */
  url: env.VITE_SITE_URL || 'https://directrixtechnologies.com',

  contact: {
    /** Official phone (confirmed by owner). */
    phoneDisplay: '+91 63033 90400',
    phoneE164: '+916303390400',
    phoneHref: 'tel:+916303390400',
    whatsappHref: 'https://wa.me/916303390400',
    /** Official company email (confirmed by owner). Also the inbox for contact-form enquiries. */
    email: 'directrixtechnologies@gmail.com',
    emailHref: 'mailto:directrixtechnologies@gmail.com',
    /** PLACEHOLDER: owner to confirm. Shown under the contact form. */
    responseTime: 'We reply within 1 business day.',
    /** PLACEHOLDER: leave empty to hide. e.g. 'Hyderabad, Telangana, India' */
    location: '',
    /** PLACEHOLDER: leave empty to hide. */
    hours: '',
  },

  booking: {
    /** Cal.com (preferred) or Calendly link. Override with VITE_BOOKING_URL in .env. */
    url: env.VITE_BOOKING_URL || 'https://cal.com/directrix/discovery',
    /**
     * PLACEHOLDER: set to false once the real booking link is in place.
     * While true, the calendar is not embedded (to avoid showing a broken page) and
     * visitors get the enquiry form plus call / WhatsApp / email instead.
     */
    isPlaceholder: !env.VITE_BOOKING_URL,
  },

  /** PLACEHOLDER: add profile URLs to show social icons. Empty entries are hidden. */
  social: {
    linkedin: '',
    github: '',
    x: '',
    instagram: '',
  },

  /** Draft about line from the projects file. PLACEHOLDER: owner to approve before launch. */
  about: {
    line:
      'Directrix Technologies is an engineering team building AI, enterprise software, and digital products — from RAG-based knowledge systems and ML platforms to mobile apps and responsive web experiences.',
    approved: false,
  },

  /** Analytics. Leave provider 'none' to disable. 'plausible' needs no cookie banner; 'ga4' shows one. */
  analytics: {
    provider: (env.VITE_ANALYTICS_PROVIDER || 'none') as 'none' | 'plausible' | 'ga4',
    plausibleDomain: env.VITE_PLAUSIBLE_DOMAIN || '',
    ga4Id: env.VITE_GA4_ID || '',
  },

  /** Newsletter signup in the footer renders only when this endpoint is set. PLACEHOLDER. */
  newsletterEndpoint: '',

  legal: {
    /** PLACEHOLDER: legal entity name, if different from the trading name. */
    entityName: 'Directrix Technologies',
    /** PLACEHOLDER: registered address for the legal pages. Leave empty to hide. */
    registeredAddress: '',
    /** PLACEHOLDER: governing law / jurisdiction for the Terms (confirm with counsel). */
    governingLaw: 'India',
    lastUpdated: '20 October 2026',
    reviewedByCounsel: false,
  },
} as const

/** Feature flags. */
export const flags = {
  /** Show internal indicative pricing as "Indicative from ₹X, subject to discovery". */
  SHOW_PRICING: false,
  /** Show confirmed client / partner names on case studies (P07 is always hidden until confirmed). */
  SHOW_ORG_NAMES: true,
}

/** Rendered only when at least one real testimonial exists. Never add invented quotes. */
export const testimonials: Testimonial[] = []

/** Rendered only when at least one team member exists. */
export const team: TeamMember[] = []

/** Insights preview renders only when 3+ posts exist. */
export const posts: Post[] = []

/** Budget bands for the enquiry form (generic, not tied to the internal price list). */
export const budgetBands = [
  'Not sure yet',
  'Under ₹2 lakh',
  '₹2–5 lakh',
  '₹5–15 lakh',
  '₹15 lakh+',
  'International: please discuss',
]

export const timelines = ['As soon as possible', 'Within 1 month', '1–3 months', '3+ months', 'Just exploring']

export const referralSources = ['Search engine', 'LinkedIn', 'Referral', 'Social media', 'Event', 'Other']
