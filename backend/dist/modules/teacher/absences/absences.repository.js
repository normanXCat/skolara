"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsencesRepository = void 0;
const client_1 = require("../../../prisma/client");
class AbsencesRepository {
    /**
     * Enregistre l'appel.
     */
    async saveRollCall(data) {
        const { classId, teacherId, date, items } = data;
        return client_1.prisma.$transaction([
            // On supprime l'appel existant pour cette date/classe s'il existe (pour éviter les doublons)
            client_1.prisma.absence.deleteMany({
                where: {
                    classId,
                    date: {
                        gte: new Date(date.setHours(0, 0, 0, 0)),
                        lt: new Date(date.setHours(23, 59, 59, 999)),
                    },
                },
            }),
            // On recrée les entrées (uniquement pour ABSENT et LATE)
            ...items
                .filter((item) => item.status !== "PRESENT")
                .map((item) => client_1.prisma.absence.create({
                data: {
                    studentId: item.studentId,
                    classId,
                    teacherId,
                    date,
                    status: item.status,
                    reason: item.reason,
                },
            })),
        ]);
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
}
exports.AbsencesRepository = AbsencesRepository;
//# sourceMappingURL=absences.repository.js.map