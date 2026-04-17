import { Request, Response, NextFunction } from "express";
export declare class GradeController {
    /**
     * GET /api/grades
     * Récupère tous les grades disponibles.
     */
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: GradeController;
export default _default;
//# sourceMappingURL=grade.controller.d.ts.map