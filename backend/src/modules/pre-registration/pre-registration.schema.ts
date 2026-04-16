import { z } from "zod";

/**
 * Valeurs autorisées pour le statut d'une pré-inscription.
 */
export const StatusEnum = z.enum([
    "PENDING",
    "IN_REVIEW",
    "ACCEPTED",
    "REJECTED",
]);

/**
 * Schéma Zod pour la création d'une pré-inscription.
 * Tous les champs enfant et parent sont requis.
 */
export const createPreRegistrationSchema = z.object({
    /** Prénom de l'enfant */
    childFirstName: z.string().min(1, "Le prénom de l'enfant est requis"),
    /** Nom de famille de l'enfant */
    childLastName: z.string().min(1, "Le nom de l'enfant est requis"),
    /** Date de naissance de l'enfant (format ISO 8601) */
    childDateOfBirth: z.coerce.date(),
    /** Niveau scolaire souhaité */
    desiredGrade: z.string().min(1, "Le niveau souhaité est requis"),
    /** Nom complet du parent */
    parentFullName: z.string().min(1, "Le nom du parent est requis"),
    /** Adresse email du parent */
    parentEmail: z.string().email("Email invalide"),
    /** Numéro de téléphone du parent */
    parentPhone: z.string().min(1, "Le téléphone du parent est requis"),
    /** URLs des documents joints (optionnel) */
    documentUrls: z.array(z.string().url()).optional().default([]),
});

/**
 * Schéma Zod pour la mise à jour du statut d'une pré-inscription.
 */
export const updatePreRegistrationSchema = z.object({
    /** Nouveau statut */
    status: StatusEnum,
});

/**
 * Schéma Zod pour valider un paramètre id entier positif dans l'URL.
 */
export const idParamSchema = z.object({
    id: z.coerce
        .number()
        .int()
        .positive("L'identifiant doit être un entier positif"),
});

/**
 * Schéma Zod pour les paramètres de query : pagination et filtre par statut.
 */
export const listQuerySchema = z.object({
    /** Numéro de page (défaut : 1) */
    page: z.coerce.number().int().positive().optional().default(1),
    /** Nombre d'éléments par page (défaut : 10) */
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    /** Filtre optionnel par statut */
    status: StatusEnum.optional(),
});

/** Type TypeScript inféré pour la création */
export type CreatePreRegistrationInput = z.infer<
    typeof createPreRegistrationSchema
>;
/** Type TypeScript inféré pour la mise à jour */
export type UpdatePreRegistrationInput = z.infer<
    typeof updatePreRegistrationSchema
>;
/** Type TypeScript inféré pour les query params de liste */
export type ListQueryInput = z.infer<typeof listQuerySchema>;
