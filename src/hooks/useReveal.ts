import { useRef } from 'react'
import { useInView } from 'framer-motion'

type RevealOptions = { once?: boolean; margin?: string }

/**
 * Returns a ref + a boolean that flips to true once the element scrolls into
 * view. Handy for driving non-Framer animations, or use Framer's
 * whileInView which is equivalent for most cases.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, {
    once: options.once ?? true,
    margin: (options.margin ?? '-80px') as never,
  })
  return { ref, inView }
}
