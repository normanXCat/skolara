import { ClassesRepository } from "./classes.repository";
import {
    CreateClassInput,
    UpdateClassInput,
    ClassFiltersInput,
} from "./classes.schema";

/**
 * Service pour la logique métier des classes.
 */
export class ClassesService {
    private repository: ClassesRepository;

    constructor(repository: ClassesRepository) {
        this.repository = repository;
    }

    /**
     * Récupère la liste paginée des classes.
     */
    async findAll(filters: ClassFiltersInput) {
        const { data, total } = await this.repository.findMany(filters);
        const totalPages = Math.ceil(total / filters.limit);

        return {
            classes: data,
            pagination: {
                page: filters.page,
                limit: filters.limit,
                total,
                totalPages,
            },
        };
    }

    /**
     * Détails d'une classe.
     */
    async findById(id: number) {
        const item = await this.repository.findById(id);
        if (!item) {
            throw { status: 404, message: "Classe non trouvée" };
        }
        return item;
    }

    /**
     * Création d'une classe.
     */
    async create(data: CreateClassInput) {
        return this.repository.create(data as any);
    }

    /**
     * Mise à jour d'une classe.
     */
    async update(id: number, data: UpdateClassInput) {
        const item = await this.repository.findById(id);
        if (!item) {
            throw { status: 404, message: "Classe non trouvée" };
        }
        return this.repository.update(id, data as any);
    }

    /**
     * Suppression d'une classe.
     * Vérifie si la classe a des élèves assignés.
     */
    async delete(id: number) {
        const studentCount = await this.repository.countStudents(id);
        if (studentCount > 0) {
            throw {
                status: 409,
                message: "Impossible de supprimer une classe contenant des élèves",
            };
        }
        return this.repository.delete(id);
    }
}
