import { prisma } from "../../../prisma/client";
import { Prisma } from "../../../generated/prisma";
import { ClassFiltersInput } from "./classes.schema";

/**
 * Repository pour l'accès aux données des classes.
 */
export class ClassesRepository {
    /**
     * Récupère une liste paginée de classes avec filtres.
     */
    async findMany(filters: ClassFiltersInput) {
        const {
            page,
            limit,
            search,
            level,
            schoolYear,
            headTeacherId,
        } = filters;

        const where: Prisma.ClassWhereInput = {};

        if (search) {
            where.name = { contains: search, mode: "insensitive" };
        }

        if (level) where.level = level;
        if (schoolYear) where.schoolYear = schoolYear;
        if (headTeacherId) where.headTeacherId = headTeacherId;

        const [data, total] = await Promise.all([
            prisma.class.findMany({
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
            prisma.class.count({ where }),
        ]);

        return { data, total };
    }

    /**
     * Récupère les données complètes d'une classe.
     */
    async findById(id: number) {
        return prisma.class.findUnique({
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
    async create(data: Prisma.ClassCreateInput) {
        return prisma.class.create({ data });
    }

    /**
     * Met à jour une classe.
     */
    async update(id: number, data: Prisma.ClassUpdateInput) {
        return prisma.class.update({
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
    async delete(id: number) {
        return prisma.class.delete({
            where: { id },
        });
    }

    /**
     * Compte le nombre d'étudiants dans une classe.
     */
    async countStudents(id: number) {
        const result = await prisma.class.findUnique({
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
