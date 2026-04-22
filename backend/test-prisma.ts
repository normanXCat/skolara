import { prisma } from "./src/prisma/client";
console.log("Prisma keys:", Object.keys(prisma));
console.log("User model:", prisma.user);
process.exit(0);
