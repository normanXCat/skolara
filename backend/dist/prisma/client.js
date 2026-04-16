"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const prisma_1 = require("../generated/prisma");
const adapter_pg_1 = require("@prisma/adapter-pg");
const env_1 = require("../config/env");
/**
 * Instance singleton du client Prisma.
 * Utilise l'adaptateur @prisma/adapter-pg pour la connexion directe (Prisma 7).
 * Évite la création de multiples connexions lors du rechargement à chaud (développement).
 */
const globalForPrisma = globalThis;
/**
 * Crée une instance PrismaClient avec l'adaptateur PostgreSQL.
 *
 * @returns Instance PrismaClient configurée
 */
function createPrismaClient() {
    const adapter = new adapter_pg_1.PrismaPg({ connectionString: env_1.env.DATABASE_URL });
    return new prisma_1.PrismaClient({ adapter });
}
exports.prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
//# sourceMappingURL=client.js.map