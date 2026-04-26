import { prisma } from "../../../prisma/client";
import { AbsenceStatus } from "../../../generated/prisma";

export class AbsencesRepository {
    /**
     * Enregistre l'appel en masse pour une classe et une date donnée.
     * Utilise une transaction pour supprimer et recréer les records de la journée.
     */
    async saveRollCall(data: {
        classId: number;
        teacherId: number;
        date: Date;
        records: { studentId: number; status: AbsenceStatus; reason?: string | null }[];
    }) {
        const { classId, teacherId, date, records } = data;
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return prisma.$transaction(async (tx) => {
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

    /**
     * Justifie une absence.
     */
    async justify(id: number, data: { isJustified: boolean; reason: string }) {
        return prisma.absence.update({
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
    async markNotified(id: number) {
        return prisma.absence.update({
            where: { id },
            data: { parentNotifiedAt: new Date() }
        });
    }

    /**
     * Récupère les élèves d'une classe.
     */
    async findStudentsByClass(classId: number) {
        return prisma.student.findMany({
            where: { classId, status: "ACTIVE" },
            include: { user: { select: { id: true, firstName: true, name: true } } },
            orderBy: { user: { name: "asc" } },
        });
    }
}
