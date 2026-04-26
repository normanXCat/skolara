import { ArticleList } from "@/components/admin/news/ArticleList";
import { Suspense } from "react";

export const metadata = {
    title: "News & Blog | Skolara Admin",
    description: "Gérez les articles et actualités de l'académie",
};

export default function AdminNewsPage() {
    return (
        <div className="relative z-10 space-y-12 pb-20">
            <Suspense fallback={<div className="h-[500px] w-full bg-muted/20 animate-pulse rounded-[2.5rem]" />}>
                <ArticleList />
            </Suspense>
        </div>
    );
}
