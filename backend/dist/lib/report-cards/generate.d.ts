export interface ReportCardResult {
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
}
export declare function generateReportCard(studentId: number, schoolYear: string, semester: number, save?: boolean): Promise<ReportCardResult>;
//# sourceMappingURL=generate.d.ts.map