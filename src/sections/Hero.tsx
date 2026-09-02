import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiDownload, FiMail, FiMapPin, FiPhone, FiArrowDown } from 'react-icons/fi'
import { profile } from '../data/profile'
import { useDownloadCV } from '../hooks/useDownloadCV'
import AnimatedText from '../components/AnimatedText'
import RotatingText from '../components/RotatingText'
import { roles } from '../data/roles'

/**
 * Hero — photo container now starts at 28% from the left (was 20%, briefly
 * 0%, originally 38%). `object-cover` has to scale the image up more, the
 * wider its container is relative to the section — narrowing it back a bit
 * from 20% to 28% is what actually "zooms out": it needs less crop to cover
 * the box, showing more shoulders/headroom around the face. Panning
 * (`object-position`) only shifts the crop, it can't change how zoomed-in it
 * is — the container width is the real zoom lever here.
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

/** True when the viewport is desktop (lg breakpoint) — enables float & hover. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDesktop
}

export default function Hero() {
  const { download, downloading } = useDownloadCV()
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()

  return (
    <section
      id="accueil"
      aria-label="Présentation"
      className="relative min-h-screen overflow-hidden bg-surface dark:bg-hero-dark"
    >
      {/* Portrait + gradient blend */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Halo lumineux discret qui pulse derrière la photo (desktop) — reste
            dans la zone où la photo est déjà pleinement visible, opacité basse
            pour ne jamais transparaître en forme ronde. Désactivé si
            prefers-reduced-motion. */}
        {!reduceMotion && (
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[10%] top-1/2 hidden h-[65%] w-[28%] -translate-y-1/2 rounded-full bg-accent-soft/15 blur-3xl lg:block"
          />
        )}

        {/* Photo — démarre à 28% de la largeur (était 20%) : légèrement
            dézoomée, plus d'espace visible autour du visage et sur les épaules. */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 lg:left-[28%]"
        >
          {/* Flottement très léger façon respiration (desktop, gated par reduced-motion) */}
          <motion.div
            className="h-full w-full"
            animate={isDesktop && !reduceMotion ? { y: [0, -8, 0] } : { y: 0 }}
            transition={
              isDesktop && !reduceMotion
                ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0 }
            }
          >
            <motion.img
              src="/portfolio.png"
              alt=""
              whileHover={isDesktop ? { scale: 1.04 } : undefined}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full w-full object-cover object-[center_15%] sm:object-[center_20%] lg:object-[62%_13%]"
            />
          </motion.div>

          {/* Overlay uniforme très léger pour garder le texte lisible */}
          <div className="absolute inset-0 bg-black/8 dark:bg-black/20" />

          {/* Fondu vertical (mobile/tablette) : contraste localisé, quasi
              transparent au centre pour que la photo reste nette. */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface/75 from-0% via-surface/8 via-32% via-surface/8 via-62% to-surface/75 to-100% dark:from-hero-dark/75 dark:from-0% dark:via-hero-dark/10 dark:via-32% dark:via-hero-dark/10 dark:via-62% dark:to-hero-dark/75 dark:to-100% lg:hidden" />

          {/* Fondu horizontal (desktop) : opaque seulement derrière la zone de
              texte, puis transparent — recalibré pour le nouveau conteneur
              (28%→100%, donc 72% de large). */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-surface from-0% via-surface/55 via-18% to-transparent to-38% dark:from-hero-dark dark:via-hero-dark/65 dark:via-18% dark:to-transparent dark:to-38% lg:block" />
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
            className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-mute dark:text-ink-dark-mute sm:text-sm"
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

          {/* Nom — révélé lettre par lettre (effet bascule 3D + vague de couleur
              décorative). La couleur réelle vient uniquement de `className`
              (`text-ink dark:text-ink-dark`), jamais du JS. */}
          <AnimatedText
            as="h1"
            text="Mampionona Rakotovao"
            stagger={0.025}
            flip3D
            waveColor="#14b8a6"
            className="mt-4 text-balance text-4xl font-black leading-[1.05] tracking-tight text-ink dark:text-ink-dark sm:text-5xl lg:text-[3.75rem]"
          />

          {/* Sous-titre — chevron fixe + rôles défilants (effet compteur à rouleaux).
              Le chevron ">" reste fixe, seul le rôle change après. */}
          <p className="mt-5 text-xl font-semibold sm:text-2xl lg:text-[1.65rem]">
            <span className="text-accent dark:text-accent-soft" aria-hidden>
              &gt;{' '}
            </span>
            <RotatingText words={roles} interval={2500} />
          </p>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-sm leading-relaxed text-ink-mute dark:text-ink-dark-mute sm:text-base"
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
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-hero-teal px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-deep hover:shadow-lg hover:shadow-hero-teal/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft disabled:cursor-wait disabled:opacity-80"
            >
              <FiDownload
                aria-hidden
                className="text-base transition-transform duration-300 group-hover:translate-y-0.5"
              />
              {downloading ? 'Préparation…' : 'Télécharger CV'}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink/30 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft dark:border-white/25 dark:text-ink-dark dark:hover:border-white/50 dark:hover:bg-white/5"
            >
              <FiMail aria-hidden className="text-base" />
              Me contacter
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-2 text-sm text-ink-mute dark:text-ink-dark-mute sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
          >
            <span className="inline-flex items-center gap-2">
              <FiMapPin aria-hidden className="shrink-0 text-accent dark:text-accent-soft" />
              {profile.location}
            </span>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft dark:hover:text-accent-soft"
            >
              <FiPhone aria-hidden className="shrink-0 text-accent dark:text-accent-soft" />
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
        className="absolute bottom-6 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-ink/15 text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft dark:border-white/20 dark:text-accent-soft"
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