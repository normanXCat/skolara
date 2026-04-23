import { prisma } from "../../prisma/client";
import { SchoolLevel } from "../../generated/prisma";

export class GradeRepository {
    /**
     * Récupère tous les grades de la base de données.
     */
    async findAll(): Promise<SchoolLevel[]> {
        return prisma.schoolLevel.findMany({
            orderBy: { id: "asc" },
        });
    }

    /**
     * Récupère un grade par sa valeur.
     */
    async findByValue(value: string): Promise<SchoolLevel | null> {
        return prisma.schoolLevel.findUnique({
            where: { value },
        });
    }
}

export default new GradeRepository();
