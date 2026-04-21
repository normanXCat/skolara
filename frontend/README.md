# 🎨 Skolara — Frontend

L'interface utilisateur de Skolara est conçue avec une approche "UI/UX Pro Max", privilégiant l'esthétique éditoriale, les interactions fluides et une architecture moderne sous Next.js 15 et React 19.

## 🚀 Technologies

- **Framework** : [Next.js 15 (App Router)](https://nextjs.org/)
- **State Management** : [Zustand](https://zustand-demo.pmnd.rs/) (Auth & Notifications)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/) & [Remotion](https://www.remotion.dev/)
- **Visualisation** : [Recharts](https://recharts.org/) (Tableaux de bord)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Icônes** : [Tabler Icons](https://tabler-icons.io/)
- **Runtime** : [Bun](https://bun.sh/)

## 💎 Points Forts du Design

### 🔹 Dashboard Administratif Premium

Une interface complète pour la gestion de l'école :

- **Statistiques en temps réel** : Graphiques interactifs (Recharts) avec animations fluides.
- **DataTables avancées** : Filtrage, pagination, export CSV et gestion des colonnes.
- **Glassmorphism Sidebar** : Navigation avec effets de "Laser Border" et "Sheen".
- **Responsive Design** : Expérience optimisée sur PC, tablette et mobile.

### 🔹 Expérience Vidéo Interactive (Remotion)

Le portail de pré-inscription intègre une introduction vidéo dynamique générée par code.

- **Theme-Aware** : Adaptation automatique des couleurs au mode clair/sombre.
- **Dynamic Content** : Injection programmable de l'année et des labels.

### 🔹 Résilience & UX

- **Network Status** : Détection en temps réel de l'état "Offline" ou des pannes serveur (500) avec overlay premium et toast de récupération automatique.
- **Modern Logic** : Refactorisation en Server Components pour l'optimisation SEO (Metadata) tout en isolant les interactions complexes dans des Client Components dédiés.
- **Auth Store** : Gestion centralisée de la session utilisateur via Zustand.

### 🔹 Formulaire de Pré-inscription Intelligent

Un système multi-étapes sophistiqué :

- **Data-Driven** : Les niveaux scolaires (Grades) sont récupérés dynamiquement depuis l'API.
- **Validation Zod** : Gestion robuste des données et retours utilisateurs instantanés.

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

## 📂 Structure du projet

- `app/` : Pages (Server Components pour le SEO).
- `components/admin/` : Modules spécifiques à l'administration (Students, Pre-registrations, Stats).
- `components/ui/` : Système de composants réutilisables (Typography, ButtonReusable, etc.).
- `stores/` : État global de l'application (Auth, Toast).
- `lib/` : Utilitaires (API Client, Helpers).

---

_Ce projet suit les principes du design "UI/UX Pro Max" pour une expérience utilisateur sans compromis._
