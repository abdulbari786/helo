// AUTO-GENERATED from service_sheet.xlsx by scripts/parse-sheet.mjs.
// Edit the spreadsheet and run `npm run content:sheet`, or edit this file directly.
import type { ProcessStage } from './types'

export const processStages: ProcessStage[] = [
  {
    "step": 1,
    "title": "Qualification & Fit",
    "duration": "2–5 business days",
    "activities": "Understand business problem, buyer, urgency, budget range, existing system and decision process.",
    "outputs": "Clear problem statement; initial feasibility; go/no-go; named decision-maker.",
    "clientNeeds": "Share high-level workflows, constraints, target users and business outcome.",
    "safeguard": "Do not promise a price or date before dependencies and scope are understood."
  },
  {
    "step": 2,
    "title": "Paid Discovery & Architecture",
    "duration": "1–3 weeks",
    "activities": "Interview users; map workflow; inspect representative data/integrations; identify options; estimate cost, risks and measurable outcome.",
    "outputs": "Requirements brief; architecture diagram; prioritised backlog; assumptions; cost and rollout estimate; acceptance criteria.",
    "clientNeeds": "Make subject-matter experts available; provide agreed sample data and sandbox access securely.",
    "safeguard": "Discovery is a paid deliverable; credit toward implementation only when explicitly agreed."
  },
  {
    "step": 3,
    "title": "Prototype / Proof of Value",
    "duration": "2–6 weeks",
    "activities": "Build a narrow module against representative data; compare options; capture feedback; measure baseline and performance.",
    "outputs": "Working prototype/pilot; evaluation results; limitations; recommendation to proceed, adjust or stop.",
    "clientNeeds": "Provide sample scenarios, acceptance feedback and timely decisions.",
    "safeguard": "Pilot success criteria set in advance; prototype is not automatically production-ready."
  },
  {
    "step": 4,
    "title": "Production Build",
    "duration": "4–16+ weeks",
    "activities": "Implement approved scope; integrations; authentication/access control; tests; deployment; observability; documentation.",
    "outputs": "Working release; source code; configuration; tests; runbooks; handover; acceptance checklist.",
    "clientNeeds": "Provide access, product decisions, test users, legal/security approvals and required vendor accounts.",
    "safeguard": "Milestone billing; signed scope; change requests for additions; client sign-off window."
  },
  {
    "step": 5,
    "title": "Stabilisation & Handover",
    "duration": "1–4 weeks after launch",
    "activities": "Address in-scope defects; production monitoring; knowledge transfer; resolve launch issues.",
    "outputs": "Handover checklist; known limitations; support contacts; runbooks; final acceptance.",
    "clientNeeds": "Confirm acceptance or list reproducible defects within agreed review window.",
    "safeguard": "Separate defect warranty from new features, vendor failures and change requests."
  },
  {
    "step": 6,
    "title": "Managed Support / Optimisation",
    "duration": "Monthly",
    "activities": "Monitor agreed systems; triage issues; update dependencies; review AI quality/cost; deliver small enhancements per service tier.",
    "outputs": "Monthly service report; incident/usage summary; optimisation backlog; agreed maintenance releases.",
    "clientNeeds": "Maintain owners, vendor subscriptions, approvals, access and escalation contacts.",
    "safeguard": "Define hours, availability, response targets, included capacity, exclusions and overage fees."
  }
]
