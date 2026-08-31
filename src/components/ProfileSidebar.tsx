import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { softSkills } from '../data/skills'

const sidebarContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const sidebarItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const badgePop = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.06 * i, type: 'spring' as const, stiffness: 320, damping: 22 },
  }),
}

interface ProfileSidebarProps {
  className?: string
}

/**
 * CV-style sidebar — languages, strengths and interests.
 */
export default function ProfileSidebar({ className = '' }: ProfileSidebarProps) {
  return (
    <motion.aside
      variants={sidebarContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`space-y-8 rounded-2xl border border-line bg-surface-2/80 p-6 shadow-card backdrop-blur-sm dark:border-line-dark dark:bg-surface-dark-2/80 lg:sticky lg:top-28 lg:self-start ${className}`}
    >
      <motion.div variants={sidebarItem}>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">Langues</h3>
        <ul className="space-y-2">
          {profile.languages.map((lang, i) => (
            <motion.li
              key={lang.name}
              custom={i}
              variants={badgePop}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center justify-between rounded-lg border border-line/80 bg-surface px-3 py-2.5 dark:border-line-dark dark:bg-surface-dark"
            >
              <span className="text-sm font-semibold text-ink dark:text-ink-dark">{lang.name}</span>
              <span className="text-xs text-ink-mute dark:text-ink-dark-mute">{lang.level}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={sidebarItem}>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">Atouts</h3>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.span
                key={s.name}
                custom={i}
                variants={badgePop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -3, boxShadow: '0 8px 24px -8px var(--color-accent)' }}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark"
              >
                <Icon className="text-sm text-accent" aria-hidden />
                {s.name}
              </motion.span>
            )
          })}
        </div>
      </motion.div>

      <motion.div variants={sidebarItem}>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
          Centres d&apos;intérêt
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, i) => (
            <motion.span
              key={interest}
              custom={i}
              variants={badgePop}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06 }}
              className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-deep dark:text-accent-soft"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.aside>
  )
}
