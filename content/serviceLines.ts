import type { ServiceLine } from './types'
import { services } from './services'

/**
 * Public service lines. The 33 sheet services are mapped to these in scripts/parse-sheet.mjs (LINE_MAP).
 * Edit names and copy here freely; slugs are used in URLs (/services/:line).
 */
export const serviceLines: ServiceLine[] = [
  {
    slug: 'ai-strategy-governance',
    number: '01',
    name: 'AI Strategy & Governance',
    short: 'AI Strategy',
    summary: 'Find the AI use cases worth funding, then keep them measurable, affordable and well governed.',
    outcome: 'A ranked roadmap, evaluation baselines and cost controls before money is committed to build.',
  },
  {
    slug: 'ai-knowledge-conversational',
    number: '02',
    name: 'AI Knowledge & Conversational Systems',
    short: 'Knowledge & Chat',
    summary: 'Governed knowledge assistants and support bots that answer from your approved sources, with citations.',
    outcome: 'Source-grounded answers, access controls and a clear path to a human when it matters.',
  },
  {
    slug: 'ai-workflow-document',
    number: '03',
    name: 'AI Workflow Automation & Document AI',
    short: 'Workflow & Document AI',
    summary: 'Automate multi-step processes and document handling with deterministic control, audit logs and human review.',
    outcome: 'Less copy-paste, fewer manual keying errors, and exceptions routed to the right person.',
  },
  {
    slug: 'voice-vision-personalisation',
    number: '04',
    name: 'Voice, Vision & Personalisation',
    short: 'Voice & Vision',
    summary: 'Multilingual voice flows, image and video checks, and recommendation engines built around real user journeys.',
    outcome: 'Practical AI interfaces with escalation paths and offline evaluation before rollout.',
  },
  {
    slug: 'custom-software-mobile',
    number: '05',
    name: 'Custom Software & Mobile',
    short: 'Software & Mobile',
    summary: 'Web applications, portals, MVPs, mobile apps and websites built to be maintained, not just launched.',
    outcome: 'Working software in a repository you own, with tests, documentation and handover.',
  },
  {
    slug: 'integration-modernisation',
    number: '06',
    name: 'Integration, Automation & Modernisation',
    short: 'Integration',
    summary: 'Connect the systems you already use, automate back-office workflows and modernise legacy code safely.',
    outcome: 'Data that moves between tools reliably, with retries, reconciliation and rollback plans.',
  },
  {
    slug: 'data-analytics',
    number: '07',
    name: 'Data & Analytics',
    short: 'Data & Analytics',
    summary: 'Pipelines, dashboards, forecasting and data quality work that turns scattered data into trusted numbers.',
    outcome: 'Agreed KPI definitions, validated models and reports leadership can rely on.',
  },
  {
    slug: 'cloud-devops-qa-security',
    number: '08',
    name: 'Cloud, DevOps, QA, Security & Managed Support',
    short: 'Cloud, QA & Support',
    summary: 'Cloud architecture, CI/CD, observability, test automation, security reviews and ongoing support.',
    outcome: 'Repeatable releases, earlier warning of problems and a predictable support model.',
  },
  {
    slug: 'consulting-team-extension',
    number: '09',
    name: 'Consulting & Team Extension',
    short: 'Consulting',
    summary: 'Fractional CTO / AI architect leadership, or a dedicated engineering pod alongside your team.',
    outcome: 'Senior technical direction and delivery capacity without a long hiring cycle.',
  },
]

export const servicesForLine = (slug: string) => services.filter((s) => s.line === slug)
export const lineBySlug = (slug: string) => serviceLines.find((l) => l.slug === slug)
