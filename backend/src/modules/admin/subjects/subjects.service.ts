import { SubjectsRepository } from "./subjects.repository";
import { CreateSubjectInput, UpdateSubjectInput, SubjectFiltersInput } from "./subjects.schema";

/**
 * Service pour la logique métier des matières (Subjects).
 */
export class SubjectsService {
    private repository: SubjectsRepository;

    constructor(repository: SubjectsRepository) {
        this.repository = repository;
    }

    /**
     * Liste complète pour les selects (non paginée).
     */
    async findAll() {
        const subjects = await this.repository.findAll();
        return { subjects };
    }

    /**
     * Liste paginée pour la page de gestion.
     */
    async findPaginated(filters: SubjectFiltersInput) {
        const { data, total } = await this.repository.findMany(filters);
        const totalPages = Math.ceil(total / filters.limit);

        return {
            subjects: data,
            pagination: {
                page: filters.page,
                limit: filters.limit,
                total,
                totalPages,
            },
        };
    }

    /**
     * Création d'une matière.
     */
    async create(data: CreateSubjectInput) {
        // Unicité du code
        const existing = await this.repository.findByCode(data.code);
        if (existing) {
            throw { status: 409, message: "Une matière avec ce code existe déjà" };
        }

        return this.repository.create(data);
    }

    /**
     * Mise à jour d'une matière.
     */
    async update(id: number, data: UpdateSubjectInput) {
        const subject = await this.repository.findById(id);
        if (!subject) {
            throw { status: 404, message: "Matière non trouvée" };
        }

        if (data.code && data.code !== subject.code) {
            const existing = await this.repository.findByCode(data.code);
            if (existing) {
                throw { status: 409, message: "Une matière avec ce code existe déjà" };
            }
        }

        return this.repository.update(id, data);
    }

    /**
     * Suppression d'une matière.
     */
    async delete(id: number) {
        const subject = await this.repository.findById(id);
        if (!subject) {
            throw { status: 404, message: "Matière non trouvée" };
        }

        // Vérifier les liens (enseignants ou notes)
        if ((subject as any)._count.assignments > 0 || (subject as any)._count.marks > 0) {
            throw { 
                status: 400, 
                message: "Impossible de supprimer cette matière car elle est utilisée (enseignants assignés ou notes enregistrées)" 
            };
        }

        return this.repository.delete(id);
    }
}
