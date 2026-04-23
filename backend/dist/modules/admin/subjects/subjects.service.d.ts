import { SubjectsRepository } from "./subjects.repository";
import { CreateSubjectInput, UpdateSubjectInput, SubjectFiltersInput } from "./subjects.schema";
/**
 * Service pour la logique métier des matières (Subjects).
 */
export declare class SubjectsService {
    private repository;
    constructor(repository: SubjectsRepository);
    /**
     * Liste complète pour les selects (non paginée).
     */
    findAll(): Promise<{
        subjects: {
            id: number;
            name: string;
            code: string;
            coefficient: number;
            description: string | null;
        }[];
    }>;
    /**
     * Liste paginée pour la page de gestion.
     */
    findPaginated(filters: SubjectFiltersInput): Promise<{
        subjects: ({
            _count: {
                assignments: number;
            };
        } & {
            id: number;
            name: string;
            code: string;
            createdAt: Date;
            updatedAt: Date;
            coefficient: number;
            description: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    /**
     * Création d'une matière.
     */
    create(data: CreateSubjectInput): Promise<{
        id: number;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        coefficient: number;
        description: string | null;
    }>;
    /**
     * Mise à jour d'une matière.
     */
    update(id: number, data: UpdateSubjectInput): Promise<{
        id: number;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        coefficient: number;
        description: string | null;
    }>;
    /**
     * Suppression d'une matière.
     */
    delete(id: number): Promise<{
        id: number;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        coefficient: number;
        description: string | null;
    }>;
}
//# sourceMappingURL=subjects.service.d.ts.map