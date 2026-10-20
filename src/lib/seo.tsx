import { Helmet } from 'react-helmet-async'
import { site } from '@content/site'

export interface Crumb {
  name: string
  path: string
}

interface SeoProps {
  title?: string
  description?: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  breadcrumbs?: Crumb[]
  jsonLd?: object | object[]
}

export const absUrl = (path: string) => `${site.url.replace(/\/$/, '')}${path === '/' ? '' : path}`

export function Seo({ title, description = site.description, path, image = '/og-image.png', type = 'website', noindex, breadcrumbs, jsonLd }: SeoProps) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — Custom Software, AI Automation & Knowledge Assistants`
  const url = absUrl(path)
  const img = image.startsWith('http') ? image : absUrl(image)
  const ld = [
    ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
    ...(breadcrumbs?.length ? [breadcrumbLd(breadcrumbs)] : []),
  ]
  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${site.name}: software and AI that move your business forward`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  )
}

export function organizationLd() {
  const sameAs = Object.values(site.social).filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: absUrl('/icon-512.png'),
    description: site.description,
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.contact.phoneE164,
        email: site.contact.email,
        contactType: 'sales',
        availableLanguage: ['English'],
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function breadcrumbLd(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absUrl(c.path) })),
  }
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export function serviceLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absUrl(path),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: ['IN', 'GB', 'Worldwide'],
  }
}
