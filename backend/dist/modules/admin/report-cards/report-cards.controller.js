"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportCardsController = void 0;
const report_cards_service_1 = __importDefault(require("./report-cards.service"));
const pdf_service_1 = __importDefault(require("../../../lib/pdf/pdf.service"));
const report_card_template_1 = require("./templates/report-card.template");
const archiver_1 = __importDefault(require("archiver"));
class ReportCardsController {
    async downloadPdf(req, res, next) {
        try {
            const studentId = Number(req.params.studentId);
            const semester = Number(req.query.semester) || 1;
            const schoolYear = req.query.schoolYear || "2024-2025";
            const data = await report_cards_service_1.default.getPreviewData(studentId, schoolYear, semester);
            const html = (0, report_card_template_1.getReportCardHtml)({
                ...data,
                semester,
                schoolYear,
            });
            const buffer = await pdf_service_1.default.generateFromHtml(html);
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=Bulletin_${data.student.lastName}_S${semester}.pdf`);
            res.status(200).send(buffer);
        }
        catch (error) {
            next(error);
        }
    }
    async getByClass(req, res, next) {
        try {
            const classId = Number(req.params.classId);
            const semester = Number(req.query.semester) || 1;
            const schoolYear = req.query.schoolYear || "2024-2025";
            const data = await report_cards_service_1.default.getStatusByClass(classId, schoolYear, semester);
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async getPreview(req, res, next) {
        try {
            const studentId = Number(req.params.studentId);
            const semester = Number(req.query.semester) || 1;
            const schoolYear = req.query.schoolYear || "2024-2025";
            const data = await report_cards_service_1.default.getPreviewData(studentId, schoolYear, semester);
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async finalize(req, res, next) {
        try {
            const { studentId, schoolYear, semester, generalAppreciation } = req.body;
            if (!studentId || !schoolYear || !semester) {
                res.status(400).json({
                    success: false,
                    message: "Les champs studentId, schoolYear et semester sont obligatoires.",
                });
                return;
            }
            const reportCard = await report_cards_service_1.default.finalize(Number(studentId), schoolYear, Number(semester), generalAppreciation || "");
            res.status(200).json({ success: true, data: reportCard });
        }
        catch (error) {
            next(error);
        }
    }
    async generateForClass(req, res, next) {
        try {
            const { classId, semester, schoolYear } = req.body;
            if (!classId || !semester || !schoolYear) {
                res.status(400).json({
                    success: false,
                    message: "Les champs classId, semester et schoolYear sont obligatoires.",
                });
                return;
            }
            const status = await report_cards_service_1.default.getStatusByClass(Number(classId), schoolYear, Number(semester));
            const results = await Promise.allSettled(status.students.map((s) => report_cards_service_1.default.finalize(s.id, schoolYear, Number(semester), "")));
            const generated = results.filter((r) => r.status === "fulfilled").length;
            const failed = results.filter((r) => r.status === "rejected").length;
            res.status(200).json({ success: true, data: { generated, failed } });
        }
        catch (error) {
            next(error);
        }
    }
    async exportBatch(req, res, next) {
        try {
            const classId = Number(req.params.classId);
            const semester = Number(req.query.semester) || 1;
            const schoolYear = req.query.schoolYear || "2024-2025";
            const reportCardsStatus = await report_cards_service_1.default.getStatusByClass(classId, schoolYear, semester);
            if (!reportCardsStatus.class) {
                res.status(404).json({ success: false, message: "Classe introuvable" });
                return;
            }
            res.setHeader("Content-Type", "application/zip");
            res.setHeader("Content-Disposition", `attachment; filename="report-cards-${reportCardsStatus.class.name}-S${semester}-${schoolYear}.zip"`);
            const archive = (0, archiver_1.default)("zip", { zlib: { level: 9 } });
            archive.on("error", (err) => { throw err; });
            archive.pipe(res);
            for (const studentData of reportCardsStatus.students) {
                if (studentData.reportCards && studentData.reportCards.length > 0) {
                    const data = await report_cards_service_1.default.getPreviewData(studentData.id, schoolYear, semester);
                    const html = (0, report_card_template_1.getReportCardHtml)({ ...data, semester, schoolYear });
                    const pdfBuffer = await pdf_service_1.default.generateFromHtml(html);
                    const fileName = `Bulletin_${data.student.lastName || ''}_${data.student.firstName || ''}_S${semester}.pdf`.replace(/\s+/g, '_');
                    archive.append(pdfBuffer, { name: fileName });
                }
            }
            await archive.finalize();
        }
        catch (error) {
            if (!res.headersSent) {
                next(error);
            }
            else {
                console.error("Error during zip streaming", error);
            }
        }
    }
}
exports.ReportCardsController = ReportCardsController;
exports.default = new ReportCardsController();
//# sourceMappingURL=report-cards.controller.js.map