import { StudentsRepository } from "./students.repository";
import {
    CreateStudentInput,
    UpdateStudentInput,
    StudentFiltersInput,
} from "./students.schema";
import authService from "../../auth/auth.service";
import { Role, StudentStatus } from "../../../generated/prisma";
import { prisma } from "../../../prisma/client";

/**
 * Service pour la logique métier des élèves.
 */
export class StudentsService {
    private repository: StudentsRepository;

    constructor(repository: StudentsRepository) {
        this.repository = repository;
    }

    /**
     * Crée un nouvel élève avec son compte utilisateur et (optionnellement) son parent.
     */
    async create(data: CreateStudentInput) {
        // 1. Générer l'email de l'élève (convention : prenom.nom@student.skolara.pf)
        const baseEmail =
            `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}`.replace(
                /\s+/g,
                "",
            );
        let studentEmail = `${baseEmail}@student.skolara.pf`;

        // Vérifier si l'email existe et ajouter un suffixe si besoin
        let counter = 1;
        while (
            await prisma.user.findUnique({ where: { email: studentEmail } })
        ) {
            studentEmail = `${baseEmail}${counter}@student.skolara.pf`;
            counter++;
        }

        // 2. Transaction pour garantir la création de tout l'écosystème
        return prisma.$transaction(async (tx) => {
            // A. Gérer le parent
            let parentUser = await tx.user.findUnique({
                where: { email: data.parentEmail },
            });

            if (!parentUser) {
                parentUser = await tx.user.create({
                    data: {
                        email: data.parentEmail,
                        firstName: data.parentName.split(" ")[0] || "",
                        name:
                            data.parentName.split(" ").slice(1).join(" ") ||
                            data.parentName,
                        passwordHash:
                            await authService.hashPassword("Temp123!"),
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
                        phone: data.parentPhone,
                        address: data.address,
                    },
                });
            }

            // B. Créer l'utilisateur élève
            const studentUser = await tx.user.create({
                data: {
                    email: studentEmail,
                    firstName: data.firstName,
                    name: data.lastName,
                    passwordHash: await authService.hashPassword("Welcome123!"),
                    role: Role.ELEVE,
                },
            });

            // C. Créer la fiche élève
            return tx.student.create({
                data: {
                    userId: studentUser.id,
                    parentId: parent.id,
                    classId: data.classId,
                    birthDate: data.birthDate,
                    address: data.address,
                    schoolYear: data.schoolYear,
                    status: data.status as StudentStatus,
                },
                include: {
                    user: true,
                    class: true,
                    parent: { include: { user: true } },
                },
            });
        });
    }

    /**
     * Récupère la liste paginée des élèves.
     */
    async findAll(filters: StudentFiltersInput) {
        const { data, total } = await this.repository.findMany(filters);
        const totalPages = Math.ceil(total / filters.limit);

        return {
            students: data,
            pagination: {
                page: filters.page,
                limit: filters.limit,
                total,
                totalPages,
            },
        };
    }

    /**
     * Détails d'un élève.
     */
    async findById(id: number) {
        const student = await this.repository.findById(id);
        if (!student) {
            throw { status: 404, message: "Élève non trouvé" };
        }
        return student;
    }

    /**
     * Mise à jour d'un élève.
     */
    async update(id: number, data: UpdateStudentInput) {
        const student = await this.repository.findById(id);
        if (!student) {
            throw { status: 404, message: "Élève non trouvé" };
        }

        const { firstName, lastName, ...studentData } = data;

        // Si le nom/prénom change, on met à jour le User
        if (firstName || lastName) {
            await prisma.user.update({
                where: { id: student.userId },
                data: {
                    firstName: firstName || undefined,
                    name: lastName || undefined,
                },
            });
        }

        return this.repository.update(id, studentData as any);
    }

    /**
     * Archive un élève (statut ARCHIVED).
     */
    async archive(id: number) {
        return this.repository.setStatus(id, StudentStatus.ARCHIVED);
    }

    /**
     * Réactive un élève (statut ACTIVE).
     */
    async restore(id: number) {
        return this.repository.setStatus(id, StudentStatus.ACTIVE);
    }

    /**
     * Prépare les données pour l'export CSV.
     */
    async getExportData(filters: Omit<StudentFiltersInput, "page" | "limit">) {
        const students = await this.repository.findAllForExport(filters);

        return students.map((s) => ({
            ID: s.id,
            "Nom de famille": s.user.name,
            Prénom: s.user.firstName,
            "Date de naissance": s.birthDate.toLocaleDateString("fr-FR"),
            Classe: s.class?.name || "N/A",
            Niveau: s.class?.level || "N/A",
            Statut: s.status === StudentStatus.ACTIVE ? "Actif" : "Archivé",
            "Année scolaire": s.schoolYear,
            "Email Parent": s.parent?.user.email || "N/A",
        }));
    }
}
