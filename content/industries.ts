// AUTO-GENERATED from service_sheet.xlsx by scripts/parse-sheet.mjs.
// Edit the spreadsheet and run `npm run content:sheet`, or edit this file directly.
import type { Industry } from './types'

export const industries: Industry[] = [
  {
    "slug": "d2c-e-commerce",
    "name": "D2C / E-commerce",
    "problem": "Support volume, poor lead follow-up, fragmented product data, content overload.",
    "solutionBundle": [
      "Website assistant",
      "Approved-product RAG",
      "Comment/lead triage",
      "CRM integration",
      "Content repurposing"
    ],
    "workflow": [
      "Customer asks product/policy question",
      "Assistant retrieves approved answer",
      "Lead/order context captured",
      "Unusual complaint routed to a human"
    ],
    "deliverables": [
      "Support assistant",
      "Integration layer",
      "CRM update workflow",
      "Dashboard",
      "Approved content pipeline"
    ],
    "buyer": "Founder / E-commerce Head / Customer Experience / Marketing",
    "successMeasures": [
      "First-response time",
      "Resolution rate",
      "Lead response time",
      "Human escalation rate",
      "Content cycle time"
    ],
    "designNote": "Avoid medical/efficacy claims or unsupported product promises; protect customer data."
  },
  {
    "slug": "healthtech-clinics",
    "name": "HealthTech / Clinics",
    "problem": "Repeated patient FAQs, appointment admin, document burden and multilingual support.",
    "solutionBundle": [
      "Knowledge assistant for approved clinic content",
      "Appointment workflow",
      "Document intake",
      "Human escalation",
      "Optional voice pilot"
    ],
    "workflow": [
      "Patient asks an administrative question",
      "Answer sourced from approved clinic information",
      "Appointment request captured",
      "Urgent/clinical concerns routed to staff"
    ],
    "deliverables": [
      "Knowledge base",
      "Website/WhatsApp integration where approved",
      "Appointment workflow",
      "Audit trail"
    ],
    "buyer": "Clinic Operations / Product / IT",
    "successMeasures": [
      "Reduced admin handling time",
      "Appointment conversion",
      "FAQ containment",
      "Staff correction rate"
    ],
    "designNote": "Clinical judgement must remain with qualified professionals; strict privacy and consent requirements."
  },
  {
    "slug": "fintech-insurance",
    "name": "FinTech / Insurance",
    "problem": "Document-heavy onboarding, repetitive support, policy search and regulatory material discovery.",
    "solutionBundle": [
      "Document extraction",
      "Governed knowledge search",
      "Workflow automation",
      "Audit logging",
      "QA/guardrail testing"
    ],
    "workflow": [
      "Customer submits documents",
      "Fields extracted",
      "Confidence and rules validated",
      "Exceptions enter human review",
      "Records synced to core system"
    ],
    "deliverables": [
      "Extraction API",
      "Validation rules",
      "Exception queue",
      "Policy search",
      "Evaluation set"
    ],
    "buyer": "Operations / Digital Product / Compliance / IT",
    "successMeasures": [
      "Processing time",
      "Extraction accuracy by field",
      "Exception rate",
      "Manual rework",
      "Audit completeness"
    ],
    "designNote": "High-stakes decisions require clear human oversight and approval; do not present systems as legal or compliance certification."
  },
  {
    "slug": "saas-technology",
    "name": "SaaS / Technology",
    "problem": "Uncontrolled LLM costs, low RAG quality, fragile agents, slow release cycles.",
    "solutionBundle": [
      "AI architecture audit",
      "Gateway/model routing",
      "RAG evaluation",
      "Observability",
      "Deployment/QA engineering"
    ],
    "workflow": [
      "Request routed through gateway",
      "Suitable model/cache selected",
      "Output checked",
      "Metrics and cost recorded",
      "Failures escalated"
    ],
    "deliverables": [
      "Architecture blueprint",
      "Evaluation suite",
      "Gateway",
      "Cost dashboard",
      "Runbooks"
    ],
    "buyer": "CTO / VP Engineering / AI Lead / Platform Lead",
    "successMeasures": [
      "Cost per successful task",
      "Latency p95",
      "Evaluation pass rate",
      "Error rate",
      "Availability"
    ],
    "designNote": "Measure baseline and result under comparable traffic; cache only where correctness and privacy are preserved."
  },
  {
    "slug": "education-edtech",
    "name": "Education / EdTech",
    "problem": "Course localisation, tutor/learner support, content production and administrative load.",
    "solutionBundle": [
      "Multilingual transcription/dubbing pipeline",
      "Knowledge assistant",
      "LMS/CRM integration",
      "Content workflow"
    ],
    "workflow": [
      "Course asset ingested",
      "Transcript generated",
      "Translation reviewed",
      "Audio generated",
      "Human QA",
      "Files published to LMS"
    ],
    "deliverables": [
      "Localization workflow",
      "Review queue",
      "Asset metadata",
      "LMS integration",
      "Quality checklist"
    ],
    "buyer": "Academic Operations / Product / Content Lead",
    "successMeasures": [
      "Turnaround time per lesson",
      "Correction rate",
      "Cost per minute",
      "Learner support response time"
    ],
    "designNote": "Review terminology and regional-language quality; rights and consent needed for voices and likeness."
  },
  {
    "slug": "manufacturing-distribution",
    "name": "Manufacturing / Distribution",
    "problem": "SOPs are hard to search, maintenance records fragmented and reporting manual.",
    "solutionBundle": [
      "SOP knowledge assistant",
      "Data pipelines/dashboard",
      "Document processing",
      "Workflow and alert integration"
    ],
    "workflow": [
      "Operator searches SOP",
      "Cited instruction retrieved from approved version",
      "Non-standard case escalated; operations data feeds dashboard"
    ],
    "deliverables": [
      "SOP search",
      "Ingestion pipeline",
      "Operational dashboard",
      "Alert workflow",
      "Audit log"
    ],
    "buyer": "Plant Operations / Quality / IT / Supply Chain",
    "successMeasures": [
      "Search time",
      "Report cycle time",
      "Downtime-related indicators",
      "SOP access and usage"
    ],
    "designNote": "Do not use generated instructions as sole control for safety-critical procedures; use approved content and escalation."
  },
  {
    "slug": "real-estate-property",
    "name": "Real Estate / Property",
    "problem": "Lead routing delays, repetitive enquiries, document processing and scattered inventory data.",
    "solutionBundle": [
      "Lead capture",
      "CRM automation",
      "Document extraction",
      "Property/search portal",
      "Analytics dashboard"
    ],
    "workflow": [
      "Enquiry captured",
      "Lead deduplicated and scored",
      "Routed to agent",
      "Follow-up tasks created",
      "Conversion reporting"
    ],
    "deliverables": [
      "Landing pages/portal",
      "CRM workflows",
      "Lead dashboard",
      "Document extraction if needed"
    ],
    "buyer": "Sales Head / CRM Owner / Operations",
    "successMeasures": [
      "Lead response time",
      "Qualified-lead ratio",
      "Appointment conversion",
      "Duplicate rate"
    ],
    "designNote": "Do not scrape or use personal data without proper rights and legal basis."
  },
  {
    "slug": "professional-services-legal-ops",
    "name": "Professional Services / Legal Ops",
    "problem": "Time lost searching policy/contracts, summarising documents and tracking client intake.",
    "solutionBundle": [
      "Permission-aware document search",
      "Document intake/extraction",
      "Workflow automation",
      "Audit logs"
    ],
    "workflow": [
      "Matter/policy docs indexed by access permission",
      "User retrieves cited source passages",
      "Draft summary reviewed by professional",
      "Client intake status updated"
    ],
    "deliverables": [
      "Search tool",
      "Metadata/access model",
      "Extraction workflow",
      "Review queue",
      "Audit trail"
    ],
    "buyer": "Managing Partner / Legal Ops / IT / Knowledge Management",
    "successMeasures": [
      "Search time",
      "Intake processing time",
      "Review/edit rate",
      "Source coverage"
    ],
    "designNote": "Output is an aid for professional review, not legal advice; strict permissions and confidentiality required."
  },
  {
    "slug": "hospitality-travel",
    "name": "Hospitality / Travel",
    "problem": "High-volume repetitive queries, multilingual support and missed lead/booking follow-up.",
    "solutionBundle": [
      "Conversational support assistant",
      "Voice pilot",
      "CRM/ticket integration",
      "Reviewable content management"
    ],
    "workflow": [
      "Guest asks question",
      "Approved answer provided",
      "Booking/issue details captured",
      "Complex requests handed to staff"
    ],
    "deliverables": [
      "Chat/voice flow",
      "FAQs",
      "Integration",
      "Escalation",
      "Support analytics"
    ],
    "buyer": "Operations / Guest Experience / Contact Centre",
    "successMeasures": [
      "Response time",
      "Containment rate",
      "Guest satisfaction",
      "Escalation completion"
    ],
    "designNote": "Real-time booking availability and prices must come from authoritative systems, not model guesses."
  },
  {
    "slug": "startups-smes",
    "name": "Startups / SMEs",
    "problem": "Manual operations, no dedicated senior technology lead and need to validate product ideas.",
    "solutionBundle": [
      "AI readiness sprint",
      "MVP/web portal",
      "Integrations",
      "Cloud setup",
      "Ongoing fractional architecture support"
    ],
    "workflow": [
      "Select high-value workflow",
      "Build a narrow MVP",
      "Measure adoption/outcomes",
      "Harden and expand based on evidence"
    ],
    "deliverables": [
      "Prioritised roadmap",
      "MVP",
      "Deployment",
      "Docs",
      "Backlog and monthly review"
    ],
    "buyer": "Founder / COO / CTO / Product Owner",
    "successMeasures": [
      "Time saved",
      "Adoption",
      "Lead conversion",
      "Cycle time",
      "Operational error rate"
    ],
    "designNote": "Keep phase-one scope small and preserve cash runway; no large build before validation."
  }
]
