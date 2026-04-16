"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
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
const errorHandler = (err, _req, res, _next) => {
    const status = "status" in err ? (err.status ?? 500) : 500;
    const message = err.message || "Erreur interne du serveur";
    const details = "details" in err ? err.details : undefined;
    console.error(`[ERROR] ${status} – ${message}`, details ?? "");
    res.status(status).json({
        success: false,
        error: message,
        ...(details ? { details } : {}),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map