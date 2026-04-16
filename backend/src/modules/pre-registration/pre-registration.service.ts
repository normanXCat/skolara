import { PreRegistrationRepository } from "./pre-registration.repository";
import type {
    CreatePreRegistrationInput,
    UpdatePreRegistrationInput,
    ListQueryInput,
} from "./pre-registration.schema";

/**
 * Service de logique métier pour les pré-inscriptions.
 * Orchestre les appels au repository et applique les règles métier.
 */
export class PreRegistrationService {
    /** Instance du repository injectée */
    private repository: PreRegistrationRepository;

    /**
     * Crée une instance du service.
     *
     * @param repository - Repository Prisma pour les pré-inscriptions
     */
    constructor(repository: PreRegistrationRepository) {
        this.repository = repository;
    }

    /**
     * Crée une nouvelle pré-inscription.
     *
     * @param data - Données validées pour la création
     * @returns La pré-inscription créée
     */
    async create(data: CreatePreRegistrationInput) {
        return this.repository.create(data);
    }

    /**
     * Récupère la liste paginée des pré-inscriptions avec un filtre optionnel.
     *
     * @param query - Paramètres de pagination et de filtrage
     * @returns Objet contenant les données paginées et les métadonnées
     */
    async findAll(query: ListQueryInput) {
        const { page, limit, status } = query;
        const { data, total } = await this.repository.findMany(
            page,
            limit,
            status,
        );
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
    async findById(id: number) {
        const record = await this.repository.findById(id);
        if (!record) {
            const error: any = new Error("Pré-inscription non trouvée");
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
    async update(id: number, data: UpdatePreRegistrationInput) {
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
    async delete(id: number) {
        await this.findById(id); // vérification d'existence
        return this.repository.delete(id);
    }
}
