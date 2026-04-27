import { Prisma } from "../../../generated/prisma";
import { TeacherFiltersInput } from "./teachers.schema";
/**
 * Repository pour l'accès aux données des enseignants.
 */
export declare class TeachersRepository {
    /**
     * Récupère une liste paginée d'enseignants avec filtres.
     */
    findMany(filters: TeacherFiltersInput): Promise<{
        data: ({
            user: {
                id: number;
                name: string;
                firstName: string;
                email: string;
                active: boolean;
            };
            _count: {
                assignments: number;
            };
            assignments: ({
                subject: {
                    id: number;
                    name: string;
                    code: string;
                    createdAt: Date;
                    updatedAt: Date;
                    coefficient: number;
                    description: string | null;
                };
            } & {
                classId: number;
                subjectId: number;
                schoolYear: string;
                teacherId: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            phone: string | null;
            speciality: string | null;
        })[];
        total: number;
    }>;
    /**
     * Récupère les données complètes d'un enseignant.
     */
    findById(id: number): Promise<({
        user: {
            id: number;
            name: string;
            firstName: string;
            email: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        assignments: ({
            subject: {
                id: number;
                name: string;
                code: string;
                createdAt: Date;
                updatedAt: Date;
                coefficient: number;
                description: string | null;
            };
            class: {
                id: number;
                name: string;
                schoolYear: string;
                level: string;
                createdAt: Date;
                updatedAt: Date;
                headTeacherId: number | null;
                maxCapacity: number;
            };
        } & {
            classId: number;
            subjectId: number;
            schoolYear: string;
            teacherId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        phone: string | null;
        speciality: string | null;
    }) | null>;
    /**
     * Crée un enseignant.
     */
    create(data: Prisma.TeacherCreateInput, tx?: Prisma.TransactionClient): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        phone: string | null;
        speciality: string | null;
    }>;
    /**
     * Met à jour un enseignant.
     */
    update(id: number, data: Prisma.TeacherUpdateInput): Promise<{
        user: {
            id: number;
            name: string;
            firstName: string;
            email: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        phone: string | null;
        speciality: string | null;
    }>;
    /**
     * Ajoute une assignation.
     */
    addAssignment(teacherId: number, subjectId: number, classId: number, schoolYear: string): Promise<{
        classId: number;
        subjectId: number;
        schoolYear: string;
        teacherId: number;
    }>;
    /**
     * Supprime une assignation.
     */
    removeAssignment(teacherId: number, subjectId: number, classId: number, schoolYear: string): Promise<{
        classId: number;
        subjectId: number;
        schoolYear: string;
        teacherId: number;
    }>;
    /**
     * Vérifie si un conflit d'assignation existe.
     * Un seul enseignant par matière/classe/année.
     */
    findConflictingAssignment(subjectId: number, classId: number, schoolYear: string): Promise<({
        teacher: {
            user: {
                id: number;
                name: string;
                firstName: string;
                email: string;
                passwordHash: string;
                role: import("../../../generated/prisma").$Enums.Role;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            phone: string | null;
            speciality: string | null;
        };
    } & {
        classId: number;
        subjectId: number;
        schoolYear: string;
        teacherId: number;
    }) | null>;
}
//# sourceMappingURL=teachers.repository.d.ts.map