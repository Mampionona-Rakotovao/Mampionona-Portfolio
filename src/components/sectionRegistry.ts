/**
 * Tracks lazy sections so the navbar can force-mount a section that the user
 * jumps to before it has been loaded by scroll proximity.
 *
 * A `LazySection` registers two callbacks: one is the `forceMount` that flips
 * its internal state (causing the React.lazy chunk to load), and the other is
 * the `onMounted` hook invoked once the section has actually rendered.
 */
const forceMounters = new Map<string, () => void>()

export function registerLazySection(id: string, forceMount: () => void): () => void {
  forceMounters.set(id, forceMount)
  return () => {
    forceMounters.delete(id)
  }
}

export function forceMountSection(id: string) {
  forceMounters.get(id)?.()
}

export function forceMountAllLazySections() {
  forceMounters.forEach((force) => force())
}