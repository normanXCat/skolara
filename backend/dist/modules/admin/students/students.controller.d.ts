import { Request, Response, NextFunction } from "express";
import { StudentsService } from "./students.service";
/**
 * Contrôleur pour la gestion des élèves par l'administrateur.
 */
export declare class StudentsController {
    private service;
    constructor(service: StudentsService);
    /**
     * GET /api/admin/students
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * POST /api/admin/students
     */
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/admin/students/:id
     */
    findById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * PUT /api/admin/students/:id
     */
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * PATCH /api/admin/students/:id/status
     */
    updateStatus(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /api/admin/students/export
     */
    exportCSV(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=students.controller.d.ts.map