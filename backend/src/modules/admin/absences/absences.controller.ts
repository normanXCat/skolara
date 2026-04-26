import { Request, Response, NextFunction } from "express";
import { AdminAbsencesService } from "./absences.service";
import { AdminAbsenceFiltersSchema, AdminJustifyAbsenceSchema } from "./absences.schema";

/**
 * Contrôleur pour la consultation des absences par l'administrateur.
 */
export class AdminAbsencesController {
    private service: AdminAbsencesService;

    constructor(service: AdminAbsencesService) {
        this.service = service;
    }

    /**
     * GET /api/admin/absences
     */
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = AdminAbsenceFiltersSchema.parse(req.query);
            const result = await this.service.findAll(filters);
            res.json({
                success: true,
                data: result,
                message: "Liste des absences récupérée",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/admin/absences/stats
     */
    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.getStats();
            res.json({
                success: true,
                data: result,
                message: "Statistiques des absences récupérées",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/admin/absences/:id/justify
     */
    async justify(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, error: "ID invalide" });
            }
            const data = AdminJustifyAbsenceSchema.parse(req.body);
            const result = await this.service.justify(id, data);
            res.json({
                success: true,
                data: result,
                message: "Absence mise à jour",
            });
        } catch (error) {
            next(error);
        }
    }
}
