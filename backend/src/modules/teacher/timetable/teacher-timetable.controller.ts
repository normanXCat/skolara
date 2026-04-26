import { Request, Response, NextFunction } from "express";
import timetablesService from "../../admin/timetables/timetables.service";
import { prisma } from "../../../prisma/client";

export class TeacherTimetableController {
  async getMyTimetable(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const teacher = await prisma.teacher.findUnique({ where: { userId } });
      
      if (!teacher) {
        throw { status: 403, message: "Teacher profile not found" };
      }

      const schoolYear = req.query.schoolYear as string;
      const timetables = await timetablesService.getTimetables({
        teacherId: teacher.id,
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

export default new TeacherTimetableController();
