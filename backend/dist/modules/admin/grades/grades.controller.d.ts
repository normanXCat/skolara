import { Request, Response, NextFunction } from "express";
import { AdminGradesService } from "./grades.service";
/**
 * Contrôleur pour la consultation des notes par l'administrateur.
 */
export declare class AdminGradesController {
    private service;
    constructor(service: AdminGradesService);
    /**
     * GET /api/admin/grades
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/admin/grades/stats
     */
    getStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=grades.controller.d.ts.map