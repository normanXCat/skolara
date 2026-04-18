import { Request, Response, NextFunction } from "express";
import authService from "./auth.service";
import { env } from "../../config/env";

/**
 * Options du cookie HttpOnly pour le refresh token.
 */
const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: env.REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
};

const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    // On met un maxAge un peu plus long que le JWT pour être sûr (ex: 15min)
    maxAge: 15 * 60 * 1000,
};

/**
 * Contrôleur Express pour l'authentification.
 * Chaque méthode délègue la logique au service et formate la réponse.
 * Les erreurs ne sont pas catchées ici : elles remontent au errorHandler global.
 */
export class AuthController {
    /**
     * POST /api/auth/login
     * Authentifie un utilisateur et retourne un access token + cookie refresh.
     */
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await authService.login(req.body);

            // Stocker les tokens dans des cookies HttpOnly
            res.cookie(
                "refreshToken",
                result.refreshToken,
                REFRESH_COOKIE_OPTIONS,
            );

            res.cookie(
                "accessToken",
                result.accessToken,
                ACCESS_COOKIE_OPTIONS,
            );

            res.status(200).json({
                success: true,
                data: {
                    user: result.user,
                },
                message: "Connexion réussie",
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * POST /api/auth/refresh
     * Rafraîchit l'access token via le cookie de refresh token.
     */
    static async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const currentToken = req.cookies?.refreshToken;

            if (!currentToken) {
                return next({
                    status: 401,
                    message: "Token de rafraîchissement manquant",
                });
            }

            const result = await authService.refresh(currentToken);

            // Mettre à jour les cookies (rotation)
            res.cookie(
                "refreshToken",
                result.refreshToken,
                REFRESH_COOKIE_OPTIONS,
            );

            res.cookie(
                "accessToken",
                result.accessToken,
                ACCESS_COOKIE_OPTIONS,
            );

            res.status(200).json({
                success: true,
                data: null,
                message: "Token rafraîchi avec succès",
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * POST /api/auth/logout
     * Révoque le refresh token et supprime le cookie.
     */
    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies?.refreshToken;

            if (refreshToken) {
                await authService.logout(refreshToken);
            }

            // Supprimer les cookies
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "lax" as const,
                path: "/",
            });

            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "lax" as const,
                path: "/",
            });

            res.status(200).json({
                success: true,
                data: null,
                message: "Déconnexion réussie",
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * GET /api/auth/me
     * Retourne le profil de l'utilisateur authentifié.
     * Nécessite le middleware `authenticate` en amont.
     */
    static async me(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.userId;

            if (!userId) {
                return next({
                    status: 401,
                    message: "Non authentifié",
                });
            }

            const user = await authService.getProfile(userId);

            res.status(200).json({
                success: true,
                data: user,
                message: "Profil récupéré",
            });
        } catch (err) {
            next(err);
        }
    }
}

export default AuthController;
