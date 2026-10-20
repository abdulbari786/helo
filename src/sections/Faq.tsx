import { faqs } from '@content/copy'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Accordion } from '@/components/ui/Accordion'
import { BookCallButton } from '@/components/booking/BookCallButton'

export function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions buyers ask us" lede="Straight answers on how engagements, pricing, ownership and AI quality work." />
          <div className="hidden lg:block">
            <BookCallButton source="faq" variant="secondary" label="Ask us directly" />
          </div>
        </div>
        <Accordion defaultOpen="0" items={faqs.map((f, i) => ({ id: String(i), title: f.q, content: <p>{f.a}</p> }))} />
      </div>
    </section>
  )
}
