# 🎓 Skolara

**Skolara** est une plateforme de gestion scolaire moderne conçue pour offrir une expérience utilisateur premium (UI/UX Pro Max). Elle allie esthétique éditoriale, performances de pointe et fonctionnalités intuitives pour les établissements scolaires et préscolaires.

## ✨ Caractéristiques Principales

### 🏠 Interface Utilisateur Premium (UI/UX Pro Max)

- **Design System Avancé** : Utilisation intensive du Glassmorphism, de typographies hiérarchisées et de micro-interactions fluides (`rounded-3xl` standard).
- **Hero Section Dynamique** : Navigation intelligente, Spotlight effects et mise en page éditoriale.
- **Admin Dashboard "Next-Gen"** : Statistiques interactives, DataTables avancées avec gestion de colonnes et export automatique.
- **Registre des Notes & Absences** : Suivi global des performances académiques et de la présence des élèves par l'administration.
- **Traitement des Pré-inscriptions** : Module complet de gestion des dossiers avec timeline d'historique, notes internes et signature de documents.
- **Expérience de Chargement** : Système de Skeleton Loaders premium synchronisés avec la structure finale des pages.
- **Adaptativité Totale** : Support complet du mode clair/sombre avec overlays et composants auto-adaptatifs.

### 🛠️ Architecture Technique

- **Frontend** : Next.js 15, React 19, TypeScript.
- **Styling** : Tailwind CSS avec un système de design personnalisé.
- **Animations** : Framer Motion pour des transitions et des effets de scroll "Agency-grade".
- **Backend** : Node.js, Express, Prisma, PostgreSQL.
- **Runtime** : Bun pour une exécution ultra-rapide.

## 🏠 Homepage Sections
- **Hero Section**: Entrée immersive avec grille dynamique et call-to-action.
- **School Presentation**: Mise en avant des atouts et galerie interactive.
- **Key Figures**: Indicateurs de performance avec compteurs animés.
- **School Levels**: Présentation des cycles (Maternelle, Primaire, Collège, Lycée).
- **School Values**: Nos piliers fondamentaux avec layout alterné.
- **Recent News**: Les 3 derniers articles du mag, synchronisés en temps réel.
- **Testimonials**: Retours d'expérience via un carousel premium.
- **Photo Gallery**: Immersion visuelle style bento-grid.
- **Partners**: Logos des partenaires avec défilement infini.
- **Call To Action**: Conversion finale vers la pré-inscription.

## 🛠️ Tech Stack & Librairies
- **Core**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui, Radix UI
- **Animations**: Framer Motion, GSAP (optionnel)
- **Charts**: Recharts
- **Icons**: Tabler Icons (@tabler/icons-react), Lucide React
- **Utils**: zod, clsx, tailwind-merge, date-fns, lodash
- **Backend-only**: Express, Prisma ORM, Swagger-JSDoc

## 📄 Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

### Backend (`backend/.env`)
```env
PORT=8000
DATABASE_URL="postgresql://user:password@localhost:5432/skolara"
JWT_SECRET="votre_secret_jwt"
JWT_REFRESH_SECRET="votre_secret_refresh"
EMAIL_FROM="contact@skolara.com"
EMAIL_PASSWORD="votre_mot_de_passe_email"
FRONTEND_URL="http://localhost:3000"
```

## 🚀 Scripts Disponibles

| Script | Description |
| :-- | :-- |
| `bun dev` | Lancement du serveur de développement |
| `bun build` | Compilation pour la production |
| `bun start` | Lancement de l'application compilée |
| `bun lint` | Analyse statique du code (ESLint) |

### Backend (Seeding & Scraping)
La base de données inclut un pipeline de **Scraping** automatisé utilisant **Playwright** pour générer les données (actualités, calendrier) en s'appuyant sur des bases de données réelles (sources gourvernementales) :
```bash
cd backend
npx playwright install chromium
bun run seed
```

## 📚 Documentation API
La documentation interactive de l'API (Swagger UI) est disponible sur (avec le backend en marche) :  
👉 **http://localhost:8000/api-docs**

---

_Développé avec passion pour l'excellence éducative._
