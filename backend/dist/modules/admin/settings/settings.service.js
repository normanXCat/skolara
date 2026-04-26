"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
class SettingsService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return this.repo.findAll();
    }
    async updateAll(data) {
        await this.repo.upsertMany(data);
    }
}
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map