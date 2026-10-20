/**
 * POST /api/contact — Vercel Function (Node.js runtime, Web Request/Response handler).
 *
 * Validates the enquiry server-side, drops honeypot submissions, applies a basic per-IP rate limit,
 * and emails the enquiry to CONTACT_TO_EMAIL (default: directrixtechnologies@gmail.com) via Resend.
 *
 * Env (server only): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * Note: Resend cannot send FROM a Gmail address. CONTACT_FROM_EMAIL must use a domain verified in Resend
 * (or Resend's test sender onboarding@resend.dev). The visitor's address is set as reply_to.
 */
import { contactSchema } from '../src/lib/contactSchema.js'

const TO = process.env.CONTACT_TO_EMAIL || 'directrixtechnologies@gmail.com'
const FROM = process.env.CONTACT_FROM_EMAIL || 'Directrix Website <onboarding@resend.dev>'

// Best-effort in-memory rate limit (per warm instance). For strict limits use Upstash/Vercel KV.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function POST(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim()
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) return json(429, { error: 'Too many messages. Please try again in a few minutes.' })
  recent.push(now)
  hits.set(ip, recent)

  if (!(request.headers.get('content-type') || '').includes('application/json')) return json(415, { error: 'Unsupported content type.' })
  const raw = await request.text()
  if (raw.length > 20_000) return json(413, { error: 'Message too large.' })

  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return json(400, { error: 'Invalid request.' })
  }

  // Honeypot: pretend success so bots learn nothing.
  if (payload && typeof payload === 'object' && (payload as { website?: string }).website) return json(200, { ok: true })

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) return json(400, { error: 'Please check the highlighted fields.', issues: parsed.error.flatten().fieldErrors })
  const d = parsed.data

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('[contact] RESEND_API_KEY is not set')
    return json(503, { error: 'Our form is temporarily unavailable.' })
  }

  const rows: [string, string][] = [
    ['Name', d.name],
    ['Email', d.email],
    ['Company', d.company],
    ['Role', d.role || '—'],
    ['Enquiring about', d.context || '—'],
    ['Service interest', d.interests.join(', ') || '—'],
    ['Budget', d.budget || '—'],
    ['Timeline', d.timeline || '—'],
    ['Heard about us', d.source || '—'],
  ]
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nWhat they want to achieve:\n${d.goal}\n`
  const html = `<h2 style="font-family:sans-serif">New enquiry — Directrix Technologies website</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555">${k}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`)
    .join('')}</table>
<h3 style="font-family:sans-serif">What they want to achieve</h3>
<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(d.goal)}</p>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: d.email,
        subject: `New enquiry: ${d.name} (${d.company})${d.context ? ` — ${d.context}` : ''}`.slice(0, 180),
        text,
        html,
      }),
    })
    if (!res.ok) {
      console.error('[contact] Resend error', res.status, await res.text())
      return json(502, { error: 'We could not send your message right now.' })
    }
  } catch (err) {
    console.error('[contact] send failed', err)
    return json(502, { error: 'We could not send your message right now.' })
  }
  return json(200, { ok: true })
}

export function GET() {
  return json(405, { error: 'Method not allowed.' })
}
