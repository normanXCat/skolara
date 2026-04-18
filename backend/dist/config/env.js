"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Schéma de validation des variables d'environnement.
 * Garantit que toutes les variables requises sont présentes et correctement typées.
 */
const envSchema = zod_1.z.object({
    /** URL de connexion à la base de données PostgreSQL */
    DATABASE_URL: zod_1.z.string().min(1, "DATABASE_URL est requis"),
    /** Port d'écoute du serveur Express */
    PORT: zod_1.z.coerce.number().int().positive().default(8000),
    /** Environnement d'exécution */
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    /** URL du frontend pour la configuration CORS */
    FRONTEND_URL: zod_1.z.string().url().default("http://localhost:3000"),
    /** URL de base de l'API (pour les liens publics) */
    API_URL: zod_1.z.string().url().default("http://localhost:8000"),
    /** Clé secrète pour signer les Access Tokens JWT */
    JWT_SECRET: zod_1.z
        .string()
        .min(32, "JWT_SECRET doit contenir au moins 32 caractères"),
    /** Clé secrète pour signer les Refresh Tokens */
    JWT_REFRESH_SECRET: zod_1.z
        .string()
        .min(32, "JWT_REFRESH_SECRET doit contenir au moins 32 caractères"),
    /** Durée de vie de l'Access Token (ex: '15m', '1h') */
    JWT_EXPIRES_IN: zod_1.z.string().default("15m"),
    /** Durée de vie du Refresh Token en jours */
    REFRESH_TOKEN_EXPIRES_DAYS: zod_1.z.coerce.number().int().positive().default(7),
});
/**
 * Variables d'environnement validées et typées.
 * Lance une erreur au démarrage si une variable est manquante ou invalide.
 */
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map