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
        id: number;
        status: import("@prisma/client").$Enums.Status;
        parentEmail: string;
        parentPhone: string;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        updatedAt: Date;
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
        parentEmailSentAt: Date | null;
        studentEmailSentAt: Date | null;
    }>;
    /**
     * Envoie les emails de confirmation au parent et à l'enfant (si email fourni).
     */
    private sendConfirmationEmails;
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
            id: number;
            status: import("@prisma/client").$Enums.Status;
            parentEmail: string;
            parentPhone: string;
            childFirstName: string;
            childLastName: string;
            childDateOfBirth: Date;
            gender: string;
            desiredGrade: string;
            parentFirstName: string;
            parentFullName: string;
            updatedAt: Date;
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
            parentEmailSentAt: Date | null;
            studentEmailSentAt: Date | null;
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
        id: number;
        status: import("@prisma/client").$Enums.Status;
        parentEmail: string;
        parentPhone: string;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        updatedAt: Date;
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
        parentEmailSentAt: Date | null;
        studentEmailSentAt: Date | null;
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
        id: number;
        status: import("@prisma/client").$Enums.Status;
        parentEmail: string;
        parentPhone: string;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        updatedAt: Date;
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
        parentEmailSentAt: Date | null;
        studentEmailSentAt: Date | null;
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
        id: number;
        status: import("@prisma/client").$Enums.Status;
        parentEmail: string;
        parentPhone: string;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        gender: string;
        desiredGrade: string;
        parentFirstName: string;
        parentFullName: string;
        updatedAt: Date;
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
        parentEmailSentAt: Date | null;
        studentEmailSentAt: Date | null;
    }>;
}
//# sourceMappingURL=pre-registration.service.d.ts.map