import { GradesRepository } from "./grades.repository";
import { BulkGradeInput, SingleGradeInput } from "./grades.schema";
export declare class GradesService {
    private repository;
    constructor(repository: GradesRepository);
    /**
     * Saisie groupée de notes.
     */
    bulkSave(teacherId: number, classId: number, subjectId: number, data: BulkGradeInput): Promise<{
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
     * Grille de saisie pour une classe/matière/semestre.
     * Retourne tous les élèves avec leur note si elle existe.
     */
    getGrid(teacherId: number, classId: number, subjectId: number, semester: number): Promise<{
        classId: number;
        subjectId: number;
        semester: number;
        students: {
            id: number;
            firstName: string;
            lastName: string;
            gradeId: number | null;
            value: number | null;
            comment: string | null;
        }[];
    }>;
    /**
     * Statistiques de classe.
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
     * Liste des assignations de l'enseignant.
     */
    getAssignments(teacherId: number): Promise<({
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
        classId: number;
        subjectId: number;
        schoolYear: string;
        teacherId: number;
    })[]>;
    updateGrade(id: number, data: SingleGradeInput): Promise<{
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
    deleteGrade(id: number): Promise<{
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
}
//# sourceMappingURL=grades.service.d.ts.map