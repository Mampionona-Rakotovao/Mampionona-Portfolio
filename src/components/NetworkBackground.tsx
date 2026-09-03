import { useMemo, useEffect, useState, useRef } from 'react'

type Tone = 'accent' | 'gold'
type Density = 'corner-top-right' | 'corner-bottom-left' | 'even'

interface NetworkBackgroundProps {
  /** Total number of nodes (auto-reduced on small screens). */
  nodeCount?: number
  tone?: Tone
  /** Where the network concentrates. */
  density?: Density
  className?: string
}

/** Media query helper — desktop = lg breakpoint, same as Hero. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDesktop
}

interface Node {
  id: number
  x: number
  y: number
}

/**
 * Decorative "mesh / constellation" background — a network of fine triangles
 * drifting across the section. Rendered purely as SVG lines (no visible dots),
 * with color mapped to the design-system tokens in light/dark via `dark:`.
 *
 * Always `absolute inset-0`, `pointer-events-none`, `aria-hidden`, behind
 * content. The line layout is generated once (seeded) so it never jumps.
 */
export default function NetworkBackground({
  nodeCount = 30,
  tone = 'accent',
  density = 'corner-top-right',
  className = '',
}: NetworkBackgroundProps) {
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)
  const [ratio, setRatio] = useState(1) // conteneur width/height

  // Track the container's aspect ratio so the network keeps natural
  // proportions (untwisted) whether the section is wide (desktop) or tall
  // (mobile portrait), instead of being violently compressed by
  // preserveAspectRatio="none".
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setRatio(Math.max(0.1, el.clientWidth / Math.max(1, el.clientHeight)))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Fewer, larger-spaced nodes on small/tall screens so the mesh stays airy.
  const count = isDesktop ? nodeCount : Math.max(10, Math.round(nodeCount * 0.42))

  const vbH = Math.min(100, Math.round((100 / ratio) * 10) / 10)

  const { nodes, links } = useMemo(() => {
    // Seeded PRNG so the layout is stable across renders/reloads of a given
    // density — the network never "jumps" around.
    const seed = (density.charCodeAt(0) * 31 + nodeCount * 7) || 1337
    let s = seed
    const rand = () => {
      s = (s * 1664525 + 1013904223) % 4294967296
      return s / 4294967296
    }

    // Power curve (p>1) concentrates points toward a corner rather than
    // leaving them uniformly spread across the whole surface.
    const p = 1.6
    const bias: Record<Density, (u: number, v: number) => [number, number]> = {
      'corner-top-right': (u, v) => [1 - Math.pow(1 - u, p), Math.pow(v, p)],
      'corner-bottom-left': (u, v) => [Math.pow(u, p), 1 - Math.pow(1 - v, p)],
      even: (u, v) => [u, v],
    }

    const generated: Node[] = Array.from({ length: count }, (_, i) => {
      const [x, y] = bias[density](rand(), rand())
      return { id: i, x: x * 100, y: y * vbH }
    })

    // Connect each node to its 2-4 nearest neighbours (distance heuristic).
    const linksFor: Array<[number, number]> = []
    for (let i = 0; i < generated.length; i++) {
      const dists = generated
        .map((n, j) => ({ j, d: Math.hypot(n.x - generated[i].x, n.y - generated[i].y) }))
        .filter((e) => e.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2 + (i % 3)) // 2-4 nearest
      for (const e of dists) {
        if (i < e.j) linksFor.push([i, e.j]) // avoid duplicates
      }
    }

    return { nodes: generated, links: linksFor }
  }, [count, density, nodeCount, vbH])

  const lineCls = tone === 'gold' ? 'text-gold-soft/30 dark:text-gold-soft/55' : 'text-accent/30 dark:text-accent-soft/55'

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 100 ${vbH}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Links */}
        <g className={lineCls}>
          {links.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
