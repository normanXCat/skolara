import { Request, Response, NextFunction } from "express";
import { TeachersService } from "./teachers.service";
import {
    TeacherFiltersSchema,
    CreateTeacherSchema,
    UpdateTeacherSchema,
    AssignmentSchema,
} from "./teachers.schema";

/**
 * Contrôleur pour la gestion des enseignants par l'administrateur.
 */
export class TeachersController {
    private service: TeachersService;

    constructor(service: TeachersService) {
        this.service = service;
    }

    /**
     * GET /api/admin/teachers
     */
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = TeacherFiltersSchema.parse(req.query);
            const result = await this.service.findAll(filters);
            res.json({
                success: true,
                data: result,
                message: "Liste des enseignants récupérée",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/admin/teachers
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await CreateTeacherSchema.parseAsync(req.body);
            const result = await this.service.create(data);
            res.status(201).json({
                success: true,
                data: result,
                message: "L'enseignant a été créé avec succès",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/admin/teachers/:id
     */
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            const result = await this.service.findById(id);
            res.json({
                success: true,
                data: result,
                message: "Détails de l'enseignant récupérés",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/admin/teachers/:id
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            const data = await UpdateTeacherSchema.parseAsync(req.body);
            const result = await this.service.update(id, data);
            res.json({
                success: true,
                data: result,
                message: "Profil mis à jour",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PATCH /api/admin/teachers/:id/status
     */
    async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            const { active } = req.body;
            const result = await this.service.setStatus(id, active);
            res.json({
                success: true,
                data: result,
                message: active ? "Compte activé" : "Compte désactivé",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/admin/teachers/:id/assignments
     */
    async addAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            const data = AssignmentSchema.parse(req.body);
            const result = await this.service.addAssignment(id, data);
            res.json({
                success: true,
                data: result,
                message: "Assignation ajoutée",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/admin/teachers/:id/assignments
     */
    async removeAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            const data = AssignmentSchema.parse(req.query as any); // Ou via body, mais DELETE via query est commun
            const result = await this.service.removeAssignment(id, data);
            res.json({
                success: true,
                data: result,
                message: "Assignation supprimée",
            });
        } catch (error) {
            next(error);
        }
    }
}
