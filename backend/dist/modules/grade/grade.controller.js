"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeController = void 0;
const grade_service_1 = __importDefault(require("./grade.service"));
class GradeController {
    /**
     * GET /api/grades
     * Récupère tous les grades disponibles.
     */
    async getAll(req, res, next) {
        try {
            const grades = await grade_service_1.default.getAllGrades();
            res.status(200).json({
                success: true,
                data: grades,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.GradeController = GradeController;
exports.default = new GradeController();
//# sourceMappingURL=grade.controller.js.map