import { principles } from '@content/copy'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ChevronMark } from '@/components/ui/Brand'
import { cn } from '@/lib/cn'

/** Animated bento grid of working principles drawn from the delivery safeguards. */
export function Why() {
  const spans = ['lg:col-span-2 lg:row-span-2', '', '', '', '', 'sm:col-span-2 lg:col-span-4']
  return (
    // Always rendered with the midnight tokens (data-theme="dark" re-scopes the CSS variables).
    <section id="why" data-theme="dark" className="section bg-[rgb(12_15_22)] text-ink" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading
          id="why-title"
          eyebrow="Why Directrix"
          title="How we keep projects honest"
          lede="Principles that protect your budget, your data and your ability to walk away with everything you paid for."
        />
        <ul className="grid auto-rows-[minmax(180px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal=""
              style={{ ['--d' as string]: `${i * 70}ms` }}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-brand/50',
                spans[i],
              )}
            >
              <span className="mb-4 block font-display text-fluid-sm font-semibold text-brand">{String(i + 1).padStart(2, '0')}</span>
              <h3 className={cn('mb-3 text-ink', i === 0 ? 'text-fluid-2xl' : 'text-fluid-lg')}>{p.title}</h3>
              <p className="max-w-md text-fluid-sm text-muted">{p.body}</p>
              {i === 0 && (
                <ChevronMark mono className="absolute -bottom-10 -right-6 h-56 w-56 text-brand opacity-25 transition-transform duration-700 group-hover:translate-x-3" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
