import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { EducationItem } from '../data/types'
import { education } from '../data/education'
import Section from '../components/Section'

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/**
 * Vertical timeline — line draws on scroll, entries slide in sequentially.
 */
export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.5'],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section
      id="formation"
      label="Formation"
      title="Diplômes"
      subtitle="Mon parcours académique à l’École Nationale d’Informatique de Fianarantsoa."
    >
      <div ref={ref} className="relative mx-auto max-w-2xl">
        <div
          aria-hidden
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-line dark:bg-line-dark"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale, transformOrigin: 'top' }}
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-accent via-accent-soft to-gold"
        />

        <ol className="space-y-8">
          {education.map((item: EducationItem, i) => (
            <motion.li
              key={item.title}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="relative pl-10"
            >
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: i * 0.1 }}
                className="absolute left-0 top-1.5 z-10 h-4 w-4 rounded-full border-2 border-accent bg-surface dark:bg-surface-dark"
              >
                <span className="absolute inset-1 rounded-full bg-accent" />
              </motion.span>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="rounded-2xl border border-line bg-surface-2 p-5 shadow-card transition-colors hover:border-accent/35 dark:border-line-dark dark:bg-surface-dark-2"
              >
                <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                  {item.period}
                </span>
                <h3 className="mt-3 text-lg font-bold text-ink dark:text-ink-dark">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-accent-deep dark:text-accent-soft">
                  {item.school}
                </p>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
