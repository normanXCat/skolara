"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPreRegistrationService = void 0;
const client_1 = require("../../../prisma/client");
const prisma_1 = require("../../../generated/prisma");
const auth_service_1 = __importDefault(require("../../auth/auth.service"));
const password_1 = require("../../../utils/password");
const send_1 = require("../../../lib/email/send");
const ParentWelcome_1 = require("../../../lib/email/templates/ParentWelcome");
const StudentWelcome_1 = require("../../../lib/email/templates/StudentWelcome");
const date_1 = require("../../../utils/date");
/**
 * Service pour le traitement des pré-inscriptions par l'admin.
 */
class AdminPreRegistrationService {
    /**
     * Liste toutes les pré-inscriptions avec filtres.
     */
    async findAll(filters) {
        const { page = 1, limit = 10, status, search } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (status)
            where.status = status;
        if (search) {
            where.OR = [
                { childFirstName: { contains: search, mode: "insensitive" } },
                { childLastName: { contains: search, mode: "insensitive" } },
                { fileNumber: { contains: search, mode: "insensitive" } },
            ];
        }
        const [data, total] = await Promise.all([
            client_1.prisma.preRegistration.findMany({
                where,
                skip,
                take: limit,
                orderBy: { submittedAt: "desc" },
            }),
            client_1.prisma.preRegistration.count({ where }),
        ]);
        return { data, total, totalPages: Math.ceil(total / limit) };
    }
    /**
     * Récupère le détail d'un dossier.
     */
    async findById(id) {
        const preReg = await client_1.prisma.preRegistration.findUnique({
            where: { id },
            include: {
                processedByUser: true,
                student: { include: { user: true } },
            },
        });
        if (!preReg)
            throw { status: 404, message: "Dossier non trouvé" };
        return preReg;
    }
    /**
     * Met à jour le statut d'un dossier.
     */
    async updateStatus(id, status, adminId, comment) {
        return client_1.prisma.preRegistration.update({
            where: { id },
            data: {
                status,
                processedBy: adminId,
                processedAt: new Date(),
                adminComment: comment || undefined,
            },
        });
    }
    /**
     * Convertit une pré-inscription acceptée en élève réel.
     * Utilise une transaction Prisma pour l'atomicité.
     */
    async convertToStudent(id, adminId, options) {
        const result = await client_1.prisma.$transaction(async (tx) => {
            // 1. Vérifier si déjà converti ou existe
            const preReg = await tx.preRegistration.findUnique({
                where: { id },
            });
            if (!preReg)
                throw { status: 404, message: "Dossier non trouvé" };
            if (preReg.status === prisma_1.Status.ACCEPTED && preReg.studentId) {
                throw {
                    status: 409,
                    message: "Ce dossier a déjà été converti en élève",
                };
            }
            // 2. Créer l'utilisateur élève
            // Utiliser le vrai email de l'élève (childEmail) s'il existe,
            // sinon générer un identifiant @student.skolara.pf
            let studentEmail;
            if (preReg.childEmail && preReg.childEmail.trim() !== "") {
                // Vérifier que le vrai email n'est pas déjà utilisé
                const existing = await tx.user.findUnique({ where: { email: preReg.childEmail } });
                if (existing) {
                    throw {
                        status: 409,
                        message: `L'email ${preReg.childEmail} est déjà utilisé par un autre compte.`,
                    };
                }
                studentEmail = preReg.childEmail;
            }
            else {
                const baseEmail = `${preReg.childFirstName.toLowerCase()}.${preReg.childLastName.toLowerCase()}`.replace(/\s+/g, "");
                studentEmail = `${baseEmail}@student.skolara.pf`;
                let counter = 1;
                while (await tx.user.findUnique({ where: { email: studentEmail } })) {
                    studentEmail = `${baseEmail}${counter}@student.skolara.pf`;
                    counter++;
                }
            }
            const studentTempPass = (0, password_1.generateRandomPassword)(12);
            const studentPasswordHash = await auth_service_1.default.hashPassword(studentTempPass);
            const studentUser = await tx.user.create({
                data: {
                    email: studentEmail,
                    firstName: preReg.childFirstName,
                    name: preReg.childLastName,
                    passwordHash: studentPasswordHash,
                    role: prisma_1.Role.ELEVE,
                },
            });
            // 3. Gérer le parent
            let parentId = null;
            let parentTempPass = null;
            if (options.createParentAccount) {
                parentTempPass = (0, password_1.generateRandomPassword)(12);
                const parentPasswordHash = await auth_service_1.default.hashPassword(parentTempPass);
                let parentUser = await tx.user.findUnique({
                    where: { email: preReg.parentEmail },
                });
                if (!parentUser) {
                    parentUser = await tx.user.create({
                        data: {
                            email: preReg.parentEmail,
                            firstName: preReg.parentFirstName ||
                                preReg.parentFullName.split(" ")[0],
                            name: preReg.parentFullName
                                .split(" ")
                                .slice(1)
                                .join(" ") || preReg.parentFullName,
                            passwordHash: parentPasswordHash,
                            role: prisma_1.Role.PARENT,
                        },
                    });
                }
                let parent = await tx.parent.findUnique({
                    where: { userId: parentUser.id },
                });
                if (!parent) {
                    parent = await tx.parent.create({
                        data: {
                            userId: parentUser.id,
                            phone: preReg.parentPhone,
                            address: preReg.parentAddress || "",
                        },
                    });
                }
                parentId = parent.id;
            }
            // 3.5 Trouver une classe automatique si classId non fourni
            let assignedClassId = options.classId;
            if (!assignedClassId) {
                const currentYear = (0, date_1.getCurrentSchoolYear)();
                const availableClasses = await tx.class.findMany({
                    where: {
                        level: preReg.desiredGrade,
                        schoolYear: currentYear,
                    },
                    include: {
                        _count: { select: { students: true } }
                    }
                });
                const eligibleClasses = availableClasses.filter(c => c._count.students < c.maxCapacity);
                if (eligibleClasses.length > 0) {
                    // Random pick
                    const randomIndex = Math.floor(Math.random() * eligibleClasses.length);
                    assignedClassId = eligibleClasses[randomIndex].id;
                }
                else {
                    // No class available -> UI must handle redirect
                    throw {
                        status: 428,
                        message: `Aucune classe disponible pour le niveau ${preReg.desiredGrade}. Veuillez en créer une pour l'année ${currentYear}.`,
                        code: "NO_CLASS_AVAILABLE",
                        grade: preReg.desiredGrade
                    };
                }
            }
            // 4. Créer l'élève
            const student = await tx.student.create({
                data: {
                    userId: studentUser.id,
                    parentId,
                    classId: assignedClassId,
                    birthDate: preReg.childDateOfBirth,
                    address: preReg.parentAddress,
                    schoolYear: (0, date_1.getCurrentSchoolYear)(),
                    status: prisma_1.StudentStatus.ACTIVE,
                },
            });
            // 5. Marquer la pré-inscription comme acceptée et liée
            await tx.preRegistration.update({
                where: { id },
                data: {
                    status: prisma_1.Status.ACCEPTED,
                    studentId: student.id,
                    processedBy: adminId,
                    processedAt: new Date(),
                },
            });
            return {
                student,
                studentEmail,
                studentTempPass,
                parentEmail: preReg.parentEmail,
                parentTempPass,
                parentName: preReg.parentFullName,
                childName: `${preReg.childFirstName} ${preReg.childLastName}`,
                childFirstName: preReg.childFirstName,
                childEmail: preReg.childEmail,
            };
        });
        // 6. Envoi des emails de bienvenue (post-transaction)
        this.sendWelcomeEmails(id, result).catch(err => console.error("[CONVERSION] Failed to send welcome emails:", err));
        return result.student;
    }
    /**
     * Envoie les emails de bienvenue après conversion.
     */
    async sendWelcomeEmails(preRegId, data) {
        const updateData = {};
        // Email au parent
        if (data.parentTempPass) {
            const parentHtml = (0, ParentWelcome_1.ParentWelcomeEmail)({
                parentName: data.parentName,
                childName: data.childName,
                email: data.parentEmail,
                password: data.parentTempPass
            });
            const res = await (0, send_1.sendEmail)({
                to: data.parentEmail,
                subject: `Skolara — Identifiants de connexion (Dossier ${data.childName})`,
                html: parentHtml
            });
            if (res.success)
                updateData.parentEmailSentAt = new Date();
        }
        // Email à l'élève — envoyé à son vrai email s'il existe,
        // sinon au parent (car @student.skolara.pf n'est pas une vraie boîte mail).
        const studentRecipient = data.childEmail && data.childEmail.trim() !== ""
            ? data.childEmail
            : data.parentEmail;
        const studentHtml = (0, StudentWelcome_1.StudentWelcomeEmail)({
            firstName: data.childFirstName,
            email: data.studentEmail,
            password: data.studentTempPass
        });
        const resStudent = await (0, send_1.sendEmail)({
            to: studentRecipient,
            subject: `Skolara — Identifiants élève de ${data.childName}`,
            html: studentHtml
        });
        if (resStudent.success)
            updateData.studentEmailSentAt = new Date();
        if (Object.keys(updateData).length > 0) {
            await client_1.prisma.preRegistration.update({
                where: { id: preRegId },
                data: updateData
            });
        }
    }
    /**
     * Renvoie les emails de bienvenue manuellement.
     */
    async resendWelcomeEmails(id) {
        const preReg = await client_1.prisma.preRegistration.findUnique({
            where: { id },
            include: {
                student: { include: { user: true } },
            }
        });
        if (!preReg || !preReg.student) {
            throw { status: 404, message: "Dossier ou élève non trouvé" };
        }
        // Pour un renvoi, on ne connaît plus le mot de passe temporaire initial.
        // On va en générer un nouveau et mettre à jour le hash.
        const newStudentPass = (0, password_1.generateRandomPassword)(12);
        await client_1.prisma.user.update({
            where: { id: preReg.student.userId },
            data: { passwordHash: await auth_service_1.default.hashPassword(newStudentPass) }
        });
        let parentTempPass = null;
        if (preReg.student.parentId) {
            const parent = await client_1.prisma.parent.findUnique({
                where: { id: preReg.student.parentId },
                include: { user: true }
            });
            if (parent) {
                parentTempPass = (0, password_1.generateRandomPassword)(12);
                await client_1.prisma.user.update({
                    where: { id: parent.userId },
                    data: { passwordHash: await auth_service_1.default.hashPassword(parentTempPass) }
                });
            }
        }
        const resultData = {
            studentEmail: preReg.student.user.email,
            studentTempPass: newStudentPass,
            parentEmail: preReg.parentEmail,
            parentTempPass,
            parentName: preReg.parentFullName,
            childName: `${preReg.childFirstName} ${preReg.childLastName}`,
            childFirstName: preReg.childFirstName,
            childEmail: preReg.childEmail,
        };
        await this.sendWelcomeEmails(id, resultData);
        return { success: true, message: "Emails de bienvenue renvoyés (mots de passe réinitialisés)" };
    }
}
exports.AdminPreRegistrationService = AdminPreRegistrationService;
//# sourceMappingURL=admin-pre-registration.service.js.map