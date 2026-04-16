import { Request, Response, NextFunction } from "express";
import { PreRegistrationService } from "./pre-registration.service";
import { PreRegistrationRepository } from "./pre-registration.repository";

/** Instance partagée du service */
const service = new PreRegistrationService(new PreRegistrationRepository());

/**
 * Contrôleur Express pour les pré-inscriptions.
 * Chaque méthode délègue la logique au service et formate la réponse.
 * Les erreurs ne sont pas catchées ici : elles remontent au errorHandler global.
 */
export class PreRegistrationController {
    /**
     * Crée une nouvelle pré-inscription.
     * Body validé en amont par le middleware Zod.
     *
     * @param req - Requête Express contenant les données dans le body
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await service.create(req.body);
            res.status(201).json({
                success: true,
                data: record,
                message: "Pré-inscription créée avec succès",
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Liste les pré-inscriptions avec pagination et filtre optionnel.
     * Les query params sont validés en amont par le middleware Zod.
     *
     * @param req - Requête Express contenant page, limit et status en query
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await service.findAll(req.query as any);
            res.json({
                success: true,
                data: result.data,
                meta: result.meta,
                message: "Liste des pré-inscriptions récupérée",
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Récupère le détail d'une pré-inscription par son identifiant.
     *
     * @param req - Requête Express contenant l'id dans les params
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await service.findById(Number(req.params.id));
            res.json({
                success: true,
                data: record,
                message: "Pré-inscription récupérée",
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Met à jour le statut d'une pré-inscription.
     *
     * @param req - Requête Express contenant l'id dans les params et le statut dans le body
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await service.update(
                Number(req.params.id),
                req.body,
            );
            res.json({
                success: true,
                data: record,
                message: "Pré-inscription mise à jour",
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Supprime une pré-inscription par son identifiant.
     *
     * @param req - Requête Express contenant l'id dans les params
     * @param res - Réponse Express
     * @param next - Fonction next pour la propagation des erreurs
     */
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await service.delete(Number(req.params.id));
            res.json({
                success: true,
                data: null,
                message: "Pré-inscription supprimée avec succès",
            });
        } catch (err) {
            next(err);
        }
    }
}
