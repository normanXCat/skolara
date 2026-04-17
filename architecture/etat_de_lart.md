# État de l'art — Site Web École
## Méthode BMAD avec Antigravity

**Version :** 1.0  
**Date :** Avril 2026  
**Stack :** Next.js · Node.js · Prisma · PostgreSQL · shadcn/ui  

---

## Table des matières

1. [Contexte et objectifs](#1-contexte-et-objectifs)
2. [Phase B — Business](#2-phase-b--business)
3. [Phase M — Modèle de données](#3-phase-m--modèle-de-données)
4. [Phase A — Architecture technique](#4-phase-a--architecture-technique)
5. [Phase D — Design système](#5-phase-d--design-système)
6. [Antigravity — Plan de sprints](#6-antigravity--plan-de-sprints)
7. [Risques et recommandations](#7-risques-et-recommandations)

---

## 1. Contexte et objectifs

### 1.1 Présentation du projet

Ce projet consiste à concevoir et développer un site web complet pour une école, couvrant à la fois un espace public (vitrine de l'établissement) et une plateforme de gestion scolaire interne (notes, absences, emplois du temps, paiements, communications).

### 1.2 Objectifs principaux

- Digitaliser la gestion administrative de l'école
- Offrir un portail numérique aux parents, élèves et enseignants
- Réduire les échanges papier (bulletins, convocations, factures)
- Améliorer la communication école–famille
- Assurer une traçabilité complète des données scolaires

### 1.3 Périmètre

| Domaine | Inclus | Exclu (v1) |
|---------|--------|------------|
| Gestion des élèves | Oui | Dossier médical |
| Notes et bulletins | Oui | Notation par compétences |
| Emplois du temps | Oui | Gestion des salles |
| Paiements | Oui | Intégration bancaire directe |
| Communication | Oui (messagerie interne) | Application mobile native |
| Site public | Oui | Portail alumni |

---

## 2. Phase B — Business

### 2.1 Personas

#### Administrateur (Directeur / Secrétaire)
- Gère les inscriptions, les classes, le personnel
- Génère les bulletins et les rapports
- Suit les paiements des frais de scolarité
- Accès complet à toutes les fonctionnalités

#### Enseignant
- Saisit les notes et appréciations
- Gère les absences de ses élèves
- Tient un cahier de texte numérique
- Consulte ses classes et son emploi du temps

#### Élève
- Consulte ses notes et bulletins
- Suit son emploi du temps
- Accède aux ressources pédagogiques
- Communique avec ses enseignants

#### Parent d'élève
- Consulte les notes et absences de son enfant
- Reçoit les notifications de l'école
- Effectue les paiements en ligne
- Communique avec les enseignants

#### Visiteur (public)
- Consulte les informations de l'école
- Soumet un dossier d'inscription
- Prend contact avec l'établissement

### 2.2 Cartographie fonctionnelle

#### Module public (visiteurs non connectés)
- Page d'accueil avec présentation de l'école
- Actualités et événements
- Calendrier scolaire public
- Galerie photos / vidéos
- Formulaire de pré-inscription
- Page de contact et localisation (Google Maps)
- FAQ

#### Module administration
- Tableau de bord avec indicateurs clés
- Gestion des élèves (CRUD, dossiers, classes)
- Gestion des enseignants et du personnel
- Gestion des classes et des niveaux scolaires
- Gestion des années académiques
- Emplois du temps (création, visualisation)
- Bulletins de notes (génération PDF)
- Suivi des paiements et frais de scolarité
- Statistiques et rapports exportables
- Gestion des actualités et du contenu public
- Configuration de l'établissement

#### Module enseignant
- Tableau de bord personnalisé
- Saisie des notes par matière et par classe
- Gestion des absences (justifiées / injustifiées)
- Cahier de texte numérique
- Messagerie interne
- Consultation de son emploi du temps
- Partage de ressources pédagogiques

#### Module élève / parent
- Tableau de bord avec résumé
- Consultation des notes et moyennes
- Téléchargement des bulletins PDF
- Emploi du temps personnel
- Suivi des absences
- Messagerie avec les enseignants
- Notifications (email, in-app)
- Historique des paiements

### 2.3 Analyse concurrentielle

| Solution | Points forts | Points faibles | Pertinence |
|----------|-------------|----------------|------------|
| Pronote | Complet, robuste | Coûteux, non personnalisable | Référence marché |
| EcoleDirecte | Interface moderne | Prix élevé | Bonne UX |
| OpenScolaris (open source) | Gratuit | Peu maintenu | Technique vieilli |
| Solution custom (ce projet) | Adapté, moderne, évolutif | Développement initial | Objectif cible |

---

## 3. Phase M — Modèle de données

### 3.1 Entités principales (Prisma Schema)

```prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  role         Role      @default(STUDENT)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  student      Student?
  teacher      Teacher?
}

enum Role {
  ADMIN
  TEACHER
  STUDENT
  PARENT
}

model School {
  id      String @id @default(uuid())
  name    String
  address String
  phone   String?
  logoUrl String?
}

model AcademicYear {
  id        String   @id @default(uuid())
  label     String
  startDate DateTime
  endDate   DateTime
  classes   Classe[]
}

model Classe {
  id             String       @id @default(uuid())
  name           String
  level          String
  academicYear   AcademicYear @relation(fields: [academicYearId], references: [id])
  academicYearId String
  mainTeacher    Teacher?     @relation(fields: [mainTeacherId], references: [id])
  mainTeacherId  String?
  students       Student[]
  subjects       Subject[]
}

model Student {
  id            String    @id @default(uuid())
  user          User      @relation(fields: [userId], references: [id])
  userId        String    @unique
  classe        Classe    @relation(fields: [classeId], references: [id])
  classeId      String
  firstName     String
  lastName      String
  birthDate     DateTime
  parentContact String?
  grades        Grade[]
  absences      Absence[]
  payments      Payment[]
}

model Teacher {
  id         String    @id @default(uuid())
  user       User      @relation(fields: [userId], references: [id])
  userId     String    @unique
  firstName  String
  lastName   String
  speciality String?
  subjects   Subject[]
  classes    Classe[]
}

model Subject {
  id        String  @id @default(uuid())
  name      String
  teacher   Teacher @relation(fields: [teacherId], references: [id])
  teacherId String
  classe    Classe  @relation(fields: [classeId], references: [id])
  classeId  String
  grades    Grade[]
}

model Grade {
  id        String   @id @default(uuid())
  value     Float
  maxValue  Float    @default(20)
  comment   String?
  student   Student  @relation(fields: [studentId], references: [id])
  studentId String
  subject   Subject  @relation(fields: [subjectId], references: [id])
  subjectId String
  gradedAt  DateTime @default(now())
  semester  Int      @default(1)
}

model Absence {
  id        String   @id @default(uuid())
  student   Student  @relation(fields: [studentId], references: [id])
  studentId String
  date      DateTime
  justified Boolean  @default(false)
  reason    String?
  createdAt DateTime @default(now())
}

model Payment {
  id        String        @id @default(uuid())
  student   Student       @relation(fields: [studentId], references: [id])
  studentId String
  amount    Float
  label     String
  paidAt    DateTime?
  status    PaymentStatus @default(PENDING)
  createdAt DateTime      @default(now())
}

enum PaymentStatus {
  PENDING
  PAID
  OVERDUE
  CANCELLED
}

model Post {
  id          String   @id @default(uuid())
  title       String
  content     String
  imageUrl    String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
}
```

### 3.2 Relations clés

- Un `User` peut être soit un `Student`, soit un `Teacher` (relation 1-1 optionnelle)
- Un `Student` appartient à une `Classe` dans une `AcademicYear`
- Un `Teacher` peut enseigner plusieurs `Subject` dans plusieurs `Classe`
- Les `Grade` relient un `Student` à un `Subject`
- Les `Absence` et `Payment` sont liés au `Student`

### 3.3 Indexation recommandée

```prisma
@@index([classeId])        // sur Student
@@index([studentId])       // sur Grade, Absence, Payment
@@index([teacherId])       // sur Subject
@@index([academicYearId])  // sur Classe
```

---

## 4. Phase A — Architecture technique

### 4.1 Stack technologique

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| Framework | Next.js 14+ (App Router) | SSR, API routes, performances |
| Runtime | Node.js 20 LTS | Stabilité, écosystème |
| ORM | Prisma 5 | Type-safe, migrations, studio |
| Base de données | PostgreSQL 16 | Robustesse, relations complexes |
| UI Components | shadcn/ui + Tailwind | Accessibilité, personnalisation |
| Auth | Auth.js v5 (NextAuth) | RBAC, sessions, providers |
| Email | Resend | API moderne, templates React |
| Upload | Cloudinary | CDN, transformations images |
| PDF | React-PDF ou Puppeteer | Génération bulletins |
| Déploiement | Vercel + Supabase (PG) | Scalabilité, facilité |

### 4.2 Structure du projet Next.js

```
/
├── app/
│   ├── (public)/              # Pages visiteurs (non authentifiées)
│   │   ├── page.tsx           # Accueil
│   │   ├── actualites/
│   │   ├── inscription/
│   │   └── contact/
│   ├── (auth)/                # Login / Register
│   │   ├── login/
│   │   └── register/
│   ├── (admin)/               # Dashboard administrateur
│   │   ├── dashboard/
│   │   ├── eleves/
│   │   ├── enseignants/
│   │   ├── classes/
│   │   ├── paiements/
│   │   └── parametres/
│   ├── (teacher)/             # Espace enseignant
│   │   ├── dashboard/
│   │   ├── notes/
│   │   ├── absences/
│   │   └── cahier/
│   └── (student)/             # Espace élève / parent
│       ├── dashboard/
│       ├── notes/
│       ├── bulletin/
│       └── messagerie/
├── components/
│   ├── ui/                    # shadcn components
│   ├── layout/                # Header, Sidebar, Footer
│   ├── forms/                 # Formulaires métier
│   ├── tables/                # DataTables réutilisables
│   └── charts/                # Graphiques (Recharts)
├── lib/
│   ├── prisma.ts              # Client Prisma singleton
│   ├── auth.ts                # Config Auth.js
│   ├── validations/           # Zod schemas
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── middleware.ts              # Protection des routes par rôle
```

### 4.3 Gestion des rôles (RBAC)

```typescript
// middleware.ts
import { auth } from "@/lib/auth"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const role = req.auth?.user?.role

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return Response.redirect(new URL("/login", req.url))
  }
  if (pathname.startsWith("/teacher") && role !== "TEACHER" && role !== "ADMIN") {
    return Response.redirect(new URL("/login", req.url))
  }
})
```

### 4.4 Décisions d'architecture

- **API Routes :** Utiliser les Route Handlers Next.js (`app/api/`) pour les opérations CRUD
- **Server Actions :** Pour les mutations de formulaires (création élève, saisie notes)
- **Caching :** React Cache + Next.js `revalidatePath` pour les données académiques
- **Validation :** Zod côté serveur et client (schémas partagés)
- **Erreurs :** Gestion centralisée avec Error Boundaries et toast notifications

---

## 5. Phase D — Design système

### 5.1 Palette de couleurs

| Usage | Couleur | Hex |
|-------|---------|-----|
| Primaire | Bleu école | `#1E40AF` |
| Secondaire | Vert succès | `#16A34A` |
| Avertissement | Amber | `#D97706` |
| Danger | Rouge | `#DC2626` |
| Neutre | Gris | `#6B7280` |
| Fond | Blanc cassé | `#F9FAFB` |

### 5.2 Composants shadcn clés

| Composant | Usage |
|-----------|-------|
| `DataTable` | Listes élèves, notes, absences, paiements |
| `Form` + `Input` + `Select` | Tous les formulaires de saisie |
| `Calendar` | Emploi du temps, absences |
| `Badge` | Statuts (Payé, Absent, Justifié, En retard) |
| `Dialog` / `Sheet` | Formulaires rapides, confirmations |
| `Card` | Widgets du tableau de bord |
| `Chart` (Recharts) | Courbes de notes, stats admin |
| `Tabs` | Navigation dans les profils élèves |
| `Avatar` | Photos de profil |
| `Command` | Recherche globale (⌘K) |

### 5.3 Écrans prioritaires à wireframer

1. Dashboard admin (vue d'ensemble KPIs)
2. Liste des élèves avec filtres
3. Fiche individuelle d'un élève (notes, absences, paiements)
4. Saisie de notes par l'enseignant
5. Emploi du temps hebdomadaire
6. Bulletin de notes (format imprimable / PDF)
7. Portail parent (vue enfant)

---

## 6. Antigravity — Plan de sprints

### Principe Antigravity

Antigravity est une approche itérative qui commence par le noyau dur (MVP) et enrichit le produit sprint après sprint, avec validation fonctionnelle à chaque étape.

### Roadmap des sprints

| Sprint | Durée | Objectif | Livrable |
|--------|-------|----------|----------|
| S1 | 1 sem | Fondations | Auth, rôles, layout, DB setup |
| S2 | 1 sem | Gestion de base | CRUD élèves, classes, enseignants |
| S3 | 1 sem | Évaluation | Saisie et consultation des notes |
| S4 | 1 sem | Présence | Absences + emploi du temps |
| S5 | 1 sem | Documents | Bulletins PDF + notifications email |
| S6 | 1 sem | Finance | Module paiements + historique |
| S7 | 1 sem | Site public | Vitrine, blog, formulaire inscription |
| S8 | 1 sem | Analytics | Dashboard stats, rapports export |
| S9 | 1 sem | Finitions | Tests, optimisations, déploiement prod |

### Sprint 1 — Détail (MVP fondations)

- Initialisation Next.js + Prisma + PostgreSQL
- Schéma de base (User, Role, School)
- Auth.js avec credentials provider
- Middleware de protection des routes
- Layout par rôle (sidebar admin / enseignant / élève)
- Page de login

### Critères de qualité transverses

- Tests unitaires sur les Server Actions critiques (notes, paiements)
- Validation Zod sur tous les formulaires
- Accessibilité WCAG AA (shadcn/ui en conformité)
- Responsive mobile (tablette pour les enseignants)
- Performance : LCP < 2.5s sur les pages publiques

---

## 7. Risques et recommandations

### 7.1 Risques identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Données sensibles élèves (RGPD) | Haute | Critique | Chiffrement, politique de confidentialité, consentement |
| Performance avec grande volumétrie | Moyenne | Haute | Pagination, indexation BDD, query optimization |
| Adoption par les enseignants | Haute | Haute | UX simple, formation, mode offline partiel |
| Génération PDF complexe | Moyenne | Moyenne | Tester React-PDF vs Puppeteer dès S5 |
| Dépassement de budget / délais | Moyenne | Haute | Prioriser MVP, report des features v2 |

### 7.2 Recommandations

- Commencer par un **seed de données réaliste** dès le Sprint 1 pour tester les écrans avec du contenu
- Mettre en place **Prisma Studio** en développement pour inspecter la base facilement
- Utiliser **Storybook** pour les composants UI partagés (optionnel mais recommandé)
- Prévoir une **sauvegarde automatique** PostgreSQL dès le premier déploiement
- Documenter l'API avec **Swagger / OpenAPI** si l'école envisage une app mobile future

---

*Document produit dans le cadre de la méthode BMAD + Antigravity — Version 1.0*
