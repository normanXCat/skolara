"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGradesService = void 0;
class AdminGradesService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(filters) {
        return this.repository.findAll(filters);
    }
    async getStats() {
        return this.repository.getStats();
    }
}
exports.AdminGradesService = AdminGradesService;
//# sourceMappingURL=grades.service.js.map