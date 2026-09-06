import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from './contexts/LanguageProvider'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Education />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LanguageProvider>
  )
}
