import { Suspense, useEffect, useRef, useState } from 'react'
import type { ComponentType, LazyExoticComponent, ReactNode } from 'react'
import { registerLazySection } from './sectionRegistry'

interface LazySectionProps {
  /** Section mount / scroll target (matches the navbar link ids). */
  id?: string
  /** React.lazy component to render once the section is near the viewport. */
  component: LazyExoticComponent<ComponentType<Record<string, never>>>
  /** Discreet placeholder shown while the chunk downloads (same bg as section). */
  fallback?: ReactNode
  /** How far below the viewport the section is preloaded before being visible. */
  preloadMargin?: string
}

/**
 * Code-splitting wrapper for below-the-fold sections.
 *
 * Renders nothing until the element enters the viewport within `preloadMargin`
 * (IntersectionObserver), then mounts the lazy component so the chunk is fetched
 * during idle scrolling — never blocking the initial paint. While the chunk
 * loads, an invisible fallback (a same-coloured block) keeps the layout stable,
 * and users with `prefers-reduced-motion` / JS off see content appear normally.
 *
 * The navbar can still jump to a section that is not mounted yet: navigation
 * force-mounts it via the registry and scrolls once it has rendered.
 */
export default function LazySection({
  id,
  component: Component,
  fallback = null,
  preloadMargin = '0px 0px 1000px 0px',
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          setMounted(true)
        }
      },
      { rootMargin: preloadMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [preloadMargin])

  useEffect(() => (id ? registerLazySection(id, () => setMounted(true)) : undefined), [id])

  return (
    <div ref={ref}>
      {mounted ? (
        <Suspense fallback={fallback}>
          <Component />
        </Suspense>
      ) : null}
    </div>
  )
}