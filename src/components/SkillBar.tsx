import { motion } from 'framer-motion'
import type { Skill } from '../data/types'
import { useReveal } from '../hooks/useReveal'

/**
 * A single skill row with an animated progress bar that fills when the bar
 * scrolls into view.
 */
export default function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const { ref, inView } = useReveal<HTMLDivElement>({ margin: '-40px' })
  const Icon = skill.icon

  return (
    <div ref={ref} className="grid gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 font-medium text-ink dark:text-ink-dark">
          {Icon && <Icon className="shrink-0 text-base text-accent" aria-hidden />}
          {skill.name}
        </span>
        <span className="font-mono text-xs tabular-nums text-ink-mute dark:text-ink-dark-mute">
          {skill.level}%
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-line dark:bg-line-dark"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.level}
        aria-label={`Niveau de compétence : ${skill.name} à ${skill.level}%`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.08, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-gold"
        />
      </div>
    </div>
  )
}
