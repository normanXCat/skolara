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
            headTeacherId: number | null;
            maxCapacity: number;
        } | null;
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
    }>;
    /**
     * Récupère la liste paginée des élèves.
     */
    findAll(filters: StudentFiltersInput): Promise<{
        students: ({
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
                headTeacherId: number | null;
                maxCapacity: number;
            } | null;
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
            headTeacherId: number | null;
            maxCapacity: number;
        } | null;
        absences: {
            status: import("../../../generated/prisma").$Enums.AbsenceStatus;
            id: number;
            classId: number;
            isJustified: boolean;
            reason: string | null;
            date: Date;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            parentNotifiedAt: Date | null;
            teacherId: number;
        }[];
        grades: {
            value: number;
            id: number;
            classId: number;
            subjectId: number;
            semester: number;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            teacherId: number;
            comment: string | null;
            gradedAt: Date;
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
        classId: number | null;
        birthDate: Date;
        address: string | null;
        schoolYear: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        parentId: number | null;
    }>;
    /**
     * Mise à jour d'un élève.
     */
    update(id: number, data: UpdateStudentInput): Promise<{
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
            headTeacherId: number | null;
            maxCapacity: number;
        } | null;
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
    }>;
    /**
     * Archive un élève (statut ARCHIVED).
     */
    archive(id: number): Promise<{
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
    }>;
    /**
     * Réactive un élève (statut ACTIVE).
     */
    restore(id: number): Promise<{
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