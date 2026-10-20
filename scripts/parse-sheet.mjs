#!/usr/bin/env node
/**
 * Parses the Directrix service sheet (.xlsx) into typed content files:
 *   content/services.ts, content/packages.ts, content/industries.ts, content/process.ts
 *
 * Usage:  node scripts/parse-sheet.mjs path/to/service_sheet.xlsx
 *
 * Uses only Node built-ins (zlib + a tiny zip/XML reader), so no extra packages are needed.
 * Any leftover "Diamond" placeholder text in the sheet is replaced with "Directrix".
 * Indicative prices are kept in the data but are only shown on the site when SHOW_PRICING is true.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { inflateRawSync } from 'node:zlib'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const file = process.argv[2] ?? 'inputs/service_sheet.xlsx'

// ---------- minimal zip reader ----------
function unzip(buf) {
  let eocd = buf.length - 22
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--
  if (eocd < 0) throw new Error('Not a zip/xlsx file')
  const count = buf.readUInt16LE(eocd + 10)
  let p = buf.readUInt32LE(eocd + 16)
  const files = {}
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10)
    const csize = buf.readUInt32LE(p + 20)
    const nameLen = buf.readUInt16LE(p + 28)
    const extraLen = buf.readUInt16LE(p + 30)
    const commentLen = buf.readUInt16LE(p + 32)
    const local = buf.readUInt32LE(p + 42)
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen)
    const lNameLen = buf.readUInt16LE(local + 26)
    const lExtraLen = buf.readUInt16LE(local + 28)
    const start = local + 30 + lNameLen + lExtraLen
    const data = buf.subarray(start, start + csize)
    files[name] = method === 0 ? data : inflateRawSync(data)
    p += 46 + nameLen + extraLen + commentLen
  }
  return files
}

const decode = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')

const texts = (xml) => [...xml.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map((m) => decode(m[1])).join('')

function readWorkbook(path) {
  const files = unzip(readFileSync(path))
  const str = (n) => files[n]?.toString('utf8') ?? ''
  const shared = [...str('xl/sharedStrings.xml').matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => texts(m[1]))
  const rels = Object.fromEntries(
    [...str('xl/_rels/workbook.xml.rels').matchAll(/<Relationship\b[^>]*>/g)].map((m) => [
      m[0].match(/Id="([^"]+)"/)[1],
      m[0].match(/Target="([^"]+)"/)[1].replace(/^\/?(xl\/)?/, 'xl/'),
    ]),
  )
  const sheets = {}
  for (const m of str('xl/workbook.xml').matchAll(/<sheet\b[^>]*>/g)) {
    const name = decode(m[0].match(/name="([^"]+)"/)[1])
    const rid = m[0].match(/r:id="([^"]+)"/)[1]
    const xml = str(rels[rid])
    const rows = []
    for (const r of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
      const row = []
      for (const c of r[1].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        const attrs = c[1]
        const body = c[2] ?? ''
        const ref = attrs.match(/r="([A-Z]+)\d+"/)[1]
        const col = [...ref].reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0) - 1
        const type = attrs.match(/t="([^"]+)"/)?.[1]
        const v = body.match(/<v>([\s\S]*?)<\/v>/)?.[1]
        let val = null
        if (type === 's') val = shared[+v]
        else if (type === 'inlineStr') val = texts(body)
        else if (v !== undefined) val = decode(v)
        row[col] = val
      }
      if (row.some((x) => x != null && String(x).trim() !== '')) rows.push(row.map((x) => (x == null ? '' : String(x).trim())))
    }
    sheets[name] = rows
  }
  return sheets
}

// ---------- helpers ----------
const clean = (s) => (s ?? '').replace(/Diamond Technologies/g, 'Directrix Technologies').replace(/\bDiamond\b/g, 'Directrix').trim()
const cap = (s) => (/^[a-z]/.test(s) && !/^[a-z]+[A-Z]/.test(s) ? s[0].toUpperCase() + s.slice(1) : s)
const list = (s, sep = ';') => clean(s).split(sep).map((x) => cap(x.trim().replace(/\.$/, ''))).filter(Boolean)
const slugify = (s) =>
  clean(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const findSheet = (sheets, re) => {
  const k = Object.keys(sheets).find((n) => re.test(n))
  if (!k) throw new Error(`Sheet matching ${re} not found. Found: ${Object.keys(sheets).join(', ')}`)
  return sheets[k]
}
const headerIndex = (rows, first) => rows.findIndex((r) => r[0] === first)

/** Which public service line each sheet service belongs to (edit here to regroup). */
const LINE_MAP = {
  'AI-01': 'ai-strategy-governance', 'AI-04': 'ai-strategy-governance', 'AI-05': 'ai-strategy-governance', 'SEC-02': 'ai-strategy-governance',
  'AI-02': 'ai-knowledge-conversational', 'AI-07': 'ai-knowledge-conversational',
  'AI-03': 'ai-workflow-document', 'AI-06': 'ai-workflow-document', 'AI-09': 'ai-workflow-document',
  'AI-08': 'voice-vision-personalisation', 'AI-10': 'voice-vision-personalisation', 'AI-11': 'voice-vision-personalisation',
  'SW-01': 'custom-software-mobile', 'SW-02': 'custom-software-mobile', 'SW-03': 'custom-software-mobile', 'SW-04': 'custom-software-mobile',
  'SW-05': 'integration-modernisation', 'SW-06': 'integration-modernisation', 'SW-07': 'integration-modernisation',
  'DATA-01': 'data-analytics', 'DATA-02': 'data-analytics', 'DATA-03': 'data-analytics', 'DATA-04': 'data-analytics',
  'CLOUD-01': 'cloud-devops-qa-security', 'CLOUD-02': 'cloud-devops-qa-security', 'CLOUD-03': 'cloud-devops-qa-security',
  'CLOUD-04': 'cloud-devops-qa-security', 'QA-01': 'cloud-devops-qa-security', 'QA-02': 'cloud-devops-qa-security',
  'QA-03': 'cloud-devops-qa-security', 'SEC-01': 'cloud-devops-qa-security',
  'CONS-01': 'consulting-team-extension', 'CONS-02': 'consulting-team-extension',
}

