"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersController = void 0;
const teachers_schema_1 = require("./teachers.schema");
/**
 * Contrôleur pour la gestion des enseignants par l'administrateur.
 */
class TeachersController {
    constructor(service) {
        this.service = service;
    }
    /**
     * GET /api/admin/teachers
     */
    async findAll(req, res, next) {
        try {
            const filters = teachers_schema_1.TeacherFiltersSchema.parse(req.query);
            const result = await this.service.findAll(filters);
            res.json({
                success: true,
                data: result,
                message: "Liste des enseignants récupérée",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/admin/teachers
     */
    async create(req, res, next) {
        try {
            const data = await teachers_schema_1.CreateTeacherSchema.parseAsync(req.body);
            const result = await this.service.create(data);
            res.status(201).json({
                success: true,
                data: result,
                message: "L'enseignant a été créé avec succès",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/admin/teachers/:id
     */
    async findById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await this.service.findById(id);
            res.json({
                success: true,
                data: result,
                message: "Détails de l'enseignant récupérés",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/admin/teachers/:id
     */
    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = await teachers_schema_1.UpdateTeacherSchema.parseAsync(req.body);
            const result = await this.service.update(id, data);
            res.json({
                success: true,
                data: result,
                message: "Profil mis à jour",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/admin/teachers/:id/status
     */
    async updateStatus(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { active } = req.body;
            const result = await this.service.setStatus(id, active);
            res.json({
                success: true,
                data: result,
                message: active ? "Compte activé" : "Compte désactivé",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/admin/teachers/:id/assignments
     */
    async addAssignment(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = teachers_schema_1.AssignmentSchema.parse(req.body);
            const result = await this.service.addAssignment(id, data);
            res.json({
                success: true,
                data: result,
                message: "Assignation ajoutée",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/admin/teachers/:id/assignments
     */
    async removeAssignment(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = teachers_schema_1.AssignmentSchema.parse(req.query); // Ou via body, mais DELETE via query est commun
            const result = await this.service.removeAssignment(id, data);
            res.json({
                success: true,
                data: result,
                message: "Assignation supprimée",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TeachersController = TeachersController;
//# sourceMappingURL=teachers.controller.js.map