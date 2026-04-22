"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const prisma_1 = require("../generated/prisma");
const adapter_pg_1 = require("@prisma/adapter-pg");
function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error("[Prisma] DATABASE_URL est manquant sur Render !");
    }
    const adapter = new adapter_pg_1.PrismaPg({ connectionString });
    return new prisma_1.PrismaClient({ adapter });
}
if (!global.prisma) {
    global.prisma = createPrismaClient();
}
exports.prisma = global.prisma;
//# sourceMappingURL=client.js.map