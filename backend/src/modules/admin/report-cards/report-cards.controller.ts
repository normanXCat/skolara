import { Request, Response, NextFunction } from "express";
import reportCardsService from "./report-cards.service";
import pdfService from "../../../lib/pdf/pdf.service";
import { getReportCardHtml } from "./templates/report-card.template";
import archiver from "archiver";

export class ReportCardsController {
  async downloadPdf(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = Number(req.params.studentId);
      const semester = Number(req.query.semester) || 1;
      const schoolYear = (req.query.schoolYear as string) || "2024-2025";

      const data = await reportCardsService.getPreviewData(studentId, schoolYear, semester);

      const html = getReportCardHtml({
        ...data,
        semester,
        schoolYear,
      });
      const buffer = await pdfService.generateFromHtml(html);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=Bulletin_${data.student.lastName}_S${semester}.pdf`
      );
      res.status(200).send(buffer);
    } catch (error) {
      next(error);
    }
  }

  async getByClass(req: Request, res: Response, next: NextFunction) {
    try {
      const classId = Number(req.params.classId);
      const semester = Number(req.query.semester) || 1;
      const schoolYear = (req.query.schoolYear as string) || "2024-2025";

      const data = await reportCardsService.getStatusByClass(classId, schoolYear, semester);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getPreview(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = Number(req.params.studentId);
      const semester = Number(req.query.semester) || 1;
      const schoolYear = (req.query.schoolYear as string) || "2024-2025";

      const data = await reportCardsService.getPreviewData(studentId, schoolYear, semester);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async finalize(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId, schoolYear, semester, generalAppreciation } = req.body;

      if (!studentId || !schoolYear || !semester) {
        res.status(400).json({
          success: false,
          message: "Les champs studentId, schoolYear et semester sont obligatoires.",
        });
        return;
      }

      const reportCard = await reportCardsService.finalize(
        Number(studentId),
        schoolYear,
        Number(semester),
        generalAppreciation || ""
      );
      res.status(200).json({ success: true, data: reportCard });
    } catch (error) {
      next(error);
    }
  }

  async generateForClass(req: Request, res: Response, next: NextFunction) {
    try {
      const { classId, semester, schoolYear } = req.body;

      if (!classId || !semester || !schoolYear) {
        res.status(400).json({
          success: false,
          message: "Les champs classId, semester et schoolYear sont obligatoires.",
        });
        return;
      }

      const status = await reportCardsService.getStatusByClass(
        Number(classId),
        schoolYear,
        Number(semester)
      );

      const results = await Promise.allSettled(
        status.students.map((s: any) =>
          reportCardsService.finalize(s.id, schoolYear, Number(semester), "")
        )
      );

      const generated = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      res.status(200).json({ success: true, data: { generated, failed } });
    } catch (error) {
      next(error);
    }
  }

  async exportBatch(req: Request, res: Response, next: NextFunction) {
    try {
      const classId = Number(req.params.classId);
      const semester = Number(req.query.semester) || 1;
      const schoolYear = (req.query.schoolYear as string) || "2024-2025";

      const reportCardsStatus = await reportCardsService.getStatusByClass(classId, schoolYear, semester);
      if (!reportCardsStatus.class) {
        res.status(404).json({ success: false, message: "Classe introuvable" });
        return;
      }

      res.setHeader("Content-Type", "application/zip");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="report-cards-${reportCardsStatus.class.name}-S${semester}-${schoolYear}.zip"`
      );

      const archive = archiver("zip", { zlib: { level: 9 } });
      archive.on("error", (err: any) => { throw err; });
      archive.pipe(res);

      for (const studentData of reportCardsStatus.students) {
        if (studentData.reportCards && studentData.reportCards.length > 0) {
            const data = await reportCardsService.getPreviewData(studentData.id, schoolYear, semester);
            const html = getReportCardHtml({ ...data, semester, schoolYear });
            const pdfBuffer = await pdfService.generateFromHtml(html);
            const fileName = `Bulletin_${data.student.lastName || ''}_${data.student.firstName || ''}_S${semester}.pdf`.replace(/\s+/g, '_');
            archive.append(pdfBuffer, { name: fileName });
        }
      }

      await archive.finalize();
    } catch (error) {
      if (!res.headersSent) {
          next(error);
      } else {
          console.error("Error during zip streaming", error);
      }
    }
  }
}

export default new ReportCardsController();
