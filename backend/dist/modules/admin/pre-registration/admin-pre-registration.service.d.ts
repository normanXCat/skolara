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
            childFirstName: string;
            childLastName: string;
            childDateOfBirth: Date;
            gender: string;
            desiredGrade: string;
            parentFirstName: string;
            parentFullName: string;
            parentEmail: string;
            parentPhone: string;
            updatedAt: Date;
            childEmail: string | null;
            previousSchool: string | null;
            parentAddress: string | null;
            fileNumber: string;
            receiptNumber: string | null;
            receiptImageUrl: string | null;
            documentUrls: string[];
            adminComment: string | null;
            processedBy: number | null;
            processedAt: Date | null;
            studentId: number | null;
            submittedAt: Date;
        }[];
        total: number;
        totalPages: number;
    }>;
    /**
     * Récupère le détail d'un dossier.
     */
    findById(id: number): Promise<{
        student: ({
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
        }) | null;
        processedByUser: {
            id: number;
            email: string;
            name: string;
            firstName: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        status: import("../../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        updatedAt: Date;
        childEmail: string | null;
        previousSchool: string | null;
        parentAddress: string | null;
        fileNumber: string;
        receiptNumber: string | null;
        receiptImageUrl: string | null;
        documentUrls: string[];
        adminComment: string | null;
        processedBy: number | null;
        processedAt: Date | null;
        studentId: number | null;
        submittedAt: Date;
    }>;
    /**
     * Met à jour le statut d'un dossier.
     */
    updateStatus(id: number, status: Status, adminId: number, comment?: string): Promise<{
        status: import("../../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        updatedAt: Date;
        childEmail: string | null;
        previousSchool: string | null;
        parentAddress: string | null;
        fileNumber: string;
        receiptNumber: string | null;
        receiptImageUrl: string | null;
        documentUrls: string[];
        adminComment: string | null;
        processedBy: number | null;
        processedAt: Date | null;
        studentId: number | null;
        submittedAt: Date;
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
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        classId: number | null;
        schoolYear: string;
        birthDate: Date;
        address: string | null;
        parentId: number | null;
    }>;
}
//# sourceMappingURL=admin-pre-registration.service.d.ts.map