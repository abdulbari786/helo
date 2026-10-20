import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export interface AccordionItem {
  id: string
  title: ReactNode
  content: ReactNode
}

export function Accordion({ items, defaultOpen, className }: { items: AccordionItem[]; defaultOpen?: string; className?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null)
  const base = useId()
  const reduce = useReducedMotion()
  return (
    <div className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item) => {
        const isOpen = open === item.id
        const btnId = `${base}-${item.id}-btn`
        const panelId = `${base}-${item.id}-panel`
        return (
          <div key={item.id}>
            <h3 className="m-0 text-fluid-lg font-semibold">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-brand"
              >
                <span>{item.title}</span>
                <span
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300',
                    isOpen && 'rotate-90 border-brand text-brand',
                  )}
                >
                  <Icon name="chevron" size={18} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-12 text-fluid-base text-muted">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
