import { Prisma, AbsenceStatus } from "../../../generated/prisma";
export declare class AbsencesRepository {
    /**
     * Enregistre l'appel.
     */
    saveRollCall(data: {
        classId: number;
        teacherId: number;
        date: Date;
        items: {
            studentId: number;
            status: AbsenceStatus;
            reason?: string | null;
        }[];
    }): Promise<[Prisma.BatchPayload, ...{
        status: import("../../../generated/prisma").$Enums.AbsenceStatus;
        id: number;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        classId: number | null;
        teacherId: number | null;
        reason: string | null;
        justified: boolean;
        parentNotifiedAt: Date | null;
    }[]]>;
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
        };
        teacher: ({
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
        class: {
            id: number;
            name: string;
            schoolYear: string;
            level: string;
            createdAt: Date;
            updatedAt: Date;
            maxCapacity: number;
            headTeacherId: number | null;
        } | null;
    } & {
        status: import("../../../generated/prisma").$Enums.AbsenceStatus;
        id: number;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        classId: number | null;
        teacherId: number | null;
        reason: string | null;
        justified: boolean;
        parentNotifiedAt: Date | null;
    })[]>;
}
//# sourceMappingURL=absences.repository.d.ts.map