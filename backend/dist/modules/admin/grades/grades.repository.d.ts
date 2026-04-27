import { AdminGradeFiltersInput } from "./grades.schema";
export declare class AdminGradesRepository {
    /**
     * Récupère toutes les notes avec filtres et pagination.
     */
    findAll(filters: AdminGradeFiltersInput): Promise<{
        grades: ({
            subject: {
                id: number;
                name: string;
                code: string;
                coefficient: number;
            };
            student: {
                user: {
                    id: number;
                    name: string;
                    firstName: string;
                    email: string;
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
            value: number;
            id: number;
            classId: number;
            subjectId: number;
            semester: number;
            createdAt: Date;
            updatedAt: Date;
            studentId: number;
            teacherId: number;
            comment: string | null;
            gradedAt: Date;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    /**
     * Statistiques globales des notes.
     */
    getStats(): Promise<{
        totalGrades: number;
        average: number;
        highest: number;
        lowest: number;
        distribution: {
            range: string;
            count: number;
        }[];
    }>;
}
//# sourceMappingURL=grades.repository.d.ts.map