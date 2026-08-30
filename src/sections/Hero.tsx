import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiDownload, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { profile } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'
import MagneticButton from '../components/MagneticButton'

const letterContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}
const letter = {
  hidden: { opacity: 0, y: 20, rotateX: 90 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5 } },
}

interface HeroProps {
  photo?: string
}

/**
 * Hero — name revealed letter by letter, typewriter roles, parallax profile
 * picture and CTA buttons.
 */
export default function Hero({ photo }: HeroProps) {
  const typed = useTypewriter(profile.roles)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax on the profile image + subtle fade of the block on scroll.
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const displayName = 'Mampionona Rakotovao'

  return (
    <section
      ref={ref}
      id="accueil"
      aria-label="Présentation"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Decorative gradient blobs */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <motion.div
        style={{ opacity }}
        className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.3fr_1fr]"
      >
        <motion.div style={{ y: contentY }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 flex items-center gap-2 text-sm font-medium text-ink-mute dark:text-ink-dark-mute"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
            {profile.title}
            <span aria-hidden>·</span> {profile.school}
          </motion.p>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <motion.span
              variants={letterContainer}
              initial="hidden"
              animate="visible"
              aria-label={displayName}
              className="perspective-[600px] inline-block"
            >
              {displayName.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  aria-hidden
                  className="inline-block text-ink dark:text-ink-dark"
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 flex h-9 items-center text-xl font-semibold text-ink-mute dark:text-ink-dark-mute sm:text-2xl"
          >
            <span className="mr-2 text-accent" aria-hidden>&gt;</span>
            <span className="text-gradient">{typed}</span>
            <span className="ml-0.5 inline-block h-7 w-0.5 animate-pulse bg-accent" aria-hidden />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-mute dark:text-ink-dark-mute"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton href={profile.resumeUrl} ariaLabel="Télécharger mon CV">
              <FiDownload aria-hidden /> Télécharger CV
            </MagneticButton>
            <MagneticButton href="#contact" ariaLabel="Me contacter" variant="ghost">
              <FiMail aria-hidden /> Me contacter
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-mute dark:text-ink-dark-mute"
          >
            <span className="inline-flex items-center gap-2">
              <FiMapPin aria-hidden /> {profile.location}
            </span>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <FiPhone aria-hidden /> {profile.phone}
            </a>
          </motion.div>
        </motion.div>

        {/* Profile photo with parallax */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          data-tilt
          className="relative mx-auto hidden aspect-square w-72 sm:block lg:w-80"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent to-gold opacity-20 blur-2xl" aria-hidden />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border-2 border-accent/20 bg-surface-2 shadow-card dark:bg-surface-dark-2">
            {photo ? (
              <img
                src={photo}
                alt="Photo de profil de Mampionona Rakotovao"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center">
                <span className="text-8xl font-black text-gradient" aria-hidden>
                  MR
                </span>
              </div>
            )}
          </div>
          <div
            className="absolute -bottom-4 -left-4 rounded-2xl border border-line bg-surface-2 px-4 py-2 text-sm font-semibold shadow-card dark:border-line-dark dark:bg-surface-dark-2"
            aria-hidden
          >
            Web · Mobile
          </div>        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('a-propos')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Faire défiler vers la section à propos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <FiDownload className="rotate-180 text-2xl" aria-hidden />
      </motion.button>
    </section>
  )
}
