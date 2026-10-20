import { Seo, organizationLd } from '@/lib/seo'
import { About } from '@/sections/About'
import { Why } from '@/sections/Why'
import { Capabilities } from '@/sections/Capabilities'
import { FinalCta } from '@/sections/FinalCta'

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Directrix Technologies"
        description="Directrix Technologies is an engineering team building AI, enterprise software and digital products, from RAG-based knowledge systems and ML platforms to mobile apps and responsive web experiences."
        path="/about"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
        jsonLd={organizationLd()}
      />
      <div className="pt-[var(--nav-h)]">
        <About headingAs="h1" showLink={false} />
      </div>
      <Why />
      <Capabilities />
      <FinalCta />
    </>
  )
}
