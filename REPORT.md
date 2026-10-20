# Directrix Technologies Website — Build Report

Date: 20 October 2026

## Build status and verification

The full codebase is written to the specified stack: React 18, Vite, TypeScript, Tailwind CSS, React Router, GSAP + ScrollTrigger, Lenis, Framer Motion, react-hook-form + zod, react-helmet-async, and a Vercel Function for the contact form.

**Important limitation.** The build workspace could not reach the npm registry (blocked by network policy), so `npm install`, the real `npm run build`, `tsc`, ESLint and Lighthouse could not be run here. Instead I verified the real source this way:

- The actual `src/` and `content/` code was bundled with esbuild. Only six libraries (React Router, Framer Motion, react-helmet-async, react-hook-form, GSAP, Lenis) were swapped for minimal stand-ins, and CSS was compiled with the locally available Tailwind.
- **All 41 routes pre-render** through the real `entry-server.tsx` (home, 2 service indexes, 9 service lines, 10 industries, 13 case studies, process, about, contact, privacy, terms, plus 404).
- **The project's own Playwright suite passes 26/26 on desktop and mobile.** It covers: home loads with no console errors; pre-rendered HTML; navigation (desktop nav and mobile menu); booking dialog open and close; form validation and submission; package pre-fill; case studies render; publishing rules (no pending metrics, P07 unnamed, P01 confidential, Nusqa disclaimer); and the 404 page.
- Screenshots were taken at 1440px and 390px in light and dark themes, and the visual bugs found were fixed (logo sizing, count-ups stuck at 0, modal overflow, carousel gutter, diagram legibility).

**What you should run once on your machine (or once I have package access):** `npm install && npm run build && npm run test:e2e`. The first real TypeScript compile may flag small type issues the stand-ins couldn't catch, and those are quick to fix. Lighthouse should then be run against the Vercel preview.

## (a) Placeholders the owner must fill or confirm

All are in `content/site.ts` unless noted.

| Item | Current value | Action |
| --- | --- | --- |
| Production domain | `https://directrixtechnologies.com` | Set `VITE_SITE_URL` to the real domain (affects canonical URLs, sitemap, Open Graph) |
| Booking link | Placeholder `https://cal.com/directrix/discovery`; calendar hidden until set | Set `VITE_BOOKING_URL` to the real Cal.com or Calendly link |
| Response-time promise | "We reply within 1 business day." | Confirm or change |
| Office location / hours | Empty (hidden) | Add if you want them shown |
| Social profiles | Empty (hidden) | Add LinkedIn, GitHub and others |
| About line | Draft from the projects file, `approved: false` | Approve or edit |
| Team | Empty (section hidden) | Add real members if wanted |
| Testimonials | Empty (section hidden) | Add only real, permissioned quotes |
| Insights / blog | Empty (hidden until 3 posts) | Optional |
| Newsletter | No endpoint (hidden) | Optional |
| Analytics | Off | Choose Plausible or GA4 and set the IDs |
| Legal entity name | "Directrix Technologies" | Confirm registered name |
| Registered address | Empty (hidden) | Add if required |
| Governing law | "India" | Confirm with counsel |
| Privacy Policy and Terms | Templates, `reviewedByCounsel: false` | **Legal review required before launch** |
| Budget bands on the form | Generic INR bands | Confirm they suit your market |
| Resend setup (Vercel env) | Not configured | `RESEND_API_KEY`, plus a sender on a Resend-verified domain (`CONTACT_FROM_EMAIL`). Gmail cannot be the sender. |
| Website copy I wrote | Hero, problem cards, principles, values, FAQ, CTA text (`content/copy.ts`) | Review the tone and claims |

## (b) Case studies: all 13 published, with these restrictions

| ID | Project | What was held back |
| --- | --- | --- |
| P01 | Enterprise Launch | Client shown only as "Confidential enterprise client". I also removed "Google development and deployment tooling" from the stack, because it could hint at the client; it now reads "CI/CD tooling". |
| P02 | CineAssist | **60%** figure not published; qualitative outcome only |
| P03 | SmartFind | **20%** figure not published |
| P06 | FingerCheck 2.0 | **98%** figure not published |
| P07 | WorkforceIQ | **89%** figure not published; **no organisation shown** (attribution unconfirmed) |
| P08 | ModelOps Console | **90%+** figure not published |
| P09 | CineGear Digital | **50%** figure not published |
| P10 | Adaptive Agent System | Minimal version; Technology Stack section hidden (frameworks TO CONFIRM) |
| P11 | Nusqa | "50+ downloads" omitted, because I couldn't re-check the live Play listing. The informational, not-medical-advice disclaimer is shown, and the Google Play link is included. |
| P12 | SpeakMart | Technology Stack section hidden; GitHub link not shown (it returned 404) |
| P13 | Imdad-ul-Fuqaraa Trust | Unconfirmed feature list (donation flow, counters, etc.) omitted; live site link included |

