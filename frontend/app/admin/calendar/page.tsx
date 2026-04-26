import { CalendarManager } from "@/components/admin/calendar/CalendarManager";
import { Suspense } from "react";

export const metadata = {
    title: "Calendrier scolaire | Skolara Admin",
    description: "Gérez les événements académiques",
};

export default function AdminCalendarPage() {
    return (
        <div className="relative z-10 space-y-12 pb-20">
            <Suspense fallback={<div className="h-[700px] w-full bg-muted/20 animate-pulse rounded-[3rem]" />}>
                <CalendarManager />
            </Suspense>
        </div>
    );
}
