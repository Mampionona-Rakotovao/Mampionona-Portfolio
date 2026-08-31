import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface RotatingTextProps {
  /** Words / roles to cycle through. First item is the reduced-motion default. */
  words: readonly string[]
  /** How long each word stays visible, in ms. Default 2500. */
  interval?: number
  /** Extra classes for the container. */
  className?: string
}

/**
 * Highlights the last word in gold and the rest in the accent colour, preserving
 * the Hero's two-tone identity for the subtitle.
 */
function highlightLabel(label: string) {
  const parts = label.split(' ')
  return parts.map((word, i) =>
    i === parts.length - 1 ? (
      <span key={i} className="text-hero-gold">
        {word}
      </span>
    ) : (
      <span key={i} className="text-accent-soft">
        {word}
        {'\u00A0'}
      </span>
    ),
  )
}

/**
 * Rotating role text — a "slot machine" that cycles through the given words.
 *
 * The container is an `inline-grid` where every word (including an invisible
 * sizer copy) is placed on the same grid cell. This keeps the layout width
 * stable (driven by the widest word) so the content below never jumps, whatever
 * the length of the current word.
 *
 * Accessibility: the animated element is `aria-hidden`, and the full list is
 * exposed once to screen readers via `sr-only` (no repetitive announcements).
 * Reduced motion renders a single fixed role instead of rotating.
 */
export default function RotatingText({
  words,
  interval = 2500,
  className = '',
}: RotatingTextProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion || words.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval, reduceMotion])

  const current = words[index % words.length]

  if (reduceMotion || words.length < 2) {
    return (
      <span className={`inline-block whitespace-nowrap ${className}`}>
        {highlightLabel(words[0])}
      </span>
    )
  }

  return (
    <span className={`inline-grid overflow-hidden align-bottom ${className}`}>
      {/* Full list exposed once for screen readers (the animated copy is aria-hidden). */}
      <span className="sr-only">{words.join(', ')}</span>

      {/* Invisible sizer: keeps the column as wide as the widest word. */}
      {words.map((word) => (
        <span key={word} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {word}
        </span>
      ))}

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          aria-hidden="true"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="col-start-1 row-start-1 inline-block whitespace-nowrap"
        >
          {highlightLabel(current)}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
