"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const students_schema_1 = require("./students.schema");
const prisma_1 = require("../../../generated/prisma");
/**
 * Contrôleur pour la gestion des élèves par l'administrateur.
 */
class StudentsController {
    constructor(service) {
        this.service = service;
    }
    /**
     * GET /api/admin/students
     */
    async findAll(req, res, next) {
        try {
            const filters = students_schema_1.StudentFiltersSchema.parse(req.query);
            const result = await this.service.findAll(filters);
            res.json({
                success: true,
                data: result,
                message: "Liste des élèves récupérée",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/admin/students
     */
    async create(req, res, next) {
        try {
            const data = students_schema_1.CreateStudentSchema.parse(req.body);
            const student = await this.service.create(data);
            res.status(201).json({
                success: true,
                data: student,
                message: "L'élève a été créé avec succès",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/admin/students/:id
     */
    async findById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const student = await this.service.findById(id);
            res.json({
                success: true,
                data: student,
                message: "Détails de l'élève récupérés",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/admin/students/:id
     */
    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = students_schema_1.UpdateStudentSchema.parse(req.body);
            const student = await this.service.update(id, data);
            res.json({
                success: true,
                data: student,
                message: "Profil mis à jour",
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/admin/students/:id/status
     */
    async updateStatus(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { status } = req.body;
            if (!status || !Object.values(prisma_1.StudentStatus).includes(status)) {
                return res
                    .status(400)
                    .json({ success: false, error: "Statut invalide" });
            }
            const student = status === prisma_1.StudentStatus.ACTIVE
                ? await this.service.restore(id)
                : await this.service.archive(id);
            res.json({
                success: true,
                data: student,
                message: `Statut mis à jour : ${status}`,
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/admin/students/export
     */
    async exportCSV(req, res, next) {
        try {
            const filters = students_schema_1.StudentFiltersSchema.parse(req.query);
            const data = await this.service.getExportData(filters);
            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: "Aucune donnée à exporter",
                });
            }
            // Génération manuelle simple du CSV (UTF-8 avec BOM pour Excel)
            const headers = Object.keys(data[0]);
            const rows = data.map((obj) => headers
                .map((header) => {
                const val = obj[header];
                // Echappement des guillemets
                const str = val === null || val === undefined
                    ? ""
                    : String(val).replace(/"/g, '""');
                return `"${str}"`;
            })
                .join(","));
            const csvContent = "\ufeff" + [headers.join(","), ...rows].join("\n");
            const date = new Date().toISOString().split("T")[0];
            res.setHeader("Content-Type", "text/csv; charset=utf-8");
            res.setHeader("Content-Disposition", `attachment; filename="students-${date}.csv"`);
            res.send(csvContent);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StudentsController = StudentsController;
//# sourceMappingURL=students.controller.js.map