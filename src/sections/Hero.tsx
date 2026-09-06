import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiDownload, FiMail, FiMapPin, FiPhone, FiArrowDown } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useLang } from '../hooks/useLang'
import { useDownloadCV } from '../hooks/useDownloadCV'
import AnimatedText from '../components/AnimatedText'
import FadeText from '../components/FadeText'
import RotatingText from '../components/RotatingText'
import { profile } from '../data/profile'
import { profileEn } from '../data/profile.en'
import { roles } from '../data/roles'
import { rolesEn } from '../data/roles.en'

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
  const { t } = useTranslation()
  const { lang } = useLang()
  const { download, downloading } = useDownloadCV()
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()

  const p = lang === 'en' ? profileEn : profile
  const r = lang === 'en' ? rolesEn : roles

  return (
    <section
      id="accueil"
      aria-label={t('hero.label')}
      className="relative min-h-screen overflow-hidden bg-surface dark:bg-hero-dark"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {!reduceMotion && (
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[10%] top-1/2 hidden h-[62%] w-[24%] -translate-y-1/2 rounded-full bg-accent-soft/15 blur-3xl lg:block"
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 lg:left-[40%]"
        >
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
              className="h-full w-full object-cover object-[center_15%] sm:object-[center_20%] lg:object-[58%_8%]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-black/8 dark:bg-black/20" />

          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 from-0% via-surface/35 via-40% via-surface/40 via-55% to-surface/85 to-100% dark:from-hero-dark/85 dark:from-0% dark:via-hero-dark/40 dark:via-40% dark:via-hero-dark/45 dark:via-55% dark:to-hero-dark/90 dark:to-100% lg:hidden" />

          <div className="absolute inset-0 hidden bg-gradient-to-r from-surface from-0% via-surface/55 via-22% to-transparent to-46% dark:from-hero-dark dark:via-hero-dark/65 dark:via-22% dark:to-transparent dark:to-46% lg:block" />
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
            <span>{p.title}</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span className="w-full sm:w-auto">{p.school}</span>
          </motion.p>

          <AnimatedText
            as="h1"
            text="Mampionona Rakotovao"
            stagger={0.025}
            flip3D
            waveColor="#14b8a6"
            className="mt-4 text-balance text-4xl font-black leading-[1.05] tracking-tight text-ink dark:text-ink-dark sm:text-5xl lg:text-[3.75rem]"
          />

          <p className="mt-5 text-xl font-semibold sm:text-2xl lg:text-[1.65rem]">
            <span className="text-accent dark:text-accent-soft" aria-hidden>
              &gt;{' '}
            </span>
            <RotatingText words={r} interval={2500} />
          </p>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-sm leading-relaxed text-ink-mute dark:text-ink-dark-mute sm:text-base"
          >
            <FadeText>{p.tagline}</FadeText>
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <button
              type="button"
              onClick={download}
              disabled={downloading}
              aria-label={t('hero.downloadAria')}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-hero-teal px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-deep hover:shadow-lg hover:shadow-hero-teal/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft disabled:cursor-wait disabled:opacity-80"
            >
              <FiDownload
                aria-hidden
                className="text-base transition-transform duration-300 group-hover:translate-y-0.5"
              />
              {downloading ? t('hero.preparing') : t('hero.downloadCV')}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink/30 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft dark:border-white/25 dark:text-ink-dark dark:hover:border-white/50 dark:hover:bg-white/5"
            >
              <FiMail aria-hidden className="text-base" />
              {t('hero.contactMe')}
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-2 text-sm text-ink-mute dark:text-ink-dark-mute sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
          >
            <span className="inline-flex items-center gap-2">
              <FiMapPin aria-hidden className="shrink-0 text-accent dark:text-accent-soft" />
              {p.location}
            </span>
            <a
              href={`tel:${p.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft dark:hover:text-accent-soft"
            >
              <FiPhone aria-hidden className="shrink-0 text-accent dark:text-accent-soft" />
              {p.phone}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#a-propos"
        aria-label={t('hero.scrollDown')}
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
