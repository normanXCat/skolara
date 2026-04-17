import { z } from "zod";

/**
 * Schéma de validation Zod pour le formulaire de pré-inscription Skolara.
 */
export const PreregistrationSchema = z.object({
    // ── Étape 1 : Informations de l'enfant ──
    childFirstName: z
        .string()
        .min(2, "Le prénom doit contenir au moins 2 caractères")
        .max(100, "Le prénom ne doit pas dépasser 100 caractères"),

    childLastName: z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(100, "Le nom ne doit pas dépasser 100 caractères"),

    childDateOfBirth: z
        .string()
        .min(1, "La date de naissance est requise")
        .refine((date) => {
            if (!date) return false;
            const birthDate = new Date(date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 3 && age <= 25;
        }, "L'âge de l'enfant doit être entre 3 et 25 ans"),

    gender: z.enum(["M", "F"] as const, {
        message: "Le genre est requis",
    }),

    childEmail: z
        .string()
        .email("Adresse email de l'enfant invalide")
        .optional()
        .or(z.literal("")),

    previousSchool: z.string().optional(),

    desiredGrade: z.string().min(1, "Le niveau souhaité est requis").max(50),

    // ── Étape 2 : Informations du parent / tuteur ──
    parentFirstName: z.string().min(1, "Le prénom du parent est requis"),

    parentFullName: z
        .string()
        .min(2, "Le nom complet doit contenir au moins 2 caractères")
        .max(100, "Le nom ne doit pas dépasser 100 caractères"),

    parentEmail: z.string().email("Adresse email du parent invalide").max(255),

    parentPhone: z
        .string()
        .regex(/^\+?[0-9\s\-().]{7,20}$/, "Numéro de téléphone invalide"),

    parentAddress: z.string().optional(),

    // ── Étape 3 : Paiement et Documents ──
    receiptNumber: z.string().optional(),

    receiptImageUrl: z
        .string()
        .url("URL de l'image du reçu invalide")
        .optional()
        .or(z.literal("")),

    documentUrls: z
        .array(z.string().url("URL de document invalide"))
        .max(5, "Maximum 5 documents autorisés")
        .optional()
        .default([]),

    // Champs gérés côté serveur
    status: z
        .enum(["PENDING", "IN_REVIEW", "ACCEPTED", "REJECTED"])
        .default("PENDING"),

    submittedAt: z.string().datetime().optional(),
});

/** Type inféré pour les données du formulaire de pré-inscription. */
export type Preregistration = z.infer<typeof PreregistrationSchema>;

/** Sous-schéma pour l'étape 1 */
export const PreregistrationStep1Schema = PreregistrationSchema.pick({
    childFirstName: true,
    childLastName: true,
    childDateOfBirth: true,
    gender: true,
    childEmail: true,
    previousSchool: true,
    desiredGrade: true,
});

/** Sous-schéma pour l'étape 2 */
export const PreregistrationStep2Schema = PreregistrationSchema.pick({
    parentFirstName: true,
    parentFullName: true,
    parentEmail: true,
    parentPhone: true,
    parentAddress: true,
});

/** Sous-schéma pour l'étape 3 (Finalisation/Paiement) */
export const PreregistrationStep3Schema = PreregistrationSchema.pick({
    receiptNumber: true,
    receiptImageUrl: true,
    documentUrls: true,
});
