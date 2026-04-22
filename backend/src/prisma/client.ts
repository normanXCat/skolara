import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient(): PrismaClient {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("[Prisma] DATABASE_URL est manquant sur Render !");
    }

    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
}

declare global {
    var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
    global.prisma = createPrismaClient();
}

export const prisma = global.prisma;
