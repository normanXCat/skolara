import { Request, Response, NextFunction } from "express";
import { ContactService } from "./contact.service";
export declare class ContactController {
    private contactService;
    constructor(contactService: ContactService);
    submitForm(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    findById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    markAsRead(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    reply(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    getUnreadCount(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=contact.controller.d.ts.map