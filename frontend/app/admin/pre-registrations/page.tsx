import { PreRegistrationList } from "@/components/admin/pre-registrations/PreRegistrationList";
import { Suspense } from "react";

/**
 * Metadata for SEO and Page title
 */
export const metadata = {
    title: "Pré-inscriptions | Skolara Admin",
    description: "Gestion des dossiers de pré-inscription en attente",
};

/**
 * Page de gestion des pré-inscriptions.
 */
export default function PreRegistrationsPage() {
    return (
        <>
            <div className="relative z-10 space-y-12 pb-20">
                <Suspense
                    fallback={
                        <div className="h-[500px] w-full bg-muted/20 animate-pulse rounded-[2.5rem]" />
                    }
                >
                    <PreRegistrationList />
                </Suspense>
            </div>
        </>
    );
}
