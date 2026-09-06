import { createContext } from 'react'

export type Lang = 'fr' | 'en'

export interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  setLang: (l: Lang) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'fr',
  toggleLang: () => {},
  setLang: () => {},
})