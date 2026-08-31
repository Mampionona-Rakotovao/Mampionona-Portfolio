import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'
import Section from '../components/Section'
import ProfileSidebar from '../components/ProfileSidebar'
import { profile, socials } from '../data/profile'

/**
 * Contact — CV sidebar + contact form with mailto fallback.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact portfolio — ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const inputClass =
    'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-mute/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark'

  return (
    <Section
      id="contact"
      label="Contact"
      title="Travaillons ensemble"
      subtitle="Une question, un projet ou une opportunité de stage ? N’hésitez pas à me contacter."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(280px,340px)_1fr]">
        <div className="space-y-6">
          <ProfileSidebar />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-3 lg:justify-start"
          >
            {socials.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.08, type: 'spring', stiffness: 300 }}
                  whileHover={{ y: -4, scale: 1.08 }}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-lg text-ink-mute transition-colors hover:border-accent hover:text-accent dark:border-line-dark dark:text-ink-dark-mute"
                >
                  <Icon aria-hidden />
                </motion.a>
              )
            })}
          </motion.div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="space-y-4 rounded-2xl border border-line bg-surface-2 p-6 shadow-card dark:border-line-dark dark:bg-surface-dark-2 sm:p-8"
        >
          <p className="text-sm leading-relaxed text-ink-mute dark:text-ink-dark-mute">
            Je suis ouvert aux opportunités de stage et aux projets collaboratifs. Remplissez le
            formulaire ci-dessous et je vous répondrai rapidement.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              required
              placeholder="Votre nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              aria-label="Votre nom"
            />
            <input
              type="email"
              required
              placeholder="Votre email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              aria-label="Votre email"
            />
          </div>
          <textarea
            required
            rows={6}
            placeholder="Votre message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClass}
            aria-label="Votre message"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-card transition-colors duration-300 hover:bg-accent-deep"
          >
            <FiSend aria-hidden /> {sent ? 'Message prêt dans votre client mail !' : 'Envoyer'}
          </motion.button>
        </motion.form>
      </div>
    </Section>
  )
}
