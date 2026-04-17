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
     * Applique les règles d'unicité et génère le numéro de dossier.
     *
     * @param data - Données validées pour la création
     * @returns La pré-inscription créée
     * @throws Erreur 409 si doublon détecté
     */
    async create(data: CreatePreRegistrationInput) {
        // 1. Vérifier s'il existe déjà une pré-inscription identique
        const existingRecord = await this.repository.findFirst({
            parentEmail: data.parentEmail,
            childFirstName: data.childFirstName,
            childLastName: data.childLastName,
            targetSchoolYear: data.targetSchoolYear,
        });

        if (existingRecord) {
            const error: any = new Error("Données de validation invalides");
            error.status = 400;
            error.details = [
                {
                    path: ["childFirstName"],
                    message:
                        "Une pré-inscription existe déjà pour cet enfant pour cette année scolaire.",
                },
            ];
            throw error;
        }

        // 2. Vérifier l'unicité du receiptNumber
        if (data.receiptNumber) {
            const existingReceipt = await this.repository.findFirst({
                receiptNumber: data.receiptNumber,
            });
            if (existingReceipt) {
                const error: any = new Error("Données de validation invalides");
                error.status = 400;
                error.details = [
                    {
                        path: ["receiptNumber"],
                        message: "Ce numéro de bordereau est déjà enregistré.",
                    },
                ];
                throw error;
            }
        }

        // 3. Générer un fileNumber unique
        const fileNumber = await this.generateFileNumber();

        // 4. Créer l'enregistrement
        return this.repository.create({
            ...data,
            fileNumber,
        });
    }

    /**
     * Génère un numéro de dossier unique formaté : PRE-YYYY-XXXX.
     * @returns Le numéro de dossier généré
     */
    private async generateFileNumber(): Promise<string> {
        const year = new Date().getFullYear();
        const prefix = `PRE-${year}`;

        // On récupère le dernier numéro pour cette année
        const lastRecord = await this.repository.findFirst(
            { fileNumber: { startsWith: prefix } },
            { fileNumber: "desc" },
        );

        let sequence = 1;
        if (lastRecord && lastRecord.fileNumber) {
            const lastPart = lastRecord.fileNumber.split("-").pop();
            if (lastPart) {
                sequence = parseInt(lastPart, 10) + 1;
            }
        }

        // On boucle pour éviter les collisions en cas de race condition (bien que peu probable ici)
        let fileNumber = `${prefix}-${sequence.toString().padStart(4, "0")}`;
        let exists = await this.repository.findFirst({ fileNumber });

        while (exists) {
            sequence++;
            fileNumber = `${prefix}-${sequence.toString().padStart(4, "0")}`;
            exists = await this.repository.findFirst({ fileNumber });
        }

        return fileNumber;
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
