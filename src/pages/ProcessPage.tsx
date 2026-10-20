import { Seo, faqLd } from '@/lib/seo'
import { faqs } from '@content/copy'
import { Process } from '@/sections/Process'
import { Why } from '@/sections/Why'
import { Faq } from '@/sections/Faq'
import { FinalCta } from '@/sections/FinalCta'

export default function ProcessPage() {
  return (
    <>
      <Seo
        title="How We Work: Discovery, Pilot, Build, Support"
        description="Our six-stage delivery model: qualification, paid discovery and architecture, prototype or proof of value, production build, stabilisation and handover, and managed support."
        path="/process"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Process', path: '/process' }]}
        jsonLd={faqLd(faqs)}
      />
      <div className="pt-[var(--nav-h)]">
        <Process headingAs="h1" />
      </div>
      <Why />
      <Faq />
      <FinalCta />
    </>
  )
}
