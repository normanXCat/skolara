import { Request, Response, NextFunction } from "express";
import timetablesService from "../../admin/timetables/timetables.service";
import { prisma } from "../../../prisma/client";

export class ParentTimetableController {
  async getChildTimetable(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const childId = Number(req.query.childId);

      if (!childId) {
        throw { status: 400, message: "Child ID is required" };
      }

      // Vérifier que c'est bien l'enfant du parent
      const parent = await prisma.parent.findUnique({ 
        where: { userId },
        include: { students: true }
      });

      if (!parent) {
        throw { status: 403, message: "Parent profile not found" };
      }

      const isChildOfParent = parent.students.some(s => s.id === childId);
      if (!isChildOfParent) {
        throw { status: 403, message: "Access denied: this student is not your child" };
      }

      const student = await prisma.student.findUnique({ where: { id: childId } });
      if (!student || !student.classId) {
        throw { status: 404, message: "Student class not found" };
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

export default new ParentTimetableController();
