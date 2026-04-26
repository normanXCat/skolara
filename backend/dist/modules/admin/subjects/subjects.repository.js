"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsRepository = void 0;
const client_1 = require("../../../prisma/client");
/**
 * Repository pour l'accès aux données des matières (Subjects).
 */
class SubjectsRepository {
    /**
     * Récupère une liste paginée de matières avec filtres.
     */
    async findMany(filters) {
        const { page, limit, search } = filters;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { code: { contains: search, mode: "insensitive" } },
            ];
        }
        const [data, total] = await Promise.all([
            client_1.prisma.subject.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { name: "asc" },
                include: {
                    _count: {
                        select: { assignments: true },
                    },
                },
            }),
            client_1.prisma.subject.count({ where }),
        ]);
        return { data, total };
    }
    /**
     * Récupère la liste complète des matières (all).
     */
    async findAll() {
        return client_1.prisma.subject.findMany({
            orderBy: { name: "asc" },
            select: {
                id: true,
                name: true,
                code: true,
                coefficient: true,
                description: true,
            }
        });
    }
    /**
     * Récupère les données d'une matière par ID.
     */
    async findById(id) {
        return client_1.prisma.subject.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        assignments: true,
                        grades: true
                    },
                },
            },
        });
    }
    /**
     * Crée une matière.
     */
    async create(data) {
        return client_1.prisma.subject.create({ data });
    }
    /**
     * Met à jour une matière.
     */
    async update(id, data) {
        return client_1.prisma.subject.update({
            where: { id },
            data,
        });
    }
    /**
     * Supprime une matière.
     */
    async delete(id) {
        return client_1.prisma.subject.delete({
            where: { id },
        });
    }
    /**
     * Vérifie si le code est déjà utilisé.
     */
    async findByCode(code) {
        return client_1.prisma.subject.findUnique({
            where: { code },
        });
    }
}
exports.SubjectsRepository = SubjectsRepository;
//# sourceMappingURL=subjects.repository.js.map