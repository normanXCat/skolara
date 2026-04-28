import { prisma } from "../../../prisma/client";
import { Role, Status, StudentStatus } from "../../../generated/prisma";
import authService from "../../auth/auth.service";
import { generateRandomPassword } from "../../../utils/password";
import { sendEmail } from "../../../lib/email/send";
import { ParentWelcomeEmail } from "../../../lib/email/templates/ParentWelcome";
import { StudentWelcomeEmail } from "../../../lib/email/templates/StudentWelcome";
import { getCurrentSchoolYear } from "../../../utils/date";

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
        const result = await prisma.$transaction(async (tx) => {
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

            // 2. Créer l'utilisateur élève
            // Utiliser le vrai email de l'élève (childEmail) s'il existe,
            // sinon générer un identifiant @student.skolara.pf
            let studentEmail: string;

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
            } else {
                const baseEmail =
                    `${preReg.childFirstName.toLowerCase()}.${preReg.childLastName.toLowerCase()}`.replace(
                        /\s+/g,
                        "",
                    );
                studentEmail = `${baseEmail}@student.skolara.pf`;
                let counter = 1;
                while (
                    await tx.user.findUnique({ where: { email: studentEmail } })
                ) {
                    studentEmail = `${baseEmail}${counter}@student.skolara.pf`;
                    counter++;
                }
            }

            const studentTempPass = generateRandomPassword(12);
            const studentPasswordHash = await authService.hashPassword(studentTempPass);

            const studentUser = await tx.user.create({
                data: {
                    email: studentEmail,
                    firstName: preReg.childFirstName,
                    name: preReg.childLastName,
                    passwordHash: studentPasswordHash,
                    role: Role.ELEVE,
                },
            });

            // 3. Gérer le parent
            let parentId = null;
            let parentTempPass = null;
            if (options.createParentAccount) {
                parentTempPass = generateRandomPassword(12);
                const parentPasswordHash = await authService.hashPassword(parentTempPass);

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
                            passwordHash: parentPasswordHash,
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

            // 3.5 Trouver une classe automatique si classId non fourni
            let assignedClassId = options.classId;
            if (!assignedClassId) {
                const currentYear = getCurrentSchoolYear();
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
                } else {
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
                    schoolYear: getCurrentSchoolYear(),
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
        this.sendWelcomeEmails(id, result).catch(err => 
            console.error("[CONVERSION] Failed to send welcome emails:", err)
        );

        return result.student;
    }

    /**
     * Envoie les emails de bienvenue après conversion.
     */
    private async sendWelcomeEmails(preRegId: number, data: any) {
        const updateData: any = {};

        // Email au parent
        if (data.parentTempPass) {
            const parentHtml = ParentWelcomeEmail({
                parentName: data.parentName,
                childName: data.childName,
                email: data.parentEmail,
                password: data.parentTempPass
            });

            const res = await sendEmail({
                to: data.parentEmail,
                subject: `Skolara — Identifiants de connexion (Dossier ${data.childName})`,
                html: parentHtml
            });

            if (res.success) updateData.parentEmailSentAt = new Date();
        }

        // Email à l'élève — envoyé à son vrai email s'il existe,
        // sinon au parent (car @student.skolara.pf n'est pas une vraie boîte mail).
        const studentRecipient = data.childEmail && data.childEmail.trim() !== ""
            ? data.childEmail
            : data.parentEmail;

        const studentHtml = StudentWelcomeEmail({
            firstName: data.childFirstName,
            email: data.studentEmail,
            password: data.studentTempPass
        });

        const resStudent = await sendEmail({
            to: studentRecipient,
            subject: `Skolara — Identifiants élève de ${data.childName}`,
            html: studentHtml
        });

        if (resStudent.success) updateData.studentEmailSentAt = new Date();

        if (Object.keys(updateData).length > 0) {
            await prisma.preRegistration.update({
                where: { id: preRegId },
                data: updateData
            });
        }
    }

    /**
     * Renvoie les emails de bienvenue manuellement.
     */
    async resendWelcomeEmails(id: number) {
        const preReg = await prisma.preRegistration.findUnique({
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
        const newStudentPass = generateRandomPassword(12);
        await prisma.user.update({
            where: { id: preReg.student.userId },
            data: { passwordHash: await authService.hashPassword(newStudentPass) }
        });

        let parentTempPass = null;
        if (preReg.student.parentId) {
            const parent = await prisma.parent.findUnique({
                where: { id: preReg.student.parentId },
                include: { user: true }
            });
            if (parent) {
                parentTempPass = generateRandomPassword(12);
                await prisma.user.update({
                    where: { id: parent.userId },
                    data: { passwordHash: await authService.hashPassword(parentTempPass) }
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

