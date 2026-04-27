import { Prisma } from "../../../generated/prisma";
export interface TimetableFilters {
    classId?: number;
    teacherId?: number;
    schoolYear?: string;
    dayOfWeek?: number;
}
export declare class TimetablesRepository {
    findMany(filters: TimetableFilters): Promise<({
        subject: {
            id: number;
            name: string;
            code: string;
            createdAt: Date;
            updatedAt: Date;
            coefficient: number;
            description: string | null;
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
        classId: number;
        subjectId: number;
        schoolYear: string;
        createdAt: Date;
        updatedAt: Date;
        teacherId: number;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        room: string | null;
    })[]>;
    findById(id: number): Promise<({
        subject: {
            id: number;
            name: string;
            code: string;
            createdAt: Date;
            updatedAt: Date;
            coefficient: number;
            description: string | null;
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
        classId: number;
        subjectId: number;
        schoolYear: string;
        createdAt: Date;
        updatedAt: Date;
        teacherId: number;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        room: string | null;
    }) | null>;
    create(data: Prisma.TimetableUncheckedCreateInput): Promise<{
        id: number;
        classId: number;
        subjectId: number;
        schoolYear: string;
        createdAt: Date;
        updatedAt: Date;
        teacherId: number;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        room: string | null;
    }>;
    update(id: number, data: Prisma.TimetableUncheckedUpdateInput): Promise<{
        id: number;
        classId: number;
        subjectId: number;
        schoolYear: string;
        createdAt: Date;
        updatedAt: Date;
        teacherId: number;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        room: string | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        classId: number;
        subjectId: number;
        schoolYear: string;
        createdAt: Date;
        updatedAt: Date;
        teacherId: number;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        room: string | null;
    }>;
    /**
     * Finds overlapping slots for a class or teacher.
     */
    findOverlappingSlots(params: {
        classId?: number;
        teacherId?: number;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        schoolYear: string;
        excludeId?: number;
    }): Promise<{
        classConflict: ({
            subject: {
                id: number;
                name: string;
                code: string;
                createdAt: Date;
                updatedAt: Date;
                coefficient: number;
                description: string | null;
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
        } & {
            id: number;
            classId: number;
            subjectId: number;
            schoolYear: string;
            createdAt: Date;
            updatedAt: Date;
            teacherId: number;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            room: string | null;
        }) | null;
        teacherConflict: ({
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
            classId: number;
            subjectId: number;
            schoolYear: string;
            createdAt: Date;
            updatedAt: Date;
            teacherId: number;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            room: string | null;
        }) | null;
    }>;
}
declare const _default: TimetablesRepository;
export default _default;
//# sourceMappingURL=timetables.repository.d.ts.map