import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

/**
 * Schéma de validation des variables d'environnement.
 * Garantit que toutes les variables requises sont présentes et correctement typées.
 */
const envSchema = z.object({
    /** URL de connexion à la base de données PostgreSQL */
    DATABASE_URL: z.string().min(1, "DATABASE_URL est requis"),
    /** Port d'écoute du serveur Express */
    PORT: z.coerce.number().int().positive().default(5000),
    /** Environnement d'exécution */
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    /** URL du frontend pour la configuration CORS */
    FRONTEND_URL: z.string().url().default("http://localhost:3000"),
});

/**
 * Variables d'environnement validées et typées.
 * Lance une erreur au démarrage si une variable est manquante ou invalide.
 */
export const env = envSchema.parse(process.env);
