import { motion } from 'framer-motion'
import { FiCompass, FiCheck } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useLang } from '../hooks/useLang'
import Section from '../components/Section'
import FadeText from '../components/FadeText'
import ProfileSidebar from '../components/ProfileSidebar'
import NetworkBackground from '../components/NetworkBackground'
import { profile } from '../data/profile'
import { profileEn } from '../data/profile.en'

const bioReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 },
  },
}

export default function About() {
  const { t } = useTranslation()
  const { lang } = useLang()
  const p = lang === 'en' ? profileEn : profile

  return (
    <Section
      id="a-propos"
      label={t('about.label')}
      title={t('about.title')}
      subtitle={t('about.subtitle')}
      background={
        <NetworkBackground
          tone="accent"
          density="corner-top-right"
          className="opacity-80"
        />
      }
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(280px,340px)_1fr]">
        <ProfileSidebar />

        <div className="space-y-8">
          <motion.div
            variants={bioReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative pl-6"
          >
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
              className="absolute left-0 top-0 h-full w-1 origin-top rounded-full bg-gradient-to-b from-accent via-accent-soft to-gold"
            />
            <p className="text-base leading-relaxed text-ink-mute dark:text-ink-dark-mute sm:text-lg">
              <FadeText>{p.about}</FadeText>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {[
              { value: 'L3', label: t('about.statL3') },
              { value: '8+', label: t('about.statProjects') },
              { value: 'Full-Stack', label: t('about.statFullstack') },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-line bg-surface-2 p-5 text-center shadow-card transition-colors hover:border-accent/30 dark:border-line-dark dark:bg-surface-dark-2"
              >
                <p className="text-2xl font-black text-gradient">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-ink-mute dark:text-ink-dark-mute">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl border border-line bg-surface-2 p-6 shadow-card dark:border-line-dark dark:bg-surface-dark-2"
          >
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
              <FiCompass aria-hidden /> {t('about.searchTitle')}
            </h3>
            <p className="text-base leading-relaxed text-ink-mute dark:text-ink-dark-mute">
              <FadeText>{t('about.searchText')}</FadeText>
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                t('about.point1'),
                t('about.point2'),
                t('about.point3'),
                t('about.point4'),
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm text-ink-mute dark:text-ink-dark-mute"
                >
                  <FiCheck className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
