import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../src/config/env";
import bcrypt from "bcrypt";

async function main() {
    const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
    const prisma = new PrismaClient({ adapter });

    // ── Seed des Grades ──
    const grades = [
        { value: "petite-section", label: "Petite Section (3-4 ans)" },
        { value: "moyenne-section", label: "Moyenne Section (4-5 ans)" },
        { value: "grande-section", label: "Grande Section (5-6 ans)" },
        { value: "cp", label: "CP — Cours Préparatoire" },
        { value: "ce1", label: "CE1 — Cours Élémentaire 1" },
        { value: "ce2", label: "CE2 — Cours Élémentaire 2" },
        { value: "cm1", label: "CM1 — Cours Moyen 1" },
        { value: "cm2", label: "CM2 — Cours Moyen 2" },
        { value: "6eme", label: "6ème" },
        { value: "5eme", label: "5ème" },
        { value: "4eme", label: "4ème" },
        { value: "3eme", label: "3ème" },
        { value: "2nde", label: "Seconde" },
        { value: "1ere", label: "Première" },
        { value: "terminale", label: "Terminale" },
    ];

    console.log("🌱 Seeding grades...");

    for (const grade of grades) {
        await prisma.grade.upsert({
            where: { value: grade.value },
            update: { label: grade.label },
            create: { value: grade.value, label: grade.label },
        });
    }

    // ── Seed de l'utilisateur Admin ──
    console.log("🌱 Seeding admin user...");

    const adminEmail = "admin@skolara.com";
    const adminPassword = "Admin123!";
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            firstName: "Admin",
            name: "Skolara",
            passwordHash,
            role: "ADMIN",
            active: true,
        },
        create: {
            firstName: "Admin",
            name: "Skolara",
            email: adminEmail,
            passwordHash,
            role: "ADMIN",
            active: true,
        },
    });

    console.log(`✅ Admin créé : ${adminEmail} / ${adminPassword}`);
    console.log("✅ Seeding finished.");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
