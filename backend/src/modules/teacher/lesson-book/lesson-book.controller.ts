import { Request, Response, NextFunction } from "express";
import { TeacherLessonBookService } from "./lesson-book.service";

const lessonBookService = new TeacherLessonBookService();

export class TeacherLessonBookController {
  async getLessonBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherUserId = (req as any).user?.userId;
      if (!teacherUserId) {
        return next({
          status: 401,
          message: "Utilisateur non authentifié",
        });
      }
      const classId = req.query.classId ? parseInt(req.query.classId as string) : undefined;
      const subjectId = req.query.subjectId ? parseInt(req.query.subjectId as string) : undefined;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await lessonBookService.getLessonBooks(teacherUserId, classId, subjectId, page, limit);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async createLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherUserId = (req as any).user?.userId;
      if (!teacherUserId) {
        return next({
          status: 401,
          message: "Utilisateur non authentifié",
        });
      }
      const { classId, subjectId, lessonDate, content, homework, homeworkDueDate } = req.body;

      if (!classId || !subjectId || !lessonDate || !content) {
         return res.status(400).json({ success: false, error: "Champs requis manquants: classId, subjectId, lessonDate, content." });
      }

      const lesson = await lessonBookService.createLesson(teacherUserId, {
         classId: Number(classId),
         subjectId: Number(subjectId),
         lessonDate,
         content,
         homework,
         homeworkDueDate
      });

      res.status(201).json({ success: true, data: lesson, message: "Leçon enregistrée." });
    } catch (error) {
      if (error instanceof Error && error.message.includes("Non autorisé")) {
          return res.status(403).json({ success: false, error: error.message });
      }
      next(error);
    }
  }

  async updateLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherUserId = (req as any).user?.userId;
      if (!teacherUserId) {
        return next({
          status: 401,
          message: "Utilisateur non authentifié",
        });
      }
      const id = parseInt(req.params.id as string);
      const { content, homework, homeworkDueDate } = req.body;

      const lesson = await lessonBookService.updateLesson(teacherUserId, id, { content, homework, homeworkDueDate });

      res.status(200).json({ success: true, data: lesson, message: "Leçon modifiée." });
    } catch (error) {
      next(error);
    }
  }

  async deleteLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherUserId = (req as any).user?.userId;
      if (!teacherUserId) {
        return next({
          status: 401,
          message: "Utilisateur non authentifié",
        });
      }
      const id = parseInt(req.params.id as string);

      await lessonBookService.deleteLesson(teacherUserId, id);

      res.status(200).json({ success: true, message: "Leçon supprimée." });
    } catch (error) {
      next(error);
    }
  }
}