Organisations are shown by name per your confirmation: CineGear Pro (P02, P03, P08, P09), University of East London (P05, P06, P10) and Imdad-ul-Fuqaraa Trust (P13). `SHOW_ORG_NAMES=true`. P04 shows "Enterprise AI project", and P11/P12 show "Own product".

## (c) Open items from Section 5 of the projects file

1. **Metrics to verify:** P02 (60%), P03 (20%), P06 (98%), P07 (89%), P08 (90%+), P09 (50%). Each still needs its measurement method, dataset and period. Still open.
2. **P07 organisation:** confirm CineGear Pro. Still open.
3. **P01 stack:** confirm languages and frameworks. Still open; client stays confidential.
4. **P10 details:** algorithm, environment, framework and results, or approve the short version. Still open; the short version is live.
5. **P11 Nusqa:** confirm whether delivery functionality exists, plus framework and backend. Still open.
6. **P12 SpeakMart:** confirm the repo is public, plus features and stack. Still open.
7. **P13 Imdad-ul-Fuqaraa:** confirm site features and framework. Still open. The trust's agreement to be shown was confirmed by you.
8. **Permissions** for CineGear Pro and the University of East London: confirmed by you; resolved.
9. **Company copy:** the about line still needs approval. Logo, phone and email are now supplied and used. Location is still open (optional).

## (d) Old placeholder name

"Diamond" appears **nowhere** in the website code, content or build output. `npm run check:names` scans `src`, `content`, `api`, `public`, `tests`, `dist`, `index.html`, `README.md`, `vercel.json` and `.env.example`. It now runs automatically at the end of every `npm run build`, and it returned zero matches. The verification build's HTML output was also checked: zero matches.

The word appears only in:
- `scripts/parse-sheet.mjs`, deliberately, in the code that replaces it with "Directrix" when content is generated from the sheet
- `scripts/check-names.mjs`, the check itself
- the source spreadsheet `inputs/service_sheet.xlsx` (Start Here, Industry Solutions header, Delivery & Commercials). **Fix it at source when convenient.**

## (e) Decisions, deviations and things not built

- **Counts differ from the prompt.** The sheet contains **33 services** (not 35) and **10 industries** (not 11). The site uses the true numbers everywhere, including the count-ups.
- **Service lines:** 8 plus Consulting & Team Extension = 9 numbered cards (01–09), as described in the prompt.
- **Pre-rendering:** I used Vite's SSR build plus a small `scripts/prerender.mjs`, rather than `vite-react-ssg` or `vite-plugin-prerender`. It works with `React.lazy` routes and `react-helmet-async` without another dependency, and it also generates `sitemap.xml`, `robots.txt` and `404.html`.
- **Enquiry form:** all 9 requested fields are present. Budget, timeline and how-you-heard sit in a collapsible "optional" panel, so only 6 fields show by default and the form stays under 8 visible fields.
- **Booking:** every "Book a Free Discovery Call" opens a modal. While the booking link is a placeholder (or fails to load within 10 s), it shows call, WhatsApp, email and the enquiry form instead of a broken calendar.
- **Client-facing wording:** 7 service notes and 3 process safeguards in the sheet are written as internal instructions (e.g. "Do not promise a price…"). The site shows reworded client-facing versions (`content/copy.ts`); the sheet is unchanged.
- **"Launch first" services** are badged "Recommended starting point". I avoided "popular", which would imply data we don't have.
- **Shared-element transition** into case studies uses the View Transitions API (Chrome, Edge, Safari 18+); other browsers navigate normally.
- **Smooth scrolling (Lenis)** is enabled only on desktop with a fine pointer and motion allowed.
- **Intro logo reveal:** once per session, under 1.2 s, skippable, skipped for reduced motion and for search-engine bots.
- **Not built:** the optional custom desktop cursor, skipped to protect performance and accessibility.
- **Rate limiting** is per serverless instance (best effort). Add Upstash or Vercel KV for a strict global limit.
- **Fonts:** Sora (headings) and Inter (body) are self-hosted via `@fontsource`. The verification screenshots used system fallbacks, so the real build will look slightly different and closer to the wordmark.
- **Brand colours:** sampled from the logo as ink `#17181C` and blue `#2862CC` (the prompt's `#1F63D6` was an estimate).
