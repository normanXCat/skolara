import { prisma } from "../../prisma/client";
import type { Status, Prisma } from "../../generated/prisma";
import type { UpdatePreRegistrationInput } from "./pre-registration.schema";

/**
 * Repository pour les opérations de base de données sur les pré-inscriptions.
 * Couche d'accès aux données pure (Prisma), sans logique métier.
 */
export class PreRegistrationRepository {
    /**
     * Crée une nouvelle pré-inscription en base de données.
     *
     * @param data - Données pour la création (inclut fileNumber)
     * @returns La pré-inscription créée
     */
    async create(data: Prisma.PreRegistrationCreateInput) {
        return prisma.preRegistration.create({ data });
    }

    /**
     * Recherche un premier enregistrement correspondant aux critères.
     * @param where - Filtres Prisma
     * @param orderBy - Tri optionnel
     */
    async findFirst(
        where: Prisma.PreRegistrationWhereInput,
        orderBy?: Prisma.PreRegistrationOrderByWithRelationInput,
    ) {
        return prisma.preRegistration.findFirst({ where, orderBy });
    }

    /**
     * Récupère une liste paginée de pré-inscriptions avec filtre optionnel par statut.
     *
     * @param page - Numéro de page (commence à 1)
     * @param limit - Nombre d'éléments par page
     * @param status - Filtre optionnel par statut
     * @returns Objet contenant les données et le total
     */
    async findMany(page: number, limit: number, status?: Status) {
        const where = status ? { status } : {};
        const [data, total] = await Promise.all([
            prisma.preRegistration.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { submittedAt: "desc" },
            }),
            prisma.preRegistration.count({ where }),
        ]);
        return { data, total };
    }

    /**
     * Recherche une pré-inscription par son identifiant.
     *
     * @param id - Identifiant unique de la pré-inscription
     * @returns La pré-inscription trouvée ou null
     */
    async findById(id: number) {
        return prisma.preRegistration.findUnique({ where: { id } });
    }

    /**
     * Met à jour une pré-inscription existante.
     *
     * @param id - Identifiant de la pré-inscription à mettre à jour
     * @param data - Données de mise à jour (statut)
     * @returns La pré-inscription mise à jour
     */
    async update(id: number, data: UpdatePreRegistrationInput) {
        return prisma.preRegistration.update({ where: { id }, data });
    }

    /**
     * Supprime une pré-inscription par son identifiant.
     *
     * @param id - Identifiant de la pré-inscription à supprimer
     * @returns La pré-inscription supprimée
     */
    async delete(id: number) {
        return prisma.preRegistration.delete({ where: { id } });
    }
}
