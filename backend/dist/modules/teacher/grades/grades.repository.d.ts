export declare class GradesRepository {
    /**
     * Crée ou met à jour des notes en masse au sein d'une transaction.
     * Si la valeur est null, la note est supprimée.
     */
    bulkUpsert(data: {
        classId: number;
        subjectId: number;
        teacherId: number;
        semester: number;
        grades: {
            studentId: number;
            value: number | null;
            comment?: string | null;
        }[];
    }): Promise<{
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
    }[]>;
    /**
     * Récupère les notes d'une classe pour une matière et un semestre.
     */
    findGrades(filters: {
        classId: number;
        subjectId: number;
        semester: number;
    }): Promise<({
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
    })[]>;
    /**
     * Met à jour une note unique.
     */
    update(id: number, data: {
        value: number;
        comment?: string | null;
    }): Promise<{
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
    }>;
    /**
     * Supprime une note.
     */
    delete(id: number): Promise<{
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
    }>;
    /**
     * Récupère les statistiques d'une classe pour une matière/semestre.
     */
    getStats(classId: number, subjectId: number, semester: number): Promise<{
        average: number;
        highest: number;
        lowest: number;
        gradeCount: number;
        totalStudents: number;
        distribution: {
            range: string;
            count: number;
        }[];
    }>;
    /**
     * Récupère la liste des élèves d'une classe.
     */
    findStudentsByClass(classId: number): Promise<({
        user: {
            id: number;
            name: string;
            firstName: string;
        };
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
    })[]>;
    /**
     * Vérifie si un enseignant est assigné à une classe/matière.
     */
    isAssigned(teacherId: number, classId: number, subjectId: number): Promise<boolean>;
}
//# sourceMappingURL=grades.repository.d.ts.map