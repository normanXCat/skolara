import { AdminAbsenceFiltersInput } from "./absences.schema";
export declare class AdminAbsencesRepository {
    /**
     * Récupère toutes les absences avec filtres et pagination.
     */
    findAll(filters: AdminAbsenceFiltersInput): Promise<{
        absences: ({
            student: {
                user: {
                    id: number;
                    name: string;
                    firstName: string;
                    email: string;
                };
                parent: ({
                    user: {
                        name: string;
                        firstName: string;
                        email: string;
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
            };
            class: {
                id: number;
                name: string;
                level: string;
            };
            teacher: {
                user: {
                    id: number;
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
            };
        } & {
            status: import("@prisma/client").$Enums.AbsenceStatus;
            id: number;
            classId: number;
            isJustified: boolean;
            reason: string | null;
            date: Date;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            parentNotifiedAt: Date | null;
            teacherId: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    /**
     * Statistiques globales des absences.
     */
    getStats(): Promise<{
        totalAbsences: number;
        absentCount: number;
        lateCount: number;
        justifiedCount: number;
        unjustifiedCount: number;
        monthlyTrend: {
            month: string;
            count: number;
        }[];
        topClasses: {
            name: string;
            count: number;
        }[];
        distribution: {
            name: string;
            value: number;
        }[];
    }>;
    /**
     * Justifie une absence.
     */
    justify(id: number, data: {
        isJustified: boolean;
        reason: string;
    }): Promise<{
        status: import("@prisma/client").$Enums.AbsenceStatus;
        id: number;
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
     * Récupère une absence par ID.
     */
    findById(id: number): Promise<({
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
        status: import("@prisma/client").$Enums.AbsenceStatus;
        id: number;
        classId: number;
        isJustified: boolean;
        reason: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        parentNotifiedAt: Date | null;
        teacherId: number;
    }) | null>;
}
//# sourceMappingURL=absences.repository.d.ts.map