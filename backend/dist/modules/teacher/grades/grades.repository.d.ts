export declare class GradesRepository {
    /**
     * Crée ou met à jour des notes en masse.
     */
    bulkUpsert(data: {
        classId: number;
        subjectId: number;
        teacherId: number;
        term: string;
        coefficient: number;
        date: Date;
        marks: {
            studentId: number;
            value: number;
            comment?: string | null;
        }[];
    }): Promise<{
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
     * Récupère les notes d'une classe pour une matière.
     */
    findMarks(filters: {
        classId?: number;
        subjectId?: number;
        term?: string;
    }): Promise<({
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
    /**
     * Récupère la liste des élèves d'une classe pour préparer la grille de saisie.
     */
    findStudentsByClass(classId: number): Promise<({
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
}
//# sourceMappingURL=grades.repository.d.ts.map