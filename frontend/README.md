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

### 🔹 Dashboard Administratif "Next-Gen"

Une interface complète pour la gestion de l'école :

- **Statistiques en temps réel** : Graphiques interactifs (Recharts) avec animations fluides.
- **DataTables avancées** : Filtrage, pagination, export CSV et gestion dynamique des colonnes.
- **Glassmorphism Sidebar** : Navigation intelligente avec effets de "Laser Border", "Sheen" et support des routes dynamiques (parent-active state).
- **Standard Visuel** : Utilisation systématique de `rounded-3xl` et du système typographique personnalisé.

### 🔹 Module de Pré-inscription Avancé

Refactorisation complète pour une maintenance simplifiée :

- **Architecture Modulaire** : Isolation des composants `Header`, `Info`, `Documents`, `Timeline` et `AdminNote`.
- **Server/Client Hybrid** : Optimisation SEO via Server Components (Metadata) et réactivité via Client Components.
- **Gestion Administrative** : Note interne via le nouveau `TextareaReusable`, historique de traitement et conversion "One-Click" en compte élève.
- **ConfirmDialog Premium** : Modales de confirmation adaptatives (Theme-aware) avec iconographie riche.

### 🔹 Expérience Vidéo Interactive (Remotion)

Le portail de pré-inscription intègre une introduction vidéo dynamique générée par code.

- **Theme-Aware** : Adaptation automatique des couleurs au mode clair/sombre.
- **Dynamic Content** : Injection programmable de l'année et des étiquettes scolaires.

### 🔹 Résilience & UX

- **Network Status** : Détection en temps réel de l'état "Offline" ou des pannes serveur avec overlay premium.
- **Premium Loading** : Skeleton Loaders sur-mesure pour chaque section, garantissant une perception de vitesse accrue.
- **Auth Store** : Gestion robuste des sessions avec files d'attente de rafraîchissement de tokens.

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
