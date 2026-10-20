import { useEffect, useState } from 'react'
import { Icon } from '@/components/ui/Icon'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('dx-theme', next)
    } catch {
      /* storage unavailable */
    }
  }
  return (
    <button
      type="button"
      onClick={toggle}
      className={`grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to midnight theme'}
      title={theme === 'dark' ? 'Light theme' : 'Midnight theme'}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )
}
