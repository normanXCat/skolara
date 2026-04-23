"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesController = void 0;
const classes_schema_1 = require("./classes.schema");
/**
 * Contrôleur pour la gestion des classes par l'administrateur.
 */
class ClassesController {
    constructor(service) {
        this.service = service;
    }
    /**
     * GET /api/admin/classes
     */
    async findAll(req, res, next) {
        try {
            const filters = classes_schema_1.ClassFiltersSchema.parse(req.query);
            const result = await this.service.findAll(filters);
            res.json({
                success: true,
                data: result,
                message: "Liste des classes récupérée",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/admin/classes
     */
    async create(req, res, next) {
        try {
            const data = classes_schema_1.CreateClassSchema.parse(req.body);
            const result = await this.service.create(data);
            res.status(201).json({
                success: true,
                data: result,
                message: "La classe a été créée avec succès",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/admin/classes/:id
     */
    async findById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await this.service.findById(id);
            res.json({
                success: true,
                data: result,
                message: "Détails de la classe récupérés",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/admin/classes/:id
     */
    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = classes_schema_1.UpdateClassSchema.parse(req.body);
            const result = await this.service.update(id, data);
            res.json({
                success: true,
                data: result,
                message: "Classe mise à jour",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/admin/classes/:id
     */
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            await this.service.delete(id);
            res.json({
                success: true,
                data: null,
                message: "Classe supprimée",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ClassesController = ClassesController;
//# sourceMappingURL=classes.controller.js.map