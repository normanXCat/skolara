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
            firstName: string;
            email: string;
            updatedAt: Date;
            name: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
        };
        parent: ({
            user: {
                id: number;
                firstName: string;
                email: string;
                updatedAt: Date;
                name: string;
                passwordHash: string;
                role: import("../../../generated/prisma").$Enums.Role;
                active: boolean;
                createdAt: Date;
            };
        } & {
            id: number;
            address: string | null;
            updatedAt: Date;
            createdAt: Date;
            userId: number;
            phone: string;
        }) | null;
        class: {
            id: number;
            updatedAt: Date;
            name: string;
            createdAt: Date;
            level: string;
        } | null;
    } & {
        status: import("../../../generated/prisma").$Enums.StudentStatus;
        id: number;
        birthDate: Date;
        address: string | null;
        schoolYear: string;
        updatedAt: Date;
        createdAt: Date;
        userId: number;
        classId: number | null;
        parentId: number | null;
    }>;
    /**
     * Récupère la liste paginée des élèves.
     */
    findAll(filters: StudentFiltersInput): Promise<{
        students: ({
            user: {
                id: number;
                firstName: string;
                email: string;
                name: string;
                active: boolean;
            };
            class: {
                id: number;
                updatedAt: Date;
                name: string;
                createdAt: Date;
                level: string;
            } | null;
        } & {
            status: import("../../../generated/prisma").$Enums.StudentStatus;
            id: number;
            birthDate: Date;
            address: string | null;
            schoolYear: string;
            updatedAt: Date;
            createdAt: Date;
            userId: number;
            classId: number | null;
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
            firstName: string;
            email: string;
            updatedAt: Date;
            name: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
        };
        parent: ({
            user: {
                id: number;
                firstName: string;
                email: string;
                updatedAt: Date;
                name: string;
                passwordHash: string;
                role: import("../../../generated/prisma").$Enums.Role;
                active: boolean;
                createdAt: Date;
            };
        } & {
            id: number;
            address: string | null;
            updatedAt: Date;
            createdAt: Date;
            userId: number;
            phone: string;
        }) | null;
        class: {
            id: number;
            updatedAt: Date;
            name: string;
            createdAt: Date;
            level: string;
        } | null;
        marks: {
            id: number;
            date: Date;
            value: number;
            updatedAt: Date;
            studentId: number;
            createdAt: Date;
            subject: string;
            coefficient: number;
            term: string;
        }[];
        absences: {
            id: number;
            date: Date;
            updatedAt: Date;
            studentId: number;
            createdAt: Date;
            reason: string | null;
            justified: boolean;
        }[];
        payments: {
            status: import("../../../generated/prisma").$Enums.PaymentStatus;
            id: number;
            updatedAt: Date;
            studentId: number;
            createdAt: Date;
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
        updatedAt: Date;
        createdAt: Date;
        userId: number;
        classId: number | null;
        parentId: number | null;
    }>;
    /**
     * Mise à jour d'un élève.
     */
    update(id: number, data: UpdateStudentInput): Promise<{
        user: {
            id: number;
            firstName: string;
            email: string;
            updatedAt: Date;
            name: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
        };
        class: {
            id: number;
            updatedAt: Date;
            name: string;
            createdAt: Date;
            level: string;
        } | null;
    } & {
        status: import("../../../generated/prisma").$Enums.StudentStatus;
        id: number;
        birthDate: Date;
        address: string | null;
        schoolYear: string;
        updatedAt: Date;
        createdAt: Date;
        userId: number;
        classId: number | null;
        parentId: number | null;
    }>;
    /**
     * Archive un élève (statut ARCHIVED).
     */
    archive(id: number): Promise<{
        status: import("../../../generated/prisma").$Enums.StudentStatus;
        id: number;
        birthDate: Date;
        address: string | null;
        schoolYear: string;
        updatedAt: Date;
        createdAt: Date;
        userId: number;
        classId: number | null;
        parentId: number | null;
    }>;
    /**
     * Réactive un élève (statut ACTIVE).
     */
    restore(id: number): Promise<{
        status: import("../../../generated/prisma").$Enums.StudentStatus;
        id: number;
        birthDate: Date;
        address: string | null;
        schoolYear: string;
        updatedAt: Date;
        createdAt: Date;
        userId: number;
        classId: number | null;
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