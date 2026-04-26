"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGradesController = void 0;
const grades_schema_1 = require("./grades.schema");
/**
 * Contrôleur pour la consultation des notes par l'administrateur.
 */
class AdminGradesController {
    constructor(service) {
        this.service = service;
    }
    /**
     * GET /api/admin/grades
     */
    async findAll(req, res, next) {
        try {
            const filters = grades_schema_1.AdminGradeFiltersSchema.parse(req.query);
            const result = await this.service.findAll(filters);
            res.json({
                success: true,
                data: result,
                message: "Liste des notes récupérée",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/admin/grades/stats
     */
    async getStats(req, res, next) {
        try {
            const result = await this.service.getStats();
            res.json({
                success: true,
                data: result,
                message: "Statistiques des notes récupérées",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminGradesController = AdminGradesController;
//# sourceMappingURL=grades.controller.js.map