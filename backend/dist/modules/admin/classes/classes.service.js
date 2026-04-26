"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesService = void 0;
/**
 * Service pour la logique métier des classes.
 */
class ClassesService {
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Récupère la liste paginée des classes.
     */
    async findAll(filters) {
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
    async findById(id) {
        const item = await this.repository.findById(id);
        if (!item) {
            throw { status: 404, message: "Classe non trouvée" };
        }
        return item;
    }
    /**
     * Création d'une classe.
     */
    async create(data) {
        return this.repository.create(data);
    }
    /**
     * Mise à jour d'une classe.
     */
    async update(id, data) {
        const item = await this.repository.findById(id);
        if (!item) {
            throw { status: 404, message: "Classe non trouvée" };
        }
        return this.repository.update(id, data);
    }
    /**
     * Suppression d'une classe.
     * Vérifie si la classe a des élèves assignés.
     */
    async delete(id) {
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
exports.ClassesService = ClassesService;
//# sourceMappingURL=classes.service.js.map