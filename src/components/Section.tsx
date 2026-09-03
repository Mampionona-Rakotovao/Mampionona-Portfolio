import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  id: string
  label: string
  title: string
  subtitle?: ReactNode
  children: ReactNode
  className?: string
  /** Optional full-bleed decorative background rendered behind the content. */
  background?: ReactNode
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

/**
 * Shared section wrapper providing consistent spacing, an animated heading
 * and scroll-reveal + stagger for its children.
 */
export default function Section({ id, label, title, subtitle, children, className = '', background }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative overflow-hidden py-24 sm:py-32 ${className}`}
    >
      {background}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-6xl px-6 sm:px-10"
      >
        <motion.div variants={item} className="mb-14 max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">{label}</span>
          <h2
            id={`${id}-title`}
            className="mt-2 text-2xl font-extrabold tracking-tight text-ink dark:text-ink-dark sm:text-3xl"
          >
            {title}
          </h2>
          {subtitle && (
            <div className="mt-3 text-base leading-relaxed text-ink-mute dark:text-ink-dark-mute">
              {subtitle}
            </div>
          )}
          <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-accent to-gold" />
        </motion.div>
        {children}
      </motion.div>
    </section>
  )
}
