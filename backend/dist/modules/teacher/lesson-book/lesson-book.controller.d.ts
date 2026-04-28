import { Request, Response, NextFunction } from "express";
export declare class TeacherLessonBookController {
    getLessonBooks(req: Request, res: Response, next: NextFunction): Promise<void>;
    createLesson(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    updateLesson(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteLesson(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=lesson-book.controller.d.ts.map