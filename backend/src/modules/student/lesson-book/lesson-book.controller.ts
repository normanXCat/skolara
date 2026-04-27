import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";

export class StudentLessonBookController {
  async getMyLessonBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const studentUserId = (req as any).user.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const student = await prisma.student.findUnique({ where: { userId: studentUserId } });
      if (!student) throw new Error("Élève non trouvé.");

      const skip = (page - 1) * limit;
      const where: any = { classId: student.classId };

      const [lessons, total] = await Promise.all([
        prisma.lessonBook.findMany({
          where,
          skip,
          take: limit,
          orderBy: { lessonDate: "desc" },
          include: {
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
