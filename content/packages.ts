// AUTO-GENERATED from service_sheet.xlsx by scripts/parse-sheet.mjs.
// Edit the spreadsheet and run `npm run content:sheet`, or edit this file directly.
import type { Package } from './types'

export const packages: Package[] = [
  {
    "slug": "digital-foundations-sprint",
    "name": "Digital Foundations Sprint",
    "bestFor": "Small company needing a clear starting point",
    "included": [
      "Stakeholder workshop",
      "Workflow map",
      "System/data review",
      "3–5 prioritised use cases",
      "Phased architecture",
      "Estimated delivery plan",
      "Risk/dependency list"
    ],
    "timeline": "1–2 weeks",
    "indicativeFee": "₹40,000–₹1,25,000",
    "recurringSupport": "May convert to build project",
    "notes": "Does not include production implementation unless added in writing."
  },
  {
    "slug": "ai-opportunity-and-cost-audit",
    "name": "AI Opportunity & Cost Audit",
    "bestFor": "Company piloting LLMs or considering AI adoption",
    "included": [
      "Use-case shortlist",
      "Sample workflow review",
      "API/model usage review if available",
      "Data readiness",
      "Cost drivers",
      "Architecture options",
      "Evaluation and rollout plan"
    ],
    "timeline": "1–3 weeks",
    "indicativeFee": "₹75,000–₹2,00,000",
    "recurringSupport": "₹25,000–₹75,000/month for follow-up advisory",
    "notes": "Savings forecast is an estimate until validated against live workloads."
  },
  {
    "slug": "knowledge-assistant-pilot",
    "name": "Knowledge Assistant Pilot",
    "bestFor": "Company wants answers over a controlled document set",
    "included": [
      "One selected source set",
      "Ingestion/indexing",
      "Basic RAG assistant",
      "Citations",
      "Access model for agreed roles",
      "Test set",
      "Pilot deployment and handover"
    ],
    "timeline": "4–6 weeks",
    "indicativeFee": "₹2,50,000–₹5,00,000",
    "recurringSupport": "₹25,000–₹1,00,000/month",
    "notes": "Limited sources/users/environments; production-grade scale and complex permissions may add cost."
  },
  {
    "slug": "business-workflow-automation",
    "name": "Business Workflow Automation",
    "bestFor": "A repetitive process spans 2–3 tools",
    "included": [
      "Process mapping",
      "One workflow",
      "Integrations",
      "Validations",
      "Retries",
      "Notifications",
      "Exception queue",
      "Logs",
      "UAT and handover"
    ],
    "timeline": "3–8 weeks",
    "indicativeFee": "₹1,50,000–₹5,00,000",
    "recurringSupport": "₹20,000–₹1,00,000/month",
    "notes": "Includes only the named workflow and agreed systems."
  },
  {
    "slug": "ai-quality-and-guardrails-sprint",
    "name": "AI Quality & Guardrails Sprint",
    "bestFor": "AI feature has inconsistent outputs or lacks testing",
    "included": [
      "Baseline evaluation",
      "Representative test set",
      "Retrieval/output checks",
      "Fallback/human review design",
      "CI regression starter suite",
      "Findings report"
    ],
    "timeline": "2–5 weeks",
    "indicativeFee": "₹1,00,000–₹4,00,000",
    "recurringSupport": "₹25,000–₹1,00,000/month",
    "notes": "Client must provide domain criteria and examples of correct/incorrect behaviour."
  },
  {
    "slug": "ai-finops-optimisation-sprint",
    "name": "AI FinOps Optimisation Sprint",
    "bestFor": "LLM API cost, latency or reliability needs improvement",
    "included": [
      "Usage baseline",
      "Instrumentation review",
      "Model-routing/caching options",
      "Gateway and budget controls",
      "Benchmark tests",
      "Implementation of agreed optimisation items"
    ],
    "timeline": "2–5 weeks",
    "indicativeFee": "₹1,00,000–₹4,00,000",
    "recurringSupport": "₹25,000–₹1,25,000/month",
    "notes": "Do not guarantee a fixed saving before workload analysis and post-change measurement."
  },
  {
    "slug": "website-and-lead-capture-package",
    "name": "Website & Lead Capture Package",
    "bestFor": "SME needs a professional presence and qualified enquiries",
    "included": [
      "Up to agreed number of pages",
      "Responsive design",
      "CMS or editable content",
      "Lead form",
      "Analytics basics",
      "SEO technical foundation",
      "Deployment"
    ],
    "timeline": "2–6 weeks",
    "indicativeFee": "₹75,000–₹3,00,000",
    "recurringSupport": "₹5,000–₹30,000/month",
    "notes": "Copywriting, hosting, premium themes, photography and paid campaigns may be additional."
  },
  {
    "slug": "mvp-internal-portal-build",
    "name": "MVP / Internal Portal Build",
    "bestFor": "Startup or team replacing a spreadsheet-based process",
    "included": [
      "Requirements & UX",
      "Core web app",
      "Authentication/roles",
      "Database",
      "Agreed integrations",
      "Automated tests",
      "Deployment",
      "Documentation and handover"
    ],
    "timeline": "6–12 weeks",
    "indicativeFee": "₹3,00,000–₹12,00,000",
    "recurringSupport": "₹30,000–₹1,50,000/month",
    "notes": "Final quote follows a prioritised backlog, integration review and explicit acceptance criteria."
  },
  {
    "slug": "data-dashboard-package",
    "name": "Data Dashboard Package",
    "bestFor": "Leadership needs reliable operational metrics",
    "included": [
      "KPI workshop",
      "Up to agreed source set",
      "Data model",
      "1–3 dashboard views",
      "Refresh",
      "Validation",
      "Access setup",
      "User handover"
    ],
    "timeline": "2–6 weeks",
    "indicativeFee": "₹1,00,000–₹4,00,000",
    "recurringSupport": "₹15,000–₹75,000/month",
    "notes": "BI tool licences and additional data sources may be extra."
  },
  {
    "slug": "multilingual-support-voice-pilot",
    "name": "Multilingual Support / Voice Pilot",
    "bestFor": "Company serving multilingual customers",
    "included": [
      "One defined conversation flow",
      "1–2 languages to start",
      "Speech/voice provider integration",
      "Business system handoff",
      "Test calls",
      "Monitoring and escalation"
    ],
    "timeline": "4–8 weeks",
    "indicativeFee": "₹2,50,000–₹7,50,000",
    "recurringSupport": "₹40,000–₹2,00,000/month",
    "notes": "Telephony, per-minute usage, local numbers and external voice/model costs excluded."
  },
  {
    "slug": "qa-automation-starter",
    "name": "QA Automation Starter",
    "bestFor": "Software team needs repeatable release confidence",
    "included": [
      "Critical journey selection",
      "Automated smoke/regression tests",
      "CI integration",
      "Test report",
      "Maintenance guide"
    ],
    "timeline": "2–5 weeks",
    "indicativeFee": "₹75,000–₹3,00,000",
    "recurringSupport": "₹20,000–₹75,000/month",
    "notes": "Best for stable, high-value workflows; test environment and accounts supplied by client."
  },
  {
    "slug": "managed-engineering-and-ai-ops",
    "name": "Managed Engineering & AI Ops",
    "bestFor": "Client wants continued ownership after delivery",
    "included": [
      "Defined monthly capacity",
      "Monitoring and triage",
      "Small fixes",
      "Dependency updates",
      "Regression checks",
      "Cost/quality review",
      "Monthly report"
    ],
    "timeline": "Monthly",
    "indicativeFee": "—",
    "recurringSupport": "₹30,000–₹2,50,000+/month",
    "notes": "Tiered by supported systems, hours, response targets, environments and on-call requirements."
  }
]
