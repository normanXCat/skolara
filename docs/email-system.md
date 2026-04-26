# Système d'Envoi d'Emails Skolara

Le système d'envoi d'emails de Skolara est construit avec **Nodemailer** pour la communication sortante. Il contient un design harmonisé et des modèles prêts à l'emploi pour les cas critiques.

## 🛠 Configuration

Pour utiliser le système d'envoi, vous devez configurer les variables d'environnement suivantes dans votre `.env` (backend) :

```env
# L'adresse email qui envoie les messages (ex: normanvonizara@gmail.com)
EMAIL_FROM=normanvonizara@gmail.com

# Mot de passe d'application Gmail (pas votre mot de passe habituel)
EMAIL_PASSWORD=votre_mot_de_passe_application

# Nom de l'expéditeur qui s'affichera
EMAIL_FROM_NAME=Skolara

# URL de base de votre application frontend (utilisée pour les liens dans les emails)
FRONTEND_URL=http://localhost:3000
```

### Comment générer un Mot de passe d'application Gmail

1. Allez sur votre [Compte Google](https://myaccount.google.com/).
2. Allez dans l'onglet **Sécurité**.
3. Dans la section "Connexion à Google", assurez-vous que la **Validation en deux étapes** est activée.
4. Cliquez sur "Mots de passe d'application" (ou recherchez-le dans la barre de recherche du compte).
5. Sélectionnez l'application "Messagerie" et l'appareil de votre choix.
6. Cliquez sur *Générer*. Un mot de passe à 16 caractères s'affiche.
7. Copiez-le sans espace et collez-le dans la variable `EMAIL_PASSWORD`.

## 📦 Environnement de Développement

Lorsque l'application tourne avec `NODE_ENV=development` ou si `EMAIL_PASSWORD` est non fourni, le système ne tente pas d'envoyer l'email par SMTP (pour éviter le spam en phase de dev). Au lieu de cela :
- Le message de l'email est simulé dans la console avec `[EMAIL SIMULATED]`.
- L'outil de retour indiquera quand même un envoi "successful" pour ne pas bloquer les fonctionnalités.

## 📧 Modèles d'Emails Disponibles

Le code des templates se trouve dans `backend/src/lib/email/templates/`.

### 1. `TeacherWelcomeEmail`
- **Utilisation** : Envoyé lors de la création d'un enseignant depuis l'interface administrateur.
- **Sujet** : `Welcome to Skolara — Your login credentials`
- **Contenu** : Donne le mot de passe temporaire et invite à se connecter.

### 2. `ParentWelcomeEmail`
- **Utilisation** : Envoyé au parent lors de la conversion d'une pré-inscription en élève défini dans le flux admin.
- **Sujet** : `Skolara — Identifiants de connexion (Dossier [Nom Enfant])`
- **Contenu** : Donne le mot de passe temporaire parent et un lien vers le portail parent.

### 3. `StudentWelcomeEmail`
- **Utilisation** : Envoyé à l'élève lors de la conversion d'une pré-inscription (si un email enfant a été fourni).
- **Sujet** : `Bienvenue sur Skolara — Ton compte élève est prêt`
- **Contenu** : Identifiants élève + mot de passe auto-généré.

### 4. `PreRegistrationConfirmationEmail`
- **Utilisation** : Envoyé automatiquement suite à la soumission via le formulaire public de demande de pré-inscription.
- **Sujet** : `Dossier de pré-inscription reçu — [Nom Enfant]`
- **Contenu** : Récapitulatif simple et confirmation de la prise en charge (sans credentials, puisque le suivi n'est pas encore garanti).

## 🚀 Bonnes Pratiques

- **Jamais de plantage silencieux ou bloquant pour l'UX** : L'aide d'envoi (`sendEmail()`) est encapsulée pour toujours ramener `success: boolean` sans thrower. Attention toutefois dans la transaction `Teacher`, on *utilise* ce retour pour lever délibérément une erreur et faire jouer le rollback de la transaction pour ne pas avoir un Teacher fantôme sans mot de passe envoyé.
- **Sécurité** : Les mots de passe envoyés sont temporaires, générés via `utils/password.ts`.
