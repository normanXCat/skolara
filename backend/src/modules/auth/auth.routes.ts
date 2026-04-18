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
 * POST /api/auth/login
 * Authentifie un utilisateur (accès public).
 */
router.post("/login", validate({ body: loginSchema }), AuthController.login);

/**
 * POST /api/auth/refresh
 * Rafraîchit l'access token via le cookie refresh (accès public).
 */
router.post("/refresh", AuthController.refresh);

/**
 * POST /api/auth/logout
 * Déconnecte l'utilisateur et révoque le refresh token (accès public).
 */
router.post("/logout", AuthController.logout);

/**
 * GET /api/auth/me
 * Retourne le profil de l'utilisateur authentifié (accès protégé).
 */
router.get("/me", authenticate, AuthController.me);

export default router;
