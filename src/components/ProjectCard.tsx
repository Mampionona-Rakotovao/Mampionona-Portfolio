import type { Project } from '../data/types'
import TiltCard from './TiltCard'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

/**
 * Project card with 3D tilt on hover and an accent-coloured tag strip.
 * Clicking opens the detail modal via `onOpen`.
 */
export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <TiltCard
      className="h-full [transform-style:preserve-3d]"
      maxTilt={6}
    >
      <button
        onClick={() => onOpen(project)}
        aria-label={`Voir le détail du projet : ${project.title}`}
        data-tilt
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl dark:border-line-dark dark:bg-surface-dark-2"
      >
        {/* Accent header strip */}
        <div className="relative h-24 overflow-hidden bg-gradient-to-br from-accent via-accent-deep to-gold">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 transition-transform duration-500 group-hover:scale-110"
          >
            <div className="h-full w-1/2 bg-white/20 blur-xl" />
          </div>
          <span className="absolute left-4 top-4 inline-block rounded-full bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            {project.category}
          </span>
          <span className="absolute right-4 top-4 text-xs font-medium text-white/90">
            {project.period}
          </span>
          <span className="absolute bottom-3 left-4 text-xs font-medium text-white/80">
            {project.place}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-base font-bold leading-snug text-ink transition-colors group-hover:text-accent dark:text-ink-dark">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent-deep dark:text-accent-soft">
            {project.subtitle}
          </p>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-mute dark:text-ink-dark-mute">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent-deep dark:text-accent-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </button>
    </TiltCard>
  )
}
