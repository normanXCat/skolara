"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const prisma_1 = require("../generated/prisma");
const env_1 = require("../config/env");
const globalForPrisma = globalThis;
function createPrismaClient() {
    return new prisma_1.PrismaClient({
        datasourceUrl: env_1.env.DATABASE_URL,
    });
}
exports.prisma = globalForPrisma.prisma ?? createPrismaClient();
globalForPrisma.prisma = exports.prisma;
//# sourceMappingURL=client.js.map