import type { SocialLink } from './types'
import { SiGithub, SiGmail, SiFacebook, SiWhatsapp } from 'react-icons/si'

/** Central identity / profile data reused across sections. */
export const profile = {
  name: 'Razafindraimindra Mampionona Rakotovao',
  shortName: 'Mampionona Rakotovao',
  title: 'Étudiant en Licence 3 Informatique',
  school: 'École Nationale d’Informatique — Fianarantsoa',
  location: 'Toliara, Madagascar',
  address: 'Sanfily Toliara 601',
  city: 'Tuléar 601',
  birthDate: '21/01/2006',
  nationality: 'Malgache',
  email: 'mampiononarakotovao06@gmail.com',
  phone: '+261 34 05 576 36',
  tagline:
    'Développeur curieux et rigoureux, passionné de technologies web, mobile et de bases de données.',
  roles: [
    'Développeur Web',
    'Développeur Mobile',
    'Étudiant en Informatique',
    'Full-Stack Developer',
  ],
  languages: [
    { name: 'Français', level: 'Courant' },
    { name: 'Anglais', level: 'Intermédiaire' },
  ],
  interests: ['Lecture', 'Football', 'Basket-ball'],
  about: `Étudiant en troisième année de Licence en Informatique à l'École Nationale d'Informatique de Fianarantsoa, passionné par le développement logiciel, les technologies web et les bases de données. Curieux, rigoureux et doté d'un bon esprit d'équipe, je souhaite contribuer à des projets innovants tout en développant mes compétences techniques.`,
  resumeUrl: '/CV.pdf',
  resumeFilename: 'CV_Razafindraimindra_Mampionona_Rakotovao.pdf',
} as const

/** Social links — extend later if needed. */
export const socials: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/Mampionona-Rakotovao', icon: SiGithub },
  { label: 'Facebook', url: 'https://www.facebook.com/rzfdmampionona.rakotovao/', icon: SiFacebook },
  { label: 'WhatsApp', url: 'https://wa.me/261340557636?text=Bonjour%20Mampionona%2C%20je%20vous%20contacte%20depuis%20votre%20portfolio.', icon: SiWhatsapp },
  { label: 'Gmail', url: `mailto:${profile.email}`, icon: SiGmail },
]
