"use client";

import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { truncateWords } from "@/lib/text";

interface StrengthCardProps {
    index: number;
    title: string;
    description: string;
    gradient?: string;
    border?: string;
    className?: string;
    maxWords?: number;
}

/**
 * Composant de carte premium pour les points forts.
 * Design Glassmorphism avec effets de survol et accents de couleur.
 */
export function StrengthCard({
    index,
    title,
    description,
    gradient,
    border,
    className,
    maxWords = 20,
}: StrengthCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-[32px] border border-white/20 bg-card/40 p-10 shadow-2xl backdrop-blur-xl transition-all dark:border-white/10 dark:bg-white/5",
                className,
            )}
        >
            {/* BG Pattern Accent */}
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/5 blur-3xl" />

            {/* Top : Overline Label */}
            <div className="relative z-10 mb-4 flex items-center gap-2">
                <span className="h-px w-6 bg-primary/40" />
                <Typography
                    variant="overline"
                    className="text-[10px] opacity-70"
                >
                    Point Fort
                </Typography>
            </div>

            {/* Content : Title & Description */}
            <div className="relative z-10 flex grow flex-col gap-4">
                <Typography
                    variant="h3"
                    className="text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary"
                >
                    {title}
                </Typography>

                <Typography
                    variant="body"
                    as="p"
                    className="text-[14px] leading-relaxed text-muted-foreground/90 transition-colors group-hover:text-foreground/90"
                >
                    {truncateWords(description, maxWords)}
                </Typography>
            </div>
        </motion.div>
    );
}
