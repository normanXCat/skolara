import { GradesRepository } from "./grades.repository";
import { BulkGradeInput, MarkFiltersInput } from "./grades.schema";
import { prisma } from "../../../prisma/client";

export class GradesService {
    private repository: GradesRepository;

    constructor(repository: GradesRepository) {
        this.repository = repository;
    }

    /**
     * Saisie groupée de notes.
     */
    async bulkCreate(teacherId: number, data: BulkGradeInput) {
        // Vérifier que l'enseignant est bien assigné à cette classe/matière
        const assignment = await prisma.teacherSubjectClass.findFirst({
            where: {
                teacherId,
                classId: data.classId,
                subjectId: data.subjectId,
            },
        });

        if (!assignment) {
            throw { status: 403, message: "Vous n'êtes pas autorisé à saisir des notes pour cette classe et cette matière" };
        }

        return this.repository.bulkUpsert({
            ...data,
            teacherId,
        });
    }

    /**
     * Liste des élèves pour la saisie.
     */
    async getEntryGrid(teacherId: number, classId: number, subjectId: number) {
        const students = await this.repository.findStudentsByClass(classId);
        return students;
    }

    /**
     * Historique des notes saisies.
     */
    async getHistory(filters: MarkFiltersInput) {
        return this.repository.findMarks(filters);
    }
}
