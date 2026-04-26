import { prisma } from "../../../prisma/client";

export class SettingsRepository {
    async findAll(): Promise<Record<string, string>> {
        const settings = await prisma.siteSettings.findMany();
        const result: Record<string, string> = {};
        for (const s of settings) {
            result[s.key] = s.value;
        }
        return result;
    }

    async upsertMany(data: Record<string, string>): Promise<void> {
        for (const [key, value] of Object.entries(data)) {
            await prisma.siteSettings.upsert({
                where: { key },
                update: { value },
                create: { key, value },
            });
        }
    }
}
