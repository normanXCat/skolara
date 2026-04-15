"use client";

import { type Variants, motion } from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { IconArrowRight, IconSchool } from "@tabler/icons-react";

/* ------------------------------------------------------------------ */
/*                         Constantes                                  */
/* ------------------------------------------------------------------ */

/** Nombre de rangées visibles dans la grille de fond. */
const GRID_ROWS = 5;

/** Mot répété dans chaque cellule de la grille. */
const GRID_WORD = "Skolara";

/* ------------------------------------------------------------------ */
/*                     Variantes d'animation                           */
/* ------------------------------------------------------------------ */

/** Animation en cascade pour les éléments du Hero. */
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

/** Animation de la grille de fond. */
const gridWordVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
        opacity: 1,
        transition: { delay: i * 0.08, duration: 0.8, ease: "easeOut" },
    }),
};

/* ------------------------------------------------------------------ */
/*                Sous-composant : SkolataGridBg                       */
/* ------------------------------------------------------------------ */

/**
 * Grille de fond avec le mot "Skolara" répété en large.
 *
 * Chaque cellule contient le mot avec un motif de hachures obliques
 * appliqué via un SVG pattern en tant que fill du texte.
 * Fonctionne parfaitement en dark et light mode.
 */
function SkolaraGridBg() {
    return (
        <div
            className="pointer-events-none absolute inset-0 overflow-hidden select-none"
            aria-hidden="true"
        >
            {/* Définition du pattern SVG pour les hachures obliques */}
            <svg className="absolute h-0 w-0">
                <defs>
                    {/* Hachures pour le mode clair */}
                    <pattern
                        id="diagonal-hatch-light"
                        patternUnits="userSpaceOnUse"
                        width="6"
                        height="6"
                        patternTransform="rotate(45)"
                    >
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="6"
                            stroke="oklch(0.66 0.19 250 / 0.4)"
                            strokeWidth="1.2"
                        />
                    </pattern>
                    {/* Hachures pour le mode sombre */}
                    <pattern
                        id="diagonal-hatch-dark"
                        patternUnits="userSpaceOnUse"
                        width="6"
                        height="6"
                        patternTransform="rotate(45)"
                    >
                        <line
                            x1="0"
                            y="0"
                            x2="0"
                            y2="6"
                            stroke="oklch(0.66 0.19 250 / 0.25)"
                            strokeWidth="1.5"
                        />
                    </pattern>
                </defs>
            </svg>

            {/* Grille de mots */}
            <div className="flex h-full flex-col justify-between overflow-hidden">
                {Array.from({ length: GRID_ROWS }).map((_, rowIdx) => (
                    <motion.div
                        key={rowIdx}
                        custom={rowIdx}
                        variants={gridWordVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative flex w-full items-center overflow-hidden border-b border-border/20 last:border-b-0"
                    >
                        {/* Le mot qui prend toute la largeur */}
                        <div
                            className="w-full text-center font-extrabold leading-none select-none overflow-hidden whitespace-nowrap"
                            style={{
                                fontSize: "clamp(5rem, 12vw, 14rem)",
                                letterSpacing: "-0.04em",
                            }}
                        >
                            <div className="relative w-full overflow-hidden">
                                {/* Couche 1 : contour/stroke du texte */}
                                <span
                                    className="absolute inset-0 flex items-center justify-center text-transparent opacity-40 dark:opacity-30"
                                    style={{
                                        fontSize: "inherit",
                                        letterSpacing: "inherit",
                                        fontWeight: "inherit",
                                        WebkitTextStroke:
                                            "1.5px oklch(0.66 0.19 250 / 0.2)",
                                    }}
                                >
                                    {GRID_WORD}
                                </span>

                                {/* Couche 2 : texte avec hachures obliques (SVG fill) */}
                                <svg
                                    className="block h-full w-full"
                                    viewBox="0 0 1200 180"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <text
                                        x="50%"
                                        y="50%"
                                        dominantBaseline="central"
                                        textAnchor="middle"
                                        className="fill-[url(#diagonal-hatch-light)] dark:fill-[url(#diagonal-hatch-dark)]"
                                        style={{
                                            fontSize: "180px",
                                            fontWeight: 800,
                                            fontFamily:
                                                "Inter, system-ui, sans-serif",
                                            letterSpacing: "-0.04em",
                                        }}
                                    >
                                        {GRID_WORD}
                                    </text>
                                </svg>
                            </div>
                        </div>

                        {/* Ligne de séparation horizontale (fine grille) */}
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
                    </motion.div>
                ))}
            </div>

            {/* Lignes verticales de la grille */}
            <div className="absolute inset-0 flex justify-between">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent"
                    />
                ))}
            </div>

            {/* Masque radial pour un fadeout doux aux bords */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*                     Composant principal                              */
/* ------------------------------------------------------------------ */

/**
 * Section Hero de la page d'accueil de Skolara.
 *
 * Propose un fond en grille avec le mot "Skolara" hachuré en oblique,
 * un titre accrocheur avec des animations Framer Motion en cascade,
 * et des boutons d'appel à l'action.
 *
 * @returns Élément JSX du Hero Section.
 */
export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] w-full items-center justify-center overflow-x-hidden bg-background flex">
            {/* ---- Fond : Grille Skolara ---- */}
            <SkolaraGridBg />

            {/* ---- Contenu Principal (Centré) ---- */}
            <WrapperSection className="relative z-10 w-full py-20 md:py-28 overflow-x-hidden">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                            <IconSchool className="size-4" />
                            Plateforme Éducative
                        </span>
                    </motion.div>

                    {/* Titre */}
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="display"
                            className="text-foreground"
                        >
                            L&apos;excellence éducative au service de
                            l&apos;avenir avec{" "}
                            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                                Skolara
                            </span>
                        </Typography>
                    </motion.div>

                    {/* Sous-titre */}
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="body"
                            className="max-w-xl text-muted-foreground"
                        >
                            Skolara accompagne les familles et les
                            établissements dans le parcours scolaire et
                            préscolaire. Calendrier, actualités et ressources
                            pédagogiques en un seul endroit.
                        </Typography>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center gap-4 sm:flex-row"
                    >
                        <ButtonReusable
                            variant="default"
                            size="lg"
                            rightIcon={<IconArrowRight className="size-5" />}
                        >
                            Commencer
                        </ButtonReusable>
                        <ButtonReusable variant="outline" size="lg">
                            En savoir plus
                        </ButtonReusable>
                    </motion.div>

                    {/* NOUVEL Indicateur de scroll Premium */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-12 flex flex-col items-center gap-2"
                    >
                        <Typography
                            variant="overline"
                            className="text-[10px] opacity-40"
                        >
                            Découvrir
                        </Typography>
                        <div className="relative flex h-12 w-6 justify-center">
                            {/* Ligne de traînée (Trail) */}
                            <div className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />

                            {/* Chevron Animé */}
                            <motion.div
                                animate={{
                                    y: [0, 24, 0],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute top-0 text-primary"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </WrapperSection>
        </section>
    );
}
