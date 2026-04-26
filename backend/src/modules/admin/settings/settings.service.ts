import { SettingsRepository } from "./settings.repository";

export class SettingsService {
    constructor(private repo: SettingsRepository) {}

    async getAll(): Promise<Record<string, string>> {
        return this.repo.findAll();
    }

    async updateAll(data: Record<string, string>): Promise<void> {
        await this.repo.upsertMany(data);
    }
}
