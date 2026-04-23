import { Request, Response, NextFunction } from "express";
import { SubjectsService } from "./subjects.service";
import { CreateSubjectSchema, UpdateSubjectSchema, SubjectFiltersSchema } from "./subjects.schema";

/**
 * Contrôleur pour la gestion des matières par l'administrateur.
 */
export class SubjectsController {
    private service: SubjectsService;

    constructor(service: SubjectsService) {
        this.service = service;
    }

    /**
     * GET /api/admin/subjects
     */
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.findAll();
            return res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/admin/subjects/paginated
     */
    async findPaginated(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = SubjectFiltersSchema.parse(req.query);
            const result = await this.service.findPaginated(filters);
            return res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/admin/subjects
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = CreateSubjectSchema.parse(req.body);
            const result = await this.service.create(data);
            return res.status(201).json({ 
                success: true, 
                data: result, 
                message: "Matière créée avec succès" 
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/admin/subjects/:id
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const data = UpdateSubjectSchema.parse(req.body);
            const result = await this.service.update(id, data);
            return res.json({ 
                success: true, 
                data: result, 
                message: "Matière mise à jour avec succès" 
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/admin/subjects/:id
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            await this.service.delete(id);
            return res.json({ 
                success: true, 
                message: "Matière supprimée avec succès" 
            });
        } catch (error) {
            next(error);
        }
    }
}
