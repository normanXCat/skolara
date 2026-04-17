import { prisma } from "../../prisma/client";
import { Grade } from "../../generated/prisma";

export class GradeRepository {
    /**
     * Récupère tous les grades de la base de données.
     */
    async findAll(): Promise<Grade[]> {
        return prisma.grade.findMany({
            orderBy: { id: "asc" },
        });
    }

    /**
     * Récupère un grade par sa valeur.
     */
    async findByValue(value: string): Promise<Grade | null> {
        return prisma.grade.findUnique({
            where: { value },
        });
    }
}

export default new GradeRepository();
