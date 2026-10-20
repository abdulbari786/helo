import { Button } from '@/components/ui/Button'
import { track } from '@/lib/analytics'
import { useBooking } from './BookingContext'

export function BookCallButton({
  label = 'Book a Free Discovery Call',
  source,
  variant = 'primary',
  className,
  magnetic,
  arrow = true,
}: {
  label?: string
  source: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  magnetic?: boolean
  arrow?: boolean
}) {
  const { open } = useBooking()
  return (
    <Button
      variant={variant}
      className={className}
      magnetic={magnetic}
      arrow={arrow}
      aria-haspopup="dialog"
      data-cta="book-call"
      onClick={() => {
        track('cta_click', { cta: 'book_call', source })
        open(source)
      }}
    >
      {label}
    </Button>
  )
}
