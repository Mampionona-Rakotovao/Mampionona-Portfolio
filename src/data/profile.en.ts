import type { SocialLink } from './types'
import { SiGithub, SiGmail, SiFacebook, SiWhatsapp } from 'react-icons/si'

export const profileEn = {
  name: 'Razafindraimindra Mampionona Rakotovao',
  shortName: 'Mampionona Rakotovao',
  title: '3rd-year Computer Science Student',
  school: 'École Nationale d\'Informatique — Fianarantsoa',
  location: 'Toliara, Madagascar',
  address: 'Sanfily Toliara 601',
  city: 'Tuléar 601',
  birthDate: '21/01/2006',
  nationality: 'Malagasy',
  email: 'mampiononarakotovao06@gmail.com',
  phone: '+261 34 05 576 36',
  tagline:
    'Curious and rigorous developer, passionate about web, mobile, and database technologies.',
  roles: [
    'Web Developer',
    'Mobile Developer',
    'Computer Science Student',
    'Full-Stack Developer',
  ],
  languages: [
    { name: 'French', level: 'Fluent' },
    { name: 'English', level: 'Intermediate' },
  ],
  interests: ['Reading', 'Football', 'Basketball'],
  about: `Third-year Computer Science student at the École Nationale d'Informatique de Fianarantsoa, passionate about software development, web technologies, and databases. Curious, meticulous, and a strong team player, I aim to contribute to innovative projects while further developing my technical skills.`,
  resumeUrl: '/CV-Mampionona-Rakotova-Full-Stack.pdf',
  resumeFilename: 'CV_Razafindraimindra_Mampionona_Rakotovao.pdf',
} as const

export const socialsEn: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/Mampionona-Rakotovao', icon: SiGithub },
  { label: 'Facebook', url: 'https://www.facebook.com/rzfdmampionona.rakotovao/', icon: SiFacebook },
  { label: 'WhatsApp', url: 'https://wa.me/261340557636?text=Hello%20Mampionona%2C%20I%20am%20contacting%20you%20from%20your%20portfolio.', icon: SiWhatsapp },
  { label: 'Gmail', url: `mailto:mampiononarakotovao06@gmail.com`, icon: SiGmail },
]
