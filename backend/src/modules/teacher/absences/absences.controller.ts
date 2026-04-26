import { Request, Response, NextFunction } from "express";
import { AbsencesService } from "./absences.service";
import { RollCallSchema, AbsenceFiltersSchema, JustifyAbsenceSchema } from "./absences.schema";

export class AbsencesController {
    private service: AbsencesService;

    constructor(service: AbsencesService) {
        this.service = service;
    }

    /**
     * GET /api/teacher/absences/:classId/students
     * Liste des élèves d'une classe pour l'appel.
     */
    async getClassStudents(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const classId = parseInt(req.params.classId as any, 10);

            if (isNaN(classId)) {
                return res.status(400).json({ success: false, message: "ID de classe invalide" });
            }

            const data = await this.service.getClassStudents(teacher.id, classId);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/teacher/absences/:classId/roll-call
     * Enregistre l'appel pour une classe.
     */
    async saveRollCall(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const classId = parseInt(req.params.classId as any, 10);
            
            const data = RollCallSchema.parse(req.body);
            const result = await this.service.saveRollCall(teacher.id, classId, data);
            
            res.json({
                success: true,
                data: result,
                message: "L'appel a été enregistré et les parents notifiés",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/teacher/absences/:classId/roll-call
     * Récupère l'appel pour une date donnée.
     */
    async getRollCall(req: Request, res: Response, next: NextFunction) {
        try {
            const classId = parseInt(req.params.classId as any, 10);
            const date = req.query.date as string;
            if (!date) throw { status: 400, message: "La date est requise" };

            const data = await this.service.getRollCall(classId, date);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/teacher/absences/:id/justify
     * Justifie une absence.
     */
    async justifyAbsence(req: Request, res: Response, next: NextFunction) {
        try {
            const absenceId = parseInt(req.params.id as any, 10);
            const data = JustifyAbsenceSchema.parse(req.body);
            const result = await this.service.justifyAbsence(absenceId, data);
            res.json({ success: true, data: result, message: "Absence justifiée" });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/teacher/absences
     * Historique des absences avec filtres.
     */
    async getHistory(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = AbsenceFiltersSchema.parse(req.query);
            const result = await this.service.getHistory(filters);
            
            res.json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    private async getTeacherFromUser(userId: number) {
        const { prisma } = await import("../../../prisma/client");
        const teacher = await prisma.teacher.findUnique({ where: { userId } });
        if (!teacher) throw { status: 403, message: "Profil enseignant non trouvé" };
        return teacher;
    }
}
