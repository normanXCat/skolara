import { Request, Response, NextFunction } from "express";
import { AdminGradesService } from "./grades.service";
import { AdminGradeFiltersSchema } from "./grades.schema";

/**
 * Contrôleur pour la consultation des notes par l'administrateur.
 */
export class AdminGradesController {
    private service: AdminGradesService;

    constructor(service: AdminGradesService) {
        this.service = service;
    }

    /**
     * GET /api/admin/grades
     */
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = AdminGradeFiltersSchema.parse(req.query);
            const result = await this.service.findAll(filters);
            res.json({
                success: true,
                data: result,
                message: "Liste des notes récupérée",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/admin/grades/stats
     */
    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.getStats();
            res.json({
                success: true,
                data: result,
                message: "Statistiques des notes récupérées",
            });
        } catch (error) {
            next(error);
        }
    }
}
