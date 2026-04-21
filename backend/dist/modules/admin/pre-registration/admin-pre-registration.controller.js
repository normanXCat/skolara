"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPreRegistrationController = void 0;
const prisma_1 = require("../../../generated/prisma");
/**
 * Contrôleur pour la gestion admin des pré-inscriptions.
 */
class AdminPreRegistrationController {
    constructor(service) {
        this.service = service;
    }
    async findAll(req, res, next) {
        try {
            const result = await this.service.findAll(req.query);
            res.json({
                success: true,
                data: result,
                message: "Dossiers récupérés",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = await this.service.findById(id);
            res.json({ success: true, data, message: "Détail du dossier" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { status, comment } = req.body;
            const adminId = req.user.userId;
            if (!Object.values(prisma_1.Status).includes(status)) {
                return res
                    .status(400)
                    .json({ success: false, error: "Statut invalide" });
            }
            const data = await this.service.updateStatus(id, status, adminId, comment);
            res.json({
                success: true,
                data,
                message: `Statut mis à jour : ${status}`,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async convert(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { classId, createParentAccount } = req.body;
            const adminId = req.user.userId;
            const student = await this.service.convertToStudent(id, adminId, {
                classId: classId ? parseInt(classId, 10) : undefined,
                createParentAccount: !!createParentAccount,
            });
            res.status(201).json({
                success: true,
                data: student,
                message: "Dossier converti en élève avec succès. Un email a été envoyé.",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminPreRegistrationController = AdminPreRegistrationController;
//# sourceMappingURL=admin-pre-registration.controller.js.map