import { Prisma } from "../../../generated/prisma";
import { SubjectFiltersInput } from "./subjects.schema";
/**
 * Repository pour l'accès aux données des matières (Subjects).
 */
export declare class SubjectsRepository {
    /**
     * Récupère une liste paginée de matières avec filtres.
     */
    findMany(filters: SubjectFiltersInput): Promise<{
        data: ({
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
        total: number;
    }>;
    /**
     * Récupère la liste complète des matières (all).
     */
    findAll(): Promise<{
        id: number;
        name: string;
        code: string;
        coefficient: number;
        description: string | null;
    }[]>;
    /**
     * Récupère les données d'une matière par ID.
     */
    findById(id: number): Promise<({
        _count: {
            marks: number;
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
    }) | null>;
    /**
     * Crée une matière.
     */
    create(data: Prisma.SubjectCreateInput): Promise<{
        id: number;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        coefficient: number;
        description: string | null;
    }>;
    /**
     * Met à jour une matière.
     */
    update(id: number, data: Prisma.SubjectUpdateInput): Promise<{
        id: number;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        coefficient: number;
        description: string | null;
    }>;
    /**
     * Supprime une matière.
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
    /**
     * Vérifie si le code est déjà utilisé.
     */
    findByCode(code: string): Promise<{
        id: number;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
        coefficient: number;
        description: string | null;
    } | null>;
}
//# sourceMappingURL=subjects.repository.d.ts.map