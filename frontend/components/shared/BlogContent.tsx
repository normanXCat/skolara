"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/lib/api-client";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { ArticleCard, Article } from "@/components/shared/ArticleCard";

export function BlogBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden text-[#94a3b8]">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    );
}

const ITEMS_PER_PAGE = 5;

export function BlogContent() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    // Référence pour le sentinel de scroll infini
    const observerTarget = useRef<HTMLDivElement>(null);

    const fetchArticles = useCallback(async (pageNum: number, isInitial = false) => {
        try {
            if (isInitial) setIsLoading(true);
            else setIsFetchingMore(true);

            const response = await api.get<Article[]>("/news/public", {
                params: {
                    page: pageNum,
                    limit: ITEMS_PER_PAGE
                }
            });

            if (response.success) {
                const newArticles = response.data;
                
                if (isInitial) {
                    setArticles(newArticles);
                } else {
                    setArticles(prev => [...prev, ...newArticles]);
                }
                
                // Si on a moins d'items que le limit, c'est qu'on est à la fin
                if (newArticles.length < ITEMS_PER_PAGE) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Failed to fetch articles", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    }, []);

    // Chargement initial
    useEffect(() => {
        fetchArticles(1, true);
    }, [fetchArticles]);

    // Observer pour le scroll infini
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading && !isFetchingMore) {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchArticles(nextPage);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, isLoading, isFetchingMore, page, fetchArticles]);

    const SkeletonItem = () => (
        <div className="relative mb-24 last:mb-0">
            {/* Skeleton Header: Date & Badge */}
            <div className="flex items-center gap-4 mb-6">
                <SkeletonReusable className="h-3.5 w-32" shape="full" />
                <div className="h-px flex-1 bg-border/20" />
                <SkeletonReusable className="h-5 w-20" shape="full" />
            </div>
            
            {/* Skeleton Title */}
            <div className="space-y-3 mb-8">
                <SkeletonReusable className="h-9 w-full" shape="rounded" />
                <SkeletonReusable className="h-9 w-3/4" shape="rounded" />
            </div>
            
            {/* Skeleton Image */}
            <div className="mb-10">
                <SkeletonReusable className="w-full h-48 rounded-3xl" shape="rounded" />
            </div>
            
            {/* Skeleton Content Lines */}
            <div className="space-y-4 opacity-50">
                <SkeletonReusable className="h-4 w-full" shape="full" />
                <SkeletonReusable className="h-4 w-[96%]" shape="full" />
                <SkeletonReusable className="h-4 w-[45%]" shape="full" />
            </div>
        </div>
    );

    return (
        <div className="relative bg-background text-foreground selection:bg-primary/30 min-h-screen">
            <BlogBackground />

            <div className="w-full max-w-7xl mx-auto px-6 pt-6 pb-20 lg:pt-10">
                <div className="relative">
                    <TracingBeam className="px-6 md:px-0">
                        <div className="max-w-3xl mx-auto antialiased pt-4 relative">
                        {isLoading ? (
                            <div className="space-y-24">
                                <SkeletonItem />
                                <SkeletonItem />
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="text-center py-20">
                                <Typography variant="h2" className="text-muted-foreground opacity-30">
                                    Aucun article publié pour le moment.
                                </Typography>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4">
                                    {articles.map((item, index) => (
                                        <ArticleCard key={`${item.id}-${index}`} item={item} index={index % ITEMS_PER_PAGE} />
                                    ))}
                                </div>

                                {/* Sentinel pour infinite scroll */}
                                <div ref={observerTarget} className="h-10 w-full" />

                                {/* Loading state au bas de la page */}
                                {isFetchingMore && (
                                    <div className="mt-10 animate-in fade-in duration-500">
                                        <SkeletonItem />
                                    </div>
                                )}

                                {!hasMore && articles.length > 0 && (
                                    <div className="mt-20 text-center opacity-30">
                                        <div className="h-px w-20 bg-foreground/20 mx-auto mb-4" />
                                        <p className="text-sm font-medium uppercase tracking-[0.2em]">Fin des actualités</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </TracingBeam>
            </div>
        </div>

        <style jsx global>{`
            .wysiwyg-content {
                word-wrap: break-word;
                overflow-wrap: break-word;
                word-break: break-word;
                max-width: 100%;
            }
            .wysiwyg-content p {
                margin-bottom: 1.5rem;
                line-height: 1.7;
            }
            .wysiwyg-content strong, .wysiwyg-content b {
                    font-weight: 800;
                    color: var(--foreground);
                }
                .wysiwyg-content em, .wysiwyg-content i {
                    font-style: italic;
                    color: var(--primary);
                }
                .wysiwyg-content blockquote {
                    border-left: 4px solid var(--primary);
                    padding-left: 1.5rem;
                    margin: 2rem 0;
                    font-style: italic;
                    color: var(--muted-foreground);
                }
                .wysiwyg-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 1rem;
                }
                .wysiwyg-content ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                .wysiwyg-content ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                .wysiwyg-content h2, .wysiwyg-content h3 {
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-weight: 800;
                    color: var(--foreground);
                }
            `}</style>
        </div>
    );
}
