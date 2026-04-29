import { AbsenceStatus } from "../../../generated/prisma";
export declare class AbsencesRepository {
    /**
     * Enregistre l'appel en masse pour une classe et une date donnée.
     * Utilise une transaction pour supprimer et recréer les records de la journée.
     */
    saveRollCall(data: {
        classId: number;
        teacherId: number;
        date: Date;
        records: {
            studentId: number;
            status: AbsenceStatus;
            reason?: string | null;
        }[];
    }): Promise<{
        id: number;
        status: import("../../../generated/prisma").$Enums.AbsenceStatus;
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
     * Récupère les absences avec filtres.
     */
    findAbsences(filters: any): Promise<({
        student: {
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
            parent: ({
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
                address: string | null;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
                phone: string;
            }) | null;
        } & {
            id: number;
            status: import("../../../generated/prisma").$Enums.StudentStatus;
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
    } & {
        id: number;
        status: import("../../../generated/prisma").$Enums.AbsenceStatus;
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
    justify(id: number, data: {
        isJustified: boolean;
        reason: string;
    }): Promise<{
        id: number;
        status: import("../../../generated/prisma").$Enums.AbsenceStatus;
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
    /**
     * Marque une notification parent comme envoyée.
     */
    markNotified(id: number): Promise<{
        id: number;
        status: import("../../../generated/prisma").$Enums.AbsenceStatus;
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
    /**
     * Récupère les élèves d'une classe.
     */
    findStudentsByClass(classId: number): Promise<({
        user: {
            id: number;
            name: string;
            firstName: string;
        };
    } & {
        id: number;
        status: import("../../../generated/prisma").$Enums.StudentStatus;
        classId: number | null;
        birthDate: Date;
        address: string | null;
        schoolYear: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        parentId: number | null;
    })[]>;
}
//# sourceMappingURL=absences.repository.d.ts.map