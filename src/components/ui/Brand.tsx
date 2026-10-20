import { cn } from '@/lib/cn'

/** Wordmark: ink version in light theme, white version in the dark theme. */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  const common = { width: 640, height: 115, decoding: 'async' as const, loading: priority ? ('eager' as const) : ('lazy' as const) }
  return (
    <span className={cn('relative inline-block', className)}>
      <picture className="block h-full dark:hidden">
        <source srcSet="/brand/logo-ink.webp" type="image/webp" />
        <img src="/brand/logo-ink.png" alt="Directrix Technologies" className="h-full w-auto" {...common} />
      </picture>
      <picture className="hidden h-full dark:block">
        <source srcSet="/brand/logo-white.webp" type="image/webp" />
        <img src="/brand/logo-white.png" alt="Directrix Technologies" className="h-full w-auto" {...common} />
      </picture>
    </span>
  )
}

/** The blue chevron + black strokes from the logo's final "x". */
export function ChevronMark({ className, mono }: { className?: string; mono?: boolean }) {
  return (
    <svg viewBox="0 0 224 226" className={className} aria-hidden="true" focusable="false">
      <path className={mono ? 'fill-current' : 'fill-brand'} d="M0 2h58l83 110-83 110H0l83-110z" />
      <path className="fill-ink" d="M182 2h40l-56 86-20-26zM146 162l20-26 56 86h-40z" opacity={mono ? 0 : 1} />
    </svg>
  )
}

/** Small ">" chevron used as bullet / divider / hover arrow. */
export function Chev({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 20" className={cn('inline-block h-[0.8em] w-auto', className)} aria-hidden="true" focusable="false">
      <path d="M0 0h4.5l6.5 10-6.5 10H0l6.5-10z" fill="currentColor" />
    </svg>
  )
}
