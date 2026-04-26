import { prisma } from "../../../prisma/client";
import { AdminAbsenceFiltersInput } from "./absences.schema";

export class AdminAbsencesRepository {
    /**
     * Récupère toutes les absences avec filtres et pagination.
     */
    async findAll(filters: AdminAbsenceFiltersInput) {
        const where: any = {};

        if (filters.classId) where.classId = filters.classId;
        if (filters.studentId) where.studentId = filters.studentId;
        if (filters.status) where.status = filters.status;
        if (filters.isJustified !== undefined) where.isJustified = filters.isJustified;

        // Filtre de plage de dates
        if (filters.dateFrom || filters.dateTo) {
            where.date = {};
            if (filters.dateFrom) {
                where.date.gte = new Date(filters.dateFrom);
            }
            if (filters.dateTo) {
                const endDate = new Date(filters.dateTo);
                endDate.setHours(23, 59, 59, 999);
                where.date.lte = endDate;
            }
        }

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

        const [absences, total] = await Promise.all([
            prisma.absence.findMany({
                where,
                include: {
                    student: {
                        include: {
                            user: { select: { id: true, firstName: true, name: true, email: true } },
                            parent: { include: { user: { select: { firstName: true, name: true, email: true } } } },
                        },
                    },
                    teacher: { include: { user: { select: { id: true, firstName: true, name: true } } } },
                    class: { select: { id: true, name: true, level: true } },
                },
                orderBy: { date: "desc" },
                skip: (filters.page - 1) * filters.limit,
                take: filters.limit,
            }),
            prisma.absence.count({ where }),
        ]);

        return {
            absences,
            pagination: {
                total,
                page: filters.page,
                limit: filters.limit,
                totalPages: Math.ceil(total / filters.limit),
            },
        };
    }

    /**
     * Statistiques globales des absences.
     */
    async getStats() {
        const [totalAbsences, absentCount, lateCount, justifiedCount, unjustifiedCount, monthlyData, classData] = await Promise.all([
            prisma.absence.count({ where: { status: { in: ["ABSENT", "LATE"] } } }),
            prisma.absence.count({ where: { status: "ABSENT" } }),
            prisma.absence.count({ where: { status: "LATE" } }),
            prisma.absence.count({ where: { status: { in: ["ABSENT", "LATE"] }, isJustified: true } }),
            prisma.absence.count({ where: { status: { in: ["ABSENT", "LATE"] }, isJustified: false } }),
            // Monthly trend (last 6 months)
            prisma.absence.groupBy({
                by: ['date'],
                _count: { _all: true },
                where: { status: { in: ["ABSENT", "LATE"] } },
                orderBy: { date: 'asc' }
            }),
            // Absences by class
            prisma.absence.groupBy({
                by: ['classId'],
                _count: { _all: true },
                where: { status: { in: ["ABSENT", "LATE"] } },
                orderBy: { _count: { classId: 'desc' } },
                take: 5
            })
        ]);

        // Process monthly data to group by month name
        const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
        const monthlyStatsMap = new Map<string, number>();
        
        monthlyData.forEach(item => {
            const date = new Date(item.date);
            const monthName = months[date.getMonth()];
            monthlyStatsMap.set(monthName, (monthlyStatsMap.get(monthName) || 0) + item._count._all);
        });

        const monthlyTrend = Array.from(monthlyStatsMap.entries()).map(([month, count]) => ({
            month,
            count
        }));

        // Get class names for class stats
        const topClasses = await Promise.all(classData.map(async item => {
            const cls = await prisma.class.findUnique({ where: { id: item.classId }, select: { name: true } });
            return {
                name: cls?.name || "Inconnue",
                count: item._count._all
            };
        }));

        return {
            totalAbsences,
            absentCount,
            lateCount,
            justifiedCount,
            unjustifiedCount,
            monthlyTrend,
            topClasses,
            distribution: [
                { name: "Absences", value: absentCount },
                { name: "Retards", value: lateCount }
            ]
        };
    }

    /**
     * Justifie une absence.
     */
    async justify(id: number, data: { isJustified: boolean; reason: string }) {
        return prisma.absence.update({
            where: { id },
            data: {
                isJustified: data.isJustified,
                reason: data.reason,
            },
        });
    }

    /**
     * Récupère une absence par ID.
     */
    async findById(id: number) {
        return prisma.absence.findUnique({
            where: { id },
            include: {
                student: { include: { user: true } },
                teacher: { include: { user: true } },
                class: true,
            },
        });
    }
}
