import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor that follows the pointer on fine-pointer devices.
 * It grows and changes colour when hovering interactive elements.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  // Animated target positions.
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 900, damping: 60, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 900, damping: 60, mass: 0.4 })

  useEffect(() => {
    // Only track a real fine/pointer (mouse) cursor. On any touch or coarse
    // device (phones, tablets, touch laptops) we disable entirely so no
    // ghost/stuck dot is left behind in the DOM.
    const fine = window.matchMedia('(pointer: fine)')
    const hover = window.matchMedia('(hover: hover)')
    const coarse = window.matchMedia('(pointer: coarse)')

    const apply = () => {
      // Require a genuine mouse AND no touch in use.
      setEnabled(fine.matches && hover.matches && !coarse.matches)
    }
    apply()

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHovering(!!t.closest('a, button, [data-tilt]'))
    }
    const onTouch = () => {
      // A touch interaction at any time turns the custom cursor off to avoid
      // leaving a frozen circle behind after tap/scroll.
      setEnabled(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('touchstart', onTouch, { passive: true })

    const mqls = [fine, hover, coarse]
    mqls.forEach((m) => m.addEventListener('change', apply))

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('touchstart', onTouch)
      mqls.forEach((m) => m.removeEventListener('change', apply))
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5"
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 40,
            height: hovering ? 56 : 40,
            opacity: hovering ? 0.9 : 0.5,
            backgroundColor: hovering ? 'var(--color-accent)' : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="rounded-full border-2 border-accent"
        />
      </motion.div>
      {/* Core dot */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1"
      >
        <motion.div
          animate={{ scale: hovering ? 0.4 : 1 }}
          className="h-2 w-2 rounded-full bg-accent"
        />
      </motion.div>
    </>
  )
}
