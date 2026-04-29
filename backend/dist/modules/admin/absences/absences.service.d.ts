import { AdminAbsencesRepository } from "./absences.repository";
import { AdminAbsenceFiltersInput, AdminJustifyAbsenceInput } from "./absences.schema";
export declare class AdminAbsencesService {
    private repository;
    constructor(repository: AdminAbsencesRepository);
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
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
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
    justify(id: number, data: AdminJustifyAbsenceInput): Promise<{
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