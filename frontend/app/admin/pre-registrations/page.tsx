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
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight">
                        Pré-inscriptions
                    </h1>
                    <p className="text-muted-foreground">
                        Gérez et validez les nouveaux dossiers d'inscription.
                    </p>
                </div>

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
