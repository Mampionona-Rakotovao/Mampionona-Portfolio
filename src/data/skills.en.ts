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
import { TbDatabase, TbCode, TbBox, TbTools } from 'react-icons/tb'
import { VscVscode } from 'react-icons/vsc'
import { FaJava, FaClipboardCheck, FaPeopleGroup } from 'react-icons/fa6'
import { RiLungsLine } from 'react-icons/ri'
import { TbLanguage } from 'react-icons/tb'
import type { IconType } from 'react-icons'
import type { SkillCategory } from './types'

export const skillCategoriesEn: SkillCategory[] = [
  {
    id: 'databases',
    label: 'Databases',
    icon: TbDatabase,
    skills: [
      { name: 'PostgreSQL', level: 80, icon: SiPostgresql },
      { name: 'MySQL', level: 75, icon: SiMysql },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
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
      { name: 'Kotlin', level: 70, icon: SiKotlin },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
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
]

export const softSkillsEn: { name: string; icon: IconType }[] = [
  { name: 'Project Management', icon: FaClipboardCheck },
  { name: 'Adaptability', icon: RiLungsLine },
  { name: 'Good Communication', icon: TbLanguage },
  { name: 'Teamwork', icon: FaPeopleGroup },
]
