import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Chev } from './Brand'

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  as: Tag = 'h2',
  id,
  className,
  children,
}: {
  eyebrow?: string
  title: string
  lede?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  id?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div className={cn('mb-10 sm:mb-14', align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
      {eyebrow && (
        <p className="eyebrow mb-4" data-reveal="">
          <Chev />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={cn(Tag === 'h1' ? 'text-fluid-3xl' : 'h-section', 'text-balance')}>
        <span className="line-mask" data-mask="">
          <span>{title}</span>
        </span>
      </Tag>
      {lede && (
        <p className={cn('lede mt-5', align === 'center' && 'mx-auto')} data-reveal="" style={{ ['--d' as string]: '120ms' }}>
          {lede}
        </p>
      )}
      {children}
    </div>
  )
}
