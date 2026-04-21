import PreRegistrationDetailClient from "@/components/admin/pre-registrations/PreRegistrationDetailClient";
import { Metadata } from "next";

interface Props {
    params: { id: string };
}

/**
 * Metadata pour le SEO et le titre de la page (Côté Serveur)
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    return {
        title: `Dossier #${id} | Skolara Admin`,
        description: "Traitement et validation des dossiers de pré-inscription",
    };
}

export default async function PreRegistrationDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <>
            {/* Ambient Background Effect */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

            <div className="relative z-10 pb-20">
                <PreRegistrationDetailClient id={id} />
            </div>
        </>
    );
}
