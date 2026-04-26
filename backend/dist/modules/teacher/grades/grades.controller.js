"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradesController = void 0;
const grades_schema_1 = require("./grades.schema");
class GradesController {
    constructor(service) {
        this.service = service;
    }
    /**
     * GET /api/teacher/grades
     * Liste des assignations de l'enseignant.
     */
    async getAssignments(req, res, next) {
        try {
            const userId = req.user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const data = await this.service.getAssignments(teacher.id);
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/teacher/grades/:classId/:subjectId
     * Grille de notes.
     */
    async getGrid(req, res, next) {
        try {
            const userId = req.user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const classId = parseInt(req.params.classId, 10);
            const subjectId = parseInt(req.params.subjectId, 10);
            const semester = parseInt(req.query.semester, 10) || 1;
            if (isNaN(classId) || isNaN(subjectId)) {
                return res.status(400).json({ success: false, message: "ID de classe ou de matière invalide" });
            }
            const data = await this.service.getGrid(teacher.id, classId, subjectId, semester);
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/teacher/grades/:classId/:subjectId
     * Sauvegarde groupée.
     */
    async bulkSave(req, res, next) {
        try {
            const userId = req.user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const classId = parseInt(req.params.classId, 10);
            const subjectId = parseInt(req.params.subjectId, 10);
            if (isNaN(classId) || isNaN(subjectId)) {
                return res.status(400).json({ success: false, message: "ID de classe ou de matière invalide" });
            }
            const data = grades_schema_1.BulkGradeSchema.parse(req.body);
            const result = await this.service.bulkSave(teacher.id, classId, subjectId, data);
            res.json({
                success: true,
                data: result,
                message: "Notes sauvegardées avec succès",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/teacher/grades/:id
     * Mise à jour d'une note unique.
     */
    async updateGrade(req, res, next) {
        try {
            const gradeId = parseInt(req.params.id, 10);
            const data = grades_schema_1.SingleGradeSchema.parse(req.body);
            const result = await this.service.updateGrade(gradeId, data);
            res.json({ success: true, data: result });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/teacher/grades/:id
     * Suppression d'une note.
     */
    async deleteGrade(req, res, next) {
        try {
            const gradeId = parseInt(req.params.id, 10);
            await this.service.deleteGrade(gradeId);
            res.json({ success: true, message: "Note supprimée" });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/teacher/grades/:classId/:subjectId/stats
     * Stats de classe.
     */
    async getStats(req, res, next) {
        try {
            const classId = parseInt(req.params.classId, 10);
            const subjectId = parseInt(req.params.subjectId, 10);
            const semester = parseInt(req.query.semester, 10) || 1;
            if (isNaN(classId) || isNaN(subjectId)) {
                return res.status(400).json({ success: false, message: "ID de classe ou de matière invalide" });
            }
            const data = await this.service.getStats(classId, subjectId, semester);
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async getTeacherFromUser(userId) {
        const { prisma } = await Promise.resolve().then(() => __importStar(require("../../../prisma/client")));
        const teacher = await prisma.teacher.findUnique({ where: { userId } });
        if (!teacher)
            throw { status: 403, message: "Profil enseignant non trouvé" };
        return teacher;
    }
}
exports.GradesController = GradesController;
//# sourceMappingURL=grades.controller.js.map