import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";

export class StudentAbsencesController {
  getMyAbsences = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      
      const student = await prisma.student.findUnique({
        where: { userId }
      });

      if (!student) {
        throw { status: 403, message: "Student profile not found" };
      }

      const absences = await prisma.absence.findMany({
        where: { studentId: student.id },
        orderBy: { date: "desc" },
      });

      const totalAbsences = absences.length;
      const justifiedAbsences = absences.filter(a => a.isJustified).length;

      res.status(200).json({
        success: true,
        data: {
          absences,
          stats: {
            totalAbsences,
            justifiedAbsences
          }
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentAbsencesController();
