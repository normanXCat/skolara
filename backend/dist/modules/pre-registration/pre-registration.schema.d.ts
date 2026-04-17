import { z } from "zod";
/**
 * Valeurs autorisées pour le statut d'une pré-inscription.
 */
export declare const StatusEnum: z.ZodEnum<{
    PENDING: "PENDING";
    IN_REVIEW: "IN_REVIEW";
    ACCEPTED: "ACCEPTED";
    REJECTED: "REJECTED";
}>;
/**
 * Schéma Zod pour la création d'une pré-inscription.
 * Tous les champs enfant et parent sont requis.
 */
export declare const createPreRegistrationSchema: z.ZodObject<{
    childFirstName: z.ZodString;
    childLastName: z.ZodString;
    childDateOfBirth: z.ZodCoercedDate<unknown>;
    gender: z.ZodEnum<{
        M: "M";
        F: "F";
    }>;
    childEmail: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    previousSchool: z.ZodOptional<z.ZodString>;
    desiredGrade: z.ZodString;
    parentFirstName: z.ZodString;
    parentFullName: z.ZodString;
    parentEmail: z.ZodString;
    parentPhone: z.ZodString;
    parentAddress: z.ZodOptional<z.ZodString>;
    receiptNumber: z.ZodOptional<z.ZodString>;
    receiptImageUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    documentUrls: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * Schéma Zod pour la mise à jour du statut d'une pré-inscription.
 */
export declare const updatePreRegistrationSchema: z.ZodObject<{
    status: z.ZodEnum<{
        PENDING: "PENDING";
        IN_REVIEW: "IN_REVIEW";
        ACCEPTED: "ACCEPTED";
        REJECTED: "REJECTED";
    }>;
}, z.core.$strip>;
/**
 * Schéma Zod pour valider un paramètre id entier positif dans l'URL.
 */
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
/**
 * Schéma Zod pour les paramètres de query : pagination et filtre par statut.
 */
export declare const listQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        IN_REVIEW: "IN_REVIEW";
        ACCEPTED: "ACCEPTED";
        REJECTED: "REJECTED";
    }>>;
}, z.core.$strip>;
/** Type TypeScript inféré pour la création */
export type CreatePreRegistrationInput = z.infer<typeof createPreRegistrationSchema>;
/** Type TypeScript inféré pour la mise à jour */
export type UpdatePreRegistrationInput = z.infer<typeof updatePreRegistrationSchema>;
/** Type TypeScript inféré pour les query params de liste */
export type ListQueryInput = z.infer<typeof listQuerySchema>;
//# sourceMappingURL=pre-registration.schema.d.ts.map