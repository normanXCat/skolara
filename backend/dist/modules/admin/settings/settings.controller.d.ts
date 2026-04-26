import { Request, Response, NextFunction } from "express";
import { SettingsService } from "./settings.service";
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateAll(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=settings.controller.d.ts.map