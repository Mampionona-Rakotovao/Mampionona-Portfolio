import { useTranslation } from 'react-i18next'
import { profile } from '../data/profile'

/** Minimal footer with copyright and a back-to-top link. */
export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-line bg-surface-2 py-8 dark:border-line-dark dark:bg-surface-dark-2">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-ink-mute dark:text-ink-dark-mute sm:flex-row sm:px-10">
        <p>
          © {new Date().getFullYear()} {profile.shortName}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-semibold text-accent transition-opacity hover:opacity-80"
        >
          {t('footer.backToTop')}
        </button>
      </div>
    </footer>
  )
}