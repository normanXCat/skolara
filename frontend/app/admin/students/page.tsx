import AdminLayout from "@/components/admin/AdminLayout";
import { StudentList } from "@/components/admin/students/StudentList";
import { Suspense } from "react";

/**
 * Metadata for SEO and Page title
 */
export const metadata = {
    title: "Registre des Élèves | Skolara Admin",
    description:
        "Gestion centralisée du registre des élèves de l'établissement",
};

/**
 * Page du registre des élèves.
 * Suit la structure moderne du Dashboard avec effet de fond ambiant.
 */
export default function StudentListPage() {
    return (
        <AdminLayout>
            {/* Ambient Background Effect */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

            <div className="relative z-10 space-y-12 pb-20">
                <Suspense
                    fallback={
                        <div className="space-y-8 animate-pulse">
                            <div className="h-20 w-1/3 bg-muted rounded-2xl" />
                            <div className="h-[600px] w-full bg-muted rounded-[2.5rem]" />
                        </div>
                    }
                >
                    <StudentList />
                </Suspense>
            </div>
        </AdminLayout>
    );
}
