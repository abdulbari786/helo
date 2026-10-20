import { Seo } from '@/lib/seo'
import { ButtonLink } from '@/components/ui/Button'
import { ChevronMark } from '@/components/ui/Brand'

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80vh] items-center overflow-hidden pt-[var(--nav-h)]">
      <Seo title="Page not found" path="/404" noindex />
      <div className="mesh absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow mb-4">Error 404</p>
          <h1 className="mb-4 text-fluid-3xl">This page took a wrong turn</h1>
          <p className="lede mb-8">The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s point you in the right direction.</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/" arrow>
              Back to home
            </ButtonLink>
            <ButtonLink to="/work" variant="secondary">
              See our work
            </ButtonLink>
            <ButtonLink to="/contact" variant="ghost">
              Contact us
            </ButtonLink>
          </div>
        </div>
        <ChevronMark className="hidden h-56 w-56 md:block" />
      </div>
    </section>
  )
}
