"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listQuerySchema = exports.idParamSchema = exports.updatePreRegistrationSchema = exports.createPreRegistrationSchema = exports.StatusEnum = void 0;
const zod_1 = require("zod");
/**
 * Valeurs autorisées pour le statut d'une pré-inscription.
 */
exports.StatusEnum = zod_1.z.enum([
    "PENDING",
    "IN_REVIEW",
    "ACCEPTED",
    "REJECTED",
]);
/**
 * Schéma Zod pour la création d'une pré-inscription.
 * Tous les champs enfant et parent sont requis.
 */
exports.createPreRegistrationSchema = zod_1.z.object({
    /** Prénom de l'enfant */
    childFirstName: zod_1.z.string().min(1, "Le prénom de l'enfant est requis"),
    /** Nom de famille de l'enfant */
    childLastName: zod_1.z.string().min(1, "Le nom de l'enfant est requis"),
    /** Date de naissance de l'enfant (format ISO 8601) */
    childDateOfBirth: zod_1.z.coerce.date(),
    /** Niveau scolaire souhaité */
    desiredGrade: zod_1.z.string().min(1, "Le niveau souhaité est requis"),
    /** Nom complet du parent */
    parentFullName: zod_1.z.string().min(1, "Le nom du parent est requis"),
    /** Adresse email du parent */
    parentEmail: zod_1.z.string().email("Email invalide"),
    /** Numéro de téléphone du parent */
    parentPhone: zod_1.z.string().min(1, "Le téléphone du parent est requis"),
    /** URLs des documents joints (optionnel) */
    documentUrls: zod_1.z.array(zod_1.z.string().url()).optional().default([]),
});
/**
 * Schéma Zod pour la mise à jour du statut d'une pré-inscription.
 */
exports.updatePreRegistrationSchema = zod_1.z.object({
    /** Nouveau statut */
    status: exports.StatusEnum,
});
/**
 * Schéma Zod pour valider un paramètre id entier positif dans l'URL.
 */
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.coerce
        .number()
        .int()
        .positive("L'identifiant doit être un entier positif"),
});
/**
 * Schéma Zod pour les paramètres de query : pagination et filtre par statut.
 */
exports.listQuerySchema = zod_1.z.object({
    /** Numéro de page (défaut : 1) */
    page: zod_1.z.coerce.number().int().positive().optional().default(1),
    /** Nombre d'éléments par page (défaut : 10) */
    limit: zod_1.z.coerce.number().int().positive().max(100).optional().default(10),
    /** Filtre optionnel par statut */
    status: exports.StatusEnum.optional(),
});
//# sourceMappingURL=pre-registration.schema.js.map