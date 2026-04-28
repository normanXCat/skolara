"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const client_1 = require("../../../prisma/client");
const prisma_1 = require("../../../generated/prisma");
/**
 * Service pour la génération des statistiques du tableau de bord admin.
 */
class StatsService {
    /**
     * Récupère les indicateurs clés (KPI) et les données pour les graphiques.
     */
    async getAdminStats() {
        const now = new Date();
        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const endOfToday = new Date(now.setHours(23, 59, 59, 999));
        // 1. Appels parallélisés pour optimiser le temps de réponse
        const [totalStudents, totalTeachers, totalClasses, pendingPayments, latePayments, pendingPreRegistrations, todayAbsences,] = await Promise.all([
            client_1.prisma.student.count({ where: { status: prisma_1.StudentStatus.ACTIVE } }),
            client_1.prisma.user.count({
                where: { role: prisma_1.Role.ENSEIGNANT, active: true },
            }),
            client_1.prisma.class.count(),
            client_1.prisma.payment.count({ where: { status: prisma_1.PaymentStatus.PENDING } }),
            client_1.prisma.payment.count({ where: { status: prisma_1.PaymentStatus.LATE } }),
            client_1.prisma.preRegistration.count({ where: { status: prisma_1.Status.PENDING } }),
            client_1.prisma.absence.count({
                where: {
                    date: {
                        gte: startOfToday,
                        lte: endOfToday,
                    },
                },
            }),
        ]);
        // 2. Calcul du taux de présence du jour
        const todayAttendanceRate = totalStudents > 0
            ? Math.max(0, Math.round(((totalStudents - todayAbsences) / totalStudents) *
                100))
            : 100;
        // 3. Évolution des effectifs sur les 6 derniers mois
        // Note: On calcule le total cumulé d'élèves enregistrés à la fin de chaque mois
        const enrollmentEvolution = [];
        const monthNames = [
            "Jan",
            "Fév",
            "Mar",
            "Avr",
            "Mai",
            "Juin",
            "Juil",
            "Août",
            "Sep",
            "Oct",
            "Nov",
            "Déc",
        ];
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            d.setDate(1); // Début du mois
            // Fin du mois calculé
            const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
            const count = await client_1.prisma.student.count({
                where: {
                    createdAt: { lte: monthEnd },
                    status: prisma_1.StudentStatus.ACTIVE,
                },
            });
            enrollmentEvolution.push({
                month: monthNames[d.getMonth()],
                total: count,
            });
        }
        // 4. Dernières alertes de paiement (5 premiers)
        const paymentAlerts = await client_1.prisma.payment.findMany({
            where: { status: prisma_1.PaymentStatus.LATE },
            take: 5,
            orderBy: { dueDate: "asc" },
            include: {
                student: {
                    include: { user: true },
                },
            },
        });
        // 5. Dernières pré-inscriptions (5 premières)
        const latestPreRegistrations = await client_1.prisma.preRegistration.findMany({
            take: 5,
            orderBy: { submittedAt: "desc" },
        });
        return {
            totalStudents,
            totalTeachers,
            totalClasses,
            todayAttendanceRate,
            pendingPayments,
            latePayments,
            pendingPreRegistrations,
            enrollmentEvolution,
            paymentAlerts: paymentAlerts.map((p) => ({
                id: p.id,
                studentName: `${p.student.user.firstName} ${p.student.user.name}`,
                amount: p.amountDue,
                dueDate: p.dueDate,
            })),
            latestPreRegistrations,
        };
    }
}
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map