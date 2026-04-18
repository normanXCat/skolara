# 🔐 Authentification Skolara

## Stratégie d'authentification

Skolara utilise une architecture **Access Token + Refresh Token** avec les principes suivants :

| Token             | Stockage                                     | Durée   | Renouvellement          |
| ----------------- | -------------------------------------------- | ------- | ----------------------- |
| **Access Token**  | Mémoire JS (`sessionStorage`)                | 15 min  | Via `/api/auth/refresh` |
| **Refresh Token** | Cookie `HttpOnly + Secure + SameSite=Strict` | 7 jours | Rotation automatique    |

### Pourquoi ce choix ?

- **Access Token en mémoire** : Inaccessible aux scripts XSS, ne persiste pas entre les onglets (sécurité maximale).
- **Refresh Token en HttpOnly cookie** : Invisible au JavaScript côté client, envoyé automatiquement par le navigateur.
- **Rotation des refresh tokens** : À chaque `/refresh`, l'ancien token est révoqué et un nouveau est émis (mitigation du vol de token).
- **Bcrypt 12 rounds** : Hash résistant aux attaques brute-force.

---

## Variables d'environnement

```env
JWT_SECRET="votre-secret-access-token-min-32-chars"
JWT_REFRESH_SECRET="votre-secret-refresh-token-min-32-chars"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_DAYS=7
```

> ⚠️ En production, utilisez des secrets aléatoires générés via `openssl rand -base64 64`

---

## Flux d'authentification

```
┌──────────┐                         ┌──────────┐                    ┌──────────┐
│  Client  │                         │  Backend │                    │    DB    │
└────┬─────┘                         └────┬─────┘                    └────┬─────┘
     │                                    │                               │
     │  POST /api/auth/login              │                               │
     │  { email, password }               │                               │
     │───────────────────────────────────>│                               │
     │                                    │  findUserByEmail(email)       │
     │                                    │──────────────────────────────>│
     │                                    │  <── User                     │
     │                                    │  bcrypt.compare(password)     │
     │                                    │  jwt.sign(accessToken)        │
     │                                    │  createRefreshToken(uuid)     │
     │                                    │──────────────────────────────>│
     │  <── 200 { accessToken, user }     │                               │
     │  Set-Cookie: refreshToken=xxx      │                               │
     │<───────────────────────────────────│                               │
     │                                    │                               │
     ├─── ⏱️ 15 min plus tard ───────────┤                               │
     │                                    │                               │
     │  POST /api/auth/refresh            │                               │
     │  Cookie: refreshToken=xxx          │                               │
     │───────────────────────────────────>│                               │
     │                                    │  findValidRefreshToken(xxx)   │
     │                                    │──────────────────────────────>│
     │                                    │  revokeRefreshToken(xxx)      │
     │                                    │  createRefreshToken(newUuid)  │
     │                                    │──────────────────────────────>│
     │  <── 200 { accessToken }           │                               │
     │  Set-Cookie: refreshToken=newxxx   │                               │
     │<───────────────────────────────────│                               │
     │                                    │                               │
     │  POST /api/auth/logout             │                               │
     │  Cookie: refreshToken=newxxx       │                               │
     │───────────────────────────────────>│                               │
     │                                    │  revokeRefreshToken(newxxx)   │
     │                                    │──────────────────────────────>│
     │  <── 200 { success }               │                               │
     │  Set-Cookie: refreshToken=;        │                               │
     │<───────────────────────────────────│                               │
```

---

## Endpoints API

### `POST /api/auth/login`

Authentifie un utilisateur.

**Body** :

```json
{
    "email": "admin@skolara.com",
    "password": "Admin123!"
}
```

**Réponse 200** :

```json
{
    "success": true,
    "data": {
        "accessToken": "eyJhbG...",
        "user": {
            "id": 1,
            "firstName": "Admin",
            "lastName": "Skolara",
            "email": "admin@skolara.com",
            "role": "ADMIN",
            "active": true,
            "createdAt": "2026-04-18T..."
        }
    },
    "message": "Connexion réussie"
}
```

- Cookie `Set-Cookie: refreshToken=uuid; HttpOnly; Secure; SameSite=Strict; Path=/api/auth`

### `POST /api/auth/refresh`

Rafraîchit l'access token via le cookie.

**Réponse 200** :

```json
{
    "success": true,
    "data": { "accessToken": "eyJhbG..." },
    "message": "Token rafraîchi avec succès"
}
```

### `POST /api/auth/logout`

Déconnecte l'utilisateur (révoque le refresh token).

### `GET /api/auth/me`

Retourne le profil authentifié.

**Header** : `Authorization: Bearer <accessToken>`

---

## Lancer les tests

```bash
cd backend
npm test -- --testPathPattern=auth
```

---

## Compte de test (seed)

| Email               | Mot de passe | Rôle  |
| ------------------- | ------------ | ----- |
| `admin@skolara.com` | `Admin123!`  | ADMIN |
