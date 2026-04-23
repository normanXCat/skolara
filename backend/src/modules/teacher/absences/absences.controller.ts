import { Request, Response, NextFunction } from "express";
import { AbsencesService } from "./absences.service";
import { RollCallSchema, AbsenceFiltersSchema } from "./absences.schema";

export class AbsencesController {
    private service: AbsencesService;

    constructor(service: AbsencesService) {
        this.service = service;
    }

    /**
     * POST /api/teacher/absences/roll-call
     */
    async saveRollCall(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const teacher = await this.getTeacherFromUser(userId);
            
            const data = RollCallSchema.parse(req.body);
            const result = await this.service.saveRollCall(teacher.id, data);
            
            res.status(201).json({
                success: true,
                data: result,
                message: "L'appel a été enregistré avec succès",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/teacher/absences
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
