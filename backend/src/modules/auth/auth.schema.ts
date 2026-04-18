import { z } from "zod";

/**
 * Schéma de validation pour la connexion.
 * - Email valide
 * - Mot de passe : min 8 caractères, 1 majuscule, 1 chiffre
 */
export const loginSchema = z.object({
    email: z
        .string()
        .email("Adresse email invalide")
        .max(255, "L'email ne doit pas dépasser 255 caractères"),
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
});

export type LoginInput = z.infer<typeof loginSchema>;
