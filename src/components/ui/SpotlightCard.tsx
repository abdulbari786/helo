import type { ElementType, MouseEvent, ReactNode } from 'react'
import { createElement } from 'react'
import { cn } from '@/lib/cn'

/** Card with a cursor-follow spotlight gradient and hover lift. */
export function SpotlightCard({ as = 'div', className, children, ...rest }: { as?: ElementType; className?: string; children: ReactNode } & Record<string, unknown>) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return createElement(
    as,
    {
      className: cn('card spotlight group transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift', className),
      onMouseMove: onMove,
      ...rest,
    },
    children,
  )
}
