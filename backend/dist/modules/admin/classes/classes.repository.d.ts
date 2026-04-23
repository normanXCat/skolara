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
            maxCapacity: number;
            headTeacherId: number | null;
        })[];
        total: number;
    }>;
    /**
     * Récupère les données complètes d'une classe.
     */
    findById(id: number): Promise<({
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
            birthDate: Date;
            address: string | null;
            schoolYear: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            classId: number | null;
            parentId: number | null;
        })[];
        assignments: ({
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
        maxCapacity: number;
        headTeacherId: number | null;
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
        maxCapacity: number;
        headTeacherId: number | null;
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
        maxCapacity: number;
        headTeacherId: number | null;
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
        maxCapacity: number;
        headTeacherId: number | null;
    }>;
    /**
     * Compte le nombre d'étudiants dans une classe.
     */
    countStudents(id: number): Promise<number>;
}
//# sourceMappingURL=classes.repository.d.ts.map