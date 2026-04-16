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
export declare const errorHandler: (err: AppError | Error, _req: Request, res: Response, _next: NextFunction) => void;
export {};
//# sourceMappingURL=errorHandler.d.ts.map