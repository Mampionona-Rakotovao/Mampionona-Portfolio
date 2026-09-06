import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiDownload, FiMoon, FiSun } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useLang } from '../hooks/useLang'
import { useDownloadCV } from '../hooks/useDownloadCV'
import { useTheme } from '../hooks/useTheme'
import { scrollToSection } from '../lib/scrollToSection'

const LINK_IDS = ['accueil', 'a-propos', 'competences', 'formation', 'projets', 'contact'] as const
const LINK_KEYS = ['nav.home', 'nav.about', 'nav.skills', 'nav.education', 'nav.projects', 'nav.contact'] as const

const menuContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const menuItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

export default function Navbar() {
  const { t } = useTranslation()
  const { lang, toggleLang } = useLang()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState('accueil')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { download, downloading } = useDownloadCV()
  const { theme, toggleTheme } = useTheme()
  const nextThemeLabel = theme === 'dark' ? t('theme.toLight') : t('theme.toDark')
  const nextLangLabel = lang === 'fr' ? t('lang.switchToEn') : t('lang.switchToFr')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = 'accueil'
      for (const id of LINK_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    // Sections below the fold are code-split: if the target is not mounted
    // yet, scrollToSection force-mounts it and waits for it to render first.
    scrollToSection(id)
  }

  const onHero = active === 'accueil' && !scrolled
  const isDark = theme === 'dark'

  const linkColorClass = (isActive: boolean) => {
    if (isActive) return 'font-semibold text-gold'
    if (onHero) {
      return isDark
        ? 'text-ink-dark-mute hover:text-ink-dark'
        : 'text-ink-mute hover:text-ink'
    }
    return 'text-ink-mute hover:text-ink dark:text-ink-dark-mute dark:hover:text-ink-dark'
  }

  const heroPrimaryText = isDark ? 'text-ink-dark' : 'text-ink'
  const heroBorder = isDark ? 'border-white/20' : 'border-ink/20'
  const heroHoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-ink/5'

  const links = LINK_IDS.map((id, i) => ({ id, label: t(LINK_KEYS[i]) }))

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        onHero
          ? 'bg-transparent'
          : scrolled
            ? 'border-b border-line bg-surface/90 shadow-lg shadow-black/20 backdrop-blur-md dark:border-line-dark dark:bg-surface-dark/90 dark:shadow-black/40'
            : 'bg-transparent'
      }`}
    >
      <nav
        aria-label={t('nav.aria')}
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-14"
      >
        {/* Logo */}
        <motion.button
          onClick={() => go('accueil')}
          whileHover={reduceMotion ? undefined : { x: 2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          aria-label={t('nav.backHome')}
          className={`rounded-full text-base font-extrabold tracking-tight transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-lg ${
            onHero
              ? `${heroPrimaryText} hover:text-accent`
              : 'text-ink hover:text-accent dark:text-ink-dark dark:hover:text-accent-soft'
          }`}
        >
          Mampionona.R
        </motion.button>

        {/* Desktop links */}
        <ul className="relative hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id} className="relative">
                <motion.button
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  onClick={() => go(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative z-10 rounded-full px-4 py-2 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${linkColorClass(
                    isActive,
                  )}`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive ? (
                    <motion.span
                      aria-hidden
                      layoutId={reduceMotion ? undefined : 'nav-underline'}
                      animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 0.7, 1] }}
                      transition={{
                        layout: { type: 'spring', stiffness: 380, damping: 30 },
                        opacity: reduceMotion
                          ? { duration: 0.2 }
                          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                      }}
                      className="absolute inset-x-4 bottom-1 h-0.5 origin-left bg-gold drop-shadow-[0_0_6px_rgba(245,158,11,0.35)]"
                    />
                  ) : (
                    <>
                      <span
                        aria-hidden
                        className={`absolute inset-0 rounded-full bg-black/5 opacity-0 transition-opacity duration-300 dark:bg-white/5 ${
                          reduceMotion ? '' : 'group-hover:opacity-100'
                        }`}
                      />
                      <span
                        aria-hidden
                        className={`absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 motion-reduce:transition-none ${
                          reduceMotion ? '' : 'group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </motion.button>
              </li>
            )
          })}
        </ul>

        {/* Language toggle (desktop) */}
        <motion.button
          whileHover={reduceMotion ? undefined : { scale: 1.1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.9 }}
          onClick={toggleLang}
          aria-label={nextLangLabel}
          className={`hidden h-10 w-10 shrink-0 place-items-center rounded-full border text-xs font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:grid ${
            onHero
              ? `${heroBorder} ${heroPrimaryText} ${heroHoverBg}`
              : 'border-line text-ink hover:bg-black/5 dark:border-line-dark dark:text-ink-dark dark:hover:bg-white/5'
          }`}
        >
          <span aria-hidden className="relative flex h-5 w-5 items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={lang}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute"
              >
                {lang === 'fr' ? 'FR' : 'EN'}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.button>

        {/* Theme toggle (desktop) */}
        <motion.button
          whileHover={reduceMotion ? undefined : { scale: 1.1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.9 }}
          onClick={toggleTheme}
          aria-label={nextThemeLabel}
          className={`hidden h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:grid ${
            onHero
              ? `${heroBorder} ${heroPrimaryText} ${heroHoverBg}`
              : 'border-line text-ink hover:bg-black/5 dark:border-line-dark dark:text-ink-dark dark:hover:bg-white/5'
          }`}
        >
          <span aria-hidden className="relative flex h-5 w-5 items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="absolute"
              >
                {theme === 'dark' ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.button>

        {/* CV download (desktop) */}
        <motion.button
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          onClick={download}
          disabled={downloading}
          aria-label={t('cv.downloadAria')}
          className={`hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait md:inline-flex ${
            onHero
              ? isDark
                ? 'bg-white/10 text-ink-dark hover:bg-white/20'
                : 'bg-ink/8 text-ink hover:bg-ink/12'
              : 'bg-accent/10 text-accent hover:bg-accent/20 dark:bg-accent/10 dark:text-accent-soft dark:hover:bg-accent/20'
          }`}
        >
          <FiDownload aria-hidden className="text-base" />
          {downloading ? '…' : 'CV'}
        </motion.button>

        {/* Burger (mobile) */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t('menu.close') : t('menu.open')}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`grid h-10 w-10 place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden ${
            onHero
              ? `${heroBorder} ${heroPrimaryText}`
              : 'border-line text-ink dark:border-line-dark dark:text-ink-dark'
          }`}
        >
          <span aria-hidden className="relative flex h-4 w-5 flex-col justify-between">
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-0.5 w-full origin-center rounded-full bg-current"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-full rounded-full bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-0.5 w-full origin-center rounded-full bg-current"
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`overflow-hidden border-t md:hidden ${
              onHero
                ? isDark
                  ? 'border-white/10 bg-hero-dark'
                  : 'border-ink/10 bg-surface'
                : 'border-line bg-surface dark:border-line-dark dark:bg-surface-dark'
            }`}
          >
            <motion.ul
              variants={menuContainer}
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              className="space-y-1 px-6 py-4"
            >
              {links.map((link) => {
                const isActive = active === link.id
                return (
                  <motion.li key={link.id} variants={menuItem}>
                    <button
                      onClick={() => go(link.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full rounded-lg px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                        isActive
                          ? 'font-semibold text-gold'
                          : onHero
                            ? isDark
                              ? 'text-ink-dark-mute hover:text-ink-dark'
                              : 'text-ink-mute hover:text-ink'
                            : 'text-ink-mute dark:text-ink-dark-mute'
                      }`}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                )
              })}
              <motion.li variants={menuItem}>
                <button
                  onClick={download}
                  disabled={downloading}
                  className={`flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-wait ${
                    onHero
                      ? isDark
                        ? 'text-ink-dark-mute hover:text-ink-dark'
                        : 'text-ink-mute hover:text-ink'
                      : 'text-accent hover:bg-accent/10 dark:text-accent-soft dark:hover:bg-accent/10'
                  }`}
                >
                  <FiDownload aria-hidden className="text-base" />
                  {downloading ? t('cv.downloading') : t('cv.download')}
                </button>
              </motion.li>
              <motion.li variants={menuItem}>
                <button
                  onClick={toggleLang}
                  aria-label={nextLangLabel}
                  className={`flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    onHero
                      ? isDark
                        ? 'text-ink-dark-mute hover:text-ink-dark'
                        : 'text-ink-mute hover:text-ink'
                      : 'text-ink-mute hover:text-ink dark:text-ink-dark-mute dark:hover:text-ink-dark'
                  }`}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={lang}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="text-sm font-bold"
                      >
                        {lang === 'fr' ? 'FR' : 'EN'}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  {nextLangLabel}
                </button>
              </motion.li>
              <motion.li variants={menuItem}>
                <button
                  onClick={toggleTheme}
                  aria-label={nextThemeLabel}
                  className={`flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    onHero
                      ? isDark
                        ? 'text-ink-dark-mute hover:text-ink-dark'
                        : 'text-ink-mute hover:text-ink'
                      : 'text-ink-mute hover:text-ink dark:text-ink-dark-mute dark:hover:text-ink-dark'
                  }`}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={theme}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="text-lg"
                      >
                        {theme === 'dark' ? <FiSun /> : <FiMoon />}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  {theme === 'dark' ? t('theme.lightMode') : t('theme.darkMode')}
                </button>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
