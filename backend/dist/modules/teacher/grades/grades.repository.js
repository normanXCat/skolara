"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradesRepository = void 0;
const client_1 = require("../../../prisma/client");
class GradesRepository {
    /**
     * Crée ou met à jour des notes en masse au sein d'une transaction.
     * Si la valeur est null, la note est supprimée.
     */
    async bulkUpsert(data) {
        const { classId, subjectId, teacherId, semester, grades } = data;
        return client_1.prisma.$transaction(async (tx) => {
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
                }
                else {
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
                    }
                    else {
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
    async findGrades(filters) {
        return client_1.prisma.grade.findMany({
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
    async update(id, data) {
        return client_1.prisma.grade.update({
            where: { id },
            data
        });
    }
    /**
     * Supprime une note.
     */
    async delete(id) {
        return client_1.prisma.grade.delete({
            where: { id }
        });
    }
    /**
     * Récupère les statistiques d'une classe pour une matière/semestre.
     */
    async getStats(classId, subjectId, semester) {
        const grades = await client_1.prisma.grade.findMany({
            where: { classId, subjectId, semester },
            select: { value: true }
        });
        const totalStudents = await client_1.prisma.student.count({
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
        const values = grades.map((g) => g.value);
        const average = values.reduce((a, b) => a + b, 0) / values.length;
        const highest = Math.max(...values);
        const lowest = Math.min(...values);
        const distribution = [
            { range: "0-5", count: values.filter((v) => v >= 0 && v < 5).length },
            { range: "5-10", count: values.filter((v) => v >= 5 && v < 10).length },
            { range: "10-15", count: values.filter((v) => v >= 10 && v < 15).length },
            { range: "15-20", count: values.filter((v) => v >= 15 && v <= 20).length }
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
    async findStudentsByClass(classId) {
        return client_1.prisma.student.findMany({
            where: { classId, status: "ACTIVE" },
            include: { user: { select: { id: true, firstName: true, name: true } } },
            orderBy: { user: { name: "asc" } },
        });
    }
    /**
     * Vérifie si un enseignant est assigné à une classe/matière.
     */
    async isAssigned(teacherId, classId, subjectId) {
        const assignment = await client_1.prisma.teacherSubjectClass.findFirst({
            where: { teacherId, classId, subjectId }
        });
        return !!assignment;
    }
}
exports.GradesRepository = GradesRepository;
//# sourceMappingURL=grades.repository.js.map