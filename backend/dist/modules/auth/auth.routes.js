"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_1 = require("../../middlewares/validate");
const authenticate_1 = require("../../middlewares/authenticate");
const auth_schema_1 = require("./auth.schema");
/**
 * Routeur Express pour l'authentification.
 * Définit les endpoints d'auth avec validation Zod en amont.
 */
const router = (0, express_1.Router)();
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
router.post("/login", (0, validate_1.validate)({ body: auth_schema_1.loginSchema }), auth_controller_1.AuthController.login);
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
router.post("/refresh", auth_controller_1.AuthController.refresh);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Déconnecte l'utilisateur
 *     responses:
 *       200: { description: Déconnexion réussie }
 */
router.post("/logout", auth_controller_1.AuthController.logout);
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
router.get("/me", authenticate_1.authenticate, auth_controller_1.AuthController.me);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map