import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageContext } from './LanguageContext'
import { useLanguage } from '../hooks/useLanguage'

function HeadUpdater() {
  const { i18n, t } = useTranslation()
  const lang = (i18n.language || 'fr').slice(0, 2)
  const active = lang === 'en' ? 'en' : 'fr'

  useEffect(() => {
    document.title = t('meta.title', { lng: active })
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t('meta.description', { lng: active }))
  }, [active, t])

  return null
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const value = useLanguage()
  return (
    <LanguageContext.Provider value={value}>
      <HeadUpdater />
      {children}
    </LanguageContext.Provider>
  )
}