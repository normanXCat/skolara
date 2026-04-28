import { Request, Response, NextFunction } from "express";
import timetablesService from "../../admin/timetables/timetables.service";
import { prisma } from "../../../prisma/client";

export class StudentTimetableController {
  getMyTimetable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const student = await prisma.student.findUnique({ where: { userId } });
      
      if (!student || !student.classId) {
        throw { status: 403, message: "Student profile or class not found" };
      }

      const schoolYear = (req.query.schoolYear as string) || student.schoolYear;
      const timetables = await timetablesService.getTimetables({
        classId: student.classId,
        schoolYear,
      });

      res.status(200).json({
        success: true,
        data: timetables,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentTimetableController();
