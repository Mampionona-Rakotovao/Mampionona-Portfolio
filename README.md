# Portfolio — Mampionona Rakotovao

Portfolio web personnel, moderne et performant, réalisé avec **React 18 + TypeScript**, **Vite**, **Tailwind CSS** et **Framer Motion**.

Étudiant en Licence 3 Informatique à l’École Nationale d’Informatique de Fianarantsoa, développeur web & mobile.

## Palette — « Marina »

Palette sobre et professionnelle à base d’accents émeraude/teal avec une touche dorée (remplace le bleu/violet générique) :

| Rôle | Couleur (light) | Couleur (dark) |
| --- | --- | --- |
| Accent principal | `#0f766e` (émeraude profond) | teal clair |
| Accent secondaire | `#f59e0b` (doré) | `#fbbf24` |
| Fond | `#faf9f7` (crème) | `#0e1416` (charcoal) |
| Texte | `#1f2428` | `#e7ece9` |

Toutes les couleurs sont définies via les variables Tailwind `@theme` dans `src/index.css`.

## Fonctionnalités

- **Hero** : nom révélé lettre par lettre, effet typewriter sur les rôles, parallaxe sur la photo, CTA magnétiques.
- **À propos** : texte de présentation, atouts et langues animés.
- **Compétences** : grille de catégories avec barres de progression animées (stagger au scroll).
- **Formation** : timeline verticale dont la ligne se dessine progressivement au scroll.
- **Projets / Expériences** : cartes avec filtre par catégorie, effet tilt 3D au survol et modal de détail.
- **Contact** : formulaire (ouvre le client mail) + liens email/téléphone/réseaux.
- **Footer** minimaliste.

### Animations personnalisées

- Curseur personnalisé qui réagit au survol des éléments interactifs.
- Révélation de sections via `whileInView` / `useInView` + stagger children.
- Boutons **magnétiques** avec effet **ripple** au clic.
- Timeline avec ligne SVG/div animée (scaleY lié au scroll).
- Transition douce entre **dark/light mode** (transitions de couleurs CSS).
- Effet **typewriter** sur le titre du Hero.
- Cartes de projets en **tilt 3D** léger au mouvement de la souris.

## Structure du projet

```
portfolio/
├── public/
│   ├── favicon.svg          # favicon personnalisé
│   └── CV.pdf               # CV à remplacer par votre fichier
└── src/
    ├── components/          # composants réutilisables
    │   ├── CustomCursor.tsx
    │   ├── MagneticButton.tsx
    │   ├── Navbar.tsx
    │   ├── ProjectCard.tsx
    │   ├── Section.tsx
    │   ├── SkillBar.tsx
    │   ├── TiltCard.tsx
    │   └── Footer.tsx
    ├── data/                # toutes les données (type-checkées)
    │   ├── types.ts         # interfaces TS (Skill, Project, Education…)
    │   ├── profile.ts       # identité, réseaux, rôles
    │   ├── skills.ts        # compétences, atouts, traits
    │   ├── education.ts     # parcours académique
    │   └── experiences.ts   # projets & expériences
    ├── hooks/               # hooks personnalisés
    │   ├── useTheme.ts
    │   ├── useTypewriter.ts
    │   ├── useReveal.ts
    │   └── useScrollY.ts
    ├── sections/            # sections de la page
    │   ├── Hero.tsx
    │   ├── About.tsx
    │   ├── Skills.tsx
    │   ├── Education.tsx
    │   ├── Projects.tsx
    │   └── Contact.tsx
    ├── App.tsx
    ├── main.tsx
    └── index.css            # palette Tailwind + base
```

## Installation

```bash
npm install
npm run dev          # lance le serveur de dev sur http://localhost:5173
```

## Build de production

```bash
npm run build        # compile + bundle dans dist/
npm run preview      # prévisualise le build
npm run lint         # analyse statique (oxlint)
```

## Personnalisation

- **Données** : éditez les fichiers sous `src/data/` (expériences, compétences, formation, identité).
- **Photo de profil** : placez une image dans `src/assets/` puis passez-la via la prop `photo` du composant `Hero` dans `src/App.tsx`. Par défaut, un monogramme « MR » s’affiche.
- **CV** : remplacez `public/CV.pdf` par votre curriculum vitae.

## Déploiement (Vercel / Netlify)

Le projet est prêt pour un déploiement statique :

- **Vercel** : importez le dépôt, framework = Vite, build = `npm run build`, output = `dist`.
- **Netlify** : build = `npm run build`, publish directory = `dist`.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · react-icons

## Licence

Projet personnel — Razafindraimindra Mampionona Rakotovao.
# Mampionona-Portfolio
