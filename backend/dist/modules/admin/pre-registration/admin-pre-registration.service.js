"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPreRegistrationService = void 0;
const client_1 = require("../../../prisma/client");
const prisma_1 = require("../../../generated/prisma");
const auth_service_1 = __importDefault(require("../../auth/auth.service"));
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
        return client_1.prisma.$transaction(async (tx) => {
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
            // 2. Créer l'utilisateur élève (génération d'email)
            const baseEmail = `${preReg.childFirstName.toLowerCase()}.${preReg.childLastName.toLowerCase()}`.replace(/\s+/g, "");
            let studentEmail = `${baseEmail}@student.skolara.pf`;
            let counter = 1;
            while (await tx.user.findUnique({ where: { email: studentEmail } })) {
                studentEmail = `${baseEmail}${counter}@student.skolara.pf`;
                counter++;
            }
            const studentUser = await tx.user.create({
                data: {
                    email: studentEmail,
                    firstName: preReg.childFirstName,
                    name: preReg.childLastName,
                    passwordHash: await auth_service_1.default.hashPassword("Welcome123!"), // MDP temporaire
                    role: prisma_1.Role.ELEVE,
                },
            });
            // 3. Gérer le parent
            let parentId = null;
            if (options.createParentAccount) {
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
                            passwordHash: await auth_service_1.default.hashPassword("Parent123!"),
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
            // 4. Créer l'élève
            const student = await tx.student.create({
                data: {
                    userId: studentUser.id,
                    parentId,
                    classId: options.classId,
                    birthDate: preReg.childDateOfBirth,
                    address: preReg.parentAddress,
                    schoolYear: "2024-2025",
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
            // TODO: Envoyer l'email de bienvenue via le mailer
            // console.log(`Email de bienvenue envoyé à ${preReg.parentEmail}`);
            return student;
        });
    }
}
exports.AdminPreRegistrationService = AdminPreRegistrationService;
//# sourceMappingURL=admin-pre-registration.service.js.map