"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsencesRepository = void 0;
const client_1 = require("../../../prisma/client");
class AbsencesRepository {
    /**
     * Enregistre l'appel en masse pour une classe et une date donnée.
     * Utilise une transaction pour supprimer et recréer les records de la journée.
     */
    async saveRollCall(data) {
        const { classId, teacherId, date, records } = data;
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return client_1.prisma.$transaction(async (tx) => {
            // Supprimer l'existant pour cette classe/date
            await tx.absence.deleteMany({
                where: {
                    classId,
                    date: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            });
            // Créer les nouveaux records
            const results = [];
            for (const record of records) {
                results.push(await tx.absence.create({
                    data: {
                        studentId: record.studentId,
                        classId,
                        teacherId,
                        date,
                        status: record.status,
                        reason: record.reason,
                    },
                }));
            }
            return results;
        });
    }
    /**
     * Récupère les absences avec filtres.
     */
    async findAbsences(filters) {
        return client_1.prisma.absence.findMany({
            where: filters,
            include: {
                student: { include: { user: true, parent: { include: { user: true } } } },
                class: true,
                teacher: { include: { user: true } },
            },
            orderBy: { date: "desc" },
        });
    }
    /**
     * Justifie une absence.
     */
    async justify(id, data) {
        return client_1.prisma.absence.update({
            where: { id },
            data: {
                isJustified: data.isJustified,
                reason: data.reason
            }
        });
    }
    /**
     * Marque une notification parent comme envoyée.
     */
    async markNotified(id) {
        return client_1.prisma.absence.update({
            where: { id },
            data: { parentNotifiedAt: new Date() }
        });
    }
    /**
     * Récupère les élèves d'une classe.
     */
    async findStudentsByClass(classId) {
        return client_1.prisma.student.findMany({
            where: { classId, status: "ACTIVE" },
            include: { user: { select: { id: true, firstName: true, name: true } } },
            orderBy: { user: { name: "asc" } },
        });
    }
}
exports.AbsencesRepository = AbsencesRepository;
//# sourceMappingURL=absences.repository.js.map