import { Request, Response, NextFunction } from "express";
import { StatsService } from "./stats.service";
/**
 * Contrôleur pour les statistiques administratives.
 */
export declare class StatsController {
    private service;
    constructor(service: StatsService);
    /**
     * GET /api/admin/stats
     */
    getStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=stats.controller.d.ts.map