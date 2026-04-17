import { Request, Response, NextFunction } from "express";
import gradeService from "./grade.service";

export class GradeController {
    /**
     * GET /api/grades
     * Récupère tous les grades disponibles.
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const grades = await gradeService.getAllGrades();
            res.status(200).json({
                success: true,
                data: grades,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new GradeController();
