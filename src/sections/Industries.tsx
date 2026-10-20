import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { industries } from '@content/industries'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WorkflowSteps } from '@/components/diagrams/WorkflowSteps'
import { Icon } from '@/components/ui/Icon'
import { ButtonLink } from '@/components/ui/Button'

export function Industries() {
  const [index, setIndex] = useState(0)
  const base = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const ind = industries[index]

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: industries.length - 1 }
    if (!(e.key in map)) return
    e.preventDefault()
    const next = (map[e.key] + industries.length) % industries.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="industries" className="section bg-surface" aria-labelledby="industries-title">
      <div className="container">
        <SectionHeading
          id="industries-title"
          eyebrow="Industries"
          title="Solution patterns for your sector"
          lede="Starting points we adapt to your workflow, data and constraints, each with the design safeguards that sector needs."
        />
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div role="tablist" aria-label="Industries" aria-orientation="vertical" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0" onKeyDown={onKey}>
            {industries.map((x, i) => (
              <button
                key={x.slug}
                ref={(el) => (tabs.current[i] = el)}
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={i === index}
                aria-controls={`${base}-panel`}
                tabIndex={i === index ? 0 : -1}
                onClick={() => setIndex(i)}
                className="chip-btn shrink-0 justify-between text-left lg:w-full lg:rounded-xl lg:px-4 lg:py-3"
              >
                {x.name}
                <Icon name="chevron" size={16} className="ml-2 hidden lg:block" />
              </button>
            ))}
          </div>
          <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${index}`} tabIndex={0} className="card min-h-[420px] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={ind.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
                <h3 className="mb-2 text-fluid-xl">{ind.name}</h3>
                <p className="mb-6 text-muted">
                  <span className="font-semibold text-ink">Typical problem:</span> {ind.problem}
                </p>
                <p className="mb-2 font-display text-fluid-sm font-semibold">Solution bundle</p>
                <ul className="mb-8 flex flex-wrap gap-2">
                  {ind.solutionBundle.map((b) => (
                    <li key={b} className="chip border-brand/25 bg-brand-tint text-ink">
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mb-4 font-display text-fluid-sm font-semibold">Example workflow</p>
                <WorkflowSteps steps={ind.workflow} label={`Example workflow for ${ind.name}`} />
                <div className="mt-8 rounded-xl border border-line bg-paper p-4 text-fluid-sm">
                  <p className="mb-1 font-display font-semibold">Responsible design</p>
                  <p className="text-muted">{ind.designNote}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <ButtonLink to={`/solutions/${ind.slug}`} variant="secondary" arrow>
                    More on {ind.name}
                  </ButtonLink>
                  <Link to="/contact#enquiry" className="text-fluid-sm font-semibold text-brand hover:underline">
                    Talk about your workflow
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
