import type { NavigateFunction } from 'react-router-dom'

type VTDocument = Document & { startViewTransition?: (cb: () => Promise<void> | void) => unknown }

/**
 * Navigate with the View Transitions API when available so a card's title morphs into the page title.
 * Falls back to normal navigation (older browsers, reduced motion).
 */
export function navigateWithTransition(navigate: NavigateFunction, to: string, waitFor: string) {
  const doc = document as VTDocument
  if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navigate(to)
    return
  }
  doc.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        navigate(to)
        const t0 = performance.now()
        const check = () => {
          if (document.querySelector(waitFor) || performance.now() - t0 > 1200) {
            window.scrollTo(0, 0)
            resolve()
          } else requestAnimationFrame(check)
        }
        requestAnimationFrame(check)
      }),
  )
}
