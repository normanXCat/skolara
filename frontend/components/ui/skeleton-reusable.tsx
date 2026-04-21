"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonReusableProps {
    /** Classes Tailwind supplémentaires */
    className?: string;
    /** Type d'animation : 'shimmer' (balayage lumineux), 'pulse' (battement), 'primary' (shimmer coloré) */
    variant?: "shimmer" | "pulse" | "primary" | "none";
    /** Forme du skeleton */
    shape?: "circle" | "rounded" | "full" | "square" | "none";
    /** Largeur personnalisée (ex: '100%', 200) */
    width?: string | number;
    /** Hauteur personnalisée */
    height?: string | number;
}

/**
 * Skeleton Premium réutilisable (UI/UX Pro Max)
 * Offre un effet de balayage fluide et des formes prédéfinies.
 */
export const SkeletonReusable = ({
    className,
    variant = "shimmer",
    shape = "rounded",
    width,
    height,
}: SkeletonReusableProps) => {
    // Formes prédéfinies
    const shapeStyles = {
        circle: "rounded-full",
        rounded: "rounded-2xl",
        full: "rounded-full",
        square: "rounded-none",
        none: "",
    };

    // Style de base
    const baseClasses = cn(
        "relative overflow-hidden transition-all duration-300",
        variant === "primary" ? "bg-primary/10" : "bg-muted/40",
        shapeStyles[shape],
        variant === "pulse" && "animate-pulse",
        className,
    );

    const style = {
        width: width ?? "100%",
        height: height ?? "1rem",
    };

    return (
        <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className={baseClasses}
            style={style}
        >
            {(variant === "shimmer" || variant === "primary") && (
                <motion.div
                    className="absolute inset-0 z-10"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                    }}
                    style={{
                        background:
                            variant === "primary"
                                ? "linear-gradient(90deg, transparent, oklch(var(--primary) / 0.1), transparent)"
                                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                    }}
                />
            )}

            {/* Effet d'éclat additionnel pour le mode sombre */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        </motion.div>
    );
};

export default SkeletonReusable;
