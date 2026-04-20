import { Request, Response, NextFunction } from "express";
import { StatsService } from "./stats.service";

/**
 * Contrôleur pour les statistiques administratives.
 */
export class StatsController {
    private service: StatsService;

    constructor(service: StatsService) {
        this.service = service;
    }

    /**
     * GET /api/admin/stats
     */
    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const stats = await this.service.getAdminStats();
            res.json({
                success: true,
                data: stats,
                message: "Statistiques récupérées avec succès",
            });
        } catch (error) {
            next(error);
        }
    }
}
