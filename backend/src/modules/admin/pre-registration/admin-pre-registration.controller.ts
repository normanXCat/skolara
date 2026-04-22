import { Request, Response, NextFunction } from "express";
import { AdminPreRegistrationService } from "./admin-pre-registration.service";
import { Status } from "../../../generated/prisma";

/**
 * Contrôleur pour la gestion admin des pré-inscriptions.
 */
export class AdminPreRegistrationController {
    private service: AdminPreRegistrationService;

    constructor(service: AdminPreRegistrationService) {
        this.service = service;
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.findAll(req.query);
            res.json({
                success: true,
                data: result,
                message: "Dossiers récupérés",
            });
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            if (!Number.isInteger(id)) {
                return res
                    .status(400)
                    .json({ success: false, error: "Identifiant invalide" });
            }
            const data = await this.service.findById(id);
            res.json({ success: true, data, message: "Détail du dossier" });
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            const { status, comment } = req.body;
            const adminId = (req as any).user.userId;

            if (!Number.isInteger(id)) {
                return res
                    .status(400)
                    .json({ success: false, error: "Identifiant invalide" });
            }

            if (!Object.values(Status).includes(status)) {
                return res
                    .status(400)
                    .json({ success: false, error: "Statut invalide" });
            }

            const data = await this.service.updateStatus(
                id,
                status as Status,
                adminId,
                comment,
            );
            res.json({
                success: true,
                data,
                message: `Statut mis à jour : ${status}`,
            });
        } catch (error) {
            next(error);
        }
    }

    async convert(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            const { classId, createParentAccount } = req.body;
            const adminId = (req as any).user.userId;

            if (!Number.isInteger(id)) {
                return res
                    .status(400)
                    .json({ success: false, error: "Identifiant invalide" });
            }

            const student = await this.service.convertToStudent(id, adminId, {
                classId: classId ? parseInt(classId, 10) : undefined,
                createParentAccount: !!createParentAccount,
            });

            res.status(201).json({
                success: true,
                data: student,
                message:
                    "Dossier converti en élève avec succès. Un email a été envoyé.",
            });
        } catch (error) {
            next(error);
        }
    }
}
