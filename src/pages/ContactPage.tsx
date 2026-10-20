import { Seo, organizationLd } from '@/lib/seo'
import { site } from '@content/site'
import { PageHeader } from '@/components/PageHeader'
import { BookingEmbed } from '@/components/booking/BookingEmbed'
import { ContactForm } from '@/components/contact/ContactForm'

export default function ContactPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]
  return (
    <>
      <Seo
        title="Contact & Book a Discovery Call"
        description={`Book a free discovery call with Directrix Technologies, call or WhatsApp ${site.contact.phoneDisplay}, or email ${site.contact.email}.`}
        path="/contact"
        breadcrumbs={crumbs}
        jsonLd={organizationLd()}
      />
      <PageHeader crumbs={crumbs} eyebrow="Contact" title="Book a free discovery call" lede="Pick a time, call or message us, or send a short enquiry. We'll tell you honestly whether we're the right fit." />
      <section className="section" aria-labelledby="book-title">
        <div className="container">
          <h2 id="book-title" className="h-section mb-8">
            Book a call
          </h2>
          <BookingEmbed />
        </div>
      </section>
      <section className="section bg-surface pt-0 sm:pt-0" aria-labelledby="enquiry-title">
        <div className="container grid gap-10 pt-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 id="enquiry-title" className="h-section mb-4">
              Send an enquiry
            </h2>
            <p className="text-muted">
              A few lines about the problem is enough. Under the form you can add budget and timeline if you know them. {site.contact.responseTime}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
