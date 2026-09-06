import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'

const STORAGE_KEY = 'portfolio-lang'

/**
 * Locales are code-split: only the active language is fetched on startup, and
 * the other one is loaded via a dynamic `import()` the first time the user
 * actually switches language. `initImmediate: false` lets us await the init
 * promise in `main.tsx` so React renders with translations already loaded
 * (no Suspense flash of untranslated keys).
 */
export const initPromise = i18n
  .use(
    resourcesToBackend((language: string) => {
      const lng = language.slice(0, 2)
      if (lng === 'en') return import('./locales/en.json').then((m) => m.default)
      return import('./locales/fr.json').then((m) => m.default)
    }),
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['fr', 'en'],
    load: 'languageOnly',
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

export default i18n