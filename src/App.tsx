import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BookingProvider } from '@/components/booking/BookingContext'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MobileCtaBar } from '@/components/layout/MobileCtaBar'
import { Analytics } from '@/components/layout/Analytics'
import { IntroLoader, RevealController, ScrollManager, SkipLink, SmoothScroll } from '@/components/layout/Controllers'

const Home = lazy(() => import('@/pages/Home'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const ServiceLinePage = lazy(() => import('@/pages/ServiceLinePage'))
const SolutionsPage = lazy(() => import('@/pages/SolutionsPage'))
const IndustryPage = lazy(() => import('@/pages/IndustryPage'))
const WorkPage = lazy(() => import('@/pages/WorkPage'))
const CaseStudyPage = lazy(() => import('@/pages/CaseStudyPage'))
const ProcessPage = lazy(() => import('@/pages/ProcessPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const LegalPage = lazy(() => import('@/pages/LegalPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <BookingProvider>
      <SkipLink />
      <IntroLoader />
      <Nav />
      <main id="main" tabIndex={-1} className="min-h-[70vh] outline-none">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:line" element={<ServiceLinePage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:industry" element={<IndustryPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileCtaBar />
      <RevealController />
      <ScrollManager />
      <SmoothScroll />
      <Analytics />
    </BookingProvider>
  )
}
