"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
/**
 * Middleware d'authentification JWT.
 * Vérifie la présence et la validité de l'Access Token dans le header Authorization.
 * Ajoute les données utilisateur à `req.user` si valide.
 *
 * @example
 * router.get("/me", authenticate, controller.me);
 */
const authenticate = (req, _res, next) => {
    // Le token est maintenant récupéré depuis les cookies HttpOnly
    const token = req.cookies?.accessToken;
    if (!token) {
        return next({
            status: 401,
            message: "Token d'accès manquant ou session expirée",
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next({
                status: 401,
                message: "Token d'accès expiré",
            });
        }
        return next({
            status: 401,
            message: "Token d'accès invalide",
        });
    }
};
exports.authenticate = authenticate;
/**
 * Middleware de vérification des rôles.
 * Doit être utilisé APRÈS le middleware `authenticate`.
 *
 * @param roles - Liste des rôles autorisés
 * @returns Middleware Express
 *
 * @example
 * router.get("/admin-only", authenticate, authorize("ADMIN"), controller.dashboard);
 */
const authorize = (...roles) => {
    return (req, _res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return next({
                status: 403,
                message: "Accès refusé : rôle insuffisant",
            });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authenticate.js.map