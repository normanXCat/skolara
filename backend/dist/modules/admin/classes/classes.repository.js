"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesRepository = void 0;
const client_1 = require("../../../prisma/client");
/**
 * Repository pour l'accès aux données des classes.
 */
class ClassesRepository {
    /**
     * Récupère une liste paginée de classes avec filtres.
     */
    async findMany(filters) {
        const { page, limit, search, level, schoolYear, headTeacherId, } = filters;
        const where = {};
        if (search) {
            where.name = { contains: search, mode: "insensitive" };
        }
        if (level)
            where.level = level;
        if (schoolYear)
            where.schoolYear = schoolYear;
        if (headTeacherId)
            where.headTeacherId = headTeacherId;
        const [data, total] = await Promise.all([
            client_1.prisma.class.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { name: "asc" },
                include: {
                    headTeacher: {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    name: true,
                                },
                            },
                        },
                    },
                    _count: {
                        select: { students: true },
                    },
                },
            }),
            client_1.prisma.class.count({ where }),
        ]);
        return { data, total };
    }
    /**
     * Récupère les données complètes d'une classe.
     */
    async findById(id) {
        return client_1.prisma.class.findUnique({
            where: { id },
            include: {
                headTeacher: {
                    include: { user: true },
                },
                students: {
                    include: { user: true },
                },
                assignments: {
                    include: {
                        teacher: { include: { user: true } },
                        subject: true,
                    },
                },
            },
        });
    }
    /**
     * Crée une classe.
     */
    async create(data) {
        return client_1.prisma.class.create({ data });
    }
    /**
     * Met à jour une classe.
     */
    async update(id, data) {
        return client_1.prisma.class.update({
            where: { id },
            data,
            include: {
                headTeacher: { include: { user: true } },
            },
        });
    }
    /**
     * Supprime une classe (soft delete non applicable ici par défaut, mais on vérifie si vide).
     */
    async delete(id) {
        return client_1.prisma.class.delete({
            where: { id },
        });
    }
    /**
     * Compte le nombre d'étudiants dans une classe.
     */
    async countStudents(id) {
        const result = await client_1.prisma.class.findUnique({
            where: { id },
            select: {
                _count: {
                    select: { students: true },
                },
            },
        });
        return result?._count.students ?? 0;
    }
}
exports.ClassesRepository = ClassesRepository;
//# sourceMappingURL=classes.repository.js.map