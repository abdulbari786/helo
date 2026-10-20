import { Seo, serviceLd } from '@/lib/seo'
import { serviceLines } from '@content/serviceLines'
import { services } from '@content/services'
import { PageHeader } from '@/components/PageHeader'
import { Services } from '@/sections/Services'
import { Packages } from '@/sections/Packages'
import { FinalCta } from '@/sections/FinalCta'

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services: Custom Software, AI Automation, Data & Cloud"
        description={`${services.length} services across AI strategy, RAG knowledge assistants, workflow automation, custom software, integrations, data, cloud, QA and security, all scoped against measurable acceptance criteria.`}
        path="/services"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]}
        jsonLd={serviceLines.map((l) => serviceLd(l.name, l.summary, `/services/${l.slug}`))}
      />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]}
        eyebrow="Services"
        title="Software, AI, data and cloud services, scoped to a real problem"
        lede={`${serviceLines.length} service lines and ${services.length} services. Pick a line to see what we do, what you get, and what we need from you.`}
      />
      <Services showHeading={false} />
      <Packages />
      <FinalCta />
    </>
  )
}
