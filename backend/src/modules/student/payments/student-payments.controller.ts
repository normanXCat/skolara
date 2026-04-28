import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";
import { computePaymentStatus } from "../../../lib/payments/compute-status";

class StudentPaymentsController {
  getMyPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;

      const student = await prisma.student.findFirst({
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

      const payments = await prisma.payment.findMany({
        where: { studentId: student.id },
        orderBy: { dueDate: 'desc' }
      });

      let totalDue = 0;
      let totalPaid = 0;

      const history = payments.map((p: any) => {
         const trueStatus = computePaymentStatus(p.amountDue, p.amountPaid, p.dueDate);
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
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentPaymentsController();
