"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const settings_schema_1 = require("./settings.schema");
class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getAll(req, res, next) {
        try {
            const data = await this.settingsService.getAll();
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async updateAll(req, res, next) {
        try {
            const validated = settings_schema_1.updateSettingsSchema.parse(req.body);
            await this.settingsService.updateAll(validated);
            res.json({ success: true, message: "Paramètres mis à jour avec succès." });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map