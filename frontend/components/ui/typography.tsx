"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Variantes typographiques disponibles.
 *
 * Chaque variante correspond à un style visuel et un élément HTML par défaut.
 */
const typographyVariants = {
    display: {
        className:
            "text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05]",
        tag: "h1" as const,
    },
    h1: {
        className:
            "text-4xl md:text-5xl font-bold tracking-tight leading-tight",
        tag: "h1" as const,
    },
    h2: {
        className:
            "text-3xl md:text-4xl font-bold tracking-tight leading-tight",
        tag: "h2" as const,
    },
    h3: {
        className: "text-2xl md:text-3xl font-semibold tracking-tight",
        tag: "h3" as const,
    },
    h4: {
        className: "text-xl md:text-2xl font-semibold tracking-tight",
        tag: "h4" as const,
    },
    body: {
        className: "text-base md:text-lg text-muted-foreground leading-relaxed",
        tag: "p" as const,
    },
    caption: {
        className: "text-sm text-muted-foreground",
        tag: "span" as const,
    },
    overline: {
        className:
            "text-xs md:text-sm font-semibold uppercase tracking-widest text-primary",
        tag: "span" as const,
    },
};

type TypographyVariant = keyof typeof typographyVariants;

/**
 * Propriétés du composant Typography.
 *
 * @property {TypographyVariant} variant - Style typographique à appliquer.
 * @property {React.ElementType} [as] - Remplacer l'élément HTML par défaut.
 * @property {string} [className] - Classes CSS additionnelles.
 * @property {React.ReactNode} children - Contenu textuel.
 */
interface TypographyProps {
    variant?: TypographyVariant;
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}

/**
 * Composant Typography réutilisable.
 *
 * Fournit un système typographique cohérent à travers l'application
 * avec des variantes prédéfinies (`display`, `h1`–`h4`, `body`, `caption`, `overline`).
 *
 * @example
 * ```tsx
 * <Typography variant="display">Skolara</Typography>
 * <Typography variant="body">Description du projet.</Typography>
 * <Typography variant="overline">PLATEFORME ÉDUCATIVE</Typography>
 * ```
 *
 * @param props - Propriétés du composant.
 * @returns Élément JSX typographique.
 */
export function Typography({
    variant = "body",
    as,
    className,
    children,
    ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
    const config = typographyVariants[variant];
    const Component = as || config.tag;

    return (
        <Component className={cn(config.className, className)} {...props}>
            {children}
        </Component>
    );
}

export { typographyVariants, type TypographyVariant, type TypographyProps };
