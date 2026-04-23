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
                schoolYear: string;
                classId: number;
                teacherId: number;
                subjectId: number;
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
            class: {
                id: number;
                name: string;
                schoolYear: string;
                level: string;
                createdAt: Date;
                updatedAt: Date;
                maxCapacity: number;
                headTeacherId: number | null;
            };
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
            schoolYear: string;
            classId: number;
            teacherId: number;
            subjectId: number;
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
        schoolYear: string;
        classId: number;
        teacherId: number;
        subjectId: number;
    }>;
    /**
     * Supprime une assignation.
     */
    removeAssignment(teacherId: number, subjectId: number, classId: number, schoolYear: string): Promise<{
        schoolYear: string;
        classId: number;
        teacherId: number;
        subjectId: number;
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
        schoolYear: string;
        classId: number;
        teacherId: number;
        subjectId: number;
    }) | null>;
}
//# sourceMappingURL=teachers.repository.d.ts.map