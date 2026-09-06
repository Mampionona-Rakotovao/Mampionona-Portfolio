import { useCallback, useState } from 'react'
import { profile } from '../data/profile'
import i18n from '../i18n'

/**
 * Robust CV download.
 *
 * Fetches the PDF as a Blob then triggers a programmatic download with a clean
 * filename. This is more reliable than the bare HTML `download` attribute (which
 * is ignored when the server sends a `Content-Disposition: inline` header) and
 * gives us a readable, human filename instead of `CV.pdf`.
 */
export function useDownloadCV() {
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const download = useCallback(async () => {
    setDownloading(true)
    setError(null)
    try {
      const res = await fetch(profile.resumeUrl)
      if (!res.ok) throw new Error(i18n.t('cv.errorFetch', { status: res.status }))
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = profile.resumeFilename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : i18n.t('cv.errorGeneric'))
    } finally {
      setDownloading(false)
    }
  }, [])

  return { download, downloading, error }
}
