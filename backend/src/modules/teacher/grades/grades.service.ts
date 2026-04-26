import { GradesRepository } from "./grades.repository";
import { BulkGradeInput, SingleGradeInput } from "./grades.schema";
import { prisma } from "../../../prisma/client";

export class GradesService {
    private repository: GradesRepository;

    constructor(repository: GradesRepository) {
        this.repository = repository;
    }

    /**
     * Saisie groupée de notes.
     */
    async bulkSave(teacherId: number, classId: number, subjectId: number, data: BulkGradeInput) {
        // Vérifier l'assignation de l'enseignant
        const isAssigned = await this.repository.isAssigned(teacherId, classId, subjectId);
        if (!isAssigned) {
            throw { status: 403, message: "Vous n'êtes pas autorisé à gérer les notes pour cette classe et cette matière" };
        }

        // Vérifier que tous les élèves appartiennent à la classe
        const students = await this.repository.findStudentsByClass(classId);
        const validStudentIds = new Set(students.map(s => s.id));
        
        for (const item of data.grades) {
            if (!validStudentIds.has(item.studentId)) {
                throw { status: 400, message: `L'élève avec l'ID ${item.studentId} n'appartient pas à cette classe` };
            }
        }

        return this.repository.bulkUpsert({
            classId,
            subjectId,
            teacherId,
            semester: data.semester,
            grades: data.grades
        });
    }

    /**
     * Grille de saisie pour une classe/matière/semestre.
     * Retourne tous les élèves avec leur note si elle existe.
     */
    async getGrid(teacherId: number, classId: number, subjectId: number, semester: number) {
        const isAssigned = await this.repository.isAssigned(teacherId, classId, subjectId);
        if (!isAssigned) {
            throw { status: 403, message: "Accès refusé pour cette classe/matière" };
        }

        const students = await this.repository.findStudentsByClass(classId);
        const existingGrades = await this.repository.findGrades({ classId, subjectId, semester });

        // Fusionner les données
        return {
            classId,
            subjectId,
            semester,
            students: students.map(student => {
                const grade = existingGrades.find((g: any) => g.studentId === student.id);
                return {
                    id: student.id,
                    firstName: student.user.firstName,
                    lastName: student.user.name,
                    gradeId: grade?.id || null,
                    value: grade?.value || null,
                    comment: grade?.comment || null
                };
            })
        };
    }

    /**
     * Statistiques de classe.
     */
    async getStats(classId: number, subjectId: number, semester: number) {
        return this.repository.getStats(classId, subjectId, semester);
    }

    /**
     * Liste des assignations de l'enseignant.
     */
    async getAssignments(teacherId: number) {
        return prisma.teacherSubjectClass.findMany({
            where: { teacherId },
            include: {
                class: true,
                subject: true
            }
        });
    }

    async updateGrade(id: number, data: SingleGradeInput) {
        return this.repository.update(id, data);
    }

    async deleteGrade(id: number) {
        return this.repository.delete(id);
    }
}
