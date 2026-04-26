import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";
import { loginSchema } from "./auth.schema";

/**
 * Routeur Express pour l'authentification.
 * Définit les endpoints d'auth avec validation Zod en amont.
 */
const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Authentifie un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Authentification réussie }
 *       401: { description: Identifiants invalides }
 */
router.post("/login", validate({ body: loginSchema }), AuthController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Rafraîchit l'access token
 *     responses:
 *       200: { description: Access token rafraîchi }
 *       401: { description: Session expirée }
 */
router.post("/refresh", AuthController.refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Déconnecte l'utilisateur
 *     responses:
 *       200: { description: Déconnexion réussie }
 */
router.post("/logout", AuthController.logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Retourne le profil de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Profil récupéré }
 *       401: { description: Non authentifié }
 */
router.get("/me", authenticate, AuthController.me);

export default router;
