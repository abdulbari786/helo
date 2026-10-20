import { site } from '@content/site'
import { Icon } from '@/components/ui/Icon'
import { track } from '@/lib/analytics'

/** Sticky thumb-reach Call / WhatsApp bar on small screens. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={site.contact.phoneHref}
          onClick={() => track('contact_click', { method: 'phone', source: 'mobile_bar' })}
          className="btn btn-secondary w-full !py-2.5"
        >
          <Icon name="phone" size={18} />
          Call
        </a>
        <a
          href={site.contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('contact_click', { method: 'whatsapp', source: 'mobile_bar' })}
          className="btn btn-primary w-full !py-2.5"
        >
          <Icon name="whatsapp" size={18} />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
