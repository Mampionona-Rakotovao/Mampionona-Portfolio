import { motion } from 'framer-motion'
import Section from '../components/Section'
import { profile } from '../data/profile'
import { softSkills, traits } from '../data/skills'

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.12 * i, type: 'spring' as const, stiffness: 260, damping: 18 },
  }),
}

/**
 * About — presentation text, animated soft-skill badges and language list.
 */
export default function About() {
  return (
    <Section
      id="a-propos"
      label="À propos"
      title="Qui suis-je ?"
      subtitle="Apprenant curieux et développeur en devenir, motivé par les technologies web, mobile et les bases de données."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-4 text-base leading-relaxed text-ink-mute dark:text-ink-dark-mute"
        >
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            {profile.about}
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            En troisième année à l’{profile.school}, j’ai mené de nombreux projets pratiques
            (applications Android, plateformes web, API REST) qui m’ont permis de développer un
            goût prononcé pour le travail en équipe et la résolution de problèmes concrets.
          </motion.p>

          <div className="pt-2">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">
              Étiquettes
            </h3>
            <div className="flex flex-wrap gap-2">
              {traits.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-ink dark:border-line-dark dark:bg-surface-dark-2 dark:text-ink-dark"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">
              Atouts
            </h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.span
                    key={s.name}
                    custom={i}
                    variants={badgeVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    whileHover={{ y: -4, boxShadow: '0 10px 30px -10px var(--color-accent)' }}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent dark:border-line-dark dark:bg-surface-dark-2 dark:text-ink-dark"
                  >
                    <Icon className="text-lg text-accent" aria-hidden />
                    {s.name}
                  </motion.span>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">
              Langues
            </h3>
            <ul className="space-y-3">
              {profile.languages.map((lang, i) => (
                <motion.li
                  key={lang.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between rounded-xl border border-line bg-surface-2 px-4 py-3 dark:border-line-dark dark:bg-surface-dark-2"
                >
                  <span className="font-semibold text-ink dark:text-ink-dark">{lang.name}</span>
                  <span className="text-sm text-ink-mute dark:text-ink-dark-mute">{lang.level}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
