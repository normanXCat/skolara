import { StudentsRepository } from "./students.repository";
import { CreateStudentInput, UpdateStudentInput, StudentFiltersInput } from "./students.schema";
/**
 * Service pour la logique métier des élèves.
 */
export declare class StudentsService {
    private repository;
    constructor(repository: StudentsRepository);
    /**
     * Crée un nouvel élève avec son compte utilisateur et (optionnellement) son parent.
     */
    create(data: CreateStudentInput): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
            firstName: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        parent: ({
            user: {
                id: number;
                email: string;
                name: string;
                firstName: string;
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
            address: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        classId: number | null;
        schoolYear: string;
        birthDate: Date;
        address: string | null;
        parentId: number | null;
    }>;
    /**
     * Récupère la liste paginée des élèves.
     */
    findAll(filters: StudentFiltersInput): Promise<{
        students: ({
            user: {
                id: number;
                email: string;
                name: string;
                firstName: string;
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
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            classId: number | null;
            schoolYear: string;
            birthDate: Date;
            address: string | null;
            parentId: number | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    /**
     * Détails d'un élève.
     */
    findById(id: number): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
            firstName: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        parent: ({
            user: {
                id: number;
                email: string;
                name: string;
                firstName: string;
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
            address: string | null;
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
            value: number;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            subject: string;
            coefficient: number;
            term: string;
            date: Date;
        }[];
        absences: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            date: Date;
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
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        classId: number | null;
        schoolYear: string;
        birthDate: Date;
        address: string | null;
        parentId: number | null;
    }>;
    /**
     * Mise à jour d'un élève.
     */
    update(id: number, data: UpdateStudentInput): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
            firstName: string;
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
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        classId: number | null;
        schoolYear: string;
        birthDate: Date;
        address: string | null;
        parentId: number | null;
    }>;
    /**
     * Archive un élève (statut ARCHIVED).
     */
    archive(id: number): Promise<{
        status: import("../../../generated/prisma").$Enums.StudentStatus;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        classId: number | null;
        schoolYear: string;
        birthDate: Date;
        address: string | null;
        parentId: number | null;
    }>;
    /**
     * Réactive un élève (statut ACTIVE).
     */
    restore(id: number): Promise<{
        status: import("../../../generated/prisma").$Enums.StudentStatus;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        classId: number | null;
        schoolYear: string;
        birthDate: Date;
        address: string | null;
        parentId: number | null;
    }>;
    /**
     * Prépare les données pour l'export CSV.
     */
    getExportData(filters: Omit<StudentFiltersInput, "page" | "limit">): Promise<{
        ID: number;
        "Nom de famille": string;
        Prénom: string;
        "Date de naissance": string;
        Classe: string;
        Niveau: string;
        Statut: string;
        "Ann\u00E9e scolaire": string;
        "Email Parent": string;
    }[]>;
}
//# sourceMappingURL=students.service.d.ts.map