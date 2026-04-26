import { GradeClassDetail } from "@/components/admin/grades/GradeClassDetail";
import { Suspense } from "react";

export const metadata = {
    title: "Détails des Notes | Skolara Admin",
    description: "Analyse détaillée des notes par classe",
};

export default async function ClassGradesPage({ params }: { params: Promise<{ classId: string }> }) {
    const { classId } = await params;
    
    return (
        <>
            {/* Ambient Background Effect */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

            <div className="relative z-10 space-y-12 pb-20">
                <Suspense
                    fallback={
                        <div className="space-y-8 animate-pulse">
                            <div className="h-10 w-1/4 bg-muted rounded-xl" />
                            <div className="h-20 w-1/2 bg-muted rounded-2xl" />
                            <div className="h-[500px] w-full bg-muted rounded-[2.5rem]" />
                        </div>
                    }
                >
                    <GradeClassDetail classId={classId} />
                </Suspense>
            </div>
        </>
    );
}
