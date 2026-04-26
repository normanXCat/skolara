"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRepository = void 0;
const client_1 = require("../../../prisma/client");
class SettingsRepository {
    async findAll() {
        const settings = await client_1.prisma.siteSettings.findMany();
        const result = {};
        for (const s of settings) {
            result[s.key] = s.value;
        }
        return result;
    }
    async upsertMany(data) {
        for (const [key, value] of Object.entries(data)) {
            await client_1.prisma.siteSettings.upsert({
                where: { key },
                update: { value },
                create: { key, value },
            });
        }
    }
}
exports.SettingsRepository = SettingsRepository;
//# sourceMappingURL=settings.repository.js.map