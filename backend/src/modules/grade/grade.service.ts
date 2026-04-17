import gradeRepository from "./grade.repository";
import { Grade } from "../../generated/prisma";

export class GradeService {
    /**
     * Récupère la liste de tous les grades.
     */
    async getAllGrades(): Promise<Grade[]> {
        return gradeRepository.findAll();
    }
}

export default new GradeService();
