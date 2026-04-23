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
            maxCapacity: number;
            headTeacherId: number | null;
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
        students: ({
            user: {
                id: number;
                name: string;
                firstName: string;
                email: string;
                passwordHash: string;
                role: import("../../../generated/prisma").$Enums.Role;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            status: import("../../../generated/prisma").$Enums.StudentStatus;
            id: number;
            birthDate: Date;
            address: string | null;
            schoolYear: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            classId: number | null;
            parentId: number | null;
        })[];
        assignments: ({
            teacher: {
                user: {
                    id: number;
                    name: string;
                    firstName: string;
                    email: string;
                    passwordHash: string;
                    role: import("../../../generated/prisma").$Enums.Role;
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
            subject: {
                id: number;
                name: string;
                code: string;
                createdAt: Date;
                updatedAt: Date;
                coefficient: number;
                description: string | null;
            };
        } & {
            schoolYear: string;
            classId: number;
            teacherId: number;
            subjectId: number;
        })[];
        headTeacher: ({
            user: {
                id: number;
                name: string;
                firstName: string;
                email: string;
                passwordHash: string;
                role: import("../../../generated/prisma").$Enums.Role;
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
        maxCapacity: number;
        headTeacherId: number | null;
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
        maxCapacity: number;
        headTeacherId: number | null;
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
                role: import("../../../generated/prisma").$Enums.Role;
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
        maxCapacity: number;
        headTeacherId: number | null;
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
        maxCapacity: number;
        headTeacherId: number | null;
    }>;
}
//# sourceMappingURL=classes.service.d.ts.map