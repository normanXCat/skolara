import { prisma } from "../../../prisma/client";
import { Prisma, AbsenceStatus } from "../../../generated/prisma";

export class AbsencesRepository {
    /**
     * Enregistre l'appel.
     */
    async saveRollCall(data: {
        classId: number;
        teacherId: number;
        date: Date;
        items: { studentId: number; status: AbsenceStatus; reason?: string | null }[];
    }) {
        const { classId, teacherId, date, items } = data;

        return prisma.$transaction([
            // On supprime l'appel existant pour cette date/classe s'il existe (pour éviter les doublons)
            prisma.absence.deleteMany({
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
                .map((item) =>
                    prisma.absence.create({
                        data: {
                            studentId: item.studentId,
                            classId,
                            teacherId,
                            date,
                            status: item.status,
                            reason: item.reason,
                        },
                    })
                ),
        ]);
    }

    /**
     * Récupère les absences avec filtres.
     */
    async findAbsences(filters: any) {
        return prisma.absence.findMany({
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
