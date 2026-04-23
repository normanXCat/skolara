"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradesService = void 0;
const client_1 = require("../../../prisma/client");
class GradesService {
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Saisie groupée de notes.
     */
    async bulkCreate(teacherId, data) {
        // Vérifier que l'enseignant est bien assigné à cette classe/matière
        const assignment = await client_1.prisma.teacherSubjectClass.findFirst({
            where: {
                teacherId,
                classId: data.classId,
                subjectId: data.subjectId,
            },
        });
        if (!assignment) {
            throw { status: 403, message: "Vous n'êtes pas autorisé à saisir des notes pour cette classe et cette matière" };
        }
        return this.repository.bulkUpsert({
            ...data,
            teacherId,
        });
    }
    /**
     * Liste des élèves pour la saisie.
     */
    async getEntryGrid(teacherId, classId, subjectId) {
        const students = await this.repository.findStudentsByClass(classId);
        return students;
    }
    /**
     * Historique des notes saisies.
     */
    async getHistory(filters) {
        return this.repository.findMarks(filters);
    }
}
exports.GradesService = GradesService;
//# sourceMappingURL=grades.service.js.map