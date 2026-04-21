import { Prisma, StudentStatus } from "../../../generated/prisma";
import { StudentFiltersInput } from "./students.schema";
/**
 * Repository pour l'accès aux données des élèves.
 */
export declare class StudentsRepository {
    /**
     * Récupère une liste paginée d'élèves avec filtres.
     */
    findMany(filters: StudentFiltersInput): Promise<{
        data: ({
            user: {
                id: number;
                firstName: string;
                email: string;
                name: string;
                active: boolean;
            };
            class: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                level: string;
            } | null;
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
        total: number;
    }>;
    /**
     * Récupère les données complètes d'un élève.
     */
    findById(id: number): Promise<({
        user: {
            id: number;
            firstName: string;
            email: string;
            name: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        parent: ({
            user: {
                id: number;
                firstName: string;
                email: string;
                name: string;
                passwordHash: string;
                role: import("../../../generated/prisma").$Enums.Role;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            phone: string;
        }) | null;
        class: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            level: string;
        } | null;
        marks: {
            id: number;
            date: Date;
            value: number;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            subject: string;
            coefficient: number;
            term: string;
        }[];
        absences: {
            id: number;
            date: Date;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            reason: string | null;
            justified: boolean;
        }[];
        payments: {
            status: import("../../../generated/prisma").$Enums.PaymentStatus;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            amount: number;
            dueDate: Date;
            paymentDate: Date | null;
        }[];
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
    }) | null>;
    /**
     * Recherche un étudiant par son email (lié au user).
     */
    findByUserEmail(email: string): Promise<{
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
    } | null>;
    /**
     * Crée un étudiant (utilisé dans les transactions).
     */
    create(data: Prisma.StudentCreateInput, tx?: Prisma.TransactionClient): Promise<{
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
    }>;
    /**
     * Met à jour un étudiant.
     */
    update(id: number, data: Prisma.StudentUpdateInput): Promise<{
        user: {
            id: number;
            firstName: string;
            email: string;
            name: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        class: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            level: string;
        } | null;
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
    }>;
    /**
     * Supprime physiquement ou archive (selon la politique).
     * Ici on suit la consigne : pas de suppression physique des données principales.
     */
    setStatus(id: number, status: StudentStatus): Promise<{
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
    }>;
    /**
     * Export de tous les élèves matchant les filtres sans pagination.
     */
    findAllForExport(filters: Omit<StudentFiltersInput, "page" | "limit">): Promise<({
        user: {
            id: number;
            firstName: string;
            email: string;
            name: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        parent: ({
            user: {
                id: number;
                firstName: string;
                email: string;
                name: string;
                passwordHash: string;
                role: import("../../../generated/prisma").$Enums.Role;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            phone: string;
        }) | null;
        class: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            level: string;
        } | null;
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
    })[]>;
}
//# sourceMappingURL=students.repository.d.ts.map