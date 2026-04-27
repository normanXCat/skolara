"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const client_1 = require("../../../prisma/client");
const compute_status_1 = require("../../../lib/payments/compute-status");
const create_1 = require("../../../lib/notifications/create");
const send_1 = require("../../../lib/email/send");
const PaymentConfirmation_1 = require("../../../lib/email/templates/PaymentConfirmation");
const prisma_1 = require("../../../generated/prisma");
class PaymentsService {
    async getAll(page, limit, search, status) {
        const skip = (page - 1) * limit;
        const whereClause = {};
        if (status) {
            whereClause.status = status;
        }
        if (search) {
            whereClause.OR = [
                { student: { user: { firstName: { contains: search, mode: "insensitive" } } } },
                { student: { user: { lastName: { contains: search, mode: "insensitive" } } } },
                { reference: { contains: search, mode: "insensitive" } },
            ];
        }
        const [payments, total] = await Promise.all([
            client_1.prisma.payment.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { dueDate: 'desc' },
                include: {
                    student: {
                        include: {
                            user: true,
                            class: true
                        }
                    }
                }
            }),
            client_1.prisma.payment.count({ where: whereClause })
        ]);
        // Update dynamically any "PENDING" payments that might have become "LATE" if past due
        // We only update the response object so we don't bombard the DB unnecessarily, but
        // ideally, a cron job should handle DB syncs. We can just do a quick scan here:
        const computedPayments = payments.map((p) => {
            const trueStatus = (0, compute_status_1.computePaymentStatus)(p.amountDue, p.amountPaid, p.dueDate);
            return { ...p, status: trueStatus }; // Hydrate the actual computed status
        });
        return {
            payments: computedPayments,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async getStats() {
        const now = new Date();
        const [allPayments, totalPaidAggregation, totalDueAggregation] = await Promise.all([
            client_1.prisma.payment.findMany({
                select: { id: true, status: true, amountDue: true, amountPaid: true, dueDate: true }
            }),
            client_1.prisma.payment.aggregate({
                _sum: { amountPaid: true }
            }),
            client_1.prisma.payment.aggregate({
                _sum: { amountDue: true }
            })
        ]);
        let lateCount = 0;
        let pendingCount = 0;
        let paidCount = 0;
        let partialCount = 0;
        allPayments.forEach((p) => {
            const status = (0, compute_status_1.computePaymentStatus)(p.amountDue, p.amountPaid, p.dueDate);
            if (status === 'LATE')
                lateCount++;
            if (status === 'PENDING')
                pendingCount++;
            if (status === 'PAID')
                paidCount++;
            if (status === 'PARTIAL')
                partialCount++;
        });
        return {
            totalCollected: totalPaidAggregation._sum.amountPaid || 0,
            totalOutstanding: (totalDueAggregation._sum.amountDue || 0) - (totalPaidAggregation._sum.amountPaid || 0),
            lateCount,
            pendingCount,
            paidCount,
            partialCount
        };
    }
    async updatePayment(id, amountPaid, reference, paymentMethod) {
        const payment = await client_1.prisma.payment.findUnique({
            where: { id },
            include: {
                student: {
                    include: {
                        user: true,
                        parent: { include: { user: true } }
                    }
                }
            }
        });
        if (!payment) {
            throw new Error("Payment record not found.");
        }
        const newStatus = (0, compute_status_1.computePaymentStatus)(payment.amountDue, amountPaid, payment.dueDate);
        const updatedPayment = await client_1.prisma.payment.update({
            where: { id },
            data: {
                amountPaid,
                reference,
                paymentMethod,
                status: newStatus,
                paidAt: amountPaid > payment.amountPaid ? new Date() : payment.paidAt
            }
        });
        // Send notification and email if a new payment was made
        if (amountPaid > payment.amountPaid) {
            const difference = amountPaid - payment.amountPaid;
            try {
                await (0, create_1.createNotification)({
                    userId: payment.student.userId,
                    type: prisma_1.NotificationType.PAYMENT,
                    content: `Un paiement de ${difference} MGA pour ${payment.feeType} a été enregistré.`
                });
                // If we have parent email, we send the notification
                const parentEmailStr = payment.student.parent?.user.email || null;
                const parentNameStr = payment.student.parent?.user.firstName || payment.student.user.firstName;
                if (parentEmailStr) {
                    const html = (0, PaymentConfirmation_1.getPaymentConfirmationEmail)(parentNameStr, difference, payment.feeType, newStatus, reference);
                    await (0, send_1.sendEmail)({
                        to: parentEmailStr,
                        subject: "Confirmation de votre paiement",
                        html
                    });
                }
            }
            catch (err) {
                console.error("Warning: Error sending post-payment hooks:", err);
                // Non-blocking
            }
        }
        return updatedPayment;
    }
}
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments.service.js.map