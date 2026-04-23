import { TeacherForm } from "@/components/admin/teachers/TeacherForm";
import { Suspense } from "react";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";

export const metadata = {
    title: "Nouvel Enseignant | Skolara Admin",
    description: "Ajouter un nouvel enseignant à l'équipe pédagogique",
};

export default function NewTeacherPage() {
    return (
        <>
            {/* Ambient Background Effect */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

            <div className="relative z-10">
                <Suspense fallback={<FormLoading />}>
                    <TeacherForm />
                </Suspense>
            </div>
        </>
    );
}

function FormLoading() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto animate-pulse">
            {/* Action Bar placeholder */}
            <SkeletonReusable width={100} height={36} className="rounded-xl" />

            {/* Header placeholder */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <SkeletonReusable width={40} height={40} className="rounded-2xl" />
                    <SkeletonReusable width={280} height={32} />
                </div>
                <div className="pl-[52px]">
                    <SkeletonReusable width={400} height={16} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Left Column: Form Card placeholder */}
                <div className="lg:col-span-2">
                    <div className="p-8 rounded-[2.5rem] border border-border/20 bg-muted/5 space-y-8">
                        <SkeletonReusable width={150} height={12} className="rounded-full" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <SkeletonReusable width={80} height={14} />
                                <SkeletonReusable width="100%" height={56} className="rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <SkeletonReusable width={80} height={14} />
                                <SkeletonReusable width="100%" height={56} className="rounded-full" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <SkeletonReusable width={120} height={14} />
                            <SkeletonReusable width="100%" height={56} className="rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <SkeletonReusable width={80} height={14} />
                                <SkeletonReusable width="100%" height={56} className="rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <SkeletonReusable width={80} height={14} />
                                <SkeletonReusable width="100%" height={56} className="rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar placeholders */}
                <div className="space-y-6">
                    <div className="p-6 rounded-[2rem] border border-border/20 bg-muted/5 space-y-4">
                        <SkeletonReusable width={100} height={16} />
                        <SkeletonReusable width="100%" height={40} />
                        <div className="pt-4 space-y-3">
                            <SkeletonReusable width="100%" height={56} className="rounded-2xl" />
                            <SkeletonReusable width="100%" height={48} className="rounded-2xl" />
                        </div>
                    </div>
                    
                    <div className="p-6 rounded-[2rem] border border-border/10 bg-primary/5 space-y-3">
                        <SkeletonReusable width={80} height={14} className="rounded-full" />
                        <SkeletonReusable width="100%" height={32} />
                    </div>
                </div>
            </div>
        </div>
    );
}
