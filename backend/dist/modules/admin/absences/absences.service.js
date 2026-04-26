"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAbsencesService = void 0;
class AdminAbsencesService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(filters) {
        return this.repository.findAll(filters);
    }
    async getStats() {
        return this.repository.getStats();
    }
    async justify(id, data) {
        const absence = await this.repository.findById(id);
        if (!absence) {
            throw { status: 404, message: "Absence non trouvée" };
        }
        return this.repository.justify(id, data);
    }
}
exports.AdminAbsencesService = AdminAbsencesService;
//# sourceMappingURL=absences.service.js.map