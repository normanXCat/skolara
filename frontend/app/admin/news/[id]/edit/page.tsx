"use client";

import { ArticleForm } from "@/components/admin/news/ArticleForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";

export default function EditArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/news/admin/${id}`);
                if (response.success) {
                    setArticle(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch article", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchArticle();
    }, [id]);

    if (isLoading) {
        return <SkeletonReusable className="h-[600px] w-full rounded-[3rem]" />;
    }

    if (!article) {
        return <div>Article non trouvé.</div>;
    }

    return (
        <>
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(var(--primary),0.1),rgba(255,255,255,0))] pointer-events-none z-0" />
            <div className="relative z-10 pb-20">
                <ArticleForm isEdit initialData={article} />
            </div>
        </>
    );
}
