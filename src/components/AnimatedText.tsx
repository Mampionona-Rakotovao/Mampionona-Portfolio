import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ComponentType } from 'react'

interface AnimatedTextProps {
  /** Tag used to render the text container (e.g. 'h1', 'p'). */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  /** Full, accessible text. Split into individual letters for animation. */
  text: string
  className?: string
  /** Seconds between each letter. Lower = faster, more subtle. */
  stagger?: number
  /** Adds a subtle 3D flip (rotateX) to each letter. Default false. */
  flip3D?: boolean
  /**
   * Animate each letter's colour from `from` to `to` while it appears,
   * creating a colour "wave" along the word. The letters end on `to`.
   */
  colorShift?: { from: string; to: string }
}

/**
 * Pre-declared motion components (created outside render to avoid resetting
 * state / react(static-components) warnings) mapped from the `as` tag.
 */
const MOTION_TAGS: Record<NonNullable<AnimatedTextProps['as']>, ComponentType<any>> = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
}

/**
 * Reveals a string letter by letter using Framer Motion.
 *
 * Why the split: each character is wrapped in a `<span aria-hidden>` so screen
 * readers don't read the text character by character, while a visually hidden
 * (`sr-only`) span keeps the full text accessible.
 *
 * The component deliberately does NOT set its own `initial`/`animate` — it
 * inherits them from the parent motion container, so the letters start exactly
 * when their slot is reached in the global stagger cascade (badge → name →
 * subtitle → …). Words are preserved (spaces kept as non-breaking) and text
 * wraps naturally with `text-balance`; we never break words.
 */
export default function AnimatedText({
  as = 'span',
  text,
  className = '',
  stagger = 0.025,
  flip3D = false,
  colorShift,
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion()

  const MotionTag = MOTION_TAGS[as]

  // Reduced motion: show the whole text at once, no letter-by-letter split.
  if (reduceMotion) {
    return <MotionTag className={className}>{text}</MotionTag>
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  }

  const letter: Variants = {
    hidden: {
      opacity: 0,
      y: flip3D ? 20 : 12,
      ...(flip3D ? { rotateX: -40 } : {}),
      // Start on the accent colour so it "washes in" towards the final colour.
      ...(colorShift ? { color: colorShift.from } : {}),
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      // Through-keyframes: accent → final, in sync with the existing movement.
      ...(colorShift ? { color: [colorShift.from, colorShift.to] } : {}),
      transition: { duration: flip3D ? 0.6 : 0.5, ease: 'easeOut' },
    },
  }

  return (
    <>
      <MotionTag
        variants={container}
        className={className}
        style={flip3D ? { perspective: 1000 } : undefined}
        aria-hidden="true"
      >
        {text.split(' ').map((word, i) => (
          <span key={i} className="inline-block whitespace-nowrap">
            {word.split('').map((char, j) => (
              <motion.span
                key={j}
                variants={letter}
                className="inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </motion.span>
            ))}
            {i < text.split(' ').length - 1 ? '\u00A0' : null}
          </span>
        ))}
      </MotionTag>
      <span className="sr-only">{text}</span>
    </>
  )
}
