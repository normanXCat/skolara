import { Request, Response, NextFunction } from "express";
import { AbsencesService } from "./absences.service";
export declare class AbsencesController {
    private service;
    constructor(service: AbsencesService);
    /**
     * POST /api/teacher/absences/roll-call
     */
    saveRollCall(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/teacher/absences
     */
    getHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
    private getTeacherFromUser;
}
//# sourceMappingURL=absences.controller.d.ts.map