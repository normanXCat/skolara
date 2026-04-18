import { Request, Response, NextFunction } from "express";
/**
 * Contrôleur Express pour l'authentification.
 * Chaque méthode délègue la logique au service et formate la réponse.
 * Les erreurs ne sont pas catchées ici : elles remontent au errorHandler global.
 */
export declare class AuthController {
    /**
     * POST /api/auth/login
     * Authentifie un utilisateur et retourne un access token + cookie refresh.
     */
    static login(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * POST /api/auth/refresh
     * Rafraîchit l'access token via le cookie de refresh token.
     */
    static refresh(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * POST /api/auth/logout
     * Révoque le refresh token et supprime le cookie.
     */
    static logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/auth/me
     * Retourne le profil de l'utilisateur authentifié.
     * Nécessite le middleware `authenticate` en amont.
     */
    static me(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default AuthController;
//# sourceMappingURL=auth.controller.d.ts.map