import { Request, Response, NextFunction } from "express";
import { AdminPreRegistrationService } from "./admin-pre-registration.service";
/**
 * Contrôleur pour la gestion admin des pré-inscriptions.
 */
export declare class AdminPreRegistrationController {
    private service;
    constructor(service: AdminPreRegistrationService);
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    findById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateStatus(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    convert(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=admin-pre-registration.controller.d.ts.map