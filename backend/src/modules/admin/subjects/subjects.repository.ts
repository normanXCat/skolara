import { prisma } from "../../../prisma/client";
import { Prisma } from "../../../generated/prisma";
import { SubjectFiltersInput } from "./subjects.schema";

/**
 * Repository pour l'accès aux données des matières (Subjects).
 */
export class SubjectsRepository {
    /**
     * Récupère une liste paginée de matières avec filtres.
     */
    async findMany(filters: SubjectFiltersInput) {
        const { page, limit, search } = filters;

        const where: Prisma.SubjectWhereInput = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { code: { contains: search, mode: "insensitive" } },
            ];
        }

        const [data, total] = await Promise.all([
            prisma.subject.findMany({
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
            prisma.subject.count({ where }),
        ]);

        return { data, total };
    }

    /**
     * Récupère la liste complète des matières (all).
     */
    async findAll() {
        return prisma.subject.findMany({
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
    async findById(id: number) {
        return prisma.subject.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { 
                        assignments: true,
                        marks: true
                    },
                },
            },
        });
    }

    /**
     * Crée une matière.
     */
    async create(data: Prisma.SubjectCreateInput) {
        return prisma.subject.create({ data });
    }

    /**
     * Met à jour une matière.
     */
    async update(id: number, data: Prisma.SubjectUpdateInput) {
        return prisma.subject.update({
            where: { id },
            data,
        });
    }

    /**
     * Supprime une matière.
     */
    async delete(id: number) {
        return prisma.subject.delete({
            where: { id },
        });
    }

    /**
     * Vérifie si le code est déjà utilisé.
     */
    async findByCode(code: string) {
        return prisma.subject.findUnique({
            where: { code },
        });
    }
}
