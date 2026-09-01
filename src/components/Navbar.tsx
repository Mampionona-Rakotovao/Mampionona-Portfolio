import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import { useDownloadCV } from '../hooks/useDownloadCV'

const LINKS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'formation', label: 'Formation' },
  { id: 'projets', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
]

const menuContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const menuItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

/**
 * Fixed top navigation with scroll-spy highlighting, a sliding orange active
 * underline (Framer `layoutId`), hover micro-interactions and an animated
 * mobile menu.
 *
 * `useReducedMotion` disables the sliding underline, hover/tap transforms and
 * the mobile stagger — the active/hover states still update instantly via
 * colours.
 */
export default function Navbar() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState('accueil')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { download, downloading } = useDownloadCV()

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

  /**
   * Navigates to a section by id.
   *
   * Closes the mobile menu first, then waits one animation frame before
   * scrolling — this avoids computing the scroll target while the header's
   * height is still that of the open mobile menu (which would throw off the
   * landing position on some mobile browsers).
   *
   * If the id doesn't match any element in the DOM, this logs a clear warning
   * instead of failing silently (the previous `?.scrollIntoView(...)` masked
   * this case entirely — a mismatched or missing section id would just do
   * nothing, with no way to tell why).
   */
  const go = (id: string) => {
    setOpen(false)

    const el = document.getElementById(id)
    if (!el) {
      console.warn(
        `[Navbar] Aucun élément trouvé avec l'id "${id}". Vérifie que la section correspondante a bien <section id="${id}"> posé sur sa balise racine.`,
      )
      return
    }

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const onHero = active === 'accueil' && !scrolled

  const linkColorClass = (isActive: boolean) =>
    isActive
      ? 'font-semibold text-gold'
      : onHero
        ? 'text-ink-dark-mute hover:text-ink-dark'
        : 'text-ink-mute hover:text-ink dark:text-ink-dark-mute dark:hover:text-ink-dark'

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
        aria-label="Navigation principale"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-14"
      >
        {/* Logo */}
        <motion.button
          onClick={() => go('accueil')}
          whileHover={reduceMotion ? undefined : { x: 2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          aria-label="Retour à l'accueil"
          className={`rounded-full text-base font-extrabold tracking-tight transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-lg ${
            onHero ? 'text-ink-dark hover:text-accent-soft' : 'text-ink hover:text-accent-soft dark:text-ink-dark'
          }`}
        >
          Mampionona.R
        </motion.button>

        {/* Desktop links */}
        <ul className="relative hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
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
                    /* Trait actif permanent — glisse d'un lien à l'autre (layoutId)
                       et pulse doucement (désactivé en reduced-motion). */
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
                      {/* Léger fond en fondu au survol */}
                      <span
                        aria-hidden
                        className={`absolute inset-0 rounded-full bg-black/5 opacity-0 transition-opacity duration-300 dark:bg-white/5 ${
                          reduceMotion ? '' : 'group-hover:opacity-100'
                        }`}
                      />
                      {/* Petit trait animé sous le lien au survol */}
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

        {/* CV download (desktop) */}
        <motion.button
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          onClick={download}
          disabled={downloading}
          aria-label="Télécharger mon curriculum vitae"
          className={`hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait md:inline-flex ${
            onHero
              ? 'bg-white/10 text-ink-dark hover:bg-white/20'
              : 'bg-accent/10 text-accent hover:bg-accent/20 dark:bg-accent/10 dark:text-accent-soft dark:hover:bg-accent/20'
          }`}
        >
          <FiDownload aria-hidden className="text-base" />
          {downloading ? '…' : 'CV'}
        </motion.button>

        {/* Burger (mobile) */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`grid h-10 w-10 place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden ${
            onHero
              ? 'border-white/20 text-ink-dark'
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
                ? 'border-white/10 bg-hero-dark/95 backdrop-blur-md'
                : 'border-line bg-surface/95 backdrop-blur-md dark:border-line-dark dark:bg-surface-dark/95'
            }`}
          >
            <motion.ul
              variants={menuContainer}
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              className="space-y-1 px-6 py-4"
            >
              {LINKS.map((link) => {
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
                            ? 'text-ink-dark-mute'
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
                      ? 'text-ink-dark-mute hover:text-ink-dark'
                      : 'text-accent hover:bg-accent/10 dark:text-accent-soft dark:hover:bg-accent/10'
                  }`}
                >
                  <FiDownload aria-hidden className="text-base" />
                  {downloading ? 'Téléchargement…' : 'Télécharger CV'}
                </button>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}