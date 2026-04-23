"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradesRepository = void 0;
const client_1 = require("../../../prisma/client");
class GradesRepository {
    /**
     * Crée ou met à jour des notes en masse.
     */
    async bulkUpsert(data) {
        const { classId, subjectId, teacherId, term, coefficient, date, marks } = data;
        // On récupère le nom de la matière pour la compatibilité avec le champ 'subject' (string) existant
        const subjectRef = await client_1.prisma.subject.findUnique({ where: { id: subjectId } });
        const subjectName = subjectRef?.name || "Matière Inconnue";
        return client_1.prisma.$transaction(marks.map((m) => client_1.prisma.mark.create({
            data: {
                studentId: m.studentId,
                classId,
                subjectId,
                teacherId,
                subject: subjectName,
                value: m.value,
                comment: m.comment,
                term,
                coefficient,
                date,
            },
        })));
    }
    /**
     * Récupère les notes d'une classe pour une matière.
     */
    async findMarks(filters) {
        return client_1.prisma.mark.findMany({
            where: filters,
            include: {
                student: { include: { user: true } },
                subjectRef: true,
            },
            orderBy: { date: "desc" },
        });
    }
    /**
     * Récupère la liste des élèves d'une classe pour préparer la grille de saisie.
     */
    async findStudentsByClass(classId) {
        return client_1.prisma.student.findMany({
            where: { classId, status: "ACTIVE" },
            include: { user: { select: { id: true, firstName: true, name: true } } },
            orderBy: { user: { name: "asc" } },
        });
    }
}
exports.GradesRepository = GradesRepository;
//# sourceMappingURL=grades.repository.js.map