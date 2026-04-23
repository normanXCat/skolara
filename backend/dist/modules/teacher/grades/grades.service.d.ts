import { GradesRepository } from "./grades.repository";
import { BulkGradeInput, MarkFiltersInput } from "./grades.schema";
export declare class GradesService {
    private repository;
    constructor(repository: GradesRepository);
    /**
     * Saisie groupée de notes.
     */
    bulkCreate(teacherId: number, data: BulkGradeInput): Promise<{
        value: number;
        id: number;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        classId: number | null;
        subject: string;
        teacherId: number | null;
        subjectId: number | null;
        coefficient: number;
        semester: number | null;
        comment: string | null;
        term: string;
    }[]>;
    /**
     * Liste des élèves pour la saisie.
     */
    getEntryGrid(teacherId: number, classId: number, subjectId: number): Promise<({
        user: {
            id: number;
            name: string;
            firstName: string;
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
    })[]>;
    /**
     * Historique des notes saisies.
     */
    getHistory(filters: MarkFiltersInput): Promise<({
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
        subjectRef: {
            id: number;
            name: string;
            code: string;
            createdAt: Date;
            updatedAt: Date;
            coefficient: number;
            description: string | null;
        } | null;
    } & {
        value: number;
        id: number;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        studentId: number;
        classId: number | null;
        subject: string;
        teacherId: number | null;
        subjectId: number | null;
        coefficient: number;
        semester: number | null;
        comment: string | null;
        term: string;
    })[]>;
}
//# sourceMappingURL=grades.service.d.ts.map