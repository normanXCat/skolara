import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";
import pdfService from "../../../lib/pdf/pdf.service";
import reportCardsService from "../../admin/report-cards/report-cards.service";
import { getReportCardHtml } from "../../admin/report-cards/templates/report-card.template";

export class StudentReportCardsController {
  getMyReportCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await prisma.student.findUnique({
        where: { userId: (req as any).user!.id },
      });
      if (!student) {
        res.status(404).json({ success: false, message: "Élève introuvable" });
        return;
      }

      const reportCards = await prisma.reportCard.findMany({
        where: { studentId: student.id },
        orderBy: [{ schoolYear: 'desc' }, { semester: 'desc' }]
      });

      res.status(200).json({ success: true, data: reportCards });
    } catch (error) {
      next(error);
    }
  }

  downloadMyPdf = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reportCardId = Number(req.params.id);
      const student = await prisma.student.findUnique({
        where: { userId: (req as any).user!.id },
        include: { user: true }
      });
      
      if (!student) {
        res.status(404).json({ success: false, message: "Élève introuvable" });
        return;
      }

      const reportCard = await prisma.reportCard.findUnique({
        where: { id: reportCardId }
      });

      if (!reportCard || reportCard.studentId !== student.id) {
         res.status(403).json({ success: false, message: "Accès refusé" });
         return;
      }

      const data = await reportCardsService.getPreviewData(student.id, reportCard.schoolYear, reportCard.semester);
      
      const html = getReportCardHtml({
        ...data,
        semester: reportCard.semester,
        schoolYear: reportCard.schoolYear,
      });

      const buffer = await pdfService.generateFromHtml(html);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=Bulletin_${student.user.name}_S${reportCard.semester}.pdf`.replace(/\s+/g, '_')
      );
      res.status(200).send(buffer);
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentReportCardsController();
