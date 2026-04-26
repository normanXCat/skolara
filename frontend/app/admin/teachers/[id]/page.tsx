import { serverFetch } from "@/lib/server-api";
import { redirect } from "next/navigation";
import { TeacherDetailClient } from "@/components/admin/teachers/TeacherDetailClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const res = await serverFetch<any>(`/admin/teachers/${id}`);

    if (res.success) {
        return {
            title: `${res.data.user.firstName} ${res.data.user.name} | Profil Enseignant`,
            description: `Gestion du profil et des cours de ${res.data.user.firstName} ${res.data.user.name}`,
        };
    }

    return { title: "Profil Enseignant | Skolara" };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const response = await serverFetch<any>(`/admin/teachers/${id}`);

    if (!response.success) {
        if (response.error === "Session expirée") redirect("/login");
        redirect("/admin/teachers");
    }

    return (
        <>
            {/* Ambient Background Effect */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />
            
            <div className="relative z-10">
                <TeacherDetailClient teacher={response.data} />
            </div>
        </>
    );
}
