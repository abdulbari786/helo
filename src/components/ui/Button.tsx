import { forwardRef, useRef, type ReactNode, type MouseEvent, type MutableRefObject } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Common {
  variant?: Variant
  className?: string
  children: ReactNode
  arrow?: boolean
  magnetic?: boolean
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

const classes = (variant: Variant, className?: string) => cn('btn', `btn-${variant}`, className)

/** Subtle magnetic pull toward the cursor (desktop, fine pointers, motion allowed). */
function useMagnetic<T extends HTMLElement>(enabled?: boolean) {
  const ref = useRef<T>(null)
  const onMove = (e: MouseEvent<T>) => {
    if (!enabled || !ref.current) return
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.22
    const y = (e.clientY - r.top - r.height / 2) * 0.3
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

export function ButtonLink({ to, variant = 'primary', className, children, arrow, magnetic, onClick, ...rest }: Common & { to: string } & Record<string, unknown>) {
  const m = useMagnetic<HTMLAnchorElement>(magnetic)
  const external = /^(https?:|tel:|mailto:)/.test(to)
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" size={18} className="arrow" />}
    </>
  )
  if (external)
    return (
      <a
        href={to}
        className={classes(variant, className)}
        onClick={onClick}
        {...(to.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...m}
        {...rest}
      >
        {content}
      </a>
    )
  return (
    <Link to={to} className={classes(variant, className)} onClick={onClick} {...m} {...rest}>
      {content}
    </Link>
  )
}

export const Button = forwardRef<HTMLButtonElement, Common & { type?: 'button' | 'submit'; disabled?: boolean } & Record<string, unknown>>(
  function Button({ variant = 'primary', className, children, arrow, magnetic, type = 'button', ...rest }, outerRef) {
    const m = useMagnetic<HTMLButtonElement>(magnetic)
    return (
      <button
        type={type}
        className={classes(variant, className)}
        ref={(el) => {
          ;(m.ref as MutableRefObject<HTMLButtonElement | null>).current = el
          if (typeof outerRef === 'function') outerRef(el)
          else if (outerRef) outerRef.current = el
        }}
        onMouseMove={m.onMouseMove}
        onMouseLeave={m.onMouseLeave}
        {...rest}
      >
        {children}
        {arrow && <Icon name="arrow" size={18} className="arrow" />}
      </button>
    )
  },
)
