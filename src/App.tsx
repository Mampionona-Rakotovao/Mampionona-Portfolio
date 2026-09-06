import { lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from './contexts/LanguageProvider'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Hero from './sections/Hero'
import LazySection from './components/LazySection'

/**
 * Sections below the fold are code-split and mounted only when the user
 * approaches them, so the initial payload is just Hero + Navbar + shared deps.
 */
const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Education = lazy(() => import('./sections/Education'))
const Projects = lazy(() => import('./sections/Projects'))
const Contact = lazy(() => import('./sections/Contact'))
const Footer = lazy(() => import('./components/Footer'))

/** Same background as the section, so a chunk download triggers no white flash. */
const surfaceFallback = <div className="min-h-screen bg-surface dark:bg-surface-dark" />
const surface2Fallback = <div className="min-h-screen bg-surface-2 dark:bg-surface-dark-2" />
const footerFallback = <div className="h-32 bg-surface-2 dark:bg-surface-dark-2" />

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <LazySection id="a-propos" component={About} fallback={surfaceFallback} />
          <LazySection
            id="competences"
            component={Skills}
            fallback={surface2Fallback}
          />
          <LazySection id="formation" component={Education} fallback={surfaceFallback} />
          <LazySection id="projets" component={Projects} fallback={surface2Fallback} />
          <LazySection id="contact" component={Contact} fallback={surfaceFallback} />
        </main>
        <LazySection component={Footer} fallback={footerFallback} />
      </MotionConfig>
    </LanguageProvider>
  )
}