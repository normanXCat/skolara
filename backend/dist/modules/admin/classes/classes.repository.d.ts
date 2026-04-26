import { Prisma } from "../../../generated/prisma";
import { ClassFiltersInput } from "./classes.schema";
/**
 * Repository pour l'accès aux données des classes.
 */
export declare class ClassesRepository {
    /**
     * Récupère une liste paginée de classes avec filtres.
     */
    findMany(filters: ClassFiltersInput): Promise<{
        data: ({
            _count: {
                students: number;
            };
            headTeacher: ({
                user: {
                    name: string;
                    firstName: string;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
                phone: string | null;
                speciality: string | null;
            }) | null;
        } & {
            id: number;
            name: string;
            schoolYear: string;
            level: string;
            createdAt: Date;
            updatedAt: Date;
            headTeacherId: number | null;
            maxCapacity: number;
        })[];
        total: number;
    }>;
    /**
     * Récupère les données complètes d'une classe.
     */
    findById(id: number): Promise<({
        headTeacher: ({
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
        }) | null;
        students: ({
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
            status: import("../../../generated/prisma").$Enums.StudentStatus;
            id: number;
            classId: number | null;
            birthDate: Date;
            address: string | null;
            schoolYear: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            parentId: number | null;
        })[];
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
        })[];
    } & {
        id: number;
        name: string;
        schoolYear: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        headTeacherId: number | null;
        maxCapacity: number;
    }) | null>;
    /**
     * Crée une classe.
     */
    create(data: Prisma.ClassCreateInput): Promise<{
        id: number;
        name: string;
        schoolYear: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        headTeacherId: number | null;
        maxCapacity: number;
    }>;
    /**
     * Met à jour une classe.
     */
    update(id: number, data: Prisma.ClassUpdateInput): Promise<{
        headTeacher: ({
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
        }) | null;
    } & {
        id: number;
        name: string;
        schoolYear: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        headTeacherId: number | null;
        maxCapacity: number;
    }>;
    /**
     * Supprime une classe (soft delete non applicable ici par défaut, mais on vérifie si vide).
     */
    delete(id: number): Promise<{
        id: number;
        name: string;
        schoolYear: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        headTeacherId: number | null;
        maxCapacity: number;
    }>;
    /**
     * Compte le nombre d'étudiants dans une classe.
     */
    countStudents(id: number): Promise<number>;
}
//# sourceMappingURL=classes.repository.d.ts.map