# Skolara Backend – API Pré-inscriptions

API REST Node.js pour la gestion des pré-inscriptions scolaires.

## 🛠️ Stack technique

| Technologie           | Rôle                             |
| --------------------- | -------------------------------- |
| **Node.js + Express** | Serveur HTTP et routage          |
| **TypeScript**        | Typage statique                  |
| **Prisma**            | ORM et migrations                |
| **PostgreSQL**        | Base de données                  |
| **Zod**               | Validation des données           |
| **Jest + Supertest**  | Tests unitaires et d'intégration |
| **Swagger UI**        | Documentation interactive        |

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
```

## ⚙️ Variables d'environnement

Créer un fichier `.env` à la racine du dossier `backend/` :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/skolara"
PORT=5000
NODE_ENV=development
```

## 🚀 Démarrage

```bash
# Mode développement (avec rechargement automatique)
npm run dev

# Build production
npm run build
npm start
```

Le serveur démarre sur `http://localhost:5000`.

## 📚 Documentation API

Une fois le serveur lancé, accédez à la documentation interactive Swagger :

👉 **http://localhost:5000/api-docs**

## 🔗 Endpoints

| Méthode  | URL                          | Description                  | Accès  |
| -------- | ---------------------------- | ---------------------------- | ------ |
| `POST`   | `/api/pre-registrations`     | Créer une pré-inscription    | Public |
| `GET`    | `/api/pre-registrations`     | Lister (pagination + filtre) | Admin  |
| `GET`    | `/api/pre-registrations/:id` | Détail par id                | Admin  |
| `PATCH`  | `/api/pre-registrations/:id` | Mettre à jour le statut      | Admin  |
| `DELETE` | `/api/pre-registrations/:id` | Supprimer                    | Admin  |
| `GET`    | `/api/grades`                | Lister les niveaux scolaires | Public |
| `GET`    | `/api/health`                | Vérification de santé        | Public |

### Paramètres de query (GET liste)

| Paramètre | Type     | Défaut | Description                                             |
| --------- | -------- | ------ | ------------------------------------------------------- |
| `page`    | `number` | `1`    | Numéro de page                                          |
| `limit`   | `number` | `10`   | Éléments par page (max 100)                             |
| `status`  | `string` | –      | Filtre : `PENDING`, `IN_REVIEW`, `ACCEPTED`, `REJECTED` |

## 📝 Exemples cURL

### Créer une pré-inscription

```bash
curl -X POST http://localhost:5000/api/pre-registrations \
  -H "Content-Type: application/json" \
  -d '{
    "childFirstName": "Amine",
    "childLastName": "Benali",
    "childDateOfBirth": "2018-05-15T00:00:00.000Z",
    "desiredGrade": "CP",
    "parentFullName": "Karim Benali",
    "parentEmail": "karim@example.com",
    "parentPhone": "+213555123456",
    "documentUrls": ["https://example.com/doc1.pdf"]
  }'
```

### Lister les pré-inscriptions

```bash
# Première page, 10 résultats
curl http://localhost:5000/api/pre-registrations

# Avec filtre par statut
curl "http://localhost:5000/api/pre-registrations?status=PENDING&page=1&limit=5"
```

### Détail d'une pré-inscription

```bash
curl http://localhost:5000/api/pre-registrations/1
```

### Mettre à jour le statut

```bash
curl -X PATCH http://localhost:5000/api/pre-registrations/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "ACCEPTED"}'
```

### Supprimer une pré-inscription

```bash
curl -X DELETE http://localhost:5000/api/pre-registrations/1
```

## 🧪 Tests

```bash
# Exécuter tous les tests
npm test

# Mode watch
npm run test:watch

# Avec couverture
npm run test:coverage
```

## 📁 Structure du projet

```
src/
├── config/
│   ├── env.ts                          ← Variables d'environnement (Zod)
│   └── swagger.ts                      ← Configuration Swagger/OpenAPI
├── prisma/
│   └── client.ts                       ← Instance Prisma singleton
├── modules/pre-registration/
│   ├── pre-registration.schema.ts      ← Schémas Zod (create, update, params)
│   ├── pre-registration.repository.ts  ← Queries Prisma (CRUD pur)
│   ├── pre-registration.service.ts     ← Logique métier
│   ├── pre-registration.controller.ts  ← Handlers Express
│   ├── pre-registration.routes.ts      ← Définition des routes
│   └── pre-registration.test.ts        ← Tests unit + intégration
├── modules/grade/
│   ├── grade.repository.ts             ← Queries Prisma pour les niveaux
│   ├── grade.service.ts                ← Logique métier
│   ├── grade.controller.ts             ← Handler Express
│   └── grade.routes.ts                 ← Définition des routes
├── middlewares/
│   ├── validate.ts                     ← Middleware Zod générique
│   └── errorHandler.ts                ← Handler global d'erreurs
├── app.ts                              ← Application Express
└── server.ts                           ← Point d'entrée
```

## 📋 Scripts npm

| Script                    | Description                     |
| ------------------------- | ------------------------------- |
| `npm run dev`             | Démarre en mode développement   |
| `npm run build`           | Compile TypeScript              |
| `npm start`               | Démarre la version compilée     |
| `npm test`                | Lance les tests Jest            |
| `npm run test:watch`      | Tests en mode watch             |
| `npm run test:coverage`   | Tests avec couverture           |
| `npm run prisma:generate` | Génère le client Prisma         |
| `npm run prisma:migrate`  | Applique les migrations         |
| `npm run prisma:studio`   | Ouvre Prisma Studio             |
| `npm run seed`            | Initialise les données (Grades) |
