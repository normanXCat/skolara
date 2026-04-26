import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    console.log("🚀 Starting seed script...");

    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) throw new Error("DATABASE_URL manquant");

    const prisma = new PrismaClient({
        adapter: new PrismaPg({ connectionString: DATABASE_URL }),
    });

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
            { name: "Sciences de la Vie et de la Terre", code: "SVT", coefficient: 2 },
            { name: "Histoire-Géographie", code: "HG", coefficient: 2 },
            { name: "Éducation Physique et Sportive", code: "EPS", coefficient: 2 },
            { name: "Arts Plastiques", code: "ART", coefficient: 1 },
            { name: "Musique", code: "MUS", coefficient: 1 },
            { name: "Technologie", code: "TECH", coefficient: 2 },
        ];

        console.log("🌱 Seeding subjects...");
        for (const subject of subjects) {
            await prisma.subject.upsert({
                where: { code: subject.code },
                update: { name: subject.name, coefficient: subject.coefficient },
                create: subject,
            });
        }

        // 4. Sample Classes
        console.log("🌱 Seeding sample classes...");
        const sampleClasses = [
            { name: "6ème A", level: "6ème", schoolYear: "2024-2025" },
            { name: "3ème B", level: "3ème", schoolYear: "2024-2025" },
            { name: "Terminale S1", level: "Terminale", schoolYear: "2024-2025" },
        ];

        for (const cls of sampleClasses) {
            await prisma.class.upsert({
                where: { id: sampleClasses.indexOf(cls) + 1 }, // Simpler for seed
                update: {},
                create: cls,
            });
        }

        // 5. Articles (blog)
        console.log("🌱 Seeding articles...");
        const adminUser = await prisma.user.findUnique({ where: { email: adminEmail } });
        if (adminUser) {
            // On vide les articles existants pour repartir sur une base propre
            await prisma.article.deleteMany({});
            console.log("🧹 Existing articles cleared.");

            const articles = [
                {
                    title: "L'intelligence artificielle au service de l'éducation : une révolution en marche",
                    content: `<p>L'intégration de l'<strong>intelligence artificielle (IA)</strong> dans le milieu scolaire n'est plus une simple perspective futuriste, mais une réalité concrète qui transforme nos salles de classe.</p><h3>Une personnalisation de l'apprentissage sans précédent</h3><p>Grâce aux algorithmes d'apprentissage adaptatif, nous pouvons désormais proposer à chaque élève un <em>parcours sur mesure</em>. Cela permet d'identifier les lacunes en temps réel, d'adapter le rythme des exercices et de proposer des ressources pédagogiques ciblées.</p><p>Cependant, l'IA ne remplace pas l'enseignant ; elle devient un <strong>assistant précieux</strong> qui libère du temps pour l'accompagnement humain et le débat critique.</p>`,
                    category: "Technologie",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 1),
                },
                {
                    title: "Grand succès pour la journée 'Portes Ouvertes' de l'Académie Skolara",
                    content: `<p>La semaine dernière, notre établissement a accueilli plus de <strong>500 parents et futurs élèves</strong> lors de notre annuelle journée portes ouvertes. Les visiteurs ont pu découvrir nos <em>infrastructures modernes</em>, notamment le nouveau laboratoire de sciences et la médiathèque numérique. Nos professeurs ont animé des ateliers interactifs pour démontrer l'excellence de notre pédagogie.</p><blockquote>"L'ambiance et la passion des enseignants sont palpables dès que l'on franchit le seuil."</blockquote><p>Nous remercions tous les bénévoles qui ont fait de cet événement une réussite totale.</p>`,
                    category: "Événements",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1523050338692-7b835a07973f?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 2),
                },
                {
                    title: "Comment préparer sereinement sa session d'examens ?",
                    content: `<p>La période des examens approche. Une bonne préparation est la clé du succès. Voici nos <strong>conseils d'experts</strong> :</p><h3>1. Planifiez vos journées</h3><p>Ne laissez pas la procrastination prendre le dessus. Créez un <em>planning détaillé</em> et respectez-le. Alternez les matières difficiles avec celles que vous appréciez davantage.</p><h3>2. Prenez soin de votre corps</h3><ul><li>Dormez au moins <strong>8 heures par nuit</strong>.</li><li>Mangez équilibré et restez hydraté.</li><li>Faites des pauses actives toutes les 90 minutes.</li></ul>`,
                    category: "Scolarité",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 3),
                },
                {
                    title: "Le sport à l'école : bien plus qu'une activité physique",
                    content: `<p>Au sein de l'Académie Skolara, nous considérons le <strong>sport comme un pilier fondamental</strong> de l'éducation. L'EPS permet de développer des qualités essentielles :</p><ul><li><em>L'esprit d'équipe</em> et la solidarité.</li><li>La persévérance face à l'effort.</li><li>La gestion du stress et des émotions.</li></ul><p>Nos nouvelles infrastructures sportives permettent désormais de pratiquer le basket-ball, le tennis et même l'escalade dans des conditions optimales.</p>`,
                    category: "Sport",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 4),
                },
                {
                    title: "Inauguration de la nouvelle bibliothèque numérique",
                    content: `<p>Nous avons franchi une nouvelle étape dans notre <strong>transformation digitale</strong>. La nouvelle bibliothèque donne accès à plus de <em>10 000 titres numériques</em>, des revues scientifiques et des bases de données de recherche.</p><h3>Un espace de co-working moderne</h3><p>Pensé pour le travail collaboratif, cet espace dispose de bornes tactiles et de zones calmes avec isolation acoustique.</p>`,
                    category: "Technologie",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 5),
                },
                {
                    title: "L'art de l'éloquence : finale du concours de débat",
                    content: `<p>Hier s'est tenue la finale du concours de <strong>débat oratoire</strong>. Les élèves ont brillé par leur capacité à structurer leurs pensées et à s'exprimer avec <em>conviction</em> sur des sujets sociétaux complexes. Félicitations à nos grands gagnants de la classe de Première qui ont su convaincre le jury par leur rhétorique impeccable.</p>`,
                    category: "Culture",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 6),
                },
                {
                    title: "Sortie écologique : observer la biodiversité locale",
                    content: `<p>Nos classes de 6ème ont participé à une <strong>immersion en pleine nature</strong>. Accompagnés par des experts botanistes, ils ont pu identifier les espèces d'oiseaux et de plantes endémiques de notre région. Cette sortie s'inscrit dans notre programme de <em>sensibilisation au développement durable</em>.</p>`,
                    category: "Scolarité",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 7),
                },
                {
                    title: "Le club de programmation lance son premier jeu vidéo",
                    content: `<p>Après six mois de travail acharné, les élèves du <strong>club de code</strong> ont finalisé leur premier projet. Fruit d'un travail collectif entre graphistes, scénaristes et développeurs, ce jeu illustre parfaitement la force du <em>travail d'équipe</em> dans le domaine du numérique. Le jeu est disponible en test sur les ordinateurs de la cafétéria.</p>`,
                    category: "Technologie",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 8),
                },
                {
                    title: "Musique : l'orchestre de l'école en pleine répétition",
                    content: `<p>L'harmonie de l'école prépare son <strong>concert de printemps</strong>. Entre les cuivres, les bois et les cordes, l'alchimie opère sous la baguette de M. Durand. "La musique permet d'apprendre l'<em>écoute de l'autre</em> et la précision", nous confie-t-il pendant une pause.</p>`,
                    category: "Culture",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 9),
                },
                {
                    title: "Orientation post-bac : les métiers du futur",
                    content: `<p>Nous avons accueilli plusieurs professionnels venus présenter les <strong>nouveaux métiers de la Green Tech</strong> et de la Data. Il est essentiel pour nos lycéens de comprendre comment les <em>compétences transversales</em> qu'ils acquièrent ici serviront les enjeux de demain.</p>`,
                    category: "Orientation",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 10),
                },
                {
                    title: "Atelier de cuisine saine : apprendre à bien manger",
                    content: `<p>Un nutritionniste est venu animer un atelier sur l'équilibre alimentaire. Nos élèves ont appris que <strong>bien manger est le carburant de l'esprit</strong>. Ils ont cuisiné ensemble des <em>recettes simples et savoureuses</em> à base de produits locaux et saisonniers.</p>`,
                    category: "Actualités",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 11),
                },
                {
                    title: "Tournoi d'échecs : tactique et concentration",
                    content: `<p>Plus de 40 participants pour le tournoi d'échecs de cette année. Une épreuve qui demande une <strong>patience infinie</strong> et une vision stratégique à long terme. Félicitations à Léa (4ème C) qui a remporté la finale après un match <em>haletant</em> de plus de deux heures.</p>`,
                    category: "Événements",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1522071823916-2c5e533c39d8?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 12),
                },
                {
                    title: "Nouveau programme d'échanges internationaux",
                    content: `<p>L'Académie Skolara renforce ses partenariats avec des établissements au Canada et en Angleterre. Nous croyons fermement que l'<strong>ouverture au monde</strong> est une composante majeure d'une <em>éducation d'élite</em>.</p>`,
                    category: "Actualités",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756eaa539?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 13),
                },
                {
                    title: "Les bienfaits de la lecture sur le développement cognitif",
                    content: `<p>Une étude menée dans nos classes montre que <strong>20 minutes de lecture quotidienne</strong> améliorent significativement le vocabulaire et la capacité d'empathie. Notre défi '15 jours sans écran' a été relevé par une majorité d'élèves, prouvant que le <em>plaisir de lire</em> reste intemporel.</p>`,
                    category: "Culture",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 14),
                },
                {
                    title: "Science Day : des expériences spectaculaires",
                    content: `<p>Le gymnase a été transformé en un <strong>gigantesque laboratoire éphémère</strong>. Des fusées à eau aux circuits électriques complexes, nos élèves ont démontré que la <em>science est vivante et passionnante</em>.</p>`,
                    category: "Événements",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 15),
                },
                {
                    title: "Vivre ensemble : atelier sur la lutte contre le harcèlement",
                    content: `<p>La bienveillance est au cœur de nos valeurs. Cet atelier a permis de libérer la parole et de former nos élèves à devenir des <strong>ambassadeurs de la tolérance</strong>. "Le respect n'est pas une option, c'est un <em>engagement quotidien</em>," a rappelé la directrice.</p>`,
                    category: "Actualités",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 16),
                },
                {
                    title: "Le nouveau bus scolaire 100% électrique est arrivé",
                    content: `<p>Fidèles à nos engagements écologiques, nous avons acquis notre premier transport <strong>zéro émission</strong>. Une manière concrète de montrer l'exemple à nos élèves en matière de <em>mobilité durable</em>.</p>`,
                    category: "Actualités",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1533230408708-8f9f91d12344?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 17),
                },
                {
                    title: "Théâtre : soirée Molière par la troupe des lycéens",
                    content: `<p>Une interprétation magistrale de 'L'Avare' a enchanté le public vendredi soir. Le talent de nos élèves-comédiens souligne l'importance des <strong>activités artistiques</strong> dans la construction de la <em>confiance en soi</em>.</p>`,
                    category: "Culture",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 18),
                },
                {
                    title: "Récompenses académiques : honneur à nos majors de promo",
                    content: `<p>La cérémonie de remise des prix a célébré le <strong>travail soutenu et l'excellence</strong>. Au-delà des notes, c'est l'<em>investissement citoyen</em> et l'entraide qui ont été mis à l'honneur cette année.</p>`,
                    category: "Scolarité",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1505373633560-fa9a2f647962?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 19),
                },
                {
                    title: "Découverte des métiers de la recherche médicale",
                    content: `<p>Nos classes de Terminale S ont visité un <strong>centre de recherche de pointe</strong>. Ils ont pu observer des chercheurs travaillant sur les thérapies de demain, une expérience <em>inspirante</em> pour leurs futurs choix de carrière.</p>`,
                    category: "Orientation",
                    status: "PUBLISHED",
                    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070",
                    publishedAt: new Date(Date.now() - 3600000 * 24 * 20),
                }
            ];

            for (const article of articles) {
                await prisma.article.create({
                    data: {
                        ...article,
                        authorId: adminUser.id,
                        status: article.status as any,
                    }
                });
            }
            console.log("✅ 20 Articles créés avec succès.");
        }

        // 6. Calendar Event Types
        console.log("🌱 Seeding calendar event types...");
        const eventTypes = [
            { value: "holiday", label: "Congés / Vacances", color: "bg-green-500 text-white shadow-green-500/20" },
            { value: "exam", label: "Examen / Contrôle", color: "bg-red-500 text-white shadow-red-500/20" },
            { value: "meeting", label: "Réunion / Conseil", color: "bg-blue-500 text-white shadow-blue-500/20" },
            { value: "other", label: "Autre", color: "bg-primary text-white shadow-primary/20" },
        ];

        for (const type of eventTypes) {
            await prisma.calendarEventType.upsert({
                where: { value: type.value },
                update: { label: type.label, color: type.color },
                create: type,
            });
        }

        console.log("✅ Types d'événements créés.");

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

