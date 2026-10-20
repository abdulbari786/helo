import { useEffect, useState } from 'react'
import { useInViewOnce } from '@/lib/hooks'
import { cn } from '@/lib/cn'

/** Example workflow as a step diagram whose nodes light up in sequence (static for reduced motion). */
export function WorkflowSteps({ steps, label }: { steps: string[]; label: string }) {
  const [ref, inView] = useInViewOnce<HTMLOListElement>()
  const [active, setActive] = useState(steps.length - 1)

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setActive(0)
    let i = 0
    const t = window.setInterval(() => {
      i += 1
      if (i >= steps.length + 2) i = 0
      setActive(Math.min(i, steps.length - 1))
    }, 900)
    return () => window.clearInterval(t)
  }, [inView, steps.length])

  return (
    <ol ref={ref} aria-label={label} className="grid gap-3 md:grid-flow-col md:auto-cols-fr">
      {steps.map((s, i) => {
        const lit = i <= active
        return (
          <li key={s} className="relative flex items-start gap-3 md:flex-col">
            <span className="flex items-center md:w-full">
              <span
                className={cn(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 font-display text-fluid-xs font-semibold transition-all duration-500',
                  lit ? 'border-brand bg-[rgb(var(--brand-btn))] text-white shadow-[0_0_0_6px_rgb(var(--brand)/0.15)]' : 'border-line bg-paper text-muted',
                )}
              >
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className="ml-2 hidden h-[2px] flex-1 overflow-hidden rounded bg-line md:block" aria-hidden="true">
                  <span className={cn('block h-full origin-left bg-brand transition-transform duration-700', i < active ? 'scale-x-100' : 'scale-x-0')} />
                </span>
              )}
            </span>
            <span className={cn('text-fluid-sm transition-colors duration-500 md:pr-3', lit ? 'text-ink' : 'text-muted')}>{s}</span>
          </li>
        )
      })}
    </ol>
  )
}
