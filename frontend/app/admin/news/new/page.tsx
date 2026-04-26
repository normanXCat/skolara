import { ArticleForm } from "@/components/admin/news/ArticleForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nouvel Article | Skolara Admin",
    description: "Créer un nouvel article pour le blog de l'académie Skolara.",
};


export default function NewArticlePage() {
    return (
        <>
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />
            <div className="relative z-10 pb-20">
                <ArticleForm />
            </div>
        </>
    );
}