// ---------- parse ----------
const sheets = readWorkbook(resolve(process.cwd(), file))

const cat = findSheet(sheets, /service catalogue/i)
const services = cat.slice(headerIndex(cat, 'Service ID') + 1).filter((r) => /^[A-Z]+-\d+$/.test(r[0])).map((r) => {
  if (!LINE_MAP[r[0]]) throw new Error(`No service line mapping for ${r[0]}; add it to LINE_MAP`)
  return {
    id: r[0],
    line: LINE_MAP[r[0]],
    sheetCategory: clean(r[1]),
    name: clean(r[2]),
    slug: slugify(r[2]),
    whatWeDo: clean(r[3]),
    deliverables: list(r[4]),
    exampleProblems: clean(r[5]),
    idealBuyer: clean(r[6]),
    engagement: clean(r[7]),
    indicativeOneTime: clean(r[8]),
    indicativeMonthly: clean(r[9]),
    clientInputs: clean(r[10]),
    priority: clean(r[11]),
    featured: /launch first/i.test(r[11]),
    boundaries: clean(r[12]),
  }
})

const pk = findSheet(sheets, /packages/i)
const pStart = headerIndex(pk, 'Package') + 1
const pEnd = pk.findIndex((r, i) => i >= pStart && /^Quoting rules/i.test(r[0]))
const packages = pk.slice(pStart, pEnd === -1 ? undefined : pEnd).filter((r) => r[0] && r[2]).map((r) => ({
  slug: slugify(r[0]),
  name: clean(r[0]),
  bestFor: clean(r[1]),
  included: list(r[2]),
  timeline: clean(r[3]),
  indicativeFee: clean(r[4]),
  recurringSupport: clean(r[5]),
  notes: clean(r[6]),
}))

const ind = findSheet(sheets, /industry/i)
const industries = ind.slice(headerIndex(ind, 'Industry / Segment') + 1).filter((r) => r[0] && r[1]).map((r) => ({
  slug: slugify(r[0]),
  name: clean(r[0]),
  problem: clean(r[1]),
  solutionBundle: list(r[2], '+'),
  workflow: list(r[3], '→'),
  deliverables: list(r[4]),
  buyer: clean(r[5]),
  successMeasures: list(r[6]),
  designNote: clean(r[7]),
}))

const del = findSheet(sheets, /delivery/i)
const process_ = del.slice(headerIndex(del, 'Stage') + 1).filter((r) => /^\d+\./.test(r[0])).map((r) => ({
  step: Number(r[0].match(/^(\d+)/)[1]),
  title: clean(r[0].replace(/^\d+\.\s*/, '')),
  duration: clean(r[1]),
  activities: clean(r[2]),
  outputs: clean(r[3]),
  clientNeeds: clean(r[4]),
  safeguard: clean(r[5]),
}))

// ---------- write ----------
const banner = (src) =>
  `// AUTO-GENERATED from ${src} by scripts/parse-sheet.mjs.\n// Edit the spreadsheet and run \`npm run content:sheet\`, or edit this file directly.\n`
const write = (name, type, exportName, data) => {
  const out = `${banner('service_sheet.xlsx')}import type { ${type} } from './types'\n\nexport const ${exportName}: ${type}[] = ${JSON.stringify(data, null, 2)}\n`
  writeFileSync(resolve(root, 'content', name), out)
  console.log(`✓ content/${name}: ${data.length} ${exportName}`)
}
write('services.ts', 'Service', 'services', services)
write('packages.ts', 'Package', 'packages', packages)
write('industries.ts', 'Industry', 'industries', industries)
write('process.ts', 'ProcessStage', 'processStages', process_)

const all = JSON.stringify({ services, packages, industries, process_ })
if (/diamond/i.test(all)) throw new Error('"Diamond" still present in generated content')
