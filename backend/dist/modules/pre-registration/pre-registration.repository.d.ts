import type { Status } from "../../generated/prisma";
import type { CreatePreRegistrationInput, UpdatePreRegistrationInput } from "./pre-registration.schema";
/**
 * Repository pour les opérations de base de données sur les pré-inscriptions.
 * Couche d'accès aux données pure (Prisma), sans logique métier.
 */
export declare class PreRegistrationRepository {
    /**
     * Crée une nouvelle pré-inscription en base de données.
     *
     * @param data - Données validées pour la création
     * @returns La pré-inscription créée
     */
    create(data: CreatePreRegistrationInput): Promise<{
        status: import("../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        desiredGrade: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        documentUrls: string[];
        submittedAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Récupère une liste paginée de pré-inscriptions avec filtre optionnel par statut.
     *
     * @param page - Numéro de page (commence à 1)
     * @param limit - Nombre d'éléments par page
     * @param status - Filtre optionnel par statut
     * @returns Objet contenant les données et le total
     */
    findMany(page: number, limit: number, status?: Status): Promise<{
        data: {
            status: import("../../generated/prisma").$Enums.Status;
            id: number;
            childFirstName: string;
            childLastName: string;
            childDateOfBirth: Date;
            desiredGrade: string;
            parentFullName: string;
            parentEmail: string;
            parentPhone: string;
            documentUrls: string[];
            submittedAt: Date;
            updatedAt: Date;
        }[];
        total: number;
    }>;
    /**
     * Recherche une pré-inscription par son identifiant.
     *
     * @param id - Identifiant unique de la pré-inscription
     * @returns La pré-inscription trouvée ou null
     */
    findById(id: number): Promise<{
        status: import("../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        desiredGrade: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        documentUrls: string[];
        submittedAt: Date;
        updatedAt: Date;
    } | null>;
    /**
     * Met à jour une pré-inscription existante.
     *
     * @param id - Identifiant de la pré-inscription à mettre à jour
     * @param data - Données de mise à jour (statut)
     * @returns La pré-inscription mise à jour
     */
    update(id: number, data: UpdatePreRegistrationInput): Promise<{
        status: import("../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        desiredGrade: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        documentUrls: string[];
        submittedAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Supprime une pré-inscription par son identifiant.
     *
     * @param id - Identifiant de la pré-inscription à supprimer
     * @returns La pré-inscription supprimée
     */
    delete(id: number): Promise<{
        status: import("../../generated/prisma").$Enums.Status;
        id: number;
        childFirstName: string;
        childLastName: string;
        childDateOfBirth: Date;
        desiredGrade: string;
        parentFullName: string;
        parentEmail: string;
        parentPhone: string;
        documentUrls: string[];
        submittedAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=pre-registration.repository.d.ts.map