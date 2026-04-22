import { PrismaClient } from "../generated/prisma";
import { env } from "../config/env";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
    return new PrismaClient({
        datasourceUrl: env.DATABASE_URL,
    });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;
