# 🎨 Skolara — Frontend

L'interface utilisateur de Skolara est conçue avec une approche "UI/UX Pro Max", privilégiant l'esthétique éditoriale, les interactions fluides et une architecture moderne sous Next.js 15 et React 19.

## 🚀 Technologies

- **Framework** : [Next.js 15 (App Router)](https://nextjs.org/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/) & [Remotion](https://www.remotion.dev/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Composants UI** : Système personnalisé et Aceternity Components
- **Icônes** : [Tabler Icons](https://tabler-icons.io/)
- **Runtime** : [Bun](https://bun.sh/)

## 💎 Points Forts du Design

### 🔹 Expérience Vidéo Interactive (Remotion)

Le portail de pré-inscription intègre une introduction vidéo dynamique générée par code.

- **Theme-Aware** : Adaptation automatique des couleurs au mode clair/sombre.
- **Dynamic Content** : Injection programmable de l'année et des labels.
- **Loop Infini** : Arrière-plan hexagonal ambient et typographie "désordre maîtrisé".

### 🔹 Le Mag Skolara (Blog)

Un blog éditorial premium structuré autour d'un système de **Tracing Beam**.

- **Lecture Guidée** : Un faisceau lumineux intelligent suit la progression du scroll de l'utilisateur.
- **Esthétique Magazine** : Large usage du Glassmorphism, de coins ultra-arrondis et d'une hiérarchie typographique forte via le composant `Typography`.

### 🔹 Formulaire de Pré-inscription Moderne

Un système multi-étapes sophistiqué pour l'acquisition d'élèves.

- **Validation Zod** : Gestion robuste des données et retours utilisateurs instantanés.
- **Transitions Fluides** : Passage d'étape animé avec Framer Motion.

### 🔹 Editorial School Presentation

Une section de présentation utilisant un **Peek Carousel** fluide et une galerie statique de haute qualité, alignée sur les standards du design "Agency".

### 🔹 Performance Dashboard (Key Figures)

Une section de chiffres clés interactive avec :

- **Compteurs Animés** : Les nombres s'animent lors du scroll.
- **Glassmorphism Panels** : Utilisation de flous d'arrière-plan et de bordures lumineuses.
- **Background "The Dark Horizon"** : Texture de grain premium et lueurs radiales asymétriques.

### 🔹 Système de Navigation

- **Sticky Navbar** : Une barre de navigation qui s'adapte et se réduit au scroll avec des effets de "Spotlight" suivant la souris.
- **ButtonBack** : Un composant de retour intelligent utilisant `ButtonReusable` avec effets laser.

## 🛠️ Développement

### Installation

```bash
bun install
```

### Serveur de développement

```bash
bun run dev
```

### Studio Vidéo (Remotion)

```bash
bun run video
```

### Build

```bash
bun run build
```

## 📂 Structure des Composants

- `app/` : Structure des pages (Home, Blog, Pre-registration).
- `components/layout/` : Sections majeures de la page (Hero, Presentation, Navbar, Footer).
- `components/ui/` : Atomes et molécules réutilisables (Button, Typography, TracingBeam, etc.).
- `components/remotion/` : Compositions vidéo et lecteurs.

---

_Ce projet suit les principes du design "UI/UX Pro Max" pour une expérience utilisateur sans compromis._
