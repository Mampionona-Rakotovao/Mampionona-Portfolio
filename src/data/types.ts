import type { IconType } from 'react-icons'

/** A single technical skill shown inside a category. */
export interface Skill {
  /** Short label, e.g. "React". */
  name: string
  /** 0-100 comfort level used by animated bars. */
  level: number
  /** Optional icon (react-icons). */
  icon?: IconType
}

/** A category grouping skills together. */
export interface SkillCategory {
  id: string
  label: string
  icon: IconType
  skills: Skill[]
}

/** One entry on the education timeline. */
export interface EducationItem {
  title: string
  period: string
  school: string
  description?: string
}

/** A project / professional experience card. */
export interface Project {
  id: string
  title: string
  subtitle: string
  period: string
  place: string
  description: string
  /** Technologies used — used to build the filter list. */
  tech: string[]
  /** Short label for the filter chip. */
  category: string
  highlight?: boolean
  /** Optional screenshot images for the project gallery. */
  images?: string[]
}

/** A social / contact link. */
export interface SocialLink {
  label: string
  url: string
  icon: IconType
}
