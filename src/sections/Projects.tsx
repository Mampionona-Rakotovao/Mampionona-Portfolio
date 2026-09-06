import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useLang } from '../hooks/useLang'
import Section from '../components/Section'
import NetworkBackground from '../components/NetworkBackground'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { projects } from '../data/experiences'
import { projectsEn } from '../data/experiences.en'

const PROJECTS_PER_PAGE = 3

export default function Projects() {
  const { t } = useTranslation()
  const { lang } = useLang()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const allProjects = lang === 'en' ? projectsEn : projects
  const selected = allProjects.find((p) => p.id === selectedId) ?? null
  const totalPages = Math.max(1, Math.ceil(allProjects.length / PROJECTS_PER_PAGE))

  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * PROJECTS_PER_PAGE
    return allProjects.slice(start, start + PROJECTS_PER_PAGE)
  }, [page, allProjects])

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
    document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Section
      id="projets"
      label={t('projects.label')}
      title={t('projects.title')}
      subtitle={t('projects.subtitle')}
      className="bg-surface-2 dark:bg-surface-dark-2"
      background={<NetworkBackground tone="gold" density="corner-top-right" />}
    >
      {/* Cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {paginatedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} onOpen={(p) => setSelectedId(p.id)} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40 dark:border-line-dark dark:hover:bg-surface-dark-2"
            aria-label={t('projects.prevPage')}
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                p === page
                  ? 'bg-accent text-white'
                  : 'border border-line hover:bg-surface-2 dark:border-line-dark dark:hover:bg-surface-dark-2'
              }`}
              aria-label={t('projects.goToPage', { page: p })}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40 dark:border-line-dark dark:hover:bg-surface-dark-2"
            aria-label={t('projects.nextPage')}
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </Section>
  )
}
