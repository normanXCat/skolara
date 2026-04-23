import { Request, Response, NextFunction } from "express";
import { ClassesService } from "./classes.service";
/**
 * Contrôleur pour la gestion des classes par l'administrateur.
 */
export declare class ClassesController {
    private service;
    constructor(service: ClassesService);
    /**
     * GET /api/admin/classes
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * POST /api/admin/classes
     */
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/admin/classes/:id
     */
    findById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * PUT /api/admin/classes/:id
     */
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * DELETE /api/admin/classes/:id
     */
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=classes.controller.d.ts.map