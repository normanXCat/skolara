import { Request, Response, NextFunction } from "express";
import { AdminAbsencesService } from "./absences.service";
/**
 * Contrôleur pour la consultation des absences par l'administrateur.
 */
export declare class AdminAbsencesController {
    private service;
    constructor(service: AdminAbsencesService);
    /**
     * GET /api/admin/absences
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/admin/absences/stats
     */
    getStats(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * PUT /api/admin/absences/:id/justify
     */
    justify(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=absences.controller.d.ts.map