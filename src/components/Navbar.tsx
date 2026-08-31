import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from 'react-icons/fi'
import { useTheme } from '../hooks/useTheme'
import { useDownloadCV } from '../hooks/useDownloadCV'

const LINKS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'formation', label: 'Formation' },
  { id: 'projets', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Fixed top navigation with scroll-spy highlighting, theme toggle and a
 * mobile menu.
 */
export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { download, downloading } = useDownloadCV()
  const [active, setActive] = useState('accueil')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = 'accueil'
      for (const link of LINKS) {
        const el = document.getElementById(link.id)
        if (el && el.getBoundingClientRect().top <= 120) current = link.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const onHero = active === 'accueil' && !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        onHero
          ? 'bg-transparent'
          : scrolled
            ? 'border-b border-line bg-surface/80 backdrop-blur-md dark:border-line-dark dark:bg-surface-dark/80'
            : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-14"
      >
        <button
          onClick={() => go('accueil')}
          className={`text-base font-extrabold tracking-tight sm:text-lg ${
            onHero ? 'text-ink-dark' : 'text-ink dark:text-ink-dark'
          }`}
        >
          M. Rakotovao
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.id
                    ? onHero
                      ? 'bg-nav-pill text-ink-dark'
                      : 'bg-accent/10 text-accent'
                    : onHero
                      ? 'text-ink-dark-mute hover:text-ink-dark'
                      : 'text-ink-mute hover:text-ink dark:text-ink-dark-mute dark:hover:text-ink-dark'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={download}
            disabled={downloading}
            aria-label="Télécharger mon curriculum vitae au format PDF"
            title="Télécharger mon CV"
            className={`hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-accent hover:text-white sm:inline-flex ${
              onHero
                ? 'bg-nav-pill text-ink-dark'
                : 'bg-accent/10 text-accent dark:bg-accent/15 dark:text-accent-soft'
            } ${downloading ? 'cursor-wait opacity-70' : ''}`}
          >
            <FiDownload aria-hidden />
            {downloading ? '…' : 'CV'}
          </button>

          <button
            onClick={toggleTheme}
            aria-label={`Passer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors hover:border-accent hover:text-accent ${
              onHero
                ? 'border-white/20 text-ink-dark'
                : 'border-line text-ink dark:border-line-dark dark:text-ink-dark'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className={`grid h-10 w-10 place-items-center rounded-full border md:hidden ${
              onHero
                ? 'border-white/20 text-ink-dark'
                : 'border-line text-ink dark:border-line-dark dark:text-ink-dark'
            }`}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden border-t md:hidden ${
              onHero
                ? 'border-white/10 bg-hero-dark/95 backdrop-blur-md'
                : 'border-line bg-surface/95 backdrop-blur-md dark:border-line-dark dark:bg-surface-dark/95'
            }`}
          >
            <ul className="space-y-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium ${
                      active === link.id
                        ? onHero
                          ? 'bg-nav-pill text-ink-dark'
                          : 'bg-accent/10 text-accent'
                        : onHero
                          ? 'text-ink-dark-mute'
                          : 'text-ink-mute dark:text-ink-dark-mute'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
