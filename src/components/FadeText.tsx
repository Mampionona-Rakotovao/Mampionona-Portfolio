import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../hooks/useLang'

interface FadeTextProps {
  children: ReactNode
  className?: string
}

/**
 * Wraps translated text in a very short opacity fade whenever the active
 * language changes. `initial={false}` means it never animates on first mount
 * (so scroll-reveal animations keep full control), and the fade is disabled
 * entirely for users who prefer reduced motion. Use this for standalone
 * dynamic text that sits outside a parent variant reveal, or anywhere the
 * content should cross-fade on a language switch.
 */
export default function FadeText({ children, className = '' }: FadeTextProps) {
  const { lang } = useLang()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <span className={className}>{children}</span>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={lang}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={className}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  )
}