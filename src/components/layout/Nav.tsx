import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { site } from '@content/site'
import { Logo } from '@/components/ui/Brand'
import { Icon } from '@/components/ui/Icon'
import { BookCallButton } from '@/components/booking/BookCallButton'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/cn'

export const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/work', label: 'Work' },
  { to: '/process', label: 'Process' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    let last = window.scrollY
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrolled(y > 8)
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 160)
          last = y
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,box-shadow] duration-300',
          scrolled || menuOpen ? 'border-b border-line/80 bg-paper/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
          hidden && !menuOpen && '-translate-y-full',
        )}
      >
        <div ref={bar} className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand" aria-hidden="true" />
        <nav aria-label="Main" className="container flex h-[var(--nav-h)] items-center gap-4">
          <Link to="/" className="mr-auto block h-6 sm:h-7" aria-label="Directrix Technologies home">
            <Logo priority className="h-full" />
          </Link>
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-3 py-2 text-fluid-sm font-medium transition-colors hover:text-brand',
                      isActive ? 'text-brand' : 'text-ink/80',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            href={site.contact.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap text-fluid-sm font-semibold text-ink transition-colors hover:text-brand xl:flex"
          >
            <Icon name="phone" size={16} />
            {site.contact.phoneDisplay}
          </a>
          <ThemeToggle />
          <BookCallButton source="nav" className="hidden !px-4 !py-2.5 md:inline-flex" arrow={false} />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-28 pt-[calc(var(--nav-h)+1.5rem)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent=""
          >
            <ul className="space-y-1">
              {[{ to: '/', label: 'Home' }, ...navLinks].map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between border-b border-line py-4 font-display text-fluid-xl font-semibold',
                        isActive && 'text-brand',
                      )
                    }
                  >
                    {l.label}
                    <Icon name="chevron" />
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-8 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <BookCallButton source="mobile_menu" className="w-full" />
              <a href={site.contact.emailHref} className="block text-center text-fluid-sm text-muted">
                {site.contact.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
