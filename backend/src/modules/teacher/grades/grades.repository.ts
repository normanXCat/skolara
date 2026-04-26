import { prisma } from "../../../prisma/client";

export class GradesRepository {
    /**
     * Crée ou met à jour des notes en masse au sein d'une transaction.
     * Si la valeur est null, la note est supprimée.
     */
    async bulkUpsert(data: {
        classId: number;
        subjectId: number;
        teacherId: number;
        semester: number;
        grades: { studentId: number; value: number | null; comment?: string | null }[];
    }) {
        const { classId, subjectId, teacherId, semester, grades } = data;

        return prisma.$transaction(async (tx) => {
            const results = [];
            for (const item of grades) {
                if (item.value === null) {
                    // Suppression de la note si elle existe
                    await tx.grade.deleteMany({
                        where: {
                            studentId: item.studentId,
                            classId,
                            subjectId,
                            semester
                        }
                    });
                } else {
                    // Update ou Create
                    const existing = await tx.grade.findFirst({
                        where: {
                            studentId: item.studentId,
                            classId,
                            subjectId,
                            semester
                        }
                    });

                    if (existing) {
                        results.push(await tx.grade.update({
                            where: { id: existing.id },
                            data: {
                                value: item.value,
                                comment: item.comment,
                                teacherId, // On met à jour l'enseignant qui a modifié en dernier
                                updatedAt: new Date()
                            }
                        }));
                    } else {
                        results.push(await tx.grade.create({
                            data: {
                                studentId: item.studentId,
                                classId,
                                subjectId,
                                teacherId,
                                semester,
                                value: item.value,
                                comment: item.comment
                            }
                        }));
                    }
                }
            }
            return results;
        });
    }

    /**
     * Récupère les notes d'une classe pour une matière et un semestre.
     */
    async findGrades(filters: { classId: number; subjectId: number; semester: number }) {
        return prisma.grade.findMany({
            where: {
                classId: filters.classId,
                subjectId: filters.subjectId,
                semester: filters.semester
            },
            include: {
                student: { include: { user: true } }
            }
        });
    }

    /**
     * Met à jour une note unique.
     */
    async update(id: number, data: { value: number; comment?: string | null }) {
        return prisma.grade.update({
            where: { id },
            data
        });
    }

    /**
     * Supprime une note.
     */
    async delete(id: number) {
        return prisma.grade.delete({
            where: { id }
        });
    }

    /**
     * Récupère les statistiques d'une classe pour une matière/semestre.
     */
    async getStats(classId: number, subjectId: number, semester: number) {
        const grades = await prisma.grade.findMany({
            where: { classId, subjectId, semester },
            select: { value: true }
        });

        const totalStudents = await prisma.student.count({
            where: { classId, status: "ACTIVE" }
        });

        if (grades.length === 0) {
            return {
                average: 0,
                highest: 0,
                lowest: 0,
                gradeCount: 0,
                totalStudents,
                distribution: [
                    { range: "0-5", count: 0 },
                    { range: "5-10", count: 0 },
                    { range: "10-15", count: 0 },
                    { range: "15-20", count: 0 }
                ]
            };
        }

        const values = grades.map((g: { value: number }) => g.value);
        const average = values.reduce((a: number, b: number) => a + b, 0) / values.length;
        const highest = Math.max(...values);
        const lowest = Math.min(...values);

        const distribution = [
            { range: "0-5", count: values.filter((v: number) => v >= 0 && v < 5).length },
            { range: "5-10", count: values.filter((v: number) => v >= 5 && v < 10).length },
            { range: "10-15", count: values.filter((v: number) => v >= 10 && v < 15).length },
            { range: "15-20", count: values.filter((v: number) => v >= 15 && v <= 20).length }
        ];

        return {
            average: parseFloat(average.toFixed(2)),
            highest,
            lowest,
            gradeCount: grades.length,
            totalStudents,
            distribution
        };
    }

    /**
     * Récupère la liste des élèves d'une classe.
     */
    async findStudentsByClass(classId: number) {
        return prisma.student.findMany({
            where: { classId, status: "ACTIVE" },
            include: { user: { select: { id: true, firstName: true, name: true } } },
            orderBy: { user: { name: "asc" } },
        });
    }

    /**
     * Vérifie si un enseignant est assigné à une classe/matière.
     */
    async isAssigned(teacherId: number, classId: number, subjectId: number) {
        const assignment = await prisma.teacherSubjectClass.findFirst({
            where: { teacherId, classId, subjectId }
        });
        return !!assignment;
    }
}
