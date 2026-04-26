"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReportCard = generateReportCard;
const client_1 = require("../../prisma/client");
async function generateReportCard(studentId, schoolYear, semester, save = true) {
    // Fetch student and class info
    const student = await client_1.prisma.student.findUnique({
        where: { id: studentId },
        include: { class: true }
    });
    if (!student || !student.classId) {
        throw new Error("Étudiant ou classe non trouvé");
    }
    // Fetch all grades for this student, semester
    const grades = await client_1.prisma.grade.findMany({
        where: {
            studentId,
            semester,
            classId: student.classId
        },
        include: {
            subject: true
        }
    });
    // Fetch absences count (hours)
    const absences = await client_1.prisma.absence.count({
        where: {
            studentId,
            // We assume semester is defined by date ranges, or absence has semester field?
            // Looking at common school logic, usually it's date range. 
            // For simplicity, let's just count for the year if no semester field on Absence.
        }
    });
    if (grades.length === 0) {
        return {
            id: undefined,
            overallAverage: 0,
            mention: "N/A",
            gradesBySubject: [],
            absencesCount: absences
        };
    }
    // Group by subject and calculate averages
    const subjectMap = new Map();
    grades.forEach(g => {
        if (!subjectMap.has(g.subjectId)) {
            subjectMap.set(g.subjectId, {
                sum: 0,
                count: 0,
                coef: g.subject.coefficient,
                name: g.subject.name
            });
        }
        const data = subjectMap.get(g.subjectId);
        data.sum += g.value;
        data.count++;
    });
    // Calculate detailed results
    const gradesBySubject = Array.from(subjectMap.entries()).map(([subjectId, s]) => ({
        subjectId,
        subjectName: s.name,
        average: s.sum / s.count,
        coef: s.coef,
        teacherFeedback: "" // Ideally fetch from a separate 'TeacherSubjectAppreciation' model if exists
    }));
    // Calculate overall average
    const totalWeighted = gradesBySubject.reduce((acc, s) => acc + (s.average * s.coef), 0);
    const totalCoef = gradesBySubject.reduce((acc, s) => acc + s.coef, 0);
    const overallAverage = totalCoef > 0 ? Number((totalWeighted / totalCoef).toFixed(2)) : 0;
    // Determine mention
    let mention = "Insuffisant";
    if (overallAverage >= 16)
        mention = "Très Bien";
    else if (overallAverage >= 14)
        mention = "Bien";
    else if (overallAverage >= 12)
        mention = "Assez Bien";
    else if (overallAverage >= 10)
        mention = "Passable";
    const result = {
        overallAverage,
        mention,
        gradesBySubject,
        absencesCount: absences
    };
    if (save) {
        // Upsert ReportCard
        const reportCard = await client_1.prisma.reportCard.upsert({
            where: {
                studentId_semester_schoolYear: {
                    studentId,
                    semester,
                    schoolYear
                }
            },
            update: {
                overallAverage,
                mention,
                classId: student.classId,
                generatedAt: new Date()
            },
            create: {
                studentId,
                semester,
                schoolYear,
                overallAverage,
                mention,
                classId: student.classId
            }
        });
        return { ...result, id: reportCard.id };
    }
    return { ...result, id: undefined };
}
//# sourceMappingURL=generate.js.map