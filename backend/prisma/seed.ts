import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/index";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { seedAllModelsFromCorpus } from "./seeders/orchestratorSeeder";

dotenv.config();

async function main() {
    console.log("🚀 Starting seed script...");

    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) throw new Error("DATABASE_URL manquant");

    const isProduction = process.env.NODE_ENV === "production";

    // Create a Pool with proper SSL config (rejectUnauthorized: false for Render's self-signed certs)
    const pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
    });

    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        // 1. School Levels (niveaux scolaires)
        const schoolLevels = [
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

        console.log("🌱 Seeding school levels...");
        for (const level of schoolLevels) {
            await prisma.schoolLevel.upsert({
                where: { value: level.value },
                update: { label: level.label },
                create: { value: level.value, label: level.label },
            });
        }

        // 2. Admin user
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

        // 3. Subjects (matières)
        const subjects = [
            { name: "Mathématiques", code: "MATH", coefficient: 4 },
            { name: "Français", code: "FR", coefficient: 4 },
            { name: "Anglais", code: "ANG", coefficient: 3 },
            { name: "Sciences Physiques", code: "PHYS", coefficient: 3 },
            {
                name: "Sciences de la Vie et de la Terre",
                code: "SVT",
                coefficient: 2,
            },
            { name: "Histoire-Géographie", code: "HG", coefficient: 2 },
            {
                name: "Éducation Physique et Sportive",
                code: "EPS",
                coefficient: 2,
            },
            { name: "Arts Plastiques", code: "ART", coefficient: 1 },
            { name: "Musique", code: "MUS", coefficient: 1 },
            { name: "Technologie", code: "TECH", coefficient: 2 },
        ];

        console.log("🌱 Seeding subjects...");
        for (const subject of subjects) {
            await prisma.subject.upsert({
                where: { code: subject.code },
                update: {
                    name: subject.name,
                    coefficient: subject.coefficient,
                },
                create: subject,
            });
        }

        // 4. Sample Classes
        console.log("🌱 Seeding sample classes...");
        const sampleClasses = [
            { name: "6ème A", level: "6ème", schoolYear: "2024-2025" },
            { name: "3ème B", level: "3ème", schoolYear: "2024-2025" },
            {
                name: "Terminale S1",
                level: "Terminale",
                schoolYear: "2024-2025",
            },
        ];

        for (const cls of sampleClasses) {
            await prisma.class.upsert({
                where: { id: sampleClasses.indexOf(cls) + 1 }, // Simpler for seed
                update: {},
                create: cls,
            });
        }

        console.log("🌱 Hydrating DB completely via Web Scraped Corpus...");
        // This will launch scraping, extract words/texts natively and fulfill
        // Admin, Articles, Timetables, Users, Classes, Parents, Students
        // LessonBooks, Messages, ReportCards...
        try {
            await seedAllModelsFromCorpus(prisma);
        } catch (e) {
            console.error("Erreur durant seedAllModelsFromCorpus:", e);
        }

        // 7. Site Settings
        console.log("🌱 Seeding site settings...");
        const defaultSettings = [
            { key: "school_name", value: "Skolara" },
            { key: "phone", value: "" },
            { key: "email", value: "" },
            { key: "address", value: "" },
            { key: "city", value: "" },
            { key: "google_maps_url", value: "" },
            { key: "facebook_url", value: "" },
            { key: "instagram_url", value: "" },
            { key: "twitter_url", value: "" },
            { key: "linkedin_url", value: "" },
            { key: "mentions_legales", value: "" },
            { key: "cgu", value: "" },
        ];

        for (const setting of defaultSettings) {
            await prisma.siteSettings.upsert({
                where: { key: setting.key },
                update: {},
                create: setting,
            });
        }
        console.log("✅ Site settings créés.");

        console.log("✅ Seeding finished successfully.");
    } catch (error) {
        console.error("❌ Fatal error:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((err) => {
    console.error("❌ Fatal initialization error:", err);
    process.exit(1);
});
