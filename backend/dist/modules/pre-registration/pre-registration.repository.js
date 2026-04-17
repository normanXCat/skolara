"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreRegistrationRepository = void 0;
const client_1 = require("../../prisma/client");
/**
 * Repository pour les opérations de base de données sur les pré-inscriptions.
 * Couche d'accès aux données pure (Prisma), sans logique métier.
 */
class PreRegistrationRepository {
    /**
     * Crée une nouvelle pré-inscription en base de données.
     *
     * @param data - Données pour la création (inclut fileNumber)
     * @returns La pré-inscription créée
     */
    async create(data) {
        return client_1.prisma.preRegistration.create({ data });
    }
    /**
     * Recherche un premier enregistrement correspondant aux critères.
     * @param where - Filtres Prisma
     * @param orderBy - Tri optionnel
     */
    async findFirst(where, orderBy) {
        return client_1.prisma.preRegistration.findFirst({ where, orderBy });
    }
    /**
     * Récupère une liste paginée de pré-inscriptions avec filtre optionnel par statut.
     *
     * @param page - Numéro de page (commence à 1)
     * @param limit - Nombre d'éléments par page
     * @param status - Filtre optionnel par statut
     * @returns Objet contenant les données et le total
     */
    async findMany(page, limit, status) {
        const where = status ? { status } : {};
        const [data, total] = await Promise.all([
            client_1.prisma.preRegistration.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { submittedAt: "desc" },
            }),
            client_1.prisma.preRegistration.count({ where }),
        ]);
        return { data, total };
    }
    /**
     * Recherche une pré-inscription par son identifiant.
     *
     * @param id - Identifiant unique de la pré-inscription
     * @returns La pré-inscription trouvée ou null
     */
    async findById(id) {
        return client_1.prisma.preRegistration.findUnique({ where: { id } });
    }
    /**
     * Met à jour une pré-inscription existante.
     *
     * @param id - Identifiant de la pré-inscription à mettre à jour
     * @param data - Données de mise à jour (statut)
     * @returns La pré-inscription mise à jour
     */
    async update(id, data) {
        return client_1.prisma.preRegistration.update({ where: { id }, data });
    }
    /**
     * Supprime une pré-inscription par son identifiant.
     *
     * @param id - Identifiant de la pré-inscription à supprimer
     * @returns La pré-inscription supprimée
     */
    async delete(id) {
        return client_1.prisma.preRegistration.delete({ where: { id } });
    }
}
exports.PreRegistrationRepository = PreRegistrationRepository;
//# sourceMappingURL=pre-registration.repository.js.map