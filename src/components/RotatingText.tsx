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

interface LetterToken {
  char: string
  color: 'accent' | 'gold'
}

/**
 * Tailwind classes for each semantic colour, with a light-mode default and a
 * `dark:` override — `accent`/`gold` (darker, better contrast on the light
 * cream background) in light mode, `accent-soft`/`hero-gold` (their brighter,
 * dark-mode-tuned counterparts) once `.dark` is active. Using a single fixed
 * accent regardless of theme was the reason the gold especially became
 * unreadable in light mode (`hero-gold` is a pale tan, meant to sit on a
 * near-black background).
 */
const COLOR_CLASSES: Record<LetterToken['color'], string> = {
  accent: 'text-accent dark:text-accent-soft',
  gold: 'text-gold dark:text-hero-gold',
}

/**
 * Flattens a label into an ordered list of letter tokens, each tagged with the
 * colour of the word it belongs to (last word gold, the rest accent), so the
 * per-letter animation can still respect the Hero's two-tone identity.
 */
function tokenizeLabel(label: string): LetterToken[] {
  const words = label.split(' ')
  const tokens: LetterToken[] = []

  words.forEach((word, wordIndex) => {
    const color: LetterToken['color'] = wordIndex === words.length - 1 ? 'gold' : 'accent'
    word.split('').forEach((char) => tokens.push({ char, color }))
    if (wordIndex !== words.length - 1) {
      tokens.push({ char: '\u00A0', color })
    }
  })

  return tokens
}

/** Static (non-animated) version used for the sizer and the reduced-motion fallback. */
function highlightLabel(label: string) {
  const parts = label.split(' ')
  return parts.map((word, i) =>
    i === parts.length - 1 ? (
      <span key={i} className={COLOR_CLASSES.gold}>
        {word}
      </span>
    ) : (
      <span key={i} className={COLOR_CLASSES.accent}>
        {word}
        {'\u00A0'}
      </span>
    ),
  )
}

// Each letter fades and rises into place, in order, left to right.
const letterVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
}

/**
 * Rotating role text — cycles through the given words. The outgoing word fades
 * out as a whole (fast), the incoming word reveals itself letter by letter,
 * left to right, via a Framer Motion stagger.
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

  const tokens = tokenizeLabel(current)

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
          // Outgoing word: quick fade of the whole block (handled by AnimatePresence exit).
          exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
          className="col-start-1 row-start-1 inline-block whitespace-nowrap"
        >
          <motion.span
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.035 } },
            }}
            className="inline-block"
          >
            {tokens.map((token, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`inline-block ${COLOR_CLASSES[token.color]}`}
              >
                {token.char}
              </motion.span>
            ))}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}