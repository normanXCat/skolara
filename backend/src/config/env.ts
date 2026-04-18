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
    PORT: z.coerce.number().int().positive().default(8000),
    /** Environnement d'exécution */
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    /** URL du frontend pour la configuration CORS */
    FRONTEND_URL: z.string().url().default("http://localhost:3000"),
    /** URL de base de l'API (pour les liens publics) */
    API_URL: z.string().url().default("http://localhost:8000"),
    /** Clé secrète pour signer les Access Tokens JWT */
    JWT_SECRET: z
        .string()
        .min(32, "JWT_SECRET doit contenir au moins 32 caractères"),
    /** Clé secrète pour signer les Refresh Tokens */
    JWT_REFRESH_SECRET: z
        .string()
        .min(32, "JWT_REFRESH_SECRET doit contenir au moins 32 caractères"),
    /** Durée de vie de l'Access Token (ex: '15m', '1h') */
    JWT_EXPIRES_IN: z.string().default("15m"),
    /** Durée de vie du Refresh Token en jours */
    REFRESH_TOKEN_EXPIRES_DAYS: z.coerce.number().int().positive().default(7),
});

/**
 * Variables d'environnement validées et typées.
 * Lance une erreur au démarrage si une variable est manquante ou invalide.
 */
export const env = envSchema.parse(process.env);
