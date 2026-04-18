"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const prisma_1 = require("../generated/prisma");
const adapter_pg_1 = require("@prisma/adapter-pg");
const env_1 = require("../config/env");
const globalForPrisma = globalThis;
function createPrismaClient() {
    const adapter = new adapter_pg_1.PrismaPg({ connectionString: env_1.env.DATABASE_URL });
    return new prisma_1.PrismaClient({ adapter });
}
exports.prisma = globalForPrisma.prisma ?? createPrismaClient();
globalForPrisma.prisma = exports.prisma;
//# sourceMappingURL=client.js.map