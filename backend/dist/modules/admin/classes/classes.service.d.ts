import { ClassesRepository } from "./classes.repository";
import { CreateClassInput, UpdateClassInput, ClassFiltersInput } from "./classes.schema";
/**
 * Service pour la logique métier des classes.
 */
export declare class ClassesService {
    private repository;
    constructor(repository: ClassesRepository);
    /**
     * Récupère la liste paginée des classes.
     */
    findAll(filters: ClassFiltersInput): Promise<{
        classes: ({
            _count: {
                students: number;
            };
            headTeacher: ({
                user: {
                    name: string;
                    firstName: string;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
                phone: string | null;
                speciality: string | null;
            }) | null;
        } & {
            id: number;
            name: string;
            schoolYear: string;
            level: string;
            createdAt: Date;
            updatedAt: Date;
            headTeacherId: number | null;
            maxCapacity: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    /**
     * Détails d'une classe.
     */
    findById(id: number): Promise<{
        headTeacher: ({
            user: {
                id: number;
                name: string;
                firstName: string;
                email: string;
                passwordHash: string;
                role: import("@prisma/client").$Enums.Role;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            phone: string | null;
            speciality: string | null;
        }) | null;
        students: ({
            user: {
                id: number;
                name: string;
                firstName: string;
                email: string;
                passwordHash: string;
                role: import("@prisma/client").$Enums.Role;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            status: import("@prisma/client").$Enums.StudentStatus;
            id: number;
            classId: number | null;
            birthDate: Date;
            address: string | null;
            schoolYear: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            parentId: number | null;
        })[];
        assignments: ({
            subject: {
                id: number;
                name: string;
                code: string;
                createdAt: Date;
                updatedAt: Date;
                coefficient: number;
                description: string | null;
            };
            teacher: {
                user: {
                    id: number;
                    name: string;
                    firstName: string;
                    email: string;
                    passwordHash: string;
                    role: import("@prisma/client").$Enums.Role;
                    active: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
                phone: string | null;
                speciality: string | null;
            };
        } & {
            classId: number;
            subjectId: number;
            schoolYear: string;
            teacherId: number;
        })[];
    } & {
        id: number;
        name: string;
        schoolYear: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        headTeacherId: number | null;
        maxCapacity: number;
    }>;
    /**
     * Création d'une classe.
     */
    create(data: CreateClassInput): Promise<{
        id: number;
        name: string;
        schoolYear: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        headTeacherId: number | null;
        maxCapacity: number;
    }>;
    /**
     * Mise à jour d'une classe.
     */
    update(id: number, data: UpdateClassInput): Promise<{
        headTeacher: ({
            user: {
                id: number;
                name: string;
                firstName: string;
                email: string;
                passwordHash: string;
                role: import("@prisma/client").$Enums.Role;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            phone: string | null;
            speciality: string | null;
        }) | null;
    } & {
        id: number;
        name: string;
        schoolYear: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        headTeacherId: number | null;
        maxCapacity: number;
    }>;
    /**
     * Suppression d'une classe.
     * Vérifie si la classe a des élèves assignés.
     */
    delete(id: number): Promise<{
        id: number;
        name: string;
        schoolYear: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        headTeacherId: number | null;
        maxCapacity: number;
    }>;
}
//# sourceMappingURL=classes.service.d.ts.map