import { TeachersRepository } from "./teachers.repository";
import { CreateTeacherInput, UpdateTeacherInput, TeacherFiltersInput, AssignmentInput } from "./teachers.schema";
/**
 * Service pour la logique métier des enseignants.
 */
export declare class TeachersService {
    private repository;
    constructor(repository: TeachersRepository);
    /**
     * Récupère la liste paginée des enseignants.
     */
    findAll(filters: TeacherFiltersInput): Promise<{
        teachers: ({
            user: {
                id: number;
                name: string;
                firstName: string;
                email: string;
                active: boolean;
            };
            _count: {
                assignments: number;
            };
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
            } & {
                classId: number;
                subjectId: number;
                schoolYear: string;
                teacherId: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            phone: string | null;
            speciality: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    /**
     * Détails d'un enseignant.
     */
    findById(id: number): Promise<{
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
        assignments: ({
            class: {
                id: number;
                name: string;
                schoolYear: string;
                level: string;
                createdAt: Date;
                updatedAt: Date;
                headTeacherId: number | null;
                maxCapacity: number;
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
            classId: number;
            subjectId: number;
            schoolYear: string;
            teacherId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        phone: string | null;
        speciality: string | null;
    }>;
    /**
     * Crée un enseignant avec son compte utilisateur.
     */
    create(data: CreateTeacherInput): Promise<{
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
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        phone: string | null;
        speciality: string | null;
    }>;
    /**
     * Mise à jour d'un enseignant.
     */
    update(id: number, data: UpdateTeacherInput): Promise<{
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
    }>;
    /**
     * Active/Désactive un enseignant.
     */
    setStatus(id: number, active: boolean): Promise<{
        id: number;
        name: string;
        firstName: string;
        email: string;
        passwordHash: string;
        role: import("../../../generated/prisma").$Enums.Role;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Gère les assignations.
     */
    addAssignment(id: number, assignment: AssignmentInput): Promise<{
        classId: number;
        subjectId: number;
        schoolYear: string;
        teacherId: number;
    }>;
    removeAssignment(id: number, assignment: AssignmentInput): Promise<{
        classId: number;
        subjectId: number;
        schoolYear: string;
        teacherId: number;
    }>;
}
//# sourceMappingURL=teachers.service.d.ts.map