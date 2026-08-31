import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import type { Project } from '../data/types'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

/**
 * Full-screen modal displaying project details and screenshot gallery.
 * Replaces both the old accordion detail and the separate Lightbox.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const images = project.images ?? []
  const hasImages = images.length > 0
  const hasMultiple = images.length > 1

  const [photoIndex, setPhotoIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const reduceMotion = useReducedMotion()

  const navigate = useCallback(
    (next: number) => {
      setDirection(next > photoIndex ? 1 : -1)
      setPhotoIndex(next)
    },
    [photoIndex],
  )

  const goNext = useCallback(() => {
    if (hasMultiple) navigate((photoIndex + 1) % images.length)
  }, [photoIndex, images.length, hasMultiple, navigate])

  const goPrev = useCallback(() => {
    if (hasMultiple) navigate((photoIndex - 1 + images.length) % images.length)
  }, [photoIndex, images.length, hasMultiple, navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  }

  const imageLabel = hasMultiple
    ? `Capture d'écran ${photoIndex + 1} / ${images.length} — ${project.title}`
    : `Capture d'écran — ${project.title}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10 backdrop-blur-sm sm:p-8 sm:py-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{
          duration: 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-line-dark bg-hero-dark shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:top-4"
        >
          <FiX size={18} aria-hidden />
        </button>

        {/* Image gallery */}
        {hasImages && (
          <div className="relative flex w-full items-center justify-center overflow-hidden bg-black">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={photoIndex}
                src={images[photoIndex]}
                alt={imageLabel}
                custom={direction}
                variants={reduceMotion ? undefined : slideVariants}
                initial={reduceMotion ? undefined : 'enter'}
                animate={reduceMotion ? undefined : 'center'}
                exit={reduceMotion ? undefined : 'exit'}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="max-h-[70vh] w-full object-contain"
              />
            </AnimatePresence>

            {/* Arrows */}
            {hasMultiple && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  aria-label="Image précédente"
                  className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-3 sm:h-11 sm:w-11"
                >
                  <FiChevronLeft size={20} aria-hidden />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  aria-label="Image suivante"
                  className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-3 sm:h-11 sm:w-11"
                >
                  <FiChevronRight size={20} aria-hidden />
                </button>
              </>
            )}

            {/* Dots */}
            {hasMultiple && (
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(i)
                    }}
                    aria-label={`Aller à l'image ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      i === photoIndex
                        ? 'w-5 bg-white'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="space-y-4 p-5 sm:p-6">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/70">
              {project.category}
            </span>
            <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-white/60">
              {project.period} · {project.place}
            </p>
          </div>
          <p className="text-sm font-medium text-accent-soft">{project.subtitle}</p>
          <p className="text-sm leading-relaxed text-white/60">{project.description}</p>
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-soft">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}   