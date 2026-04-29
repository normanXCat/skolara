import { AbsencesRepository } from "./absences.repository";
import { RollCallInput, AbsenceFiltersInput, JustifyAbsenceInput } from "./absences.schema";
export declare class AbsencesService {
    private repository;
    constructor(repository: AbsencesRepository);
    /**
     * Récupère les élèves d'une classe pour l'enseignant.
     */
    getClassStudents(teacherId: number, classId: number): Promise<({
        user: {
            id: number;
            name: string;
            firstName: string;
        };
    } & {
        id: number;
        status: import("@prisma/client").$Enums.StudentStatus;
        classId: number | null;
        birthDate: Date;
        address: string | null;
        schoolYear: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        parentId: number | null;
    })[]>;
    /**
     * Enregistre l'appel et notifie les parents si nécessaire.
     */
    saveRollCall(teacherId: number, classId: number, data: RollCallInput): Promise<{
        id: number;
        status: import("@prisma/client").$Enums.AbsenceStatus;
        classId: number;
        isJustified: boolean;
        reason: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        parentNotifiedAt: Date | null;
        teacherId: number;
    }[]>;
    /**
     * Envoie l'email de notification au parent.
     */
    private notifyParent;
    /**
     * Historique des absences.
     */
    getHistory(filters: AbsenceFiltersInput): Promise<({
        student: {
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
            parent: ({
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
                address: string | null;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
                phone: string;
            }) | null;
        } & {
            id: number;
            status: import("@prisma/client").$Enums.StudentStatus;
            classId: number | null;
            birthDate: Date;
            address: string | null;
            schoolYear: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            parentId: number | null;
        };
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
        id: number;
        status: import("@prisma/client").$Enums.AbsenceStatus;
        classId: number;
        isJustified: boolean;
        reason: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        parentNotifiedAt: Date | null;
        teacherId: number;
    })[]>;
    /**
     * Récupère l'appel pour une date donnée.
     */
    getRollCall(classId: number, date: string): Promise<({
        student: {
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
            parent: ({
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
                address: string | null;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
                phone: string;
            }) | null;
        } & {
            id: number;
            status: import("@prisma/client").$Enums.StudentStatus;
            classId: number | null;
            birthDate: Date;
            address: string | null;
            schoolYear: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            parentId: number | null;
        };
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
        id: number;
        status: import("@prisma/client").$Enums.AbsenceStatus;
        classId: number;
        isJustified: boolean;
        reason: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        parentNotifiedAt: Date | null;
        teacherId: number;
    })[]>;
    /**
     * Justifie une absence.
     */
    justifyAbsence(id: number, data: JustifyAbsenceInput): Promise<{
        id: number;
        status: import("@prisma/client").$Enums.AbsenceStatus;
        classId: number;
        isJustified: boolean;
        reason: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        parentNotifiedAt: Date | null;
        teacherId: number;
    }>;
}
//# sourceMappingURL=absences.service.d.ts.map