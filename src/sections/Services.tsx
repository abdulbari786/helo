import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { serviceLines, servicesForLine } from '@content/serviceLines'
import type { ServiceLine } from '@content/types'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Dialog } from '@/components/ui/Dialog'
import { Icon } from '@/components/ui/Icon'
import { ServiceLineDetail } from '@/components/ServiceLineDetail'
import { ButtonLink } from '@/components/ui/Button'
import { BookCallButton } from '@/components/booking/BookCallButton'
import { cn } from '@/lib/cn'

const filters = [
  { id: 'all', label: 'All services', lines: serviceLines.map((l) => l.slug) },
  { id: 'ai', label: 'AI', lines: ['ai-strategy-governance', 'ai-knowledge-conversational', 'ai-workflow-document', 'voice-vision-personalisation'] },
  { id: 'software', label: 'Software & integration', lines: ['custom-software-mobile', 'integration-modernisation'] },
  { id: 'data', label: 'Data', lines: ['data-analytics'] },
  { id: 'cloud', label: 'Cloud, QA & security', lines: ['cloud-devops-qa-security'] },
  { id: 'consulting', label: 'Consulting', lines: ['consulting-team-extension'] },
]

export function Services({ showHeading = true }: { showHeading?: boolean }) {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState<ServiceLine | null>(null)
  const reduce = useReducedMotion()
  const visible = serviceLines.filter((l) => filters.find((f) => f.id === filter)!.lines.includes(l.slug))

  return (
    <section id="services" className="section bg-surface" aria-labelledby="services-title">
      <div className="container">
        {showHeading && (
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title="One partner from first workshop to managed support"
            lede="Nine service lines covering software, applied AI, data, cloud and quality. Start with the one that fixes your most expensive problem."
          />
        )}
        <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4" role="toolbar" aria-label="Filter services">
          {filters.map((f) => (
            <button key={f.id} type="button" className="chip-btn shrink-0" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <LayoutGroup>
          <motion.ul layout={!reduce} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((l) => {
                const items = servicesForLine(l.slug)
                const featured = items.filter((s) => s.featured).length
                return (
                  <motion.li
                    key={l.slug}
                    layout={!reduce}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(l)}
                      aria-haspopup="dialog"
                      className="card spotlight group relative flex h-full w-full flex-col p-6 text-left transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift"
                      onMouseMove={(e) => {
                        const r = e.currentTarget.getBoundingClientRect()
                        e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
                        e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
                      }}
                    >
                      <span className="mb-6 flex items-center justify-between">
                        <span className="font-display text-fluid-xl font-semibold text-brand">{l.number}</span>
                        <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                          <Icon name="chevron" size={18} className="-translate-x-0.5 opacity-40 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>
                      </span>
                      <span className="mb-2 font-display text-fluid-lg font-semibold">{l.name}</span>
                      <span className="mb-5 text-fluid-sm text-muted">{l.summary}</span>
                      <span className="mt-auto flex flex-wrap gap-2 text-fluid-xs">
                        <span className="chip">{items.length} services</span>
                        {featured > 0 && <span className="chip border-brand/30 bg-brand-tint text-brand">{featured} recommended starting point{featured > 1 ? 's' : ''}</span>}
                      </span>
                    </button>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <BookCallButton source="services" />
          <ButtonLink to="/services" variant="secondary" arrow>
            See all services in detail
          </ButtonLink>
        </div>
      </div>

      <Dialog open={!!active} onClose={() => setActive(null)} title={active?.name ?? 'Service'} variant="drawer">
        {active && (
          <div className="p-5 pt-6 sm:p-8">
            <p className="eyebrow mb-3">Service line {active.number}</p>
            <h2 className="mb-3 text-fluid-2xl">{active.name}</h2>
            <p className="mb-2 text-fluid-lg text-muted">{active.summary}</p>
            <p className="mb-8 text-fluid-sm text-ink">
              <span className="font-semibold">Outcome:</span> {active.outcome}
            </p>
            <ServiceLineDetail line={active} />
            <Link to={`/services/${active.slug}`} className={cn('mt-6 inline-flex items-center gap-1.5 text-fluid-sm font-semibold text-brand')}>
              Open the full page <Icon name="arrow" size={16} />
            </Link>
          </div>
        )}
      </Dialog>
    </section>
  )
}
