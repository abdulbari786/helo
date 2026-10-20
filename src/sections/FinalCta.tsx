import { BookCallButton } from '@/components/booking/BookCallButton'
import { ChevronMark } from '@/components/ui/Brand'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactOptions } from '@/components/contact/ContactOptions'
import { site } from '@content/site'

const nextSteps = [
  { title: 'We reply', body: 'We read your enquiry and reply with any questions and times for a call.' },
  { title: 'Discovery call', body: 'We discuss the workflow, systems and constraints, and say honestly if we are a fit.' },
  { title: 'A clear first step', body: 'You get a recommended starting scope: a package, a paid discovery, or advice to wait.' },
]

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden pb-24 pt-20 sm:pt-28" aria-labelledby="cta-title">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-[rgb(var(--brand-btn))] px-6 py-14 text-white sm:px-12 sm:py-20">
          <ChevronMark mono className="pointer-events-none absolute -right-10 -top-10 h-[130%] w-auto text-white opacity-[0.09]" />
          <div className="relative max-w-2xl">
            <h2 id="cta-title" className="mb-4 text-fluid-3xl text-white">
              <span className="line-mask">
                <span>Let&apos;s scope your first project</span>
              </span>
            </h2>
            <p className="mb-8 text-fluid-lg text-white/85">
              Bring one problem. Leave with a clear next step, whether or not it involves us.
            </p>
            <BookCallButton source="final_cta" magnetic className="!bg-white !text-[rgb(23_24_28)] hover:!bg-white/90" />
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <p className="eyebrow mb-4">What happens next</p>
            <ol className="mb-10 space-y-5">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4" data-reveal="" style={{ ['--d' as string]: `${i * 80}ms` }}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-tint font-display text-fluid-sm font-semibold text-brand">{i + 1}</span>
                  <span>
                    <span className="block font-display font-semibold">{s.title}</span>
                    <span className="text-fluid-sm text-muted">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mb-3 font-display text-fluid-sm font-semibold">Or reach us directly</p>
            <ContactOptions stacked />
            <p className="mt-4 text-fluid-xs text-muted">{site.contact.responseTime}</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
