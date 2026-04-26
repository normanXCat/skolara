import { SettingsRepository } from "./settings.repository";
export declare class SettingsService {
    private repo;
    constructor(repo: SettingsRepository);
    getAll(): Promise<Record<string, string>>;
    updateAll(data: Record<string, string>): Promise<void>;
}
//# sourceMappingURL=settings.service.d.ts.map