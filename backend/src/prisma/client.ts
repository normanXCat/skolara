import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("[Prisma] DATABASE_URL est manquant sur Render !");
  }

  const isProduction = process.env.NODE_ENV === "production";

  // Strip sslmode so our explicit SSL config takes precedence. Use URLSearchParams
  // to preserve any remaining parameters (for example, Neon’s channel_binding).
  const cleanConnectionString = (() => {
    if (!isProduction) return connectionString;
    const url = new URL(connectionString);
    url.searchParams.delete("sslmode");
    return url.toString();
  })();

  // Configuration du pool avec SSL pour Render/Production
  const pool = new Pool({
    connectionString: cleanConnectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  });

  // Diagnostic du pool
  pool.on("connect", () => {
    if (isProduction)
      console.log(
        "🟢 [Prisma/Pool] Nouvelle connexion établie avec la base de données",
      );
  });

  pool.on("error", (err) => {
    console.error(
      "🔴 [Prisma/Pool] Erreur inattendue sur un client inactif",
      err,
    );
  });

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

declare global {
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
  global.prisma = createPrismaClient();
}

export const prisma = global.prisma;
