import { serverFetch } from "@/lib/server-api";
import { redirect } from "next/navigation";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { EnrollmentChart } from "@/components/admin/dashboard/EnrollmentChart";
import { PaymentAlerts } from "@/components/admin/dashboard/PaymentAlerts";
import { RecentRegistrations } from "@/components/admin/dashboard/RecentRegistrations";

/**
 * Metadata for SEO and Page title
 */
export const metadata = {
    title: "Tableau de Bord | Skolara Admin",
    description: "Vue d'ensemble de l'activité de l'établissement",
};

/**
 * Page du tableau de bord d'administration (Server Component).
 * Fetch les données sur le serveur et les distribue aux composants clients spécialisés.
 */
export default async function AdminDashboardPage() {
    // Récupération des statistiques via le server-api (gère les cookies et le refresh automatiquement)
    const statsRes = await serverFetch<any>("/admin/stats");

    // Si on est pas autorisé côté serveur, on redirige
    if (!statsRes.success && statsRes.error === "Session expirée") {
        redirect("/login");
    }

    const stats = statsRes.success ? statsRes.data : null;

    return (
        <>
            {/* Ambient Background Effect */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

            <div className="relative z-10 space-y-12 pb-20">
                {/* 1. KPI Cards Section */}
                <DashboardStats stats={stats} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* 2. Graphique d'évolution des effectifs */}
                    <div className="lg:col-span-2">
                        <EnrollmentChart
                            data={stats?.enrollmentEvolution || []}
                        />
                    </div>

                    {/* 3. Alertes de Paiement et Situation Financière */}
                    <PaymentAlerts alerts={stats?.paymentAlerts || []} />
                </div>

                {/* 4. Gestion des dossiers de pré-inscriptions récents */}
                <RecentRegistrations
                    data={stats?.latestPreRegistrations || []}
                />
            </div>
        </>
    );
}
