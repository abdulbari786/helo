import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { contactSchema, type ContactInput } from '@/lib/contactSchema'
import { serviceLines, lineBySlug } from '@content/serviceLines'
import { packages } from '@content/packages'
import { budgetBands, referralSources, site, timelines } from '@content/site'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ContactOptions } from './ContactOptions'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Reads ?interest=<service-line-slug> and ?package=<package-slug> so cards can pre-fill the form. */
function usePrefill() {
  const [params] = useSearchParams()
  const interest = params.get('interest') ?? ''
  const pkg = packages.find((p) => p.slug === params.get('package'))
  const line = lineBySlug(interest)
  return {
    interest: line?.name ?? '',
    context: pkg ? `Package: ${pkg.name}` : line ? `Service line: ${line.name}` : '',
    goal: pkg ? `I'd like to discuss the ${pkg.name}. ` : '',
  }
}

export function ContactForm({ id = 'enquiry' }: { id?: string }) {
  const prefill = usePrefill()
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    // Start empty so the pre-rendered HTML and first client render match; prefill is applied after mount.
    defaultValues: { interests: [], context: '', goal: '', website: '' },
  })

  // Apply prefill after mount, and again if the query string changes (e.g. "Discuss this package").
  useEffect(() => {
    if (prefill.context) {
      setValue('context', prefill.context)
      setValue('interests', prefill.interest ? [prefill.interest] : [])
      if (prefill.goal) setValue('goal', prefill.goal)
    }
  }, [prefill.context, prefill.goal, prefill.interest, setValue])

  const context = watch('context')

  const onSubmit = async (data: ContactInput) => {
    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body?.error || 'Something went wrong sending your message.')
      setStatus('sent')
      track('form_submit', { interests: data.interests.join(', '), context: data.context || '' })
      reset({ interests: [], context: '', goal: '', website: '' })
    } catch (err) {
      setStatus('error')
      setServerError(err instanceof Error ? err.message : 'Something went wrong sending your message.')
      track('form_error', {})
    }
  }

  const fieldProps = (name: keyof ContactInput) => ({
    id: `${id}-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  })
  const Err = ({ name }: { name: keyof ContactInput }) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="field-error" role="alert">
        {String(errors[name]?.message)}
      </p>
    ) : null

  return (
    <div id={id} className="relative scroll-mt-28">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card flex flex-col items-start gap-4 p-8"
            role="status"
            aria-live="polite"
          >
            <svg viewBox="0 0 52 52" className="check-draw h-14 w-14 text-success" aria-hidden="true">
              <circle cx="26" cy="26" r="24" fill="currentColor" opacity="0.12" />
              <path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="text-fluid-xl">Thanks, your enquiry is in.</h3>
            <p className="text-muted">
              {site.contact.responseTime} If it&apos;s urgent, call or WhatsApp us on{' '}
              <a className="font-semibold text-brand" href={site.contact.phoneHref}>
                {site.contact.phoneDisplay}
              </a>
              .
            </p>
            <Button variant="secondary" onClick={() => setStatus('idle')}>
              Send another enquiry
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="card space-y-5 p-5 sm:p-8"
            aria-label="Project enquiry form"
          >
            {context && (
              <p className="flex items-center justify-between gap-3 rounded-xl bg-brand-tint px-4 py-3 text-fluid-sm text-ink">
                <span>
                  <span className="font-semibold">Enquiring about:</span> {context.replace(/^(Package|Service line): /, '')}
                </span>
                <button type="button" className="text-fluid-xs font-semibold text-brand underline" onClick={() => setValue('context', '')}>
                  Clear
                </button>
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor={`${id}-name`}>
                  Name <span className="text-danger" aria-hidden="true">*</span>
                </label>
                <input className="field" autoComplete="name" {...fieldProps('name')} {...register('name')} />
                <Err name="name" />
              </div>
              <div>
                <label className="field-label" htmlFor={`${id}-email`}>
                  Work email <span className="text-danger" aria-hidden="true">*</span>
                </label>
                <input className="field" type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} {...register('email')} />
                <Err name="email" />
              </div>
              <div>
                <label className="field-label" htmlFor={`${id}-company`}>
                  Company <span className="text-danger" aria-hidden="true">*</span>
                </label>
                <input className="field" autoComplete="organization" {...fieldProps('company')} {...register('company')} />
                <Err name="company" />
              </div>
              <div>
                <label className="field-label" htmlFor={`${id}-role`}>
                  Role
                </label>
                <input className="field" autoComplete="organization-title" {...fieldProps('role')} {...register('role')} />
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor={`${id}-goal`}>
                What do you want to achieve? <span className="text-danger" aria-hidden="true">*</span>
              </label>
              <textarea
                className="field min-h-[130px] resize-y"
                placeholder="The process or problem, who it affects, and what a good outcome looks like."
                {...fieldProps('goal')}
                {...register('goal')}
              />
              <Err name="goal" />
            </div>

            <fieldset>
              <legend className="field-label">Service interest</legend>
              <div className="flex flex-wrap gap-2">
                {serviceLines.map((l) => (
                  <label key={l.slug} className="cursor-pointer">
                    <input type="checkbox" value={l.name} className="peer sr-only" {...register('interests')} />
                    <span className="chip-btn peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand">
                      {l.short}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <details className="group rounded-xl border border-line px-4 py-3 open:pb-5">
              <summary className="flex min-h-[32px] cursor-pointer list-none items-center justify-between text-fluid-sm font-semibold">
                Add budget, timeline and how you found us (optional)
                <Icon name="plus" size={18} className="transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-4 grid gap-5 sm:grid-cols-3">
                {(
                  [
                    ['budget', 'Budget range', budgetBands],
                    ['timeline', 'Timeline', timelines],
                    ['source', 'How did you hear about us?', referralSources],
                  ] as const
                ).map(([name, label, options]) => (
                  <div key={name}>
                    <label className="field-label" htmlFor={`${id}-${name}`}>
                      {label}
                    </label>
                    <select className="field appearance-none" {...fieldProps(name)} {...register(name)} defaultValue="">
                      <option value="">Select…</option>
                      {options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </details>

            {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor={`${id}-website`}>Website</label>
              <input id={`${id}-website`} tabIndex={-1} autoComplete="off" {...register('website')} />
            </div>
            <input type="hidden" {...register('context')} />

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="rounded-xl border border-danger/40 bg-danger/5 p-4 text-fluid-sm"
                >
                  <p className="mb-3 font-semibold text-danger">{serverError} Please try again, or reach us directly:</p>
                  <ContactOptions />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-fluid-xs text-muted">
                {site.contact.responseTime} By sending this form you agree to our{' '}
                <a href="/privacy" className="underline underline-offset-2">
                  privacy policy
                </a>
                .
              </p>
              <Button type="submit" arrow disabled={status === 'sending'} className={cn(status === 'sending' && 'cursor-wait')}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
