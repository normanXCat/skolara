import { Request, Response, NextFunction } from "express";
import { ClassesService } from "./classes.service";
import {
    ClassFiltersSchema,
    CreateClassSchema,
    UpdateClassSchema,
} from "./classes.schema";

/**
 * Contrôleur pour la gestion des classes par l'administrateur.
 */
export class ClassesController {
    private service: ClassesService;

    constructor(service: ClassesService) {
        this.service = service;
    }

    /**
     * GET /api/admin/classes
     */
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = ClassFiltersSchema.parse(req.query);
            const result = await this.service.findAll(filters);
            res.json({
                success: true,
                data: result,
                message: "Liste des classes récupérée",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/admin/classes
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = CreateClassSchema.parse(req.body);
            const result = await this.service.create(data);
            res.status(201).json({
                success: true,
                data: result,
                message: "La classe a été créée avec succès",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/admin/classes/:id
     */
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            if (isNaN(id)) {
                res.status(400).json({ success: false, message: "ID invalide" });
                return;
            }
            const result = await this.service.findById(id);
            res.json({
                success: true,
                data: result,
                message: "Détails de la classe récupérés",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/admin/classes/:id
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            const data = UpdateClassSchema.parse(req.body);
            const result = await this.service.update(id, data);
            res.json({
                success: true,
                data: result,
                message: "Classe mise à jour",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/admin/classes/:id
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            await this.service.delete(id);
            res.json({
                success: true,
                data: null,
                message: "Classe supprimée",
            });
        } catch (error) {
            next(error);
        }
    }
}
