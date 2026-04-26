"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAbsencesController = void 0;
const absences_schema_1 = require("./absences.schema");
/**
 * Contrôleur pour la consultation des absences par l'administrateur.
 */
class AdminAbsencesController {
    constructor(service) {
        this.service = service;
    }
    /**
     * GET /api/admin/absences
     */
    async findAll(req, res, next) {
        try {
            const filters = absences_schema_1.AdminAbsenceFiltersSchema.parse(req.query);
            const result = await this.service.findAll(filters);
            res.json({
                success: true,
                data: result,
                message: "Liste des absences récupérée",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/admin/absences/stats
     */
    async getStats(req, res, next) {
        try {
            const result = await this.service.getStats();
            res.json({
                success: true,
                data: result,
                message: "Statistiques des absences récupérées",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/admin/absences/:id/justify
     */
    async justify(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, error: "ID invalide" });
            }
            const data = absences_schema_1.AdminJustifyAbsenceSchema.parse(req.body);
            const result = await this.service.justify(id, data);
            res.json({
                success: true,
                data: result,
                message: "Absence mise à jour",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminAbsencesController = AdminAbsencesController;
//# sourceMappingURL=absences.controller.js.map