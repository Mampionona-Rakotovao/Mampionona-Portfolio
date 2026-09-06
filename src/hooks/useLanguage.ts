import { useCallback, useEffect, useState } from 'react'
import i18n from '../i18n'

type Lang = 'fr' | 'en'

const STORAGE_KEY = 'portfolio-lang'

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'fr'
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
  if (stored === 'fr' || stored === 'en') return stored
  const browserLang = navigator.language.slice(0, 2)
  if (browserLang === 'en') return 'en'
  return 'fr'
}

/**
 * Manages the active language (fr / en).
 * Syncs with i18next, persists in localStorage, and updates the `lang` attr
 * on `<html>`. Browser detection is used only on first load; once the user
 * makes an explicit choice, it is always respected.
 */
export function useLanguage() {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    i18n.changeLanguage(lang)
    document.documentElement.lang = lang
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const toggleLang = useCallback(() => {
    setLangState((l) => (l === 'fr' ? 'en' : 'fr'))
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
  }, [])

  return { lang, toggleLang, setLang }
}
