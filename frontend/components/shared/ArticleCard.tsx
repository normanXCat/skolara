"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Article {
    id: number;
    title: string;
    content: string;
    imageUrl: string | null;
    category: string | null;
    publishedAt: string | null;
}

interface ArticleCardProps {
    item: Article;
    index: number;
}

export function ArticleCard({ item, index }: ArticleCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    // Décoder l'HTML une seule fois
    const fullHtml = new DOMParser().parseFromString(item.content, 'text/html').body.innerHTML.replace(/\u00A0/g, " ");
    
    // Calculer si le contenu est long
    const textContent = new DOMParser().parseFromString(item.content, 'text/html').body.textContent || "";
    const isLongContent = textContent.length > 250;

    return (
        <motion.article
            key={item.id}
            className="mb-24 relative group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.7,
                delay: index * 0.1,
            }}
        >
            {/* Date and Badge */}
            <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-black text-muted-foreground/60 uppercase tracking-widest">
                    {item.publishedAt
                        ? format(new Date(item.publishedAt), "dd MMMM yyyy", { locale: fr })
                        : "Récemment"}
                </span>
                <div className="h-px flex-1 bg-border/50" />
                {item.category && (
                    <span className="bg-primary/5 text-primary border border-primary/20 rounded-full text-[10px] px-3 py-1 font-black uppercase tracking-wider">
                        {item.category}
                    </span>
                )}
            </div>

            <Typography
                variant="h2"
                className="mb-8 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight"
            >
                {item.title}
            </Typography>

            {item.imageUrl && !imageError && (
                <div className="relative aspect-video mb-10 overflow-hidden rounded-3xl border border-white/10 shadow-2xl group-hover:shadow-primary/5 transition-all duration-500 bg-muted/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10" />
                    
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => setImageError(true)}
                        className={cn(
                            "object-cover w-full h-full scale-105 group-hover:scale-100 transition-all duration-700",
                            isImageLoading ? "opacity-0" : "opacity-100"
                        )}
                    />
                </div>
            )}

            <div className="text-lg leading-relaxed text-muted-foreground/90 font-medium break-words overflow-hidden">
                <div className={cn(
                    "wysiwyg-content transition-all duration-500",
                    !isExpanded && isLongContent && "line-clamp-4"
                )}>
                    <div dangerouslySetInnerHTML={{ __html: fullHtml }} />
                </div>
            </div>

            {isLongContent && (
                <div className="mt-10">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary font-black uppercase text-xs tracking-widest flex items-center gap-2 group/btn"
                    >
                        {isExpanded ? "Réduire" : "Lire la suite"}
                        <span className={cn(
                            "w-8 h-px bg-primary/30 group-hover/btn:w-12 transition-all duration-300",
                            isExpanded && "w-12"
                        )} />
                    </button>
                </div>
            )}
        </motion.article>
    );
}
