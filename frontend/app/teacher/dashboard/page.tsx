import { DashboardStats } from "@/components/teacher/dashboard/DashboardStats";
import { QuickActions } from "@/components/teacher/dashboard/QuickActions";

/**
 * Metadata for SEO and Page title
 */
export const metadata = {
    title: "Tableau de Bord | Skolara Enseignant",
    description: "Gérez vos classes, notes et absences en un clin d'œil",
};

/**
 * Page du tableau de bord Enseignant (Server Component).
 * Dans un scénario réel, fetch les données du professeur ici.
 */
export default async function TeacherDashboardPage() {
    // Dans une version finale, on ferait un fetch vers /teacher/stats ici
    // const cookieStore = await cookies();
    // const statsRes = await api.get("/teacher/stats", { headers: { Cookie: cookieStore.toString() } });
    
    // Données de démonstration structurées pour le DashboardStats
    const mockStats = {
        totalClasses: 3,
        completedRollCalls: "1/3",
        pendingRollCalls: 2,
        nextClassTime: "10:30",
        nextClassName: "Mathématiques - 3ème A",
        globalAverage: "14.5",
        averageTrend: 0.8,
    };

    return (
        <div className="relative z-10 space-y-12 pb-20">
            {/* Ambient Background Effect (similaire à l'admin) */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

            {/* 1. Statistiques Clés */}
            <section className="relative z-10">
                <DashboardStats stats={mockStats} />
            </section>

            {/* 2. Actions Rapides */}
            <section className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <h2 className="text-2xl font-black tracking-tight">Actions Prioritaires</h2>
                </div>
                <QuickActions />
            </section>

            {/* On pourrait ajouter ici une section "Prochains Cours" ou "Dernières Activités" */}
        </div>
    );
}
