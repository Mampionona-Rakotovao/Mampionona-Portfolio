import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { EducationItem } from '../data/types'
import { education } from '../data/education'
import Section from '../components/Section'

/**
 * Vertical timeline — the center line progressively draws itself (`scaleY`)
 * as the user scrolls through the section, and each entry fades/slides in.
 */
export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.6'],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section
      id="formation"
      label="Formation"
      title="Mon parcours académique"
      subtitle="Un parcours en informatique commencé à l’École Nationale d’Informatique de Fianarantsoa."
    >
      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* The line track */}
        <div
          aria-hidden
          className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-line dark:bg-line-dark sm:left-1/2"
        />
        {/* The animated drawn line */}
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale, transformOrigin: 'top' }}
          className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-accent to-gold sm:left-1/2"
        />

        <ol className="space-y-10">
          {education.map((item: EducationItem, i) => {
            const isLeft = i % 2 === 0
            return (
              <li key={item.title} className="relative pl-12 sm:pl-0">
                {/* Node on the line */}
                <span
                  aria-hidden
                  className="absolute left-4 top-1.5 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-surface dark:bg-surface-dark sm:left-1/2"
                >
                  <span className="absolute inset-1 rounded-full bg-accent" />
                </span>

                <motion.div
                  initial={{ opacity: 0, y: 30, x: 0 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                  className={`sm:w-[calc(50%-2.5rem)] ${
                    isLeft ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
                  }`}
                >
                  <div className="rounded-2xl border border-line bg-surface-2 p-5 shadow-card transition-colors hover:border-accent/40 dark:border-line-dark dark:bg-surface-dark-2">
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                      {item.period}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-ink dark:text-ink-dark">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent-deep dark:text-accent-soft">
                      {item.school}
                    </p>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-mute dark:text-ink-dark-mute">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
