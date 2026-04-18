import { z } from "zod";
/**
 * Schéma de validation pour la connexion.
 * - Email valide
 * - Mot de passe : min 8 caractères, 1 majuscule, 1 chiffre
 */
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.schema.d.ts.map