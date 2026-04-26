import gradeRepository from "./grade.repository";
import { SchoolLevel } from "../../generated/prisma";

export class GradeService {
    /**
     * Récupère la liste de tous les niveaux scolaires.
     */
    async getAllGrades(): Promise<SchoolLevel[]> {
        return gradeRepository.findAll();
    }
}

export default new GradeService();
