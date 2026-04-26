"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGradesRepository = void 0;
const client_1 = require("../../../prisma/client");
class AdminGradesRepository {
    /**
     * Récupère toutes les notes avec filtres et pagination.
     */
    async findAll(filters) {
        const where = {};
        if (filters.classId)
            where.classId = filters.classId;
        if (filters.subjectId)
            where.subjectId = filters.subjectId;
        if (filters.semester)
            where.semester = filters.semester;
        if (filters.studentId)
            where.studentId = filters.studentId;
        if (filters.search) {
            where.student = {
                user: {
                    OR: [
                        { firstName: { contains: filters.search, mode: "insensitive" } },
                        { name: { contains: filters.search, mode: "insensitive" } },
                    ],
                },
            };
        }
        const [grades, total] = await Promise.all([
            client_1.prisma.grade.findMany({
                where,
                include: {
                    student: { include: { user: { select: { id: true, firstName: true, name: true, email: true } } } },
                    subject: { select: { id: true, name: true, code: true, coefficient: true } },
                    teacher: { include: { user: { select: { id: true, firstName: true, name: true } } } },
                    class: { select: { id: true, name: true, level: true } },
                },
                orderBy: [{ gradedAt: "desc" }],
                skip: (filters.page - 1) * filters.limit,
                take: filters.limit,
            }),
            client_1.prisma.grade.count({ where }),
        ]);
        return {
            grades,
            pagination: {
                total,
                page: filters.page,
                limit: filters.limit,
                totalPages: Math.ceil(total / filters.limit),
            },
        };
    }
    /**
     * Statistiques globales des notes.
     */
    async getStats() {
        const [totalGrades, avgResult, distribution] = await Promise.all([
            client_1.prisma.grade.count(),
            client_1.prisma.grade.aggregate({ _avg: { value: true }, _max: { value: true }, _min: { value: true } }),
            client_1.prisma.grade.findMany({ select: { value: true } }),
        ]);
        const values = distribution.map((g) => g.value);
        return {
            totalGrades,
            average: avgResult._avg.value ? parseFloat(avgResult._avg.value.toFixed(2)) : 0,
            highest: avgResult._max.value || 0,
            lowest: avgResult._min.value || 0,
            distribution: [
                { range: "0-5", count: values.filter((v) => v >= 0 && v < 5).length },
                { range: "5-10", count: values.filter((v) => v >= 5 && v < 10).length },
                { range: "10-15", count: values.filter((v) => v >= 10 && v < 15).length },
                { range: "15-20", count: values.filter((v) => v >= 15 && v <= 20).length },
            ],
        };
    }
}
exports.AdminGradesRepository = AdminGradesRepository;
//# sourceMappingURL=grades.repository.js.map