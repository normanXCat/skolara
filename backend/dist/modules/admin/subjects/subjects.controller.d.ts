import { Request, Response, NextFunction } from "express";
import { SubjectsService } from "./subjects.service";
/**
 * Contrôleur pour la gestion des matières par l'administrateur.
 */
export declare class SubjectsController {
    private service;
    constructor(service: SubjectsService);
    /**
     * GET /api/admin/subjects
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /api/admin/subjects/paginated
     */
    findPaginated(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * POST /api/admin/subjects
     */
    create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PUT /api/admin/subjects/:id
     */
    update(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * DELETE /api/admin/subjects/:id
     */
    delete(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=subjects.controller.d.ts.map