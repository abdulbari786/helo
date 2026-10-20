# Directrix Technologies — Website

Marketing site for **Directrix Technologies**: React 18 + Vite + TypeScript + Tailwind CSS + React Router, pre-rendered to static HTML for SEO and deployed on Vercel with one serverless function for the contact form.

Contact details used throughout: **+91 63033 90400** (call / WhatsApp) and **directrixtechnologies@gmail.com**.

---

## 1. Run it locally

Requires Node.js 20+.

```bash
npm install
cp .env.example .env        # optional for local dev
npm run dev                 # http://localhost:5173
```

In `npm run dev` and `npm run preview`, `/api/contact` is a local stand-in that only logs the enquiry to the terminal, so you can test the form without email keys. To run the real email function locally, use the Vercel CLI: `npx vercel dev`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck → client build → SSR build → pre-render every route → name check |
| `npm run preview` | Serve the production build on http://localhost:4173 |
| `npm run test:e2e` | Playwright smoke tests (desktop + mobile). Run `npx playwright install chromium` once first |
| `npm run lint` | ESLint |
| `npm run content:sheet` | Regenerate services / packages / industries / process from `inputs/service_sheet.xlsx` |
| `npm run check:names` | Confirm the old placeholder company name appears nowhere in code or output |

## 2. Edit content (no component changes needed)

All text lives in `content/`:

| File | What's in it |
| --- | --- |
| `content/site.ts` | **The owner config.** Phone, email, booking link, social links, response-time line, legal details, analytics, feature flags (`SHOW_PRICING`, `SHOW_ORG_NAMES`), testimonials, team, blog posts, form options. Every `PLACEHOLDER` comment needs confirming before launch. |
| `content/projects.ts` | The 13 case studies and engineering capabilities |
| `content/serviceLines.ts` | The 9 public service lines and which case studies relate to each |
| `content/copy.ts` | Hero, problem cards, principles, values, FAQ, client-facing wording overrides |
| `content/services.ts`, `packages.ts`, `industries.ts`, `process.ts` | **Generated** from the service sheet (see below); safe to edit by hand too |

### Updating from the service sheet

1. Edit `inputs/service_sheet.xlsx` (keep the tab names and column order).
2. Run `npm run content:sheet`.

The parser uses only Node built-ins. It replaces any leftover old company name in the sheet with "Directrix" and refuses to finish if any remains. To regroup services into different public service lines, edit `LINE_MAP` in `scripts/parse-sheet.mjs`.

### Common edits

- **Show prices:** set `SHOW_PRICING: true` in `content/site.ts`. Packages and services then show "Indicative from ₹X, subject to discovery" using the sheet's lower bound.
- **Add a testimonial / team member / blog post:** add to the arrays in `content/site.ts`. Sections stay hidden until real entries exist (Insights needs 3+ posts).
- **Social icons / newsletter:** fill in `site.social` / `site.newsletterEndpoint`.
- **Office location or hours:** fill in `site.contact.location` / `site.contact.hours`.

## 3. Booking calendar

Set `VITE_BOOKING_URL` (Vercel env or `.env`) to your Cal.com or Calendly link, for example `https://cal.com/your-name/discovery`. Until it is set, the booking modal and contact page show call / WhatsApp / email plus the enquiry form instead of a broken calendar. If the calendar fails to load within 10 seconds, the same fallback appears.

## 4. Contact form email (Resend)

1. Create a Resend account and an API key.
2. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` = `directrixtechnologies@gmail.com` (already the default)
   - `CONTACT_FROM_EMAIL`, e.g. `Directrix Website <hello@yourdomain.com>`
3. **Important:** Resend cannot send *from* a Gmail address. Verify your own domain in Resend and use an address on it as `CONTACT_FROM_EMAIL`. Until then, `Directrix Website <onboarding@resend.dev>` works for testing (Resend only delivers test-sender mail to the address that owns the Resend account). Replies go straight to the visitor via `reply_to`.

The function (`api/contact.ts`) validates on the server with the same zod schema as the form, drops honeypot submissions silently, and applies a best-effort per-IP rate limit (5 per 10 minutes per warm instance). For a strict, global limit, add Upstash Redis / Vercel KV.

**Fallback without Resend:** point the form at Formspree or EmailJS instead. In `src/components/contact/ContactForm.tsx`, change the `fetch('/api/contact', …)` URL to your Formspree endpoint (`https://formspree.io/f/<id>`, JSON body works as-is, set the `Accept: application/json` header), or call EmailJS's `send` with a template that maps the same fields.

## 5. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project** and import the repo. Framework preset: **Vite** (build settings come from `vercel.json`).
3. Add the environment variables from `.env.example` (at minimum `VITE_SITE_URL` once your domain is known, plus the Resend variables).
4. Deploy, then add your custom domain and update `VITE_SITE_URL` so canonical URLs and the sitemap use it.

Every route is pre-rendered to `dist/<route>.html` and served as clean URLs. Unknown URLs get the pre-rendered `404.html`. `sitemap.xml` and `robots.txt` are generated at build time.

## 6. Analytics

Set `VITE_ANALYTICS_PROVIDER` to `plausible` (cookieless, no banner) with `VITE_PLAUSIBLE_DOMAIN`, or to `ga4` with `VITE_GA4_ID` (a consent banner appears and GA loads only after acceptance). Events: `cta_click`, `booking_open`, `contact_click`, `form_submit`, `form_error`, `case_study_view`.

## 7. Project structure

```
api/contact.ts            Vercel Function (Resend email)
content/                  All editable content + owner config (site.ts)
inputs/service_sheet.xlsx Source for generated content files
public/                   Logos (light/dark), favicons, OG image
scripts/                  parse-sheet, prerender, check-names
src/components/           UI, layout, booking, contact, diagrams
src/sections/             Home page sections
src/pages/                Routes (lazy-loaded)
src/entry-server.tsx      Server render used by the pre-render step
tests/smoke.spec.ts       Playwright smoke tests
```

Animation stack: GSAP + ScrollTrigger (process timeline, lazy-loaded), Lenis (smooth scroll on desktop, lazy-loaded), Framer Motion (filters, drawers, accordions, menu), and a lightweight canvas for the hero. All of it respects `prefers-reduced-motion`.
