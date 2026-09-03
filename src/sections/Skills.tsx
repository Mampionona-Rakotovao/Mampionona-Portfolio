import { motion } from 'framer-motion'
import Section from '../components/Section'
import NetworkBackground from '../components/NetworkBackground'
import { skillCategories } from '../data/skills'

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const tagContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 24 },
  },
}

/**
 * Skills — CV-style categorized tags with staggered spring animations.
 */
export default function Skills() {
  return (
    <Section
      id="competences"
      label="Compétences"
      title="Compétences techniques"
      subtitle="Langages, frameworks, bases de données et outils que j’utilise pour concevoir des applications web et mobiles."
      className="bg-surface-2 dark:bg-surface-dark-2"
      background={<NetworkBackground tone="gold" density="even" />}
    >
      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid gap-6 md:grid-cols-2"
      >
        {skillCategories.map((cat) => {
          const Icon = cat.icon
          return (
            <motion.article
              key={cat.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent/35 dark:border-line-dark dark:bg-surface-dark"
            >
              <div className="mb-5 flex items-center gap-3">
                <motion.span
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.45 }}
                  className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-xl text-accent"
                >
                  <Icon aria-hidden />
                </motion.span>
                <h3 className="text-lg font-bold text-ink dark:text-ink-dark">{cat.label}</h3>
              </div>

              <motion.div
                variants={tagContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="flex flex-wrap gap-2"
              >
                {cat.skills.map((skill) => {
                  const SkillIcon = skill.icon
                  return (
                    <motion.span
                      key={skill.name}
                      variants={tagVariants}
                      whileHover={{
                        scale: 1.06,
                        boxShadow: '0 6px 20px -6px var(--color-accent)',
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-surface-2 px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent dark:border-line-dark dark:bg-surface-dark-2 dark:text-ink-dark"
                    >
                      {SkillIcon && <SkillIcon className="text-base text-accent" aria-hidden />}
                      {skill.name}
                    </motion.span>
                  )
                })}
              </motion.div>
            </motion.article>
          )
        })}
      </motion.div>
    </Section>
  )
}
