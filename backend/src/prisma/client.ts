import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env";

/**
 * Instance singleton du client Prisma.
 * Utilise l'adaptateur @prisma/adapter-pg pour la connexion directe (Prisma 7).
 * Évite la création de multiples connexions lors du rechargement à chaud (développement).
 */
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

/**
 * Crée une instance PrismaClient avec l'adaptateur PostgreSQL.
 *
 * @returns Instance PrismaClient configurée
 */
function createPrismaClient(): PrismaClient {
    const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
