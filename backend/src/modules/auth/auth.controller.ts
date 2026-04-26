import { Request, Response, NextFunction } from "express";
import authService from "./auth.service";
import { env } from "../../config/env";

const isProduction = env.NODE_ENV === "production";

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const), // ← fix
    path: "/",
    maxAge: env.REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
};

const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const), // ← fix
    path: "/",
    maxAge: 15 * 60 * 1000,
};

const ROLE_COOKIE_OPTIONS = {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const), // ← fix
    path: "/",
    maxAge: env.REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
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

            res.cookie("userRole", result.user.role, ROLE_COOKIE_OPTIONS);

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
            // 1. Extraire TOUS les refresh tokens potentiels du header Cookie
            // (Utile si plusieurs cookies du même nom existent à cause de trajets/domaines différents)
            const allTokens: string[] = [];

            if (req.cookies?.refreshToken) {
                allTokens.push(req.cookies.refreshToken);
            }

            if (req.headers.cookie) {
                const rawCookies = req.headers.cookie.split(";");
                rawCookies.forEach((c) => {
                    const [name, value] = c.trim().split("=");
                    if (name === "refreshToken" && !allTokens.includes(value)) {
                        allTokens.push(value);
                    }
                });
            }

            if (allTokens.length === 0) {
                return next({
                    status: 401,
                    message: "Token de rafraîchissement manquant",
                });
            }

            // 2. Tester les tokens un par un jusqu'à en trouver un valide
            let result = null;
            let lastError = null;

            for (const token of allTokens) {
                try {
                    result = await authService.refresh(token);
                    if (result) break; // Valid token found!
                } catch (err) {
                    lastError = err;
                    // On continue vers le suivant
                }
            }

            if (!result) {
                throw lastError || { status: 401, message: "Session expirée" };
            }

            try {
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

                res.cookie("userRole", result.user.role, ROLE_COOKIE_OPTIONS);

                res.status(200).json({
                    success: true,
                    data: result.user,
                    message: "Token rafraîchi avec succès",
                });
            } catch (err: any) {
                throw err;
            }
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

            res.clearCookie("userRole", { path: "/" });

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
