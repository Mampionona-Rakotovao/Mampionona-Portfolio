import { motion } from 'framer-motion'
import Section from '../components/Section'
import SkillBar from '../components/SkillBar'
import { skillCategories } from '../data/skills'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

/**
 * Skills — grid of categories, each revealed with a stagger and containing
 * animated skill bars.
 */
export default function Skills() {
  return (
    <Section
      id="competences"
      label="Compétences"
      title="Mes compétences techniques"
      subtitle="Un aperçu des langages, frameworks, outils et technologies que j’utilise au quotidien pour construire des applications."
      className="bg-surface-2 dark:bg-surface-dark-2"
    >
      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {skillCategories.map((cat) => {
          const Icon = cat.icon
          return (
            <motion.article
              key={cat.id}
              variants={cardVariants}
              className="group rounded-2xl border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent/40 dark:border-line-dark dark:bg-surface-dark"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-xl text-accent transition-transform group-hover:scale-110">
                  <Icon aria-hidden />
                </span>
                <h3 className="text-lg font-bold text-ink dark:text-ink-dark">{cat.label}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </Section>
  )
}
