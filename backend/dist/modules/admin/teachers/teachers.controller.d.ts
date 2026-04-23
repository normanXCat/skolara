import { Request, Response, NextFunction } from "express";
import { TeachersService } from "./teachers.service";
/**
 * Contrôleur pour la gestion des enseignants par l'administrateur.
 */
export declare class TeachersController {
    private service;
    constructor(service: TeachersService);
    /**
     * GET /api/admin/teachers
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * POST /api/admin/teachers
     */
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/admin/teachers/:id
     */
    findById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * PUT /api/admin/teachers/:id
     */
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * PATCH /api/admin/teachers/:id/status
     */
    updateStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * POST /api/admin/teachers/:id/assignments
     */
    addAssignment(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * DELETE /api/admin/teachers/:id/assignments
     */
    removeAssignment(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=teachers.controller.d.ts.map