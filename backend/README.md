# Skolara Backend – API École & Pré-inscriptions

API REST Node.js robuste pour la gestion complète d'un établissement scolaire (pré-inscriptions, élèves, statistiques, authentification).

## 🛠️ Stack technique

| Technologie           | Rôle                       |
| --------------------- | -------------------------- |
| **Node.js + Express** | Serveur HTTP et routage    |
| **TypeScript**        | Typage statique            |
| **Prisma**            | ORM et migrations          |
| **PostgreSQL**        | Base de données            |
| **JWT + Cookies**     | Authentification sécurisée |
| **Zod**               | Validation des données     |
| **Swagger UI**        | Documentation interactive  |

## 📦 Installation

```bash
# Cloner le projet
cd backend

# Installer les dépendances
npm install

# Générer le client Prisma
npm run prisma:generate

# Créer la base de données et appliquer les migrations
npm run prisma:migrate

# Initialiser les données de base et lancer le scraper (récupération réelle du calendrier scolaire et des actualités)
bun run seed
```

**Note sur le scraping** : Le script de seed utilise Playwright pour récupérer des données réelles depuis le Ministère de l'Éducation. Assurez-vous d'avoir installé les navigateurs Playwright si ce n'est pas déjà fait :
```bash
npx playwright install chromium
```

## ⚙️ Variables d'environnement

Créer un fichier `.env` à la racine du dossier `backend/` :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/skolara"
PORT=8000
NODE_ENV=development
JWT_SECRET="votre_secret_jwt"
FRONTEND_URL="http://localhost:3000"
```

## 🚀 Démarrage

```bash
# Mode développement (avec rechargement automatique)
npm run dev

# Build production
npm run build
npm start
```

Le serveur démarre sur `http://localhost:8000`.

## 📚 Documentation API

Accédez à la documentation interactive Swagger pour tester les endpoints :

👉 **http://localhost:8000/api-docs**

## 🔗 Modules Principaux

### 🔑 Authentification & Sécurité (`/api/auth`)

- **Rotation Atomique** : Système de rafraîchissement de tokens avec révocation immédiate et émission d'un nouveau couple.
- **Gestion des Race Conditions** : Implémentation d'une "Grace Period" (période de grâce) permettant de gérer les requêtes parallèles sans déconnecter l'utilisateur.
- **Cookies Sécurisés** : Utilisation de HttpOnly, Secure, et SameSite pour prévenir les attaques XSS et CSRF.
- **Récupération du profil** : Endpoint `/me` pour l'initialisation de l'état client.

### 🎓 Niveaux scolaires (`/api/grades`)

- Liste des niveaux disponibles pour les inscriptions.

### 📝 Pré-inscriptions (`/api/pre-registrations`)

- Création publique de dossiers.
- Suivi et validation par l'administration.

### 🛡️ Administration (`/api/admin`)

- **Tableau de Bord** : Statistiques en temps réel.
- **Gestion des Élèves** : CRUD complet, changement de statut, export CSV.
- **Conversion** : Transformer une pré-inscription validée en compte élève officiel d'un clic.

## 📁 Structure du projet

```
src/
├── config/             ← Configurations (Env, Swagger)
├── middlewares/        ← Auth, Error Handler, Validation
├── modules/
│   ├── auth/           ← Gestion JWT et Sessions
│   ├── admin/          ← Business logic administrative
│   │   ├── stats/
│   │   ├── students/
│   │   └── pre-registration/
│   ├── pre-registration/ ← Acquisition publique
│   └── grade/          ← Référentiels
├── app.ts              ← Configuration Express
└── server.ts           ← Bootstrap
```

## 📋 Scripts npm

| Script                  | Description                               |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Démarre en mode développement             |
| `npm run build`         | Compile TypeScript pour la production     |
| `npm start`             | Démarre la version compilée               |
| `npm test`              | Lance la suite de tests                   |
| `npm run prisma:studio` | Interface visuelle pour la BDD            |
| `bun run seed`            | Remplit la BDD et lance les scrapers Web  |
