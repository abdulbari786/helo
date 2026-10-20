import { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { track } from '@/lib/analytics'

const BookingModal = lazy(() => import('./BookingModal'))

const Ctx = createContext<{ open: (source?: string) => void }>({ open: () => {} })

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const open = useCallback((source = 'unknown') => {
    track('booking_open', { source })
    setLoaded(true)
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ open }), [open])
  return (
    <Ctx.Provider value={value}>
      {children}
      {loaded && (
        <Suspense fallback={null}>
          <BookingModal open={isOpen} onClose={close} />
        </Suspense>
      )}
    </Ctx.Provider>
  )
}

export const useBooking = () => useContext(Ctx)
