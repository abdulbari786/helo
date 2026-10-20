#!/usr/bin/env node
/**
 * Pre-renders every route to static HTML after `vite build` + `vite build --ssr`.
 * Writes dist/<route>.html (served as clean URLs by Vercel), dist/404.html, sitemap.xml and robots.txt.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrEntry = readdirSync(resolve(root, 'dist-ssr')).find((f) => /^entry-server\.(m?js)$/.test(f))
const { render, staticPaths } = await import(pathToFileURL(resolve(root, 'dist-ssr', ssrEntry)).href)

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const siteUrl = (process.env.VITE_SITE_URL || 'https://directrixtechnologies.com').replace(/\/$/, '')

// Preload the heading font (Sora, latin subset) to avoid a late swap in the hero.
const assets = readdirSync(resolve(dist, 'assets'))
const sora = assets.find((f) => /sora-latin-wght-normal.*\.woff2$/.test(f))
const preload = sora ? `<link rel="preload" href="/assets/${sora}" as="font" type="font/woff2" crossorigin />` : ''

async function page(url) {
  const { html, head, htmlAttrs } = await render(url)
  let out = template
    .replace('<!--preload-->', preload)
    .replace('<!--head-->', head)
    .replace('<!--app-->', html)
  if (htmlAttrs) out = out.replace(/<html[^>]*>/, `<html ${htmlAttrs}>`)
  return out
}

const paths = staticPaths()
let count = 0
for (const url of paths) {
  const file = url === '/' ? 'index.html' : `${url.slice(1)}.html`
  const target = resolve(dist, file)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, await page(url))
  count++
}
writeFileSync(resolve(dist, '404.html'), await page('/__not-found__'))

const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${siteUrl}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod><priority>${p === '/' ? '1.0' : p.split('/').length > 2 ? '0.7' : '0.8'}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
)
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`✓ Pre-rendered ${count} routes + 404.html, sitemap.xml, robots.txt`)
