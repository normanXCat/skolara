import { MessageList } from "@/components/admin/messages/MessageList";
import { Suspense } from "react";

export const metadata = {
    title: "Messages | Skolara Admin",
    description: "Gérez les contacts et demandes d'information",
};

export default function AdminMessagesPage() {
    return (
        <div className="relative z-10 space-y-12 pb-20">
            <Suspense fallback={<div className="h-[500px] w-full bg-muted/20 animate-pulse rounded-[2.5rem]" />}>
                <MessageList />
            </Suspense>
        </div>
    );
}
