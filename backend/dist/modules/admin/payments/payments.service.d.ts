export declare class PaymentsService {
    getAll(page: number, limit: number, search?: string, status?: string): Promise<{
        payments: any[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getStats(): Promise<{
        totalCollected: number;
        totalOutstanding: number;
        lateCount: number;
        pendingCount: number;
        paidCount: number;
        partialCount: number;
    }>;
    updatePayment(id: number, amountPaid: number, reference: string, paymentMethod: any): Promise<{
        status: import("../../../generated/prisma").$Enums.PaymentStatus;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        feeType: string;
        amountDue: number;
        amountPaid: number;
        dueDate: Date;
        paidAt: Date | null;
        paymentMethod: import("../../../generated/prisma").$Enums.PaymentMethod | null;
        reference: string | null;
        note: string | null;
    }>;
}
//# sourceMappingURL=payments.service.d.ts.map