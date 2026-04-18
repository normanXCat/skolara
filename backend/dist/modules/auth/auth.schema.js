"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma de validation pour la connexion.
 * - Email valide
 * - Mot de passe : min 8 caractères, 1 majuscule, 1 chiffre
 */
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Adresse email invalide")
        .max(255, "L'email ne doit pas dépasser 255 caractères"),
    password: zod_1.z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
});
//# sourceMappingURL=auth.schema.js.map