import { TeachersRepository } from "./teachers.repository";
import {
    CreateTeacherInput,
    UpdateTeacherInput,
    TeacherFiltersInput,
    AssignmentInput,
} from "./teachers.schema";
import authService from "../../auth/auth.service";
import { Role } from "../../../generated/prisma";
import { prisma } from "../../../prisma/client";
import { sendEmail } from "../../../lib/email/send";
import { TeacherWelcomeEmail } from "../../../lib/email/templates/TeacherWelcome";
import { generateRandomPassword } from "../../../utils/password";

/**
 * Service pour la logique métier des enseignants.
 */
export class TeachersService {
    private repository: TeachersRepository;

    constructor(repository: TeachersRepository) {
        this.repository = repository;
    }

    /**
     * Récupère la liste paginée des enseignants.
     */
    async findAll(filters: TeacherFiltersInput) {
        const { data, total } = await this.repository.findMany(filters);
        const totalPages = Math.ceil(total / filters.limit);

        return {
            teachers: data,
            pagination: {
                page: filters.page,
                limit: filters.limit,
                total,
                totalPages,
            },
        };
    }

    /**
     * Détails d'un enseignant.
     */
    async findById(id: number) {
        const item = await this.repository.findById(id);
        if (!item) {
            throw { status: 404, message: "Enseignant non trouvé" };
        }
        return item;
    }

    /**
     * Crée un enseignant avec son compte utilisateur.
     */
    async create(data: CreateTeacherInput) {
        const { subjectIds, ...rest } = data;
        let speciality = data.speciality;

        // Si on a des IDs de matières, on récupère leurs noms pour la "spécialité"
        if (subjectIds && subjectIds.length > 0) {
            const subjects = await prisma.subject.findMany({
                where: { id: { in: subjectIds } },
                select: { name: true }
            });
            speciality = subjects.map(s => s.name).join(", ");
        }

        // 1. Déterminer l'email
        const baseEmail = `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}`.replace(/\s+/g, "");
        const teacherEmail = data.email || `${baseEmail}@teacher.skolara.pf`;

        // 2. Vérifier unicité email
        const existingUser = await prisma.user.findUnique({ where: { email: teacherEmail } });
        if (existingUser) {
            throw { status: 409, message: "Un compte avec cette adresse email existe déjà." };
        }

        // 3. Préparer les identifiants
        const tempPassword = generateRandomPassword(12);
        const passwordHash = await authService.hashPassword(tempPassword);

        // 4. Transaction de création + envoi email (avec rollback automatique si erreur)
        return prisma.$transaction(async (tx) => {
            // A. Créer le User
            const user = await tx.user.create({
                data: {
                    email: teacherEmail,
                    firstName: data.firstName,
                    name: data.lastName,
                    passwordHash,
                    role: Role.ENSEIGNANT,
                },
            });

            // B. Créer la fiche Teacher
            const teacher = await this.repository.create({
                user: { connect: { id: user.id } },
                speciality: speciality,
                phone: data.phone,
            }, tx);

            // Note: Les assignations réelles (subjectIds) nécessitent un classId et schoolYear.
            // Elles seront gérées via le profil de l'enseignant après création.

            // C. Envoi de l'email de bienvenue
            const emailHtml = TeacherWelcomeEmail({
                firstName: data.firstName,
                lastName: data.lastName,
                email: teacherEmail,
                password: tempPassword
            });

            const emailResult = await sendEmail({
                to: teacherEmail,
                subject: 'Bienvenue sur Skolara — Vos identifiants de connexion',
                html: emailHtml
            });

            // Si l'envoi échoue, on rollback la transaction en levant une exception
            if (!emailResult.success) {
                throw { 
                    status: 500, 
                    message: `Échec de la création de l'enseignant car l'email de bienvenue n'a pas pu être envoyé: ${emailResult.error}` 
                };
            }

            return { ...teacher, user };
        });
    }

    /**
     * Mise à jour d'un enseignant.
     */
    async update(id: number, data: UpdateTeacherInput) {
        const teacher = await this.repository.findById(id);
        if (!teacher) {
            throw { status: 404, message: "Enseignant non trouvé" };
        }

        const { firstName, lastName, ...teacherData } = data;

        if (firstName || lastName) {
            await prisma.user.update({
                where: { id: teacher.userId },
                data: {
                    firstName: firstName || undefined,
                    name: lastName || undefined,
                },
            });
        }

        return this.repository.update(id, teacherData as any);
    }

    /**
     * Active/Désactive un enseignant.
     */
    async setStatus(id: number, active: boolean) {
        const teacher = await this.repository.findById(id);
        if (!teacher) {
            throw { status: 404, message: "Enseignant non trouvé" };
        }

        return prisma.user.update({
            where: { id: teacher.userId },
            data: { active },
        });
    }

    /**
     * Gère les assignations.
     */
    async addAssignment(id: number, assignment: AssignmentInput) {
        // Vérifier conflit
        const conflict = await this.repository.findConflictingAssignment(
            assignment.subjectId,
            assignment.classId,
            assignment.schoolYear
        );

        if (conflict) {
            if (conflict.teacherId === id) {
                throw { status: 409, message: "Cet enseignant est déjà assigné à cette matière pour cette classe" };
            }
            throw { 
                status: 409, 
                message: `Un autre enseignant (${conflict.teacher.user.firstName} ${conflict.teacher.user.name}) est déjà assigné à cette matière pour cette classe` 
            };
        }

        return this.repository.addAssignment(
            id,
            assignment.subjectId,
            assignment.classId,
            assignment.schoolYear
        );
    }

    async removeAssignment(id: number, assignment: AssignmentInput) {
        return this.repository.removeAssignment(
            id,
            assignment.subjectId,
            assignment.classId,
            assignment.schoolYear
        );
    }
}
