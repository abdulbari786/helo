import { Seo, organizationLd, faqLd } from '@/lib/seo'
import { faqs } from '@content/copy'
import { site } from '@content/site'
import { Hero } from '@/sections/Hero'
import { TechMarquee } from '@/sections/TechMarquee'
import { Solve } from '@/sections/Solve'
import { Services } from '@/sections/Services'
import { Packages } from '@/sections/Packages'
import { Process } from '@/sections/Process'
import { Industries } from '@/sections/Industries'
import { Work } from '@/sections/Work'
import { Why } from '@/sections/Why'
import { Capabilities } from '@/sections/Capabilities'
import { About } from '@/sections/About'
import { Insights, Testimonials } from '@/sections/Conditional'
import { Faq } from '@/sections/Faq'
import { FinalCta } from '@/sections/FinalCta'

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        description={`${site.name} builds custom software, AI knowledge assistants (RAG), workflow automation, data dashboards and cloud systems, scoped against measurable acceptance criteria. Book a free discovery call.`}
        jsonLd={[organizationLd(), { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url }, faqLd(faqs)]}
      />
      <Hero />
      <TechMarquee />
      <Solve />
      <Services />
      <Packages />
      <Process />
      <Industries />
      <Work />
      <Why />
      <Capabilities />
      <About />
      <Testimonials />
      <Faq />
      <Insights />
      <FinalCta />
    </>
  )
}
