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

  // Strip sslmode from the connection string so our explicit ssl config takes precedence.
  // Render's default `sslmode=require` gets treated as `verify-full` by the pg driver,
  // which rejects self-signed certificates.
  const cleanConnectionString = isProduction
    ? connectionString.replace(/[?&]sslmode=[^&]*/gi, "").replace(/\?&/, "?").replace(/\?$/, "")
    : connectionString;

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
