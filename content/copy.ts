import type { FaqItem } from './types'

export const hero = {
  eyebrow: 'Custom software · Applied AI · Data · Cloud',
  headline: 'Software and AI that move your business forward.',
  sub: 'We scope a real business problem, agree how success is measured, then design, build and support the system that solves it.',
  proof: [
    '13 projects delivered across AI, enterprise, ML and mobile',
    'App live on Google Play',
    'Private, offline AI search delivered',
  ],
}

export const problems = [
  {
    pain: "Teams can't find answers",
    detail: 'Policies, SOPs, manuals and contracts are spread across drives and inboxes, so people ask around or guess.',
    outcome: 'Governed knowledge assistants',
    outcomeDetail: 'Source-grounded answers with citations, limited to the documents each role is allowed to see.',
    line: 'ai-knowledge-conversational',
  },
  {
    pain: 'Manual copy-paste between tools',
    detail: 'Staff re-key the same data into CRM, spreadsheets and back-office systems, and follow-ups slip.',
    outcome: 'Workflow automation',
    outcomeDetail: 'One defined workflow at a time, with retries, audit logs and human approval for high-stakes steps.',
    line: 'ai-workflow-document',
  },
  {
    pain: 'AI pilots that fail on real data',
    detail: 'The demo looked good, but answers change unpredictably and nobody can say whether it is ready to ship.',
    outcome: 'Evaluation & guardrails',
    outcomeDetail: 'Test sets, acceptance thresholds and regression checks, measured against agreed criteria.',
    line: 'ai-strategy-governance',
  },
]

export const principles = [
  {
    title: 'Start with a scoped business problem',
    body: 'We begin with one workflow and a named owner, not a technology wish list. Scope grows only after the first delivery proves value.',
  },
  {
    title: 'Measurable acceptance criteria',
    body: 'Before we build, we agree the test inputs, targets and review window that decide whether the work is done.',
  },
  {
    title: 'Deterministic workflows over unconstrained agents',
    body: 'Business processes run on explicit rules, state and approval steps. Models assist; they do not run unchecked.',
  },
  {
    title: 'Evaluation & guardrails built in',
    body: 'AI features ship with test sets, fallback paths, human review for high-stakes steps and regression checks.',
  },
  {
    title: 'You own your code and cloud accounts',
    body: 'The repository and critical cloud accounts stay in your name where practicable, so you are never locked in.',
  },
  {
    title: 'Transparent change control',
    body: 'Anything outside the agreed scope goes through a written change request showing the effect on time and cost.',
  },
]

export const values = [
  { title: 'Honest scoping', body: 'We say what a system can and cannot do, and put limitations in writing.' },
  { title: 'Evidence over hype', body: 'Decisions are based on pilots, measurements and agreed criteria.' },
  { title: 'Built to be handed over', body: 'Documentation, runbooks and tests come with the code.' },
]

export const faqs: FaqItem[] = [
  {
    q: 'How does an engagement with Directrix start?',
    a: 'With a short qualification call to understand the problem, who owns it, your timeline and the systems involved. If there is a fit, we propose a paid discovery phase for anything uncertain or multi-system, or go straight to a fixed-scope package when the work is well defined.',
  },
  {
    q: 'Why is discovery a paid phase?',
    a: 'Discovery is real work: interviewing users, mapping the workflow, inspecting sample data and integrations, and producing a requirements brief, architecture, prioritised backlog, risks and acceptance criteria. It lets us give you an estimate based on evidence rather than guesswork, and you keep the outputs whether or not you continue with us.',
  },
  {
    q: 'How do you price and quote projects?',
    a: 'Every quote follows discovery and a written scope. Price depends on scope, data readiness, integrations, environments, security needs, deadlines and team composition. We usually bill against milestones, and any change outside the agreed scope goes through a written change request. Cloud, model/API, licence and other third-party costs are normally paid by you directly.',
  },
  {
    q: 'What do you need from our side?',
    a: 'A named decision-maker and process owner, access to the people who know the workflow, representative sample data or documents, sandbox or API access to the systems involved, and timely feedback at review points. We list exact dependencies in the proposal.',
  },
  {
    q: 'Who owns the code and intellectual property?',
    a: 'Custom deliverables transfer to you (or are licensed to you) after full payment, as set out in the statement of work. We keep code in a repository and cloud accounts you own wherever practicable, and we disclose major open-source and vendor dependencies and their licences.',
  },
  {
    q: 'How do you measure AI quality?',
    a: 'We build a representative test set with you, define scoring criteria (for example groundedness, task success, latency and cost) and agree pass thresholds before rollout. Results apply to the agreed test set and conditions, so we also add regression checks, fallbacks and human review for high-stakes steps. We never promise "zero hallucination".',
  },
  {
    q: 'How do you handle data privacy and security?',
    a: 'We agree data categories, retention, deletion, sub-processors and model-vendor data terms up front, apply least-privilege access with expiring credentials, and log access. You confirm you have the right to share the data and how it may be used. For regulated questions we document items for your legal or compliance counsel.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes a stabilisation and handover period for in-scope defects, runbooks and knowledge transfer. Ongoing monitoring, updates and enhancements are available through a monthly support agreement with written hours, response targets and exclusions.',
  },
  {
    q: 'Which industries do you work with?',
    a: 'We have solution patterns for D2C and e-commerce, healthtech and clinics, fintech and insurance, SaaS, education, manufacturing, real estate, professional services and legal ops, hospitality and travel, and startups and SMEs. The approach starts from your workflow, so other sectors are welcome too.',
  },
  {
    q: 'Do you work with international clients and other time zones?',
    a: 'Yes. Our past work includes projects with organisations in the UK. We agree overlap hours, communication channels and review cadence at the start, and quote currency, payment fees and tax handling in writing.',
  },
]

/**
 * Client-facing wording for sheet notes that are phrased as internal instructions.
 * Keyed by service ID / process step; anything not listed is shown as written in the sheet.
 */
export const publicBoundary: Record<string, string> = {
  'AI-02': 'Answers are grounded in your approved sources with citations. We validate source coverage and access control rather than promising perfect answers.',
  'AI-03': 'We scope one workflow at a time. Limitations of external systems or APIs can affect delivery.',
  'AI-05': 'Savings depend on your workload and traffic, so we measure before and after rather than promising a fixed percentage.',
  'AI-07': 'Human escalation and monitoring are designed in explicitly, not left to chance.',
  'SW-07': 'Cost depends heavily on legacy complexity and regression risk, so we estimate after a code review, not before.',
  'CONS-01': 'Hours, cadence and decision responsibilities are agreed up front. This complements your accountable leadership rather than replacing it.',
  'CONS-02': 'Pricing depends on team size and seniority. Engagements have defined ownership and deliverables rather than open-ended resourcing.',
}

export const publicSafeguard: Record<number, string> = {
  1: "We don't commit to a price or date until dependencies and scope are understood.",
  5: 'The defect warranty is kept separate from new features, vendor failures and change requests.',
  6: 'Hours, availability, response targets, included capacity, exclusions and overage fees are agreed in writing.',
}
