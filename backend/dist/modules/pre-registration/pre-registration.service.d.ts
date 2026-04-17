import { PreRegistrationRepository } from "./pre-registration.repository";
import type { CreatePreRegistrationInput, UpdatePreRegistrationInput, ListQueryInput } from "./pre-registration.schema";
/**
 * Service de logique métier pour les pré-inscriptions.
 * Orchestre les appels au repository et applique les règles métier.
 */
export declare class PreRegistrationService {
    /** Instance du repository injectée */
    private repository;
    /**
     * Crée une instance du service.
     *
     * @param repository - Repository Prisma pour les pré-inscriptions
     */
    constructor(repository: PreRegistrationRepository);
    /**
     * Crée une nouvelle pré-inscription.
     * Applique les règles d'unicité et génère le numéro de dossier.
     *
     * @param data - Données validées pour la création
     * @returns La pré-inscription créée
     * @throws Erreur 409 si doublon détecté
     */
    create(data: CreatePreRegistrationInput): Promise<{
        status: import("../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        childEmail: string | null;
        previousSchool: string | null;
        parentAddress: string | null;
        fileNumber: string;
        receiptNumber: string | null;
        receiptImageUrl: string | null;
        documentUrls: string[];
        adminComment: string | null;
        processedBy: number | null;
        processedAt: Date | null;
        studentId: number | null;
        submittedAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Génère un numéro de dossier unique formaté : PRE-YYYY-XXXX.
     * @returns Le numéro de dossier généré
     */
    private generateFileNumber;
    /**
     * Récupère la liste paginée des pré-inscriptions avec un filtre optionnel.
     *
     * @param query - Paramètres de pagination et de filtrage
     * @returns Objet contenant les données paginées et les métadonnées
     */
    findAll(query: ListQueryInput): Promise<{
        data: {
            status: import("../../generated/prisma").$Enums.Status;
            id: number;
            childFirstName: string;
            childLastName: string;
            childDateOfBirth: Date;
            gender: string;
            desiredGrade: string;
            parentFirstName: string;
            parentFullName: string;
            parentEmail: string;
            parentPhone: string;
            childEmail: string | null;
            previousSchool: string | null;
            parentAddress: string | null;
            fileNumber: string;
            receiptNumber: string | null;
            receiptImageUrl: string | null;
            documentUrls: string[];
            adminComment: string | null;
            processedBy: number | null;
            processedAt: Date | null;
            studentId: number | null;
            submittedAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    /**
     * Recherche une pré-inscription par son identifiant.
     * Lance une erreur si la ressource n'existe pas.
     *
     * @param id - Identifiant de la pré-inscription
     * @returns La pré-inscription trouvée
     * @throws Erreur 404 si non trouvée
     */
    findById(id: number): Promise<{
        status: import("../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        childEmail: string | null;
        previousSchool: string | null;
        parentAddress: string | null;
        fileNumber: string;
        receiptNumber: string | null;
        receiptImageUrl: string | null;
        documentUrls: string[];
        adminComment: string | null;
        processedBy: number | null;
        processedAt: Date | null;
        studentId: number | null;
        submittedAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Met à jour le statut d'une pré-inscription existante.
     * Vérifie que la ressource existe avant la mise à jour.
     *
     * @param id - Identifiant de la pré-inscription
     * @param data - Données de mise à jour (nouveau statut)
     * @returns La pré-inscription mise à jour
     * @throws Erreur 404 si non trouvée
     */
    update(id: number, data: UpdatePreRegistrationInput): Promise<{
        status: import("../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        childEmail: string | null;
        previousSchool: string | null;
        parentAddress: string | null;
        fileNumber: string;
        receiptNumber: string | null;
        receiptImageUrl: string | null;
        documentUrls: string[];
        adminComment: string | null;
        processedBy: number | null;
        processedAt: Date | null;
        studentId: number | null;
        submittedAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Supprime une pré-inscription.
     * Vérifie que la ressource existe avant la suppression.
     *
     * @param id - Identifiant de la pré-inscription
     * @returns La pré-inscription supprimée
     * @throws Erreur 404 si non trouvée
     */
    delete(id: number): Promise<{
        status: import("../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        childEmail: string | null;
        previousSchool: string | null;
        parentAddress: string | null;
        fileNumber: string;
        receiptNumber: string | null;
        receiptImageUrl: string | null;
        documentUrls: string[];
        adminComment: string | null;
        processedBy: number | null;
        processedAt: Date | null;
        studentId: number | null;
        submittedAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=pre-registration.service.d.ts.map