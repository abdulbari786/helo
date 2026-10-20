import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { categoryGroups, projects } from '@content/projects'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/ProjectCard'
import { BookCallButton } from '@/components/booking/BookCallButton'

export function Work({ headingAs = 'h2', limit }: { headingAs?: 'h1' | 'h2'; limit?: number }) {
  const [filter, setFilter] = useState<string>('All')
  const reduce = useReducedMotion()
  const list = (filter === 'All' ? projects : projects.filter((p) => p.categoryGroup === filter)).slice(0, limit)
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          as={headingAs}
          id="work-title"
          eyebrow="Our work"
          title={`Case studies from ${projects.length} delivered projects`}
          lede="Generative AI, enterprise engineering, machine learning, and web and mobile products. What we built, how we built it, and what it achieved, stated plainly."
        />
        <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4" role="toolbar" aria-label="Filter case studies">
          {['All', ...categoryGroups].map((c) => (
            <button key={c} type="button" className="chip-btn shrink-0" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <motion.ul layout={!reduce} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <BookCallButton source="work" />
          <p className="text-fluid-sm text-muted">Have something similar in mind? Let&apos;s scope it.</p>
        </div>
      </div>
    </section>
  )
}
