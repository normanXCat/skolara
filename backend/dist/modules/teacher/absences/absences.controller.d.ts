import { Request, Response, NextFunction } from "express";
import { AbsencesService } from "./absences.service";
export declare class AbsencesController {
    private service;
    constructor(service: AbsencesService);
    /**
     * GET /api/teacher/absences/:classId/students
     * Liste des élèves d'une classe pour l'appel.
     */
    getClassStudents(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * POST /api/teacher/absences/:classId/roll-call
     * Enregistre l'appel pour une classe.
     */
    saveRollCall(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/teacher/absences/:classId/roll-call
     * Récupère l'appel pour une date donnée.
     */
    getRollCall(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * PUT /api/teacher/absences/:id/justify
     * Justifie une absence.
     */
    justifyAbsence(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/teacher/absences
     * Historique des absences avec filtres.
     */
    getHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
    private getTeacherFromUser;
}
//# sourceMappingURL=absences.controller.d.ts.map