import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";
import { computePaymentStatus } from "../../../lib/payments/compute-status";

class ParentPaymentsController {
  async getChildPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;

      // Parents have a dedicated Parent model tracking their User ID, with a 1-to-many to Students.
      const parent = await prisma.parent.findUnique({ where: { userId } });
      
      if (!parent) {
        return res.status(200).json({
          success: true,
          data: {
            history: [],
            stats: { totalDue: 0, totalPaid: 0, balance: 0 }
          }
        });
      }

      const children = await prisma.student.findMany({
         where: { parentId: parent.id },
         include: { user: true }
      });
      
      const childrenIds = children.map((c: any) => c.id);

      if (childrenIds.length === 0) {
        return res.status(200).json({
          success: true,
          data: {
            history: [],
            stats: { totalDue: 0, totalPaid: 0, balance: 0 }
          }
        });
      }

      const payments = await prisma.payment.findMany({
        where: { studentId: { in: childrenIds } },
        orderBy: { dueDate: 'desc' },
        include: {
            student: { include: { user: true } }
        }
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

export default new ParentPaymentsController();
