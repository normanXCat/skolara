import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";

export class StudentGradesController {
  getMyGrades = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const student = await prisma.student.findUnique({ where: { userId } });

      if (!student) {
        throw { status: 403, message: "Student profile not found" };
      }

      // Fetch all subjects and student's grades
      const subjects = await prisma.subject.findMany({
        include: {
          grades: {
            where: { studentId: student.id },
            orderBy: { gradedAt: "asc" },
          },
        },
      });

      const data = subjects.map(subject => {
        const semester1Grades = subject.grades.filter(g => g.semester === 1);
        const semester2Grades = subject.grades.filter(g => g.semester === 2);

        const s1Average = semester1Grades.length > 0 
          ? semester1Grades.reduce((acc, g) => acc + g.value, 0) / semester1Grades.length 
          : null;
        
        const s2Average = semester2Grades.length > 0 
          ? semester2Grades.reduce((acc, g) => acc + g.value, 0) / semester2Grades.length 
          : null;

        return {
          subjectId: subject.id,
          subjectName: subject.name,
          coefficient: subject.coefficient,
          semester1Average: s1Average ? Number(s1Average.toFixed(2)) : null,
          semester2Average: s2Average ? Number(s2Average.toFixed(2)) : null,
          grades: subject.grades.map(g => ({
            id: g.id,
            value: g.value,
            comment: g.comment,
            semester: g.semester,
            gradedAt: g.gradedAt,
          })),
        };
      });

      res.status(200).json({
        success: true,
        data: { subjects: data },
      });
    } catch (error) {
      next(error);
    }
  }

  getGradesBySubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const subjectId = Number(req.params.subjectId);
      const student = await prisma.student.findUnique({ where: { userId } });

      if (!student) {
        throw { status: 403, message: "Student profile not found" };
      }

      const grades = await prisma.grade.findMany({
        where: { studentId: student.id, subjectId },
        orderBy: { gradedAt: "desc" },
      });

      res.status(200).json({
        success: true,
        data: grades,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentGradesController();
