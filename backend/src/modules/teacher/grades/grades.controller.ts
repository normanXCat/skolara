import { Request, Response, NextFunction } from "express";
import { GradesService } from "./grades.service";
import { BulkGradeSchema, MarkFiltersSchema } from "./grades.schema";

export class GradesController {
    private service: GradesService;

    constructor(service: GradesService) {
        this.service = service;
    }

    /**
     * POST /api/teacher/grades/bulk
     */
    async bulkCreate(req: Request, res: Response, next: NextFunction) {
        try {
            const teacherId = (req as any).user.userId;
            // On a besoin de l'ID Enseignant réel, pas user.id
            const teacher = await this.getTeacherFromUser(teacherId);
            
            const data = BulkGradeSchema.parse(req.body);
            const result = await this.service.bulkCreate(teacher.id, data);
            
            res.status(201).json({
                success: true,
                data: result,
                message: "Les notes ont été enregistrées",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/teacher/grades/grid
     */
    async getGrid(req: Request, res: Response, next: NextFunction) {
        try {
            const teacherId = (req as any).user.userId;
            const teacher = await this.getTeacherFromUser(teacherId);
            
            const classId = parseInt(req.query.classId as string, 10);
            const subjectId = parseInt(req.query.subjectId as string, 10);
            
            const students = await this.service.getEntryGrid(teacher.id, classId, subjectId);
            res.json({
                success: true,
                data: students,
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
