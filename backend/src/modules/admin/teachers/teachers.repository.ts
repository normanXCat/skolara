import { prisma } from "../../../prisma/client";
import { Prisma } from "../../../generated/prisma";
import { TeacherFiltersInput } from "./teachers.schema";

/**
 * Repository pour l'accès aux données des enseignants.
 */
export class TeachersRepository {
    /**
     * Récupère une liste paginée d'enseignants avec filtres.
     */
    async findMany(filters: TeacherFiltersInput) {
        const { page, limit, search, speciality } = filters;

        const where: Prisma.TeacherWhereInput = {};

        if (search) {
            where.user = {
                OR: [
                    { firstName: { contains: search, mode: "insensitive" } },
                    { name: { contains: search, mode: "insensitive" } },
                ],
            };
        }

        if (speciality) {
            where.speciality = { contains: speciality, mode: "insensitive" };
        }

        const [data, total] = await Promise.all([
            prisma.teacher.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { user: { name: "asc" } },
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
                    _count: {
                        select: { assignments: true },
                    },
                    assignments: {
                        include: {
                            subject: true
                        }
                    }
                },
            }),
            prisma.teacher.count({ where }),
        ]);

        return { data, total };
    }

    /**
     * Récupère les données complètes d'un enseignant.
     */
    async findById(id: number) {
        return prisma.teacher.findUnique({
            where: { id },
            include: {
                user: true,
                assignments: {
                    include: {
                        subject: true,
                        class: true,
                    },
                },
            },
        });
    }

    /**
     * Crée un enseignant.
     */
    async create(data: Prisma.TeacherCreateInput, tx?: Prisma.TransactionClient) {
        const db = tx || prisma;
        return db.teacher.create({ data });
    }

    /**
     * Met à jour un enseignant.
     */
    async update(id: number, data: Prisma.TeacherUpdateInput) {
        return prisma.teacher.update({
            where: { id },
            data,
            include: { user: true },
        });
    }

    /**
     * Ajoute une assignation.
     */
    async addAssignment(teacherId: number, subjectId: number, classId: number, schoolYear: string) {
        return prisma.teacherSubjectClass.create({
            data: {
                teacherId,
                subjectId,
                classId,
                schoolYear,
            },
        });
    }

    /**
     * Supprime une assignation.
     */
    async removeAssignment(teacherId: number, subjectId: number, classId: number, schoolYear: string) {
        return prisma.teacherSubjectClass.delete({
            where: {
                teacherId_subjectId_classId_schoolYear: {
                    teacherId,
                    subjectId,
                    classId,
                    schoolYear,
                },
            },
        });
    }

    /**
     * Vérifie si un conflit d'assignation existe.
     * Un seul enseignant par matière/classe/année.
     */
    async findConflictingAssignment(subjectId: number, classId: number, schoolYear: string) {
        return prisma.teacherSubjectClass.findFirst({
            where: {
                subjectId,
                classId,
                schoolYear,
            },
            include: {
                teacher: { include: { user: true } },
            },
        });
    }
}
