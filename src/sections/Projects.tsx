import { useMemo, useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { projects } from '../data/experiences'
import type { Project } from '../data/types'

const PER_PAGE = 3

/**
 * Projects/Experiences — paginated grid with a detail modal.
 */
export default function Projects() {
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Project | null>(null)
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(projects.length / PER_PAGE)

  const paginated = useMemo(
    () => projects.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [page],
  )

  const goTo = useCallback(
    (p: number) => {
      setPage(p)
      setSelected(null)
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      })
    },
    [reduceMotion],
  )

  return (
    <Section
      id="projets"
      label="Projets & Expériences"
      title="Mes projets et expériences"
      subtitle="Des projets concrets réalisés pendant mes études et un stage, allant du mobile au full-stack web."
      className="bg-surface-2 dark:bg-surface-dark-2"
    >
      <div ref={sectionRef}>
        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {paginated.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} onOpen={setSelected} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="Pagination des projets"
          >
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              aria-label="Page précédente"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-mute transition-all hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 dark:border-line-dark dark:text-ink-dark-mute"
            >
              <FiChevronLeft size={16} aria-hidden />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goTo(p)}
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
                className={`relative h-9 min-w-[2.25rem] rounded-full px-3 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  p === page
                    ? 'text-white'
                    : 'border border-line text-ink-mute hover:border-accent hover:text-accent dark:border-line-dark dark:text-ink-dark-mute'
                }`}
              >
                {p === page && (
                  <motion.span
                    layoutId="pagination-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    aria-hidden
                  />
                )}
                <span className="relative z-10">{p}</span>
              </button>
            ))}

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              aria-label="Page suivante"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-mute transition-all hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 dark:border-line-dark dark:text-ink-dark-mute"
            >
              <FiChevronRight size={16} aria-hidden />
            </button>
          </nav>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </Section>
  )
}
