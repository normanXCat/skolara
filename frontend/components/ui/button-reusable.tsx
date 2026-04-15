"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { IconLoader2 } from "@tabler/icons-react";

/**
 * Propriétés du composant ButtonReusable.
 *
 * @property {React.ReactNode} [leftIcon] - Icône affichée à gauche du libellé.
 * @property {React.ReactNode} [rightIcon] - Icône affichée à droite du libellé.
 * @property {boolean} [isLoading] - Affiche un indicateur de chargement et désactive le bouton.
 * @property {string} [loadingText] - Texte affiché pendant le chargement.
 */
interface ButtonReusableProps
    extends
        Omit<HTMLMotionProps<"button">, "children">,
        VariantProps<typeof buttonVariants> {
    /** Lien de redirection (si présent, le bouton devient un lien). */
    href?: string;
    /** Contenu textuel ou enfants du bouton. */
    children: React.ReactNode;
    /** Icône affichée avant le texte. */
    leftIcon?: React.ReactNode;
    /** Icône affichée après le texte. */
    rightIcon?: React.ReactNode;
    /** Active l'état de chargement (spinner + désactivation). */
    isLoading?: boolean;
    /** Texte alternatif affiché durant le chargement. */
    loadingText?: string;
    /** Utilise un élément enfant comme racine (composition pattern). */
    asChild?: boolean;
}

/**
 * Bouton réutilisable avec support d'icônes, état de chargement et animations Framer Motion.
 *
 * Ce composant encapsule les variantes du `Button` de base et y ajoute :
 * - Des emplacements pour icônes gauche/droite.
 * - Un état de chargement avec spinner animé.
 * - Des animations de survol et de clic via Framer Motion.
 *
 * @example
 * ```tsx
 * <ButtonReusable variant="default" leftIcon={<IconSearch />}>
 *   Rechercher
 * </ButtonReusable>
 *
 * <ButtonReusable variant="outline" isLoading loadingText="Envoi...">
 *   Envoyer
 * </ButtonReusable>
 * ```
 *
 * @param props - Propriétés du composant.
 * @returns Élément JSX du bouton animé.
 */
const ButtonReusable = React.forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonReusableProps
>(
    (
        {
            className,
            variant = "default",
            size = "default",
            children,
            leftIcon,
            rightIcon,
            isLoading = false,
            loadingText,
            disabled,
            href,
            ...props
        },
        ref,
    ) => {
        const Comp = href ? (motion.a as any) : motion.button;

        return (
            <Comp
                ref={ref}
                href={href}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                disabled={disabled || isLoading}
                className={cn(
                    buttonVariants({ variant, size }),
                    "relative overflow-hidden cursor-pointer rounded-full font-bold bg-transparent hover:bg-transparent transition-none", // Force transparence
                    "flex items-center justify-center gap-2.5 outline-none",
                    // Padding adapté
                    !size?.includes("icon") &&
                        "px-7 py-2.5 md:px-8 md:py-3 h-auto",
                    className,
                )}
                {...props}
            >
                {/* 1. Fond de base (Isolation totale) */}
                <motion.div
                    className={cn(
                        "absolute inset-0 -z-30 rounded-full",
                        variant === "default" && "bg-primary",
                        variant === "secondary" && "bg-secondary",
                        variant === "outline" && "border-2 border-primary/20",
                        variant === "ghost" && "bg-transparent",
                    )}
                />

                {/* 2. LASER BORDER ROTATIF (Bleu lumineux sur Primary) */}
                <motion.div
                    className={cn(
                        "absolute inset-[-150%] -z-20 opacity-0 pointer-events-none",
                        variant === "default"
                            ? "bg-[conic-gradient(from_0deg,transparent_0deg,#7dd3fc_30deg,#38bdf8_60deg,transparent_100deg)]"
                            : "bg-[conic-gradient(from_0deg,transparent_0deg,var(--primary)_40deg,transparent_100deg)]",
                    )}
                    variants={{
                        hover: {
                            rotate: [0, 360],
                            opacity: 1,
                            transition: {
                                rotate: {
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                                opacity: { duration: 0.2 },
                            },
                        },
                        initial: { opacity: 0 },
                    }}
                />

                {/* 3. MASQUE INTERNE (Contrôle le width : 1.5px) */}
                <div
                    className={cn(
                        "absolute inset-[1.5px] -z-10 rounded-full",
                        variant === "default" ? "bg-primary" : "bg-background",
                    )}
                />

                {/* 4. Effet de Balayage (Sheen) */}
                <motion.div
                    className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    variants={{
                        initial: { x: "-100%", skewX: -20 },
                        hover: {
                            x: "100%",
                            transition: { duration: 0.8, ease: "easeInOut" },
                        },
                    }}
                />

                {/* Contenu */}
                <div className="relative z-10 flex items-center gap-2.5">
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    ease: "linear",
                                }}
                                className="flex"
                            >
                                <IconLoader2 className="size-5" />
                            </motion.span>
                            {loadingText && (
                                <span className="animate-pulse">
                                    {loadingText}
                                </span>
                            )}
                        </div>
                    ) : (
                        <>
                            {leftIcon && (
                                <motion.span
                                    variants={{ hover: { x: -2 } }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    {leftIcon}
                                </motion.span>
                            )}
                            <span className="tracking-tight">{children}</span>
                            {rightIcon && (
                                <motion.span
                                    variants={{ hover: { x: 2 } }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    {rightIcon}
                                </motion.span>
                            )}
                        </>
                    )}
                </div>

                {/* 5. GLOUE EXTERNE */}
                {variant === "default" && (
                    <motion.div
                        className="absolute inset-0 -z-40 rounded-full bg-accent/15 blur-xl opacity-0"
                        variants={{
                            initial: { opacity: 0, scale: 0.9 },
                            hover: { opacity: 0.5, scale: 1.15 },
                        }}
                    />
                )}
            </Comp>
        );
    },
);

ButtonReusable.displayName = "ButtonReusable";

export { ButtonReusable, type ButtonReusableProps };
