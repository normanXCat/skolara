import { Request, Response, NextFunction } from "express";
import { GradesService } from "./grades.service";
export declare class GradesController {
    private service;
    constructor(service: GradesService);
    /**
     * POST /api/teacher/grades/bulk
     */
    bulkCreate(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/teacher/grades/grid
     */
    getGrid(req: Request, res: Response, next: NextFunction): Promise<void>;
    private getTeacherFromUser;
}
//# sourceMappingURL=grades.controller.d.ts.map