"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersRepository = void 0;
const client_1 = require("../../../prisma/client");
/**
 * Repository pour l'accès aux données des enseignants.
 */
class TeachersRepository {
    /**
     * Récupère une liste paginée d'enseignants avec filtres.
     */
    async findMany(filters) {
        const { page, limit, search, speciality } = filters;
        const where = {};
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
            client_1.prisma.teacher.findMany({
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
            client_1.prisma.teacher.count({ where }),
        ]);
        return { data, total };
    }
    /**
     * Récupère les données complètes d'un enseignant.
     */
    async findById(id) {
        return client_1.prisma.teacher.findUnique({
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
    async create(data, tx) {
        const db = tx || client_1.prisma;
        return db.teacher.create({ data });
    }
    /**
     * Met à jour un enseignant.
     */
    async update(id, data) {
        return client_1.prisma.teacher.update({
            where: { id },
            data,
            include: { user: true },
        });
    }
    /**
     * Ajoute une assignation.
     */
    async addAssignment(teacherId, subjectId, classId, schoolYear) {
        return client_1.prisma.teacherSubjectClass.create({
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
    async removeAssignment(teacherId, subjectId, classId, schoolYear) {
        return client_1.prisma.teacherSubjectClass.delete({
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
    async findConflictingAssignment(subjectId, classId, schoolYear) {
        return client_1.prisma.teacherSubjectClass.findFirst({
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
exports.TeachersRepository = TeachersRepository;
//# sourceMappingURL=teachers.repository.js.map