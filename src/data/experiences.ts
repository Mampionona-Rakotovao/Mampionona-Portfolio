import type { Project } from './types'

/** Projects & professional experiences (most recent first). */
export const projects: Project[] = [
  {
    id: 'android-chanteurs',
    title: 'Application Android de gestion des chanteurs',
    subtitle: 'Kotlin · Jetpack Compose · SQLite',
    period: 'Juillet 2026',
    place: 'ENI Toliara',
    category: 'Mobile',
    tech: ['Kotlin', 'Jetpack Compose', 'SQLite'],
    description:
      'Application Android de gestion des chanteurs : architecture MVC, persistance SQLite, recherche multicritère, gestion de photos, tableau de bord statistiques et validation de formulaires.',
    highlight: true,
  },
  {
    id: 'avion-spring-kotlin',
    title: 'Application Android de gestion de voiture',
    subtitle: 'Spring Boot · Kotlin · PostgreSQL',
    period: 'Juin 2026',
    place: 'ENI Toliara',
    category: 'Mobile',
    tech: ['Spring Boot', 'Kotlin', 'PostgreSQL'],
    description:
      'Gestion CRUD des véhicules : API REST Spring Boot + PostgreSQL consommée depuis Kotlin, gestion d’images et tests fonctionnels.',
  },
  {
    id: 'billets-js',
    title: 'Réservation de billets d’avion — JS Fullstack',
    subtitle: 'React · Node · PostgreSQL',
    period: 'Avril–Mai 2026',
    place: 'ENI Toliara',
    category: 'Fullstack',
    tech: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    description:
      'Base PostgreSQL, API REST, gestion des réservations et paiements, authentification JWT, interface React, versionné avec Git/GitHub.',
    highlight: true,
  },
  {
    id: 'mobile-money-jsp',
    title: 'Gestion de Mobile Money avec JSP',
    subtitle: 'JSP · Servlets · SQL',
    period: 'Mars 2026',
    place: 'ENI Toliara',
    category: 'Web',
    tech: ['JSP', 'Servlets', 'SQL'],
    description:
      'Application web simulant dépôt / retrait / transfert d’argent : base de données relationnelle, requêtes SQL, interfaces JSP et validation des saisies.',
  },
  {
    id: 'carso',
    title: 'Stagiaire Développeur Full-Stack',
    subtitle: 'React · Laravel · PostgreSQL',
    period: 'Sept. – Nov. 2025',
    place: 'CARSO Toliara',
    category: 'Fullstack',
    tech: ['React', 'Laravel', 'PostgreSQL'],
    description:
      'Plateforme de gestion de formation et de coaching : développement backend/frontend, bases de données relationnelles, API REST, correction d’anomalies et travail avec Git/GitHub.',
    highlight: true,
  },
  {
    id: 'billets-csharp',
    title: 'Réservation de billets d’avion avec C#',
    subtitle: 'C# · .NET',
    period: 'Avril 2025',
    place: 'ENI Toliara',
    category: 'Desktop',
    tech: ['C#', '.NET'],
    description:
      'Gestion des vols, passagers et réservations avec opérations CRUD et amélioration de l’expérience utilisateur.',
  },
  {
    id: 'gestion-bancaire',
    title: 'Gestion bancaire avec Laravel',
    subtitle: 'Laravel · MVC',
    period: 'Mars 2025',
    place: 'ENI Toliara',
    category: 'Web',
    tech: ['Laravel'],
    description:
      'Gestion des comptes et transactions, opérations CRUD, en suivant l’architecture MVC de Laravel.',
  },
  {
    id: 'gestion-enseignants',
    title: 'Gestion des enseignants — ReactJS & ExpressJS',
    subtitle: 'React · Express.js',
    period: 'Mars 2025',
    place: 'ENI Toliara',
    category: 'Fullstack',
    tech: ['React', 'Express.js'],
    description:
      'API REST Express.js, interface React, opérations CRUD complètes, tests et corrections.',
  },
]

/** Unique technology tags extracted for the filter chips. */
export const projectCategories: string[] = [
  'Tout',
  'Fullstack',
  'Web',
  'Mobile',
  'Desktop',
]
