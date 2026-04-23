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
     * POST /api/teacher/grades/bulk
     */
    async bulkCreate(req, res, next) {
        try {
            const teacherId = req.user.userId;
            // On a besoin de l'ID Enseignant réel, pas user.id
            const teacher = await this.getTeacherFromUser(teacherId);
            const data = grades_schema_1.BulkGradeSchema.parse(req.body);
            const result = await this.service.bulkCreate(teacher.id, data);
            res.status(201).json({
                success: true,
                data: result,
                message: "Les notes ont été enregistrées",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/teacher/grades/grid
     */
    async getGrid(req, res, next) {
        try {
            const teacherId = req.user.userId;
            const teacher = await this.getTeacherFromUser(teacherId);
            const classId = parseInt(req.query.classId, 10);
            const subjectId = parseInt(req.query.subjectId, 10);
            const students = await this.service.getEntryGrid(teacher.id, classId, subjectId);
            res.json({
                success: true,
                data: students,
            });
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