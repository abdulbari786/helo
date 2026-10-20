import { Seo } from '@/lib/seo'
import { Work } from '@/sections/Work'
import { Capabilities } from '@/sections/Capabilities'
import { FinalCta } from '@/sections/FinalCta'

export default function WorkPage() {
  return (
    <>
      <Seo
        title="Case Studies: AI, RAG, Enterprise, ML & Mobile Projects"
        description="Case studies from Directrix Technologies: RAG document intelligence, private offline AI search, AI customer support, ML monitoring, biometric recognition, mobile apps and websites."
        path="/work"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }]}
      />
      <div className="pt-[var(--nav-h)]">
        <Work headingAs="h1" />
      </div>
      <Capabilities />
      <FinalCta />
    </>
  )
}
