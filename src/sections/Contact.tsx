import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Section from '../components/Section'
import { profile, socials } from '../data/profile'

/**
 * Contact — a form that opens the default mail client via a mailto link
 * plus direct email / phone / social links.
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
      subtitle="Une question, un projet, une opportunité ? Écrivez-moi, je réponds rapidement."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-6"
        >
          <p className="text-base leading-relaxed text-ink-mute dark:text-ink-dark-mute">
            Je suis ouvert aux opportunités de stage et aux projets collaboratifs. N’hésitez pas à
            me contacter pour discuter de vos idées.
          </p>

          <ul className="space-y-4">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 text-ink-mute transition-colors hover:text-accent dark:text-ink-dark-mute"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-xl text-accent transition-transform group-hover:scale-110">
                  <FiMail aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">Email</p>
                  <p className="text-sm font-medium">{profile.email}</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="group flex items-center gap-4 text-ink-mute transition-colors hover:text-accent dark:text-ink-dark-mute"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-xl text-accent transition-transform group-hover:scale-110">
                  <FiPhone aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">Téléphone</p>
                  <p className="text-sm font-medium">{profile.phone}</p>
                </div>
              </a>
            </li>
            <li className="flex items-center gap-4 text-ink-mute dark:text-ink-dark-mute">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-xl text-accent">
                <FiMapPin aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Localisation</p>
                <p className="text-sm font-medium">{profile.location}</p>
              </div>
            </li>
          </ul>

          <div className="flex gap-3 pt-2">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-lg text-ink-mute transition-all hover:-translate-y-1 hover:border-accent hover:text-accent dark:border-line-dark dark:text-ink-dark-mute"
                >
                  <Icon aria-hidden />
                </a>
              )
            })}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-4"
        >
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
          <button
            type="submit"
            className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-card transition-colors duration-300 hover:bg-accent-deep"
          >
            <FiSend aria-hidden /> {sent ? 'Message prêt dans votre client mail !' : 'Envoyer'}
          </button>
        </motion.form>
      </div>
    </Section>
  )
}
