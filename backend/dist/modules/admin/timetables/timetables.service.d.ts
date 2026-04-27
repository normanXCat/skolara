import { TimetableFilters } from "./timetables.repository";
export declare class TimetablesService {
    getTimetables(filters: TimetableFilters): Promise<({
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
    getTimetableById(id: number): Promise<{
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
    }>;
    checkConflicts(data: {
        classId?: number;
        teacherId?: number;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        schoolYear: string;
        excludeId?: number;
    }): Promise<{
        conflict: boolean;
        reason: string;
        type: string;
    } | {
        conflict: boolean;
        reason?: undefined;
        type?: undefined;
    }>;
    createTimetableSlot(data: any): Promise<{
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
    updateTimetableSlot(id: number, data: any): Promise<{
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
    deleteTimetableSlot(id: number): Promise<{
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
}
declare const _default: TimetablesService;
export default _default;
//# sourceMappingURL=timetables.service.d.ts.map