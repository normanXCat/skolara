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
exports.AbsencesController = void 0;
const absences_schema_1 = require("./absences.schema");
class AbsencesController {
    constructor(service) {
        this.service = service;
    }
    /**
     * GET /api/teacher/absences/:classId/students
     * Liste des élèves d'une classe pour l'appel.
     */
    async getClassStudents(req, res, next) {
        try {
            const userId = req.user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const classId = parseInt(req.params.classId, 10);
            if (isNaN(classId)) {
                return res.status(400).json({ success: false, message: "ID de classe invalide" });
            }
            const data = await this.service.getClassStudents(teacher.id, classId);
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/teacher/absences/:classId/roll-call
     * Enregistre l'appel pour une classe.
     */
    async saveRollCall(req, res, next) {
        try {
            const userId = req.user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const classId = parseInt(req.params.classId, 10);
            const data = absences_schema_1.RollCallSchema.parse(req.body);
            const result = await this.service.saveRollCall(teacher.id, classId, data);
            res.json({
                success: true,
                data: result,
                message: "L'appel a été enregistré et les parents notifiés",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/teacher/absences/:classId/roll-call
     * Récupère l'appel pour une date donnée.
     */
    async getRollCall(req, res, next) {
        try {
            const classId = parseInt(req.params.classId, 10);
            const date = req.query.date;
            if (!date)
                throw { status: 400, message: "La date est requise" };
            const data = await this.service.getRollCall(classId, date);
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/teacher/absences/:id/justify
     * Justifie une absence.
     */
    async justifyAbsence(req, res, next) {
        try {
            const absenceId = parseInt(req.params.id, 10);
            const data = absences_schema_1.JustifyAbsenceSchema.parse(req.body);
            const result = await this.service.justifyAbsence(absenceId, data);
            res.json({ success: true, data: result, message: "Absence justifiée" });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/teacher/absences
     * Historique des absences avec filtres.
     */
    async getHistory(req, res, next) {
        try {
            const filters = absences_schema_1.AbsenceFiltersSchema.parse(req.query);
            const result = await this.service.getHistory(filters);
            res.json({
                success: true,
                data: result,
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
exports.AbsencesController = AbsencesController;
//# sourceMappingURL=absences.controller.js.map