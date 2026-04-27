import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";
import pdfService from "../../../lib/pdf/pdf.service";
import reportCardsService from "../../admin/report-cards/report-cards.service";
import { getReportCardHtml } from "../../admin/report-cards/templates/report-card.template";

export class ParentReportCardsController {
  async getChildReportCards(req: Request, res: Response, next: NextFunction) {
    try {
      const parent = await prisma.parent.findUnique({
        where: { userId: (req as any).user!.id },
        include: { students: true }
      });

      if (!parent) {
        res.status(404).json({ success: false, message: "Parent introuvable" });
        return;
      }

      const studentIds = parent.students.map(s => s.id);
      const reportCards = await prisma.reportCard.findMany({
        where: { studentId: { in: studentIds } },
        include: { student: { include: { user: true, class: true } } },
        orderBy: [{ schoolYear: 'desc' }, { semester: 'desc' }]
      });

      res.status(200).json({ success: true, data: reportCards });
    } catch (error) {
      next(error);
    }
  }

  async downloadChildPdf(req: Request, res: Response, next: NextFunction) {
    try {
      const reportCardId = Number(req.params.id);
      const parent = await prisma.parent.findUnique({
        where: { userId: (req as any).user!.id },
        include: { students: true }
      });

      if (!parent) {
        res.status(404).json({ success: false, message: "Parent introuvable" });
        return;
      }

      const reportCard = await prisma.reportCard.findUnique({
        where: { id: reportCardId },
        include: { student: { include: { user: true } } }
      });

      if (!reportCard) {
        res.status(404).json({ success: false, message: "Bulletin introuvable" });
        return;
      }

      const isMyChild = parent.students.some(s => s.id === reportCard.studentId);
      if (!isMyChild) {
        res.status(403).json({ success: false, message: "Accès refusé" });
        return;
      }

      const data = await reportCardsService.getPreviewData(reportCard.studentId, reportCard.schoolYear, reportCard.semester);
      
      const html = getReportCardHtml({
        ...data,
        semester: reportCard.semester,
        schoolYear: reportCard.schoolYear,
      });

      const buffer = await pdfService.generateFromHtml(html);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=Bulletin_${reportCard.student.user.name}_S${reportCard.semester}.pdf`.replace(/\s+/g, '_')
      );
      res.status(200).send(buffer);
    } catch (error) {
      next(error);
    }
  }
}

export default new ParentReportCardsController();
