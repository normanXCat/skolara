interface AbsenceNotificationOptions {
    studentName: string;
    date: string;
    status: "ABSENT" | "LATE";
    className: string;
    teacherName: string;
    reason?: string | null;
}
export declare function getAbsenceNotificationEmail({ studentName, date, status, className, teacherName, reason, }: AbsenceNotificationOptions): string;
export {};
//# sourceMappingURL=AbsenceNotification.d.ts.map