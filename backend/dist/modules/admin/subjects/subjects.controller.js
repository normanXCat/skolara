"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsController = void 0;
const subjects_schema_1 = require("./subjects.schema");
/**
 * Contrôleur pour la gestion des matières par l'administrateur.
 */
class SubjectsController {
    constructor(service) {
        this.service = service;
    }
    /**
     * GET /api/admin/subjects
     */
    async findAll(req, res, next) {
        try {
            const result = await this.service.findAll();
            return res.json({ success: true, data: result });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/admin/subjects/paginated
     */
    async findPaginated(req, res, next) {
        try {
            const filters = subjects_schema_1.SubjectFiltersSchema.parse(req.query);
            const result = await this.service.findPaginated(filters);
            return res.json({ success: true, data: result });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/admin/subjects
     */
    async create(req, res, next) {
        try {
            const data = subjects_schema_1.CreateSubjectSchema.parse(req.body);
            const result = await this.service.create(data);
            return res.status(201).json({
                success: true,
                data: result,
                message: "Matière créée avec succès"
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/admin/subjects/:id
     */
    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const data = subjects_schema_1.UpdateSubjectSchema.parse(req.body);
            const result = await this.service.update(id, data);
            return res.json({
                success: true,
                data: result,
                message: "Matière mise à jour avec succès"
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/admin/subjects/:id
     */
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await this.service.delete(id);
            return res.json({
                success: true,
                message: "Matière supprimée avec succès"
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SubjectsController = SubjectsController;
//# sourceMappingURL=subjects.controller.js.map