"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeRepository = void 0;
const client_1 = require("../../prisma/client");
class GradeRepository {
    /**
     * Récupère tous les grades de la base de données.
     */
    async findAll() {
        return client_1.prisma.grade.findMany({
            orderBy: { id: "asc" },
        });
    }
    /**
     * Récupère un grade par sa valeur.
     */
    async findByValue(value) {
        return client_1.prisma.grade.findUnique({
            where: { value },
        });
    }
}
exports.GradeRepository = GradeRepository;
exports.default = new GradeRepository();
//# sourceMappingURL=grade.repository.js.map