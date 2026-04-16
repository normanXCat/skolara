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
    PORT: zod_1.z.coerce.number().int().positive().default(5000),
    /** Environnement d'exécution */
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
});
/**
 * Variables d'environnement validées et typées.
 * Lance une erreur au démarrage si une variable est manquante ou invalide.
 */
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map