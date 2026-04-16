import { Request, Response, NextFunction } from "express";

/**
 * Interface pour les erreurs applicatives personnalisées.
 */
interface AppError {
    /** Code HTTP de l'erreur */
    status?: number;
    /** Message d'erreur lisible */
    message: string;
    /** Détails supplémentaires (ex : erreurs de validation Zod) */
    details?: unknown;
}

/**
 * Middleware global de gestion des erreurs.
 * Centralise toutes les erreurs et retourne une réponse JSON cohérente.
 * Les controllers ne catchent rien : tout est délégué ici.
 *
 * @param err - Erreur capturée
 * @param _req - Requête Express (non utilisée)
 * @param res - Réponse Express
 * @param _next - Fonction next (requise par Express pour identifier un error handler)
 */
export const errorHandler = (
    err: AppError | Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    const status = "status" in err ? ((err as AppError).status ?? 500) : 500;
    const message = err.message || "Erreur interne du serveur";
    const details = "details" in err ? (err as AppError).details : undefined;

    console.error(`[ERROR] ${status} – ${message}`, details ?? "");

    res.status(status).json({
        success: false,
        error: message,
        ...(details ? { details } : {}),
    });
};
