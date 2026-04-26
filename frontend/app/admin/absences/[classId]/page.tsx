"use client";

import { AbsenceClassDetail } from "@/components/admin/absences/AbsenceClassDetail";
import { useParams } from "next/navigation";

export default function AbsenceClassPage() {
    const params = useParams();
    const classId = params.classId as string;

    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-10 relative">
            {/* Ambient Background Effect */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

            <div className="relative z-10 space-y-12 pb-20">
                <AbsenceClassDetail classId={classId} />
            </div>
        </div>
    );
}
