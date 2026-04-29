/**
 * Service pour la génération des statistiques du tableau de bord admin.
 */
export declare class StatsService {
    /**
     * Récupère les indicateurs clés (KPI) et les données pour les graphiques.
     */
    getAdminStats(): Promise<{
        totalStudents: number;
        totalTeachers: number;
        totalClasses: number;
        todayAttendanceRate: number;
        pendingPayments: number;
        latePayments: number;
        pendingPreRegistrations: number;
        enrollmentEvolution: {
            month: string;
            total: number;
        }[];
        paymentAlerts: {
            id: number;
            studentName: string;
            amount: number;
            dueDate: Date;
        }[];
        latestPreRegistrations: {
            id: number;
            status: import("../../../generated/prisma").$Enums.Status;
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
    }>;
}
//# sourceMappingURL=stats.service.d.ts.map