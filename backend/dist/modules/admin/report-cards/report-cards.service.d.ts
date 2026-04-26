export declare class ReportCardsService {
    getStatusByClass(classId: number, schoolYear: string, semester: number): Promise<{
        class: {
            id: number;
            name: string;
            schoolYear: string;
            level: string;
            createdAt: Date;
            updatedAt: Date;
            headTeacherId: number | null;
            maxCapacity: number;
        } | null;
        students: any;
    }>;
    getPreviewData(studentId: number, schoolYear: string, semester: number): Promise<{
        id?: number;
        overallAverage: number;
        mention: string;
        gradesBySubject: {
            subjectId: number;
            subjectName: string;
            average: number;
            coef: number;
            teacherFeedback: string;
        }[];
        absencesCount: number;
        student: {
            id: number;
            firstName: string;
            lastName: string;
            user: {
                name: string;
                firstName: string;
            };
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
        } | null;
        reportCard: any;
    }>;
    finalize(studentId: number, schoolYear: string, semester: number, generalAppreciation: string): Promise<import("../../../lib/report-cards/generate").ReportCardResult>;
}
declare const _default: ReportCardsService;
export default _default;
//# sourceMappingURL=report-cards.service.d.ts.map