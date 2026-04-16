"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreRegistrationService = void 0;
/**
 * Service de logique métier pour les pré-inscriptions.
 * Orchestre les appels au repository et applique les règles métier.
 */
class PreRegistrationService {
    /**
     * Crée une instance du service.
     *
     * @param repository - Repository Prisma pour les pré-inscriptions
     */
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Crée une nouvelle pré-inscription.
     *
     * @param data - Données validées pour la création
     * @returns La pré-inscription créée
     */
    async create(data) {
        return this.repository.create(data);
    }
    /**
     * Récupère la liste paginée des pré-inscriptions avec un filtre optionnel.
     *
     * @param query - Paramètres de pagination et de filtrage
     * @returns Objet contenant les données paginées et les métadonnées
     */
    async findAll(query) {
        const { page, limit, status } = query;
        const { data, total } = await this.repository.findMany(page, limit, status);
        const totalPages = Math.ceil(total / limit);
        return {
            data,
            meta: { total, page, limit, totalPages },
        };
    }
    /**
     * Recherche une pré-inscription par son identifiant.
     * Lance une erreur si la ressource n'existe pas.
     *
     * @param id - Identifiant de la pré-inscription
     * @returns La pré-inscription trouvée
     * @throws Erreur 404 si non trouvée
     */
    async findById(id) {
        const record = await this.repository.findById(id);
        if (!record) {
            const error = new Error("Pré-inscription non trouvée");
            error.status = 404;
            throw error;
        }
        return record;
    }
    /**
     * Met à jour le statut d'une pré-inscription existante.
     * Vérifie que la ressource existe avant la mise à jour.
     *
     * @param id - Identifiant de la pré-inscription
     * @param data - Données de mise à jour (nouveau statut)
     * @returns La pré-inscription mise à jour
     * @throws Erreur 404 si non trouvée
     */
    async update(id, data) {
        await this.findById(id); // vérification d'existence
        return this.repository.update(id, data);
    }
    /**
     * Supprime une pré-inscription.
     * Vérifie que la ressource existe avant la suppression.
     *
     * @param id - Identifiant de la pré-inscription
     * @returns La pré-inscription supprimée
     * @throws Erreur 404 si non trouvée
     */
    async delete(id) {
        await this.findById(id); // vérification d'existence
        return this.repository.delete(id);
    }
}
exports.PreRegistrationService = PreRegistrationService;
//# sourceMappingURL=pre-registration.service.js.map