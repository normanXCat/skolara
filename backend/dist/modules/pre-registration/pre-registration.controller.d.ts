import { Request, Response, NextFunction } from "express";
/**
 * Contrôleur Express pour les pré-inscriptions.
 * Chaque méthode délègue la logique au service et formate la réponse.
 * Les erreurs ne sont pas catchées ici : elles remontent au errorHandler global.
 */
export declare class PreRegistrationController {
    /**
     * Crée une nouvelle pré-inscription.
     * Body validé en amont par le middleware Zod.
     *
     * @param req - Requête Express contenant les données dans le body
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static create(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Liste les pré-inscriptions avec pagination et filtre optionnel.
     * Les query params sont validés en amont par le middleware Zod.
     *
     * @param req - Requête Express contenant page, limit et status en query
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Récupère le détail d'une pré-inscription par son identifiant.
     *
     * @param req - Requête Express contenant l'id dans les params
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static findById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Met à jour le statut d'une pré-inscription.
     *
     * @param req - Requête Express contenant l'id dans les params et le statut dans le body
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static update(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Supprime une pré-inscription par son identifiant.
     *
     * @param req - Requête Express contenant l'id dans les params
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=pre-registration.controller.d.ts.map