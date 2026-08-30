import {
  SiJavascript,
  SiTypescript,
  SiSharp,
  SiPhp,
  SiSqlite,
  SiSpringboot,
  SiReact,
  SiNestjs,
  SiExpress,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiLinux,
  SiKotlin,
} from 'react-icons/si'
import { TbCode, TbTable, TbTools, TbDatabase, TbLanguage, TbBox } from 'react-icons/tb'
import { VscVscode } from 'react-icons/vsc'
import { FaJava, FaFileExcel, FaPeopleGroup, FaClipboardCheck } from 'react-icons/fa6'
import { RiLungsLine } from 'react-icons/ri'
import type { IconType } from 'react-icons'
import type { SkillCategory } from './types'

/**
 * Technical skills organised by category.
 * `level` (0-100) drives the animated progress bars.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Langages',
    icon: TbCode,
    skills: [
      { name: 'Java', level: 85, icon: FaJava },
      { name: 'JavaScript', level: 80, icon: SiJavascript },
      { name: 'TypeScript', level: 75, icon: SiTypescript },
      { name: 'C#', level: 70, icon: SiSharp },
      { name: 'PHP', level: 60, icon: SiPhp },
      { name: 'SQL', level: 80, icon: SiSqlite },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    icon: TbBox,
    skills: [
      { name: 'Spring Boot', level: 80, icon: SiSpringboot },
      { name: 'React', level: 80, icon: SiReact },
      { name: 'NestJS', level: 70, icon: SiNestjs },
      { name: 'Express.js', level: 75, icon: SiExpress },
      { name: 'Laravel', level: 70, icon: SiLaravel },
      { name: 'JSP', level: 65 },
      { name: 'Kotlin / Compose', level: 70, icon: SiKotlin },
    ],
  },
  {
    id: 'databases',
    label: 'Bases de données',
    icon: TbDatabase,
    skills: [
      { name: 'PostgreSQL', level: 80, icon: SiPostgresql },
      { name: 'MySQL', level: 75, icon: SiMysql },
      { name: 'SQLite', level: 75, icon: SiSqlite },
    ],
  },
  {
    id: 'tools',
    label: 'Outils',
    icon: TbTools,
    skills: [
      { name: 'Git', level: 80, icon: SiGit },
      { name: 'GitHub', level: 80, icon: SiGithub },
      { name: 'Postman', level: 75, icon: SiPostman },
      { name: 'VS Code', level: 85, icon: VscVscode },
      { name: 'Android Studio', level: 75 },
      { name: 'Linux', level: 70, icon: SiLinux },
    ],
  },
  {
    id: 'office',
    label: 'Bureautique',
    icon: TbTable,
    skills: [
      { name: 'Excel', level: 75, icon: FaFileExcel },
      { name: 'Word', level: 80 },
    ],
  },
]

/** Soft skills shown as animated badges in the About section. */
export const softSkills: { name: string; icon: IconType }[] = [
  { name: 'Gestion de projet', icon: FaClipboardCheck },
  { name: 'Capacité d’adaptation', icon: RiLungsLine },
  { name: 'Bonne communication', icon: TbLanguage },
  { name: 'Esprit d’équipe', icon: FaPeopleGroup },
]

/** Personal strengths / qualities displayed on the About section. */
export const traits: string[] = [
  'Curieux',
  'Rigoureux',
  'Bon esprit d’équipe',
  'Passionné par le développement',
]
