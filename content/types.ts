export interface Service {
  id: string
  line: string
  sheetCategory: string
  name: string
  slug: string
  whatWeDo: string
  deliverables: string[]
  exampleProblems: string
  idealBuyer: string
  engagement: string
  /** Internal planning data. Only rendered when SHOW_PRICING is true. */
  indicativeOneTime: string
  /** Internal planning data. Only rendered when SHOW_PRICING is true. */
  indicativeMonthly: string
  clientInputs: string
  priority: string
  featured: boolean
  boundaries: string
}

export interface ServiceLine {
  slug: string
  number: string
  name: string
  short: string
  summary: string
  outcome: string
}

export interface Package {
  slug: string
  name: string
  bestFor: string
  included: string[]
  timeline: string
  /** Internal planning data. Only rendered when SHOW_PRICING is true. */
  indicativeFee: string
  recurringSupport: string
  notes: string
}

export interface Industry {
  slug: string
  name: string
  problem: string
  solutionBundle: string[]
  workflow: string[]
  deliverables: string[]
  buyer: string
  successMeasures: string[]
  designNote: string
}

export interface ProcessStage {
  step: number
  title: string
  duration: string
  activities: string
  outputs: string
  clientNeeds: string
  safeguard: string
}

export type CategoryGroup =
  | 'Generative AI & AI Agents'
  | 'Enterprise Application Engineering'
  | 'Machine Learning & Data Intelligence'
  | 'Web & Mobile Development'

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  slug: string
  title: string
  shortTitle: string
  subtitle: string
  categoryGroup: CategoryGroup
  tags: string[]
  /** Shown only when SHOW_ORG_NAMES is true and showOrganization is true. */
  organization?: string
  showOrganization: boolean
  /** Neutral label used instead of a client name (e.g. "Confidential enterprise client", "Own product"). */
  organizationLabel?: string
  featured: boolean
  cardSummary: string
  overview: string[]
  whatWeBuilt: string[]
  howWeBuiltIt: string[]
  /** Omit to hide the Technology Stack section (e.g. when the stack is unconfirmed). */
  techStack?: string[]
  outcome: string
  potentialApplications?: string[]
  links?: ProjectLink[]
  disclaimer?: string
  diagram?: 'documind' | 'knowledge-navigator'
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company?: string
}

export interface TeamMember {
  name: string
  role: string
  bio?: string
  photo?: string
  linkedin?: string
}

export interface Post {
  title: string
  summary: string
  href: string
  date: string
}

export interface FaqItem {
  q: string
  a: string
}
