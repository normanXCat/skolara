"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const env_1 = require("../../config/env");
class UploadController {
    /**
     * Gère l'upload d'un fichier unique.
     */
    static async uploadSingle(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: "Aucun fichier n'a été fourni.",
                });
            }
            // Générer l'URL publique du fichier
            // Note: En production, on utiliserait un service de stockage cloud (S3, Cloudinary)
            const fileUrl = `${env_1.env.API_URL}/uploads/${req.file.filename}`;
            res.status(201).json({
                success: true,
                data: {
                    url: fileUrl,
                    filename: req.file.filename,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                },
                message: "Fichier uploadé avec succès",
            });
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * Gère l'upload de plusieurs fichiers.
     */
    static async uploadMultiple(req, res, next) {
        try {
            const files = req.files;
            if (!files || files.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "Aucun fichier n'a été fourni.",
                });
            }
            const data = files.map((file) => ({
                url: `${env_1.env.API_URL}/uploads/${file.filename}`,
                filename: file.filename,
                mimetype: file.mimetype,
                size: file.size,
            }));
            res.status(201).json({
                success: true,
                data: data,
                message: `${files.length} fichier(s) uploadé(s) avec succès`,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map