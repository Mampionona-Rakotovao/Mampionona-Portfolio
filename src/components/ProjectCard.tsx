import { FiFolder, FiCode } from 'react-icons/fi'
import type { Project } from '../data/types'
import TiltCard from './TiltCard'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

/**
 * Project card with cover image / gradient fallback, 3D tilt on hover.
 * Clicking opens the detail modal via `onOpen`.
 */
export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const hasImages = project.images && project.images.length > 0

  return (
    <TiltCard
      className="h-full [transform-style:preserve-3d]"
      maxTilt={6}
    >
      <button
        onClick={() => onOpen(project)}
        aria-label={`Voir le détail du projet : ${project.title}`}
        data-tilt
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-line-dark dark:bg-surface-dark-2"
      >
        {/* Cover image / fallback */}
        {hasImages ? (
          <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-ink/5 dark:bg-black/40">
            <img
              src={project.images![0]}
              alt={`Capture d'écran — ${project.title}`}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-400 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-2 to-transparent dark:from-surface-dark-2" />
            <span className="absolute left-4 top-4 inline-block rounded-full bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              {project.category}
            </span>
            <span className="absolute right-4 top-4 text-xs font-medium text-white/90 drop-shadow-sm">
              {project.period}
            </span>
            <span className="absolute bottom-3 left-4 text-xs font-medium text-white/80 drop-shadow-sm">
              {project.place}
            </span>
          </div>
        ) : (
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-gold/10 dark:from-accent/5 dark:via-transparent dark:to-gold/5">
            <FiFolder
              size={40}
              className="text-ink-mute/30 dark:text-ink-dark-mute/30"
              aria-hidden
            />
            <FiCode
              size={24}
              className="absolute right-8 bottom-8 text-ink-mute/20 dark:text-ink-dark-mute/20"
              aria-hidden
            />
            <span className="absolute left-4 top-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-deep dark:text-accent-soft">
              {project.category}
            </span>
            <span className="absolute right-4 top-4 text-xs font-medium text-ink-mute dark:text-ink-dark-mute">
              {project.period}
            </span>
            <span className="absolute bottom-3 left-4 text-xs font-medium text-ink-mute/70 dark:text-ink-dark-mute/70">
              {project.place}
            </span>
          </div>
        )}

        {/* Text content */}
        <div
          className="flex flex-1 flex-col p-5"
          style={{ transform: 'translateZ(30px)' }}
        >
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