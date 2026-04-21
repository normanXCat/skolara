import { prisma } from "../../../prisma/client";
import { Role, Status, StudentStatus } from "../../../generated/prisma";
import authService from "../../auth/auth.service";

/**
 * Service pour le traitement des pré-inscriptions par l'admin.
 */
export class AdminPreRegistrationService {
    /**
     * Liste toutes les pré-inscriptions avec filtres.
     */
    async findAll(filters: any) {
        const { page = 1, limit = 10, status, search } = filters;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (status) where.status = status;
        if (search) {
            where.OR = [
                { childFirstName: { contains: search, mode: "insensitive" } },
                { childLastName: { contains: search, mode: "insensitive" } },
                { fileNumber: { contains: search, mode: "insensitive" } },
            ];
        }

        const [data, total] = await Promise.all([
            prisma.preRegistration.findMany({
                where,
                skip,
                take: limit,
                orderBy: { submittedAt: "desc" },
            }),
            prisma.preRegistration.count({ where }),
        ]);

        return { data, total, totalPages: Math.ceil(total / limit) };
    }

    /**
     * Récupère le détail d'un dossier.
     */
    async findById(id: number) {
        const preReg = await prisma.preRegistration.findUnique({
            where: { id },
            include: {
                processedByUser: true,
                student: { include: { user: true } },
            },
        });
        if (!preReg) throw { status: 404, message: "Dossier non trouvé" };
        return preReg;
    }

    /**
     * Met à jour le statut d'un dossier.
     */
    async updateStatus(
        id: number,
        status: Status,
        adminId: number,
        comment?: string,
    ) {
        return prisma.preRegistration.update({
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
    async convertToStudent(
        id: number,
        adminId: number,
        options: { classId?: number; createParentAccount: boolean },
    ) {
        return prisma.$transaction(async (tx) => {
            // 1. Vérifier si déjà converti ou existe
            const preReg = await tx.preRegistration.findUnique({
                where: { id },
            });
            if (!preReg) throw { status: 404, message: "Dossier non trouvé" };
            if (preReg.status === Status.ACCEPTED && preReg.studentId) {
                throw {
                    status: 409,
                    message: "Ce dossier a déjà été converti en élève",
                };
            }

            // 2. Créer l'utilisateur élève (génération d'email)
            const baseEmail =
                `${preReg.childFirstName.toLowerCase()}.${preReg.childLastName.toLowerCase()}`.replace(
                    /\s+/g,
                    "",
                );
            let studentEmail = `${baseEmail}@student.skolara.pf`;
            let counter = 1;
            while (
                await tx.user.findUnique({ where: { email: studentEmail } })
            ) {
                studentEmail = `${baseEmail}${counter}@student.skolara.pf`;
                counter++;
            }

            const studentUser = await tx.user.create({
                data: {
                    email: studentEmail,
                    firstName: preReg.childFirstName,
                    name: preReg.childLastName,
                    passwordHash: await authService.hashPassword("Welcome123!"), // MDP temporaire
                    role: Role.ELEVE,
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
                            firstName:
                                preReg.parentFirstName ||
                                preReg.parentFullName.split(" ")[0],
                            name:
                                preReg.parentFullName
                                    .split(" ")
                                    .slice(1)
                                    .join(" ") || preReg.parentFullName,
                            passwordHash:
                                await authService.hashPassword("Parent123!"),
                            role: Role.PARENT,
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
                    status: StudentStatus.ACTIVE,
                },
            });

            // 5. Marquer la pré-inscription comme acceptée et liée
            await tx.preRegistration.update({
                where: { id },
                data: {
                    status: Status.ACCEPTED,
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
