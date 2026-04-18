import { Request, Response, NextFunction } from "express";
/**
 * Middleware d'authentification JWT.
 * Vérifie la présence et la validité de l'Access Token dans le header Authorization.
 * Ajoute les données utilisateur à `req.user` si valide.
 *
 * @example
 * router.get("/me", authenticate, controller.me);
 */
export declare const authenticate: (req: Request, _res: Response, next: NextFunction) => void;
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
export declare const authorize: (...roles: string[]) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=authenticate.d.ts.map