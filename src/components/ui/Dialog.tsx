import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

/**
 * Accessible modal / side drawer: focus trap, Escape to close, scroll lock, focus returned on close.
 */
export function Dialog({
  open,
  onClose,
  title,

  variant = 'modal',
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  variant?: 'modal' | 'drawer'
  children: ReactNode
  className?: string
}) {
  const panel = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    html.dataset.dialogOpen = 'true'
    const focusables = () =>
      Array.from(
        panel.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,iframe,[tabindex]:not([tabindex="-1"])') ?? [],
      )
    requestAnimationFrame(() => (focusables()[0] ?? panel.current)?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const f = focusables()
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prevOverflow
      delete html.dataset.dialogOpen
      previous?.focus?.()
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null
  const isDrawer = variant === 'drawer'
  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className={cn('fixed inset-0 z-[70]', !isDrawer && 'flex items-end justify-center p-3 sm:items-center sm:p-6')}
          data-lenis-prevent=""
        >
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={cn(
              'overflow-y-auto overscroll-contain bg-paper shadow-lift outline-none',
              isDrawer
                ? 'absolute inset-y-0 right-0 w-full max-w-2xl border-l border-line'
                : 'relative max-h-[92vh] w-full rounded-3xl border border-line sm:w-[min(960px,94vw)]',
              className,
            )}
            initial={reduce ? { opacity: 0 } : isDrawer ? { x: '100%' } : { opacity: 0, y: 24 }}
            animate={reduce ? { opacity: 1 } : isDrawer ? { x: 0 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : isDrawer ? { x: '100%' } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="sticky right-4 top-4 z-10 float-right m-4 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink/40"
              aria-label="Close"
            >
              <Icon name="close" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
