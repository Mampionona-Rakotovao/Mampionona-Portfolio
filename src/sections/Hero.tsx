import { motion } from 'framer-motion'
import { FiDownload, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { profile } from '../data/profile'

/**
 * Hero — split-screen layout with portrait photo and gradient blend.
 */
export default function Hero() {
  return (
    <section
      id="accueil"
      aria-label="Présentation"
      className="relative min-h-screen overflow-hidden bg-hero-dark"
    >
      {/* Portrait + gradient blend */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 lg:left-[38%]">
          <img
            src="/portfolio.png"
            alt=""
            className="h-full w-full object-cover object-[center_15%] sm:object-[center_20%] lg:object-[62%_15%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hero-dark/50 via-hero-dark/85 to-hero-dark lg:bg-gradient-to-r lg:from-hero-dark lg:via-hero-dark/90 lg:to-transparent" />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pt-28 pb-20 sm:px-10 sm:pb-16 lg:justify-center lg:px-14 lg:pt-32 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-dark-mute sm:text-sm">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent-soft" aria-hidden />
            <span>{profile.title}</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span className="w-full sm:w-auto">{profile.school}</span>
          </p>

          <h1 className="text-[2.5rem] font-black leading-[1.05] tracking-tight text-ink-dark sm:text-5xl lg:text-[3.75rem]">
            Mampionona Rakoto
            <br />
            vao
          </h1>

          <p className="mt-5 text-xl font-semibold sm:text-2xl lg:text-[1.65rem]">
            <span className="text-accent-soft" aria-hidden>
              &gt;{' '}
            </span>
            <span className="text-accent-soft">Full-</span>
            <span className="text-hero-gold">Stack</span>
          </p>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink-dark-mute sm:text-base">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full bg-hero-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              <FiDownload aria-hidden className="text-base" />
              Télécharger CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-ink-dark transition-colors hover:border-white/50 hover:bg-white/5"
            >
              <FiMail aria-hidden className="text-base" />
              Me contacter
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-2 text-sm text-ink-dark-mute sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
