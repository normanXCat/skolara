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
 * POST /api/auth/login
 * Authentifie un utilisateur (accès public).
 */
router.post("/login", (0, validate_1.validate)({ body: auth_schema_1.loginSchema }), auth_controller_1.AuthController.login);
/**
 * POST /api/auth/refresh
 * Rafraîchit l'access token via le cookie refresh (accès public).
 */
router.post("/refresh", auth_controller_1.AuthController.refresh);
/**
 * POST /api/auth/logout
 * Déconnecte l'utilisateur et révoque le refresh token (accès public).
 */
router.post("/logout", auth_controller_1.AuthController.logout);
/**
 * GET /api/auth/me
 * Retourne le profil de l'utilisateur authentifié (accès protégé).
 */
router.get("/me", authenticate_1.authenticate, auth_controller_1.AuthController.me);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map