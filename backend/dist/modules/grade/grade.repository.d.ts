import { Grade } from "../../generated/prisma";
export declare class GradeRepository {
    /**
     * Récupère tous les grades de la base de données.
     */
    findAll(): Promise<Grade[]>;
    /**
     * Récupère un grade par sa valeur.
     */
    findByValue(value: string): Promise<Grade | null>;
}
declare const _default: GradeRepository;
export default _default;
//# sourceMappingURL=grade.repository.d.ts.map