import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";

export class ParentLessonBookController {
  async getChildLessonBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const parentUserId = (req as any).user.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const parent = await prisma.parent.findUnique({
         where: { userId: parentUserId },
         include: { students: { select: { classId: true } } }
      });
      if (!parent) throw new Error("Parent non trouvé.");

      const classIds = parent.students.map((s: any) => s.classId);

      const skip = (page - 1) * limit;
      const where = { classId: { in: classIds } };

      const [lessons, total] = await Promise.all([
        prisma.lessonBook.findMany({
          where,
          skip,
          take: limit,
          orderBy: { lessonDate: "desc" },
          include: {
            class: true,
            subject: true,
            teacher: { select: { speciality: true, user: { select: { firstName: true, name: true } } } }
          }
        }),
        prisma.lessonBook.count({ where })
      ]);

      res.status(200).json({
        success: true,
        data: {
          lessons,
          pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
