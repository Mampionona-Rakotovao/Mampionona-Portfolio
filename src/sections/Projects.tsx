import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { projects } from '../data/experiences'
import type { Project } from '../data/types'

/**
 * Projects/Experiences — full grid with a detail modal.
 */
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section
      id="projets"
      label="Projets & Expériences"
      title="Mes projets et expériences"
      subtitle="Des projets concrets réalisés pendant mes études et un stage, allant du mobile au full-stack web."
      className="bg-surface-2 dark:bg-surface-dark-2"
    >
      {/* Cards grid */}
      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} onOpen={setSelected} />
          </motion.div>
        ))}
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </Section>
  )
}
