import { Status } from "../../../generated/prisma";
/**
 * Service pour le traitement des pré-inscriptions par l'admin.
 */
export declare class AdminPreRegistrationService {
    /**
     * Liste toutes les pré-inscriptions avec filtres.
     */
    findAll(filters: any): Promise<{
        data: {
            status: import("../../../generated/prisma").$Enums.Status;
            id: number;
            parentEmail: string;
            parentPhone: string;
            childFirstName: string;
            childLastName: string;
            childDateOfBirth: Date;
            gender: string;
            desiredGrade: string;
            parentFirstName: string;
            parentFullName: string;
            childEmail: string | null;
            previousSchool: string | null;
            parentAddress: string | null;
            receiptNumber: string | null;
            receiptImageUrl: string | null;
            documentUrls: string[];
            fileNumber: string;
            adminComment: string | null;
            processedAt: Date | null;
            submittedAt: Date;
            updatedAt: Date;
            processedBy: number | null;
            studentId: number | null;
        }[];
        total: number;
        totalPages: number;
    }>;
    /**
     * Récupère le détail d'un dossier.
     */
    findById(id: number): Promise<{
        processedByUser: {
            id: number;
            firstName: string;
            email: string;
            updatedAt: Date;
            name: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
        } | null;
        student: ({
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
        }) | null;
    } & {
        status: import("../../../generated/prisma").$Enums.Status;
        id: number;
        parentEmail: string;
        parentPhone: string;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        childEmail: string | null;
        previousSchool: string | null;
        parentAddress: string | null;
        receiptNumber: string | null;
        receiptImageUrl: string | null;
        documentUrls: string[];
        fileNumber: string;
        adminComment: string | null;
        processedAt: Date | null;
        submittedAt: Date;
        updatedAt: Date;
        processedBy: number | null;
        studentId: number | null;
    }>;
    /**
     * Met à jour le statut d'un dossier.
     */
    updateStatus(id: number, status: Status, adminId: number, comment?: string): Promise<{
        status: import("../../../generated/prisma").$Enums.Status;
        id: number;
        parentEmail: string;
        parentPhone: string;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        childEmail: string | null;
        previousSchool: string | null;
        parentAddress: string | null;
        receiptNumber: string | null;
        receiptImageUrl: string | null;
        documentUrls: string[];
        fileNumber: string;
        adminComment: string | null;
        processedAt: Date | null;
        submittedAt: Date;
        updatedAt: Date;
        processedBy: number | null;
        studentId: number | null;
    }>;
    /**
     * Convertit une pré-inscription acceptée en élève réel.
     * Utilise une transaction Prisma pour l'atomicité.
     */
    convertToStudent(id: number, adminId: number, options: {
        classId?: number;
        createParentAccount: boolean;
    }): Promise<{
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
}
//# sourceMappingURL=admin-pre-registration.service.d.ts.map