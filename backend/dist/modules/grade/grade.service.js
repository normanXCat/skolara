"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeService = void 0;
const grade_repository_1 = __importDefault(require("./grade.repository"));
class GradeService {
    /**
     * Récupère la liste de tous les grades.
     */
    async getAllGrades() {
        return grade_repository_1.default.findAll();
    }
}
exports.GradeService = GradeService;
exports.default = new GradeService();
//# sourceMappingURL=grade.service.js.map