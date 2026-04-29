import { PrismaClient, Role, StudentStatus, AbsenceStatus, PaymentStatus } from '../../src/generated/prisma/index';
import { scrapeArticles } from '../scrapers/articleScraper';
import { scrapeCalendar } from '../scrapers/calendarScraper';
import { CorpusEngine } from '../scrapers/corpusEngine';
import bcrypt from "bcrypt";

type ArticleStatusEnum = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export async function seedAllModelsFromCorpus(prisma: PrismaClient) {
    console.log("🌱 Début du seeder intégré COMPLET (100% procédural via le web scraping)...");
    
    const articles = await scrapeArticles();
    const events = await scrapeCalendar();
    
    if (articles.length === 0) {
        console.warn("⚠️ Impossible de populer sans données articles. Arrêt.");
        return;
    }

    const corpus = new CorpusEngine(articles);
    const passwordHash = await bcrypt.hash("Password123!", 10);

    // ==========================================
    // 1. ADMIN USER
    // ==========================================
    let admin = await prisma.user.findUnique({ where: { email: "admin@skolara.com" } });
    if (!admin) {
        admin = await prisma.user.create({
            data: {
                email: "admin@skolara.com",
                firstName: "Administrateur",
                name: "Système",
                passwordHash,
                role: Role.ADMIN
            }
        });
    }

    // ==========================================
    // 2. ARTICLES DE BLOG ET EVENTS
    // ==========================================
    for (const article of articles) {
        const existing = await prisma.article.findFirst({ where: { title: article.title } });
        if (!existing) {
            await prisma.article.create({
                data: {
                    title: article.title,
                    content: article.content,
                    imageUrl: article.imageUrl,
                    publishedAt: article.publishedAt,
                    status: "PUBLISHED" as ArticleStatusEnum,
                    category: article.category,
                    authorId: admin.id,
                }
            });
        }
    }
    
    for (const event of events) {
        const existing = await prisma.calendarEvent.findFirst({ where: { title: event.title, startDate: event.startDate } });
        if (!existing) {
            await prisma.calendarEvent.create({
                data: {
                    title: event.title,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    eventType: event.eventType,
                    isPublic: true,
                }
            });
        }
    }

    // ==========================================
    // 3. GENERATION DE NOUVEAUX USERS VIA CORPUS
    // ==========================================
    const teachers: any[] = [];
    const students: any[] = [];
    const classes: any[] = [];

    // Créer des Enseignants
    for (let i = 0; i < 5; i++) {
        const fn = corpus.getFirstName();
        const ln = corpus.getLastName();
        const email = `enseignant.${fn.toLowerCase()}.${ln.toLowerCase()}@skolara.com`;
        
        let teacher: any = await prisma.user.findUnique({ where: { email }, include: { teacher: true } });
        if (!teacher) {
            teacher = await prisma.user.create({
                data: {
                    firstName: fn,
                    name: ln,
                    email,
                    passwordHash,
                    role: Role.ENSEIGNANT,
                    teacher: {
                        create: { speciality: "Générique" } // Re-assignéd later
                    }
                },
                include: { teacher: true }
            });
        }
        if(teacher.teacher) teachers.push(teacher.teacher);
    }

    // Créer des Subjects et des Classes
    const baseSubjects = ["Mathématiques", "Français", "Histoire-Géographie", "Sciences", "Langues"];
    const dbSubjects: any[] = [];
    for (const sName of baseSubjects) {
        let sub = await prisma.subject.findFirst({ where: { name: sName } });
        if (!sub) {
            sub = await prisma.subject.create({ data: { name: sName, code: sName.substring(0, 4).toUpperCase(), coefficient: 2 } });
        }
        dbSubjects.push(sub);
    }

    const classNames = ["Seconde A", "Première B", "Terminale C"];
    for (const cName of classNames) {
        let cls = await prisma.class.findFirst({ where: { name: cName } });
        if (!cls) {
            cls = await prisma.class.create({
                data: {
                    name: cName,
                    level: cName.split(' ')[0],
                    schoolYear: "2024-2025"
                }
            });
        }
        classes.push(cls);
    }

    // Créer des Parents et des Elèves
    for (let i = 0; i < 10; i++) {
        const fn = corpus.getFirstName();
        const ln = corpus.getLastName();
        const parentFn = corpus.getFirstName();
        
        const parentEmail = `parent.${parentFn.toLowerCase()}.${ln.toLowerCase()}@skolara.com`;
        let pUser: any = await prisma.user.findUnique({ where: { email: parentEmail }, include: { parent: true } });
        if (!pUser) {
            pUser = await prisma.user.create({
                data: {
                    firstName: parentFn,
                    name: ln,
                    email: parentEmail,
                    passwordHash,
                    role: Role.PARENT,
                    parent: { create: { phone: "0600000000" } }
                },
                include: { parent: true }
            });
        }

        const studentEmail = `eleve.${fn.toLowerCase()}.${ln.toLowerCase()}@skolara.com`;
        let sUser: any = await prisma.user.findUnique({ where: { email: studentEmail }, include: { student: true } });
        if (!sUser) {
            sUser = await prisma.user.create({
                data: {
                    firstName: fn,
                    name: ln,
                    email: studentEmail,
                    passwordHash,
                    role: Role.ELEVE,
                    student: {
                        create: {
                            classId: classes[i % classes.length].id,
                            parentId: pUser.parent?.id,
                            birthDate: new Date("2008-01-01"),
                            schoolYear: "2024-2025",
                            status: StudentStatus.ACTIVE
                        }
                    }
                },
                include: { student: true }
            });
        }
        if(sUser.student) students.push(sUser.student);
    }

    // ===========================================
    // 4. HYDRATATION DES AUTRES MODELES (Texts)
    // ===========================================
    console.log("🧩 Hydratation des LessonBooks, Timetables, Messages...");
    
    // LessonBooks
    for (let c of classes) {
        for (let s of dbSubjects) {
            await prisma.lessonBook.create({
                data: {
                    teacherId: teachers[Math.floor(Math.random() * teachers.length)].id,
                    classId: c.id,
                    subjectId: s.id,
                    lessonDate: new Date(),
                    content: corpus.getParagraph(2),
                    homework: corpus.getSentence(),
                    homeworkDueDate: new Date(Date.now() + 86400000 * 3)
                }
            });
        }
    }

    // Messages
    for (let i = 0; i < 5; i++) {
        await prisma.message.create({
            data: {
                senderId: admin.id,
                receiverId: teachers[i % teachers.length].userId,
                subject: corpus.getSentence().substring(0, 30),
                content: corpus.getParagraph(3),
                isRead: false
            }
        });
    }

    // Report Cards & Grades
    for (let st of students) {
        const rc = await prisma.reportCard.create({
            data: {
                studentId: st.id,
                classId: st.classId!,
                semester: 1,
                schoolYear: "2024-2025",
                overallAverage: 10 + Math.random() * 8, // Between 10 and 18
                generalAppreciation: corpus.getParagraph(1)
            }
        });

        for(let s of dbSubjects) {
            await prisma.grade.create({
                data: {
                    studentId: st.id,
                    subjectId: s.id,
                    teacherId: teachers[Math.floor(Math.random() * teachers.length)].id,
                    classId: st.classId!,
                    value: 10 + Math.random() * 8,
                    semester: 1,
                    comment: corpus.getSentence()
                }
            });
        }
    }

    console.log("✅ Seed complété avec succès ! Corpus injecté dans tout le schéma !");
}
