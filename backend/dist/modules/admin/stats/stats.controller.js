"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
/**
 * Contrôleur pour les statistiques administratives.
 */
class StatsController {
    constructor(service) {
        this.service = service;
    }
    /**
     * GET /api/admin/stats
     */
    async getStats(req, res, next) {
        try {
            const stats = await this.service.getAdminStats();
            res.json({
                success: true,
                data: stats,
                message: "Statistiques récupérées avec succès",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StatsController = StatsController;
//# sourceMappingURL=stats.controller.js.map