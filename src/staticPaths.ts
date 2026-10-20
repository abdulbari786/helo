import { serviceLines } from '@content/serviceLines'
import { industries } from '@content/industries'
import { projects } from '@content/projects'

/** Every route pre-rendered to static HTML at build time (also used for sitemap.xml). */
export function staticPaths(): string[] {
  return [
    '/',
    '/services',
    ...serviceLines.map((l) => `/services/${l.slug}`),
    '/solutions',
    ...industries.map((i) => `/solutions/${i.slug}`),
    '/work',
    ...projects.map((p) => `/work/${p.slug}`),
    '/process',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ]
}
