#!/usr/bin/env node
/**
 * Confirms the old placeholder company name does not appear in the website code, content or build output.
 * Excluded: scripts/ (the sheet parser contains the word in order to replace it) and REPORT.md (which reports on this check).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const scan = ['src', 'content', 'api', 'public', 'tests', 'dist', 'index.html', 'README.md', 'vercel.json', '.env.example']
const banned = /diamond/i
const hits = []
const walk = (p) => {
  let st
  try {
    st = statSync(p)
  } catch {
    return
  }
  if (st.isDirectory()) return readdirSync(p).forEach((f) => walk(resolve(p, f)))
  if (/\.(png|webp|avif|jpg|ico|woff2?)$/.test(p)) return
  const text = readFileSync(p, 'utf8')
  text.split('\n').forEach((line, i) => banned.test(line) && hits.push(`${relative(root, p)}:${i + 1}`))
}
scan.forEach((s) => walk(resolve(root, s)))
if (hits.length) {
  console.error(`✗ Found ${hits.length} match(es):\n  ${hits.join('\n  ')}`)
  process.exit(1)
}
console.log(`✓ Zero matches for the old placeholder name in: ${scan.join(', ')}`)
