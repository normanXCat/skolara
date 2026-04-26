import { Request, Response, NextFunction } from "express";
import { GradesService } from "./grades.service";
export declare class GradesController {
    private service;
    constructor(service: GradesService);
    /**
     * GET /api/teacher/grades
     * Liste des assignations de l'enseignant.
     */
    getAssignments(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/teacher/grades/:classId/:subjectId
     * Grille de notes.
     */
    getGrid(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * POST /api/teacher/grades/:classId/:subjectId
     * Sauvegarde groupée.
     */
    bulkSave(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PUT /api/teacher/grades/:id
     * Mise à jour d'une note unique.
     */
    updateGrade(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * DELETE /api/teacher/grades/:id
     * Suppression d'une note.
     */
    deleteGrade(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/teacher/grades/:classId/:subjectId/stats
     * Stats de classe.
     */
    getStats(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    private getTeacherFromUser;
}
//# sourceMappingURL=grades.controller.d.ts.map