"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const prisma_1 = require("../generated/prisma");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error("[Prisma] DATABASE_URL est manquant sur Render !");
    }
    const isProduction = process.env.NODE_ENV === "production";
    // Configuration du pool avec SSL pour Render/Production
    const pool = new pg_1.Pool({
        connectionString,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
    });
    // Diagnostic du pool
    pool.on("connect", () => {
        if (isProduction)
            console.log("🟢 [Prisma/Pool] Nouvelle connexion établie avec la base de données");
    });
    pool.on("error", (err) => {
        console.error("🔴 [Prisma/Pool] Erreur inattendue sur un client inactif", err);
    });
    const adapter = new adapter_pg_1.PrismaPg(pool);
    return new prisma_1.PrismaClient({ adapter });
}
if (!global.prisma) {
    global.prisma = createPrismaClient();
}
exports.prisma = global.prisma;
//# sourceMappingURL=client.js.map