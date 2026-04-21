"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const auth_service_1 = __importDefault(require("../../auth/auth.service"));
const prisma_1 = require("../../../generated/prisma");
const client_1 = require("../../../prisma/client");
/**
 * Service pour la logique métier des élèves.
 */
class StudentsService {
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Crée un nouvel élève avec son compte utilisateur et (optionnellement) son parent.
     */
    async create(data) {
        // 1. Générer l'email de l'élève (convention : prenom.nom@student.skolara.pf)
        const baseEmail = `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}`.replace(/\s+/g, "");
        let studentEmail = `${baseEmail}@student.skolara.pf`;
        // Vérifier si l'email existe et ajouter un suffixe si besoin
        let counter = 1;
        while (await client_1.prisma.user.findUnique({ where: { email: studentEmail } })) {
            studentEmail = `${baseEmail}${counter}@student.skolara.pf`;
            counter++;
        }
        // 2. Transaction pour garantir la création de tout l'écosystème
        return client_1.prisma.$transaction(async (tx) => {
            // A. Gérer le parent
            let parentUser = await tx.user.findUnique({
                where: { email: data.parentEmail },
            });
            if (!parentUser) {
                parentUser = await tx.user.create({
                    data: {
                        email: data.parentEmail,
                        firstName: data.parentName.split(" ")[0] || "",
                        name: data.parentName.split(" ").slice(1).join(" ") ||
                            data.parentName,
                        passwordHash: await auth_service_1.default.hashPassword("Temp123!"),
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
                    passwordHash: await auth_service_1.default.hashPassword("Welcome123!"),
                    role: prisma_1.Role.ELEVE,
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
                    status: data.status,
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
    async findAll(filters) {
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
    async findById(id) {
        const student = await this.repository.findById(id);
        if (!student) {
            throw { status: 404, message: "Élève non trouvé" };
        }
        return student;
    }
    /**
     * Mise à jour d'un élève.
     */
    async update(id, data) {
        const student = await this.repository.findById(id);
        if (!student) {
            throw { status: 404, message: "Élève non trouvé" };
        }
        const { firstName, lastName, ...studentData } = data;
        // Si le nom/prénom change, on met à jour le User
        if (firstName || lastName) {
            await client_1.prisma.user.update({
                where: { id: student.userId },
                data: {
                    firstName: firstName || undefined,
                    name: lastName || undefined,
                },
            });
        }
        return this.repository.update(id, studentData);
    }
    /**
     * Archive un élève (statut ARCHIVED).
     */
    async archive(id) {
        return this.repository.setStatus(id, prisma_1.StudentStatus.ARCHIVED);
    }
    /**
     * Réactive un élève (statut ACTIVE).
     */
    async restore(id) {
        return this.repository.setStatus(id, prisma_1.StudentStatus.ACTIVE);
    }
    /**
     * Prépare les données pour l'export CSV.
     */
    async getExportData(filters) {
        const students = await this.repository.findAllForExport(filters);
        return students.map((s) => ({
            ID: s.id,
            "Nom de famille": s.user.name,
            Prénom: s.user.firstName,
            "Date de naissance": s.birthDate.toLocaleDateString("fr-FR"),
            Classe: s.class?.name || "N/A",
            Niveau: s.class?.level || "N/A",
            Statut: s.status === prisma_1.StudentStatus.ACTIVE ? "Actif" : "Archivé",
            "Année scolaire": s.schoolYear,
            "Email Parent": s.parent?.user.email || "N/A",
        }));
    }
}
exports.StudentsService = StudentsService;
//# sourceMappingURL=students.service.js.map