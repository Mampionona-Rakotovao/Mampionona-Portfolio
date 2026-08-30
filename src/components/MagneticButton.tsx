import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  ariaLabel?: string
  onClick?: () => void
  /** Magnetic pull strength. */
  strength?: number
  variant?: 'primary' | 'ghost'
}

/**
 * A button/link that is pulled toward the cursor on hover (magnetic)
 * and emits a small ripple on click.
 */
export default function MagneticButton({
  children,
  className = '',
  href,
  ariaLabel,
  onClick,
  strength = 0.35,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * strength,
      y: (e.clientY - (rect.top + rect.height / 2)) * strength,
    })
  }

  const handleLeave = () => setPos({ x: 0, y: 0 })

  const handleClick = (e: React.MouseEvent) => {
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      const id = Date.now()
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
      setTimeout(() => setRipples((r) => r.filter((rip) => rip.id !== id)), 600)
    }
    onClick?.()
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300'
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-deep shadow-card',
    ghost: 'border border-line text-ink hover:border-accent hover:text-accent dark:border-line-dark dark:text-ink-dark',
  }

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.4 }}
      className="inline-block"
    >
      <Tag
        ref={ref as never}
        href={href}
        aria-label={ariaLabel}
        onClick={handleClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
            style={{ left: r.x, top: r.y, animation: 'ripple 0.6s ease-out forwards' }}
          />
        ))}
        {children}
      </Tag>
    </motion.div>
  )
}
