import { prisma } from "../../../prisma/client";
import { Prisma } from "../../../generated/prisma";

export class GradesRepository {
    /**
     * Crée ou met à jour des notes en masse.
     */
    async bulkUpsert(data: {
        classId: number;
        subjectId: number;
        teacherId: number;
        term: string;
        coefficient: number;
        date: Date;
        marks: { studentId: number; value: number; comment?: string | null }[];
    }) {
        const { classId, subjectId, teacherId, term, coefficient, date, marks } = data;

        // On récupère le nom de la matière pour la compatibilité avec le champ 'subject' (string) existant
        const subjectRef = await prisma.subject.findUnique({ where: { id: subjectId } });
        const subjectName = subjectRef?.name || "Matière Inconnue";

        return prisma.$transaction(
            marks.map((m) =>
                prisma.mark.create({
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
                })
            )
        );
    }

    /**
     * Récupère les notes d'une classe pour une matière.
     */
    async findMarks(filters: { classId?: number; subjectId?: number; term?: string }) {
        return prisma.mark.findMany({
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
    async findStudentsByClass(classId: number) {
        return prisma.student.findMany({
            where: { classId, status: "ACTIVE" },
            include: { user: { select: { id: true, firstName: true, name: true } } },
            orderBy: { user: { name: "asc" } },
        });
    }
}
