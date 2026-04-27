"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../../prisma/client");
const compute_status_1 = require("../../../lib/payments/compute-status");
class ParentPaymentsController {
    async getChildPayments(req, res, next) {
        try {
            const userId = req.user.id;
            // Parents have a dedicated Parent model tracking their User ID, with a 1-to-many to Students.
            const parent = await client_1.prisma.parent.findUnique({ where: { userId } });
            if (!parent) {
                return res.status(200).json({
                    success: true,
                    data: {
                        history: [],
                        stats: { totalDue: 0, totalPaid: 0, balance: 0 }
                    }
                });
            }
            const children = await client_1.prisma.student.findMany({
                where: { parentId: parent.id },
                include: { user: true }
            });
            const childrenIds = children.map((c) => c.id);
            if (childrenIds.length === 0) {
                return res.status(200).json({
                    success: true,
                    data: {
                        history: [],
                        stats: { totalDue: 0, totalPaid: 0, balance: 0 }
                    }
                });
            }
            const payments = await client_1.prisma.payment.findMany({
                where: { studentId: { in: childrenIds } },
                orderBy: { dueDate: 'desc' },
                include: {
                    student: { include: { user: true } }
                }
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
exports.default = new ParentPaymentsController();
//# sourceMappingURL=parent-payments.controller.js.map