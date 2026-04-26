import { Request, Response, NextFunction } from "express";
import { CalendarService } from "./calendar.service";
export declare class CalendarController {
    private calendarService;
    constructor(calendarService: CalendarService);
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    findById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAllTypes(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=calendar.controller.d.ts.map