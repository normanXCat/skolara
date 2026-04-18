import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JwtPayload } from "../modules/auth/auth.service";

/**
 * Middleware d'authentification JWT.
 * Vérifie la présence et la validité de l'Access Token dans le header Authorization.
 * Ajoute les données utilisateur à `req.user` si valide.
 *
 * @example
 * router.get("/me", authenticate, controller.me);
 */
export const authenticate = (
    req: Request,
    _res: Response,
    next: NextFunction,
): void => {
    // Le token est maintenant récupéré depuis les cookies HttpOnly
    const token = req.cookies?.accessToken;

    if (!token) {
        return next({
            status: 401,
            message: "Token d'accès manquant ou session expirée",
        });
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        (req as any).user = payload;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
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
export const authorize = (...roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const userRole = (req as any).user?.role;

        if (!userRole || !roles.includes(userRole)) {
            return next({
                status: 403,
                message: "Accès refusé : rôle insuffisant",
            });
        }

        next();
    };
};
