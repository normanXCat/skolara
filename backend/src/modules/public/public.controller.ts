import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma/client";

/**
 * Récupère les chiffres-clés publics pour la page d'accueil.
 */
export const getKeyFigures = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const [studentsCount, teachersCount, classesCount] = await Promise.all([
            prisma.student.count({ where: { status: "ACTIVE" } }),
            prisma.teacher.count(),
            prisma.class.count(),
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
    } catch (error) {
        next(error);
    }
};
