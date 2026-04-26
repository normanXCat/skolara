import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
declare global {
    var prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient<import("../generated/prisma").Prisma.PrismaClientOptions, never, import("src/generated/prisma/runtime/client").DefaultArgs>;
//# sourceMappingURL=client.d.ts.map