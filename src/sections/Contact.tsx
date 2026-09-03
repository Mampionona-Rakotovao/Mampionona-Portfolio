import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import Section from '../components/Section'
import NetworkBackground from '../components/NetworkBackground'
import { profile, socials } from '../data/profile'

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string

const leftContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const leftItem = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const contactRows = [
  {
    icon: FiMail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: FiPhone,
    label: 'Téléphone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
  },
  { icon: FiMapPin, label: 'Localisation', value: profile.location },
] as const

type Status = 'idle' | 'sending' | 'sent'

/**
 * Contact — real contact details, social links and EmailJS-powered form.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      setStatus('idle')
      const e = err as { status?: number; text?: string; message?: string }
      console.error('EmailJS error:', e.status, e.text || e.message)
      alert(
        "Erreur lors de l'envoi. Veuillez réessayer.\n\n" +
          (e.text
            ? `Détail (${e.status}): ${e.text}`
            : 'Vérifiez que votre compte EmailJS est actif et le service Gmail connecté.'),
      )
    }
  }

  const inputClass =
    'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-mute/60 outline-none transition-all duration-200 focus:border-accent-soft focus:ring-2 focus:ring-accent-soft/40 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.08)] dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark'

  return (
    <Section
      id="contact"
      label="Contact"
      title="Travaillons ensemble"
      subtitle="Une question, un projet ou une opportunité de stage ? N’hésitez pas à me contacter."
      background={<NetworkBackground tone="accent" density="corner-bottom-left" />}
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(280px,340px)_1fr]">
        <motion.div
          variants={leftContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          <motion.p
            variants={leftItem}
            className="text-base leading-relaxed text-ink-mute dark:text-ink-dark-mute"
          >
            Je suis ouvert aux opportunités de stage et aux projets collaboratifs. Préférez-vous un
            échange direct ? Voici mes coordonnées et mes réseaux.
          </motion.p>

          <motion.ul variants={leftContainer} className="space-y-4">
            {contactRows.map((row) => {
              const Icon = row.icon
              const content = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-200 group-hover:scale-110">
                    <Icon aria-hidden className="text-lg" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-mute dark:text-ink-dark-mute">
                      {row.label}
                    </span>
                    <span className="block break-words text-sm font-semibold text-ink dark:text-ink-dark">
                      {row.value}
                    </span>
                  </span>
                </>
              )
              return (
                <motion.li key={row.label} variants={leftItem}>
                  {'href' in row && row.href ? (
                    <a
                      href={row.href}
                      className="group flex items-center gap-3 rounded-xl p-1 transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-3 rounded-xl p-1">{content}</div>
                  )}
                </motion.li>
              )
            })}
          </motion.ul>

          <motion.div variants={leftContainer} className="flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  variants={leftItem}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-lg text-ink-mute transition-colors duration-200 hover:border-accent-soft hover:bg-accent-soft/15 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-line-dark dark:text-ink-dark-mute"
                >
                  <Icon aria-hidden />
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="space-y-4 rounded-2xl border border-line bg-surface-2 p-6 shadow-card dark:border-line-dark dark:bg-surface-dark-2 sm:p-8"
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
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={status !== 'idle'}
            className="relative inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-card transition-colors duration-300 hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait sm:w-auto"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === 'idle' && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  <FiSend aria-hidden /> Envoyer
                </motion.span>
              )}
              {status === 'sending' && (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  Envoi en cours…
                </motion.span>
              )}
              {status === 'sent' && (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.35 }}
                    className="grid h-4 w-4 place-items-center rounded-full bg-white/20"
                  >
                    <FiCheck aria-hidden className="text-sm" />
                  </motion.span>
                  Message envoyé !
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </div>
    </Section>
  )
}
