import { forceMountAllLazySections } from '../components/sectionRegistry'

const SCROLL_TIMEOUT = 5000
const POLL_INTERVAL = 50

function waitForElement(id: string): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const start = Date.now()
    const timer = window.setInterval(() => {
      const el = document.getElementById(id)
      if (el) {
        window.clearInterval(timer)
        resolve(el)
      } else if (Date.now() - start > SCROLL_TIMEOUT) {
        window.clearInterval(timer)
        resolve(null)
      }
    }, POLL_INTERVAL)
  })
}

/**
 * Smoothly scrolls to a section. Sections below the fold are code-split and may
 * not be mounted yet; in that case we force-mount every lazy section first so
 * the page reaches its final height, then scroll once the target has rendered.
 */
export async function scrollToSection(id: string) {
  const existing = document.getElementById(id)
  if (existing) {
    existing.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  forceMountAllLazySections()
  const el = await waitForElement(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}