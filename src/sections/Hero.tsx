import { motion } from 'framer-motion'
import { FiDownload, FiMail, FiMapPin, FiPhone, FiArrowDown } from 'react-icons/fi'
import { profile } from '../data/profile'
import { useDownloadCV } from '../hooks/useDownloadCV'

/**
 * Hero — split-screen layout with portrait photo and gradient blend.
 */

// Variants pour l'apparition en cascade du bloc texte
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export default function Hero() {
  const { download, downloading } = useDownloadCV()

  return (
    <section
      id="accueil"
      aria-label="Présentation"
      className="relative min-h-screen overflow-hidden bg-hero-dark"
    >
      {/* Portrait + gradient blend */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 lg:left-[38%]"
        >
          <img
            src="/portfolio.png"
            alt=""
            className="h-full w-full object-cover object-[center_15%] sm:object-[center_20%] lg:object-[62%_15%]"
          />

          {/* Overlay uniforme pour garder le texte lisible partout */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Fondu vertical (mobile/tablette) : image en fond de section */}
          <div className="absolute inset-0 bg-gradient-to-b from-hero-dark/55 via-hero-dark/80 to-hero-dark lg:hidden" />

          {/* Fondu horizontal (desktop) : dégradé progressif du sombre vers la photo, sans bande nette */}
          <div className="absolute inset-0 hidden lg:block lg:bg-gradient-to-r lg:from-hero-dark lg:from-0% lg:via-hero-dark/70 lg:via-25% lg:to-transparent lg:to-60%" />
        </motion.div>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28 pb-20 sm:px-10 sm:pb-16 lg:px-14 lg:pt-32 lg:pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={item}
            className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-dark-mute sm:text-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-soft opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-soft" />
            </span>
            <span>{profile.title}</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span className="w-full sm:w-auto">{profile.school}</span>
          </motion.p>

          <motion.h1
            variants={item}
            className="text-[2.5rem] font-black leading-[1.05] tracking-tight text-ink-dark sm:text-5xl lg:text-[3.75rem]"
          >
            Mampionona Rakoto
            <br />
            vao
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-xl font-semibold sm:text-2xl lg:text-[1.65rem]"
          >
            <span className="text-accent-soft" aria-hidden>
              &gt;{' '}
            </span>
            <span className="text-accent-soft">Full-</span>
            <span className="text-hero-gold">Stack</span>
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-sm leading-relaxed text-ink-dark-mute sm:text-base"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <button
              type="button"
              onClick={download}
              disabled={downloading}
              aria-label="Télécharger mon curriculum vitae au format PDF"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-hero-teal px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-deep hover:shadow-lg hover:shadow-hero-teal/30 disabled:cursor-wait disabled:opacity-80"
            >
              <FiDownload
                aria-hidden
                className="text-base transition-transform group-hover:translate-y-0.5"
              />
              {downloading ? 'Préparation…' : 'Télécharger CV'}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-ink-dark transition-colors hover:border-white/50 hover:bg-white/5"
            >
              <FiMail aria-hidden className="text-base" />
              Me contacter
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-2 text-sm text-ink-dark-mute sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
          >
            <span className="inline-flex items-center gap-2">
              <FiMapPin aria-hidden className="shrink-0 text-accent-soft" />
              {profile.location}
            </span>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent-soft"
            >
              <FiPhone aria-hidden className="shrink-0 text-accent-soft" />
              {profile.phone}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Flèche de scroll animée */}
      <motion.a
        href="#a-propos"
        aria-label="Défiler vers la section suivante"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 text-accent-soft"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  )
}