import { Request, Response, NextFunction } from "express";
import { SettingsService } from "./settings.service";
import { updateSettingsSchema } from "./settings.schema";

export class SettingsController {
    constructor(private settingsService: SettingsService) {}

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.settingsService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    async updateAll(req: Request, res: Response, next: NextFunction) {
        try {
            const validated = updateSettingsSchema.parse(req.body);
            await this.settingsService.updateAll(validated as Record<string, string>);
            res.json({ success: true, message: "Paramètres mis à jour avec succès." });
        } catch (error) {
            next(error);
        }
    }
}
