import { Request, Response, NextFunction } from "express";
export declare class TimetablesController {
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getConflicts(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: TimetablesController;
export default _default;
//# sourceMappingURL=timetables.controller.d.ts.map