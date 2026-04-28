"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyFigures = void 0;
const client_1 = require("../../prisma/client");
/**
 * Récupère les chiffres-clés publics pour la page d'accueil.
 */
const getKeyFigures = async (req, res, next) => {
    try {
        const [studentsCount, teachersCount, classesCount] = await Promise.all([
            client_1.prisma.student.count({ where: { status: "ACTIVE" } }),
            client_1.prisma.teacher.count(),
            client_1.prisma.class.count(),
        ]);
        return res.json({
            success: true,
            data: {
                students: studentsCount > 0 ? studentsCount : 1200, // Fallback visuel initial
                experts: teachersCount > 0 ? teachersCount : 85,
                classes: classesCount > 0 ? classesCount : 48,
                expansion: 25,
                successRate: 97,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getKeyFigures = getKeyFigures;
//# sourceMappingURL=public.controller.js.map