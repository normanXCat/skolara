import { Request, Response, NextFunction } from "express";
import { GradesService } from "./grades.service";
import { BulkGradeSchema, SingleGradeSchema } from "./grades.schema";

export class GradesController {
    private service: GradesService;

    constructor(service: GradesService) {
        this.service = service;
    }

    /**
     * GET /api/teacher/grades
     * Liste des assignations de l'enseignant.
     */
    async getAssignments(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const data = await this.service.getAssignments(teacher.id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/teacher/grades/:classId/:subjectId
     * Grille de notes.
     */
    async getGrid(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const classId = parseInt(req.params.classId as any, 10);
            const subjectId = parseInt(req.params.subjectId as any, 10);
            const semester = parseInt(req.query.semester as string, 10) || 1;

            if (isNaN(classId) || isNaN(subjectId)) {
                return res.status(400).json({ success: false, message: "ID de classe ou de matière invalide" });
            }

            const data = await this.service.getGrid(teacher.id, classId, subjectId, semester);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/teacher/grades/:classId/:subjectId
     * Sauvegarde groupée.
     */
    async bulkSave(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            const classId = parseInt(req.params.classId as any, 10);
            const subjectId = parseInt(req.params.subjectId as any, 10);

            if (isNaN(classId) || isNaN(subjectId)) {
                return res.status(400).json({ success: false, message: "ID de classe ou de matière invalide" });
            }
            
            const data = BulkGradeSchema.parse(req.body);
            const result = await this.service.bulkSave(teacher.id, classId, subjectId, data);
            
            res.json({
                success: true,
                data: result,
                message: "Notes sauvegardées avec succès",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/teacher/grades/:id
     * Mise à jour d'une note unique.
     */
    async updateGrade(req: Request, res: Response, next: NextFunction) {
        try {
            const gradeId = parseInt(req.params.id as any, 10);
            const data = SingleGradeSchema.parse(req.body);
            const result = await this.service.updateGrade(gradeId, data);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/teacher/grades/:id
     * Suppression d'une note.
     */
    async deleteGrade(req: Request, res: Response, next: NextFunction) {
        try {
            const gradeId = parseInt(req.params.id as any, 10);
            await this.service.deleteGrade(gradeId);
            res.json({ success: true, message: "Note supprimée" });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/teacher/grades/:classId/:subjectId/stats
     * Stats de classe.
     */
    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const classId = parseInt(req.params.classId as any, 10);
            const subjectId = parseInt(req.params.subjectId as any, 10);
            const semester = parseInt(req.query.semester as string, 10) || 1;

            if (isNaN(classId) || isNaN(subjectId)) {
                return res.status(400).json({ success: false, message: "ID de classe ou de matière invalide" });
            }

            const data = await this.service.getStats(classId, subjectId, semester);
            res.json({ success: true, data });
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
