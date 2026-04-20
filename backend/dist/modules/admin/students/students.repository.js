"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsRepository = void 0;
const client_1 = require("../../../prisma/client");
/**
 * Repository pour l'accès aux données des élèves.
 */
class StudentsRepository {
    /**
     * Récupère une liste paginée d'élèves avec filtres.
     */
    async findMany(filters) {
        const { page, limit, search, classId, level, status, schoolYear, orderBy, orderDir, } = filters;
        const where = {};
        if (search) {
            where.OR = [
                {
                    user: {
                        firstName: { contains: search, mode: "insensitive" },
                    },
                },
                { user: { name: { contains: search, mode: "insensitive" } } },
            ];
        }
        if (classId)
            where.classId = classId;
        if (level)
            where.class = { level: level };
        if (status)
            where.status = status;
        if (schoolYear)
            where.schoolYear = schoolYear;
        let order = {};
        if (orderBy === "name") {
            order.user = { name: orderDir };
        }
        else if (orderBy === "class") {
            order.class = { name: orderDir };
        }
        else {
            order.createdAt = orderDir;
        }
        const [data, total] = await Promise.all([
            client_1.prisma.student.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: order,
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            name: true,
                            email: true,
                            active: true,
                        },
                    },
                    class: true,
                },
            }),
            client_1.prisma.student.count({ where }),
        ]);
        return { data, total };
    }
    /**
     * Récupère les données complètes d'un élève.
     */
    async findById(id) {
        return client_1.prisma.student.findUnique({
            where: { id },
            include: {
                user: true,
                class: true,
                parent: {
                    include: { user: true },
                },
                marks: {
                    orderBy: { date: "desc" },
                    take: 20,
                },
                absences: {
                    orderBy: { date: "desc" },
                    take: 20,
                },
                payments: {
                    orderBy: { dueDate: "desc" },
                },
            },
        });
    }
    /**
     * Recherche un étudiant par son email (lié au user).
     */
    async findByUserEmail(email) {
        return client_1.prisma.student.findFirst({
            where: { user: { email } },
        });
    }
    /**
     * Crée un étudiant (utilisé dans les transactions).
     */
    async create(data, tx) {
        const client = tx || client_1.prisma;
        return client.student.create({ data });
    }
    /**
     * Met à jour un étudiant.
     */
    async update(id, data) {
        return client_1.prisma.student.update({
            where: { id },
            data,
            include: {
                user: true,
                class: true,
            },
        });
    }
    /**
     * Supprime physiquement ou archive (selon la politique).
     * Ici on suit la consigne : pas de suppression physique des données principales.
     */
    async setStatus(id, status) {
        return client_1.prisma.student.update({
            where: { id },
            data: { status },
        });
    }
    /**
     * Export de tous les élèves matchant les filtres sans pagination.
     */
    async findAllForExport(filters) {
        const { search, classId, level, status, schoolYear } = filters;
        const where = {};
        if (search) {
            where.OR = [
                {
                    user: {
                        firstName: { contains: search, mode: "insensitive" },
                    },
                },
                { user: { name: { contains: search, mode: "insensitive" } } },
            ];
        }
        if (classId)
            where.classId = classId;
        if (level)
            where.class = { level: level };
        if (status)
            where.status = status;
        if (schoolYear)
            where.schoolYear = schoolYear;
        return client_1.prisma.student.findMany({
            where,
            include: {
                user: true,
                class: true,
                parent: { include: { user: true } },
            },
            orderBy: { user: { name: "asc" } },
        });
    }
}
exports.StudentsRepository = StudentsRepository;
//# sourceMappingURL=students.repository.js.map