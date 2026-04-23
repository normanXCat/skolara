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
            parentEmailSentAt: Date | null;
            studentEmailSentAt: Date | null;
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
        }) | null;
        processedByUser: {
            id: number;
            name: string;
            firstName: string;
            email: string;
            passwordHash: string;
            role: import("../../../generated/prisma").$Enums.Role;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
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
        parentEmailSentAt: Date | null;
        studentEmailSentAt: Date | null;
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
        parentEmailSentAt: Date | null;
        studentEmailSentAt: Date | null;
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
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        classId: number | null;
        parentId: number | null;
    }>;
    /**
     * Envoie les emails de bienvenue après conversion.
     */
    private sendWelcomeEmails;
    /**
     * Renvoie les emails de bienvenue manuellement.
     */
    resendWelcomeEmails(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=admin-pre-registration.service.d.ts.map