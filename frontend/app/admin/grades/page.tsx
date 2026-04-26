import { GradeList } from "@/components/admin/grades/GradeList";
import { Suspense } from "react";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";

export const metadata = {
    title: "Registre des Notes | Skolara Admin",
    description: "Vue d'ensemble de toutes les notes et évaluations de l'établissement",
};

export default function AdminGradesPage() {
    return (
        <>
            {/* Ambient Background Effect */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

            <div className="relative z-10 space-y-12 pb-20">
                <Suspense
                    fallback={
                        <div className="space-y-12">
                            {/* Header Skeleton */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-3">
                                    <SkeletonReusable width={300} height={40} className="rounded-xl" />
                                    <SkeletonReusable width={200} height={20} className="rounded-lg" />
                                </div>
                                <SkeletonReusable width={200} height={48} className="rounded-3xl" />
                            </div>

                            {/* Class Grid Skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <SkeletonReusable 
                                        key={i} 
                                        height={180} 
                                        className="rounded-3xl w-full" 
                                    />
                                ))}
                            </div>
                        </div>
                    }
                >
                    <GradeList />
                </Suspense>
            </div>
        </>
    );
}
