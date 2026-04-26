import { AdminGradesRepository } from "./grades.repository";
import { AdminGradeFiltersInput } from "./grades.schema";

export class AdminGradesService {
    private repository: AdminGradesRepository;

    constructor(repository: AdminGradesRepository) {
        this.repository = repository;
    }

    async findAll(filters: AdminGradeFiltersInput) {
        return this.repository.findAll(filters);
    }

    async getStats() {
        return this.repository.getStats();
    }
}
