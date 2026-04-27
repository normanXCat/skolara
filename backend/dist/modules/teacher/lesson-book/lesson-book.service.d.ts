export declare class TeacherLessonBookService {
    getLessonBooks(teacherUserId: number, classId?: number, subjectId?: number, page?: number, limit?: number): Promise<{
        lessons: ({
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
            createdAt: Date;
            updatedAt: Date;
            content: string;
            teacherId: number;
            lessonDate: Date;
            homework: string | null;
            homeworkDueDate: Date | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createLesson(teacherUserId: number, data: {
        classId: number;
        subjectId: number;
        lessonDate: string;
        content: string;
        homework?: string;
        homeworkDueDate?: string;
    }): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        content: string;
        teacherId: number;
        lessonDate: Date;
        homework: string | null;
        homeworkDueDate: Date | null;
    }>;
    updateLesson(teacherUserId: number, id: number, data: {
        content?: string;
        homework?: string;
        homeworkDueDate?: string;
    }): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        content: string;
        teacherId: number;
        lessonDate: Date;
        homework: string | null;
        homeworkDueDate: Date | null;
    }>;
    deleteLesson(teacherUserId: number, id: number): Promise<{
        id: number;
        classId: number;
        subjectId: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        teacherId: number;
        lessonDate: Date;
        homework: string | null;
        homeworkDueDate: Date | null;
    }>;
}
//# sourceMappingURL=lesson-book.service.d.ts.map