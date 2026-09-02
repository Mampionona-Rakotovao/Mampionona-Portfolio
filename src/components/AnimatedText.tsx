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
   * Optional accent colour for a brief "wave" that washes over each letter as
   * it appears. The real letter's resting colour always comes from
   * `className` (e.g. `text-ink dark:text-ink-dark`) — it is never set via
   * JS/Framer — so it's instantly correct for the active theme and can never
   * get "stuck" on a stale value after a theme toggle. The wave is a
   * decorative, identically-shaped copy of the letter, in `waveColor`,
   * absolutely positioned on top, that simply fades out.
   */
  waveColor?: string
}

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
 *
 * Colour handling (previous bug): an earlier version animated the letter's
 * *real* colour via Framer (`variants.show.color`) while also trying to force
 * it via a reactive `style` prop for theme changes. Framer directly writes
 * animated properties to the DOM outside of React's render cycle, so it kept
 * winning that fight — the name stayed stuck on whatever colour was computed
 * at the very first mount, regardless of theme. Now the real letter never has
 * its colour touched by JS at all; it just inherits `currentColor` from
 * `className`. The colour "wave" effect is purely decorative, via a
 * fading overlay copy — see `waveColor`.
 */
export default function AnimatedText({
  as = 'span',
  text,
  className = '',
  stagger = 0.025,
  flip3D = false,
  waveColor,
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

  // Real letter: opacity/position only, never colour.
  const letter: Variants = {
    hidden: {
      opacity: 0,
      y: flip3D ? 20 : 12,
      ...(flip3D ? { rotateX: -40 } : {}),
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: flip3D ? 0.6 : 0.5, ease: 'easeOut' },
    },
  }

  // Decorative wave overlay: starts fully opaque in `waveColor`, fades out
  // just after the real letter has appeared.
  const wave: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 0,
      transition: { duration: 0.45, ease: 'easeOut', delay: 0.05 },
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
              <span
                key={j}
                className="relative inline-block"
                style={flip3D ? { transformStyle: 'preserve-3d' } : undefined}
              >
                {/* Real letter — colour comes purely from the inherited className. */}
                <motion.span variants={letter} className="inline-block">
                  {char}
                </motion.span>

                {/* Decorative colour wave — never the source of truth for the
                    resting colour, purely a fading overlay. */}
                {waveColor && (
                  <motion.span
                    variants={wave}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 inline-block"
                    style={{ color: waveColor }}
                  >
                    {char}
                  </motion.span>
                )}
              </span>
            ))}
            {i < text.split(' ').length - 1 ? '\u00A0' : null}
          </span>
        ))}
      </MotionTag>
      <span className="sr-only">{text}</span>
    </>
  )
}