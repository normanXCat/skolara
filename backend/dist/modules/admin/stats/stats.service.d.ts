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
    }>;
}
//# sourceMappingURL=stats.service.d.ts.map