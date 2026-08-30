import type { SocialLink } from './types'
import { SiGithub, SiGmail } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'

/** Central identity / profile data reused across sections. */
export const profile = {
  name: 'Razafindraimindra Mampionona Rakotovao',
  shortName: 'Mampionona Rakotovao',
  title: 'Étudiant en Licence 3 Informatique',
  school: 'École Nationale d’Informatique — Fianarantsoa',
  location: 'Toliara, Madagascar',
  email: 'mampiononarakotovao06@gmail.com',
  phone: '+261 32 95 398 03',
  tagline:
    'Développeur curieux et rigoureux, passionné de technologies web, mobile et de bases de données.',
  roles: [
    'Développeur Web',
    'Développeur Mobile',
    'Étudiant en Informatique',
    'Full-Stack Developer',
  ],
  languages: [
    { name: 'Malgache', level: 'Natale' },
    { name: 'Français', level: 'Courant' },
    { name: 'Anglais', level: 'Intermédiaire' },
  ],
  about: `Étudiant en troisième année de Licence en Informatique, passionné par le développement
    logiciel, les technologies web et les bases de données. Curieux, rigoureux et doté d'un bon
    esprit d'équipe, je souhaite contribuer à des projets innovants tout en développant mes
    compétences techniques.`,
  resumeUrl: '/CV.pdf',
} as const

/** Social links — extend later if needed. */
export const socials: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/', icon: SiGithub },
  { label: 'LinkedIn', url: 'https://linkedin.com/', icon: FaLinkedin },
  { label: 'Gmail', url: `mailto:${profile.email}`, icon: SiGmail },
]
