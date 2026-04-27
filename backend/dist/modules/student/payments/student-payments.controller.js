"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../../prisma/client");
const compute_status_1 = require("../../../lib/payments/compute-status");
class StudentPaymentsController {
    async getMyPayments(req, res, next) {
        try {
            const userId = req.user.id;
            const student = await client_1.prisma.student.findFirst({
                where: { userId }
            });
            if (!student) {
                return res.status(200).json({
                    success: true,
                    data: {
                        history: [],
                        stats: { totalDue: 0, totalPaid: 0, balance: 0 }
                    }
                });
            }
            const payments = await client_1.prisma.payment.findMany({
                where: { studentId: student.id },
                orderBy: { dueDate: 'desc' }
            });
            let totalDue = 0;
            let totalPaid = 0;
            const history = payments.map((p) => {
                const trueStatus = (0, compute_status_1.computePaymentStatus)(p.amountDue, p.amountPaid, p.dueDate);
                totalDue += p.amountDue;
                totalPaid += p.amountPaid;
                return { ...p, status: trueStatus }; // Hydrate the actual computed status
            });
            res.status(200).json({
                success: true,
                data: {
                    history,
                    stats: {
                        totalDue,
                        totalPaid,
                        balance: totalDue - totalPaid
                    }
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new StudentPaymentsController();
//# sourceMappingURL=student-payments.controller.js.map