import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";

export class AdminLessonBookController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const classId = req.query.classId ? parseInt(req.query.classId as string) : undefined;
      const subjectId = req.query.subjectId ? parseInt(req.query.subjectId as string) : undefined;

      const skip = (page - 1) * limit;
      const where: any = {};
      if (classId) where.classId = classId;
      if (subjectId) where.subjectId = subjectId;

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
