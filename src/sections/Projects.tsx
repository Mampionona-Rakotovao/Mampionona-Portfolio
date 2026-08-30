import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import { projects, projectCategories } from '../data/experiences'
import type { Project } from '../data/types'

/**
 * Projects/Experiences — filterable grid (by category) with a detail modal.
 */
export default function Projects() {
  const [active, setActive] = useState('Tout')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = useMemo(
    () => (active === 'Tout' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <Section
      id="projets"
      label="Projets & Expériences"
      title="Mes projets et expériences"
      subtitle="Des projets concrets réalisés pendant mes études et un stage, allant du mobile au full-stack web."
      className="bg-surface-2 dark:bg-surface-dark-2"
    >
      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrer les projets">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === cat
                ? 'text-white'
                : 'border border-line text-ink-mute hover:text-accent dark:border-line-dark dark:text-ink-dark-mute'
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                aria-hidden
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <motion.div
        layout
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-6 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-2xl dark:border-line-dark dark:bg-surface-dark-2"
            >
              <div className="relative bg-gradient-to-br from-accent via-accent-deep to-gold p-6 text-white">
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Fermer"
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/25 transition-transform hover:scale-110"
                >
                  <FiX aria-hidden />
                </button>
                <span className="inline-block rounded-full bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  {selected.category}
                </span>
                <h3 className="mt-3 text-xl font-bold">{selected.title}</h3>
                <p className="mt-1 text-sm text-white/90">
                  {selected.period} · {selected.place}
                </p>
              </div>

              <div className="space-y-4 p-6">
                <p className="text-sm leading-relaxed text-accent-deep dark:text-accent-soft">
                  {selected.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-ink-mute dark:text-ink-dark-mute">
                  {selected.description}
                </p>
                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-deep dark:text-accent-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
