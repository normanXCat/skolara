import { AdminAbsencesRepository } from "./absences.repository";
import { AdminAbsenceFiltersInput, AdminJustifyAbsenceInput } from "./absences.schema";

export class AdminAbsencesService {
    private repository: AdminAbsencesRepository;

    constructor(repository: AdminAbsencesRepository) {
        this.repository = repository;
    }

    async findAll(filters: AdminAbsenceFiltersInput) {
        return this.repository.findAll(filters);
    }

    async getStats() {
        return this.repository.getStats();
    }

    async justify(id: number, data: AdminJustifyAbsenceInput) {
        const absence = await this.repository.findById(id);
        if (!absence) {
            throw { status: 404, message: "Absence non trouvée" };
        }
        return this.repository.justify(id, data);
    }
}
