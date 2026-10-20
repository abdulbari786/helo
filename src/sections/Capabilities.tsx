import { capabilities } from '@content/projects'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Accordion } from '@/components/ui/Accordion'

export function Capabilities() {
  return (
    <section id="capabilities" className="section" aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeading
          id="capabilities-title"
          eyebrow="Engineering capabilities"
          title="What our project work has covered"
          lede="Four capability groups drawn directly from the projects above."
        />
        {/* Desktop: four columns. Mobile: accordion. */}
        <div className="hidden gap-5 lg:grid lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <div key={c.title} className="card p-6" data-reveal="" style={{ ['--d' as string]: `${i * 80}ms` }}>
              <h3 className="mb-4 text-fluid-lg">{c.title}</h3>
              <ul className="space-y-2 text-fluid-sm text-muted">
                {c.items.map((x) => (
                  <li key={x} className="chev-bullet">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="lg:hidden">
          <Accordion
            defaultOpen={capabilities[0].title}
            items={capabilities.map((c) => ({
              id: c.title,
              title: c.title,
              content: (
                <ul className="space-y-2">
                  {c.items.map((x) => (
                    <li key={x} className="chev-bullet">
                      {x}
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  )
}
