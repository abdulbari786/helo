import { Dialog } from '@/components/ui/Dialog'
import { BookingEmbed } from './BookingEmbed'
import { ButtonLink } from '@/components/ui/Button'

export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} title="Book a free discovery call">
      <div className="p-5 sm:p-8">
        <p className="eyebrow mb-3">Free discovery call</p>
        <h2 className="mb-2 text-fluid-2xl">Book a free discovery call</h2>
        <p className="mb-6 max-w-prose text-muted">
          Tell us about the problem you want to solve. We&apos;ll ask a few questions, say honestly whether we&apos;re a fit, and suggest the
          smallest sensible first step.
        </p>
        <BookingEmbed compact />
        <div className="mt-6 border-t border-line pt-5">
          <ButtonLink to="/contact#enquiry" variant="secondary" arrow onClick={onClose}>
            Or send a written enquiry
          </ButtonLink>
        </div>
      </div>
    </Dialog>
  )
}
