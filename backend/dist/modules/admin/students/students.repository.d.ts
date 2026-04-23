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
                name: string;
                firstName: string;
                email: string;
                active: boolean;
            };
            class: {
                id: number;
                name: string;
                schoolYear: string;
                level: string;
                createdAt: Date;
                updatedAt: Date;
                maxCapacity: number;
                headTeacherId: number | null;
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
            name: string;
            firstName: string;
            email: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        parent: ({
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
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            phone: string;
        }) | null;
        absences: {
            status: import("../../../generated/prisma").$Enums.AbsenceStatus;
            id: number;
            date: Date;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            classId: number | null;
            teacherId: number | null;
            reason: string | null;
            justified: boolean;
            parentNotifiedAt: Date | null;
        }[];
        marks: {
            value: number;
            id: number;
            date: Date;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            classId: number | null;
            subject: string;
            teacherId: number | null;
            subjectId: number | null;
            coefficient: number;
            semester: number | null;
            comment: string | null;
            term: string;
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
        class: {
            id: number;
            name: string;
            schoolYear: string;
            level: string;
            createdAt: Date;
            updatedAt: Date;
            maxCapacity: number;
            headTeacherId: number | null;
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
            name: string;
            firstName: string;
            email: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        class: {
            id: number;
            name: string;
            schoolYear: string;
            level: string;
            createdAt: Date;
            updatedAt: Date;
            maxCapacity: number;
            headTeacherId: number | null;
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
            name: string;
            firstName: string;
            email: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        parent: ({
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
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            phone: string;
        }) | null;
        class: {
            id: number;
            name: string;
            schoolYear: string;
            level: string;
            createdAt: Date;
            updatedAt: Date;
            maxCapacity: number;
            headTeacherId: number | null;
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