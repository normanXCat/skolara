"use client";

import React from "react";
import { motion } from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import { IconTrophy, IconCircleCheck, IconStar } from "@tabler/icons-react";

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────

const figures = [
    {
        value: 1200,
        suffix: "+",
        label: "Élèves",
    },
    {
        value: 85,
        suffix: "",
        label: "Experts",
    },
    {
        value: 48,
        suffix: "",
        label: "Classes",
    },
    {
        value: 25,
        suffix: " ans",
        label: "Expansion",
    },
    {
        value: 97,
        suffix: "%",
        label: "Réussite",
    },
];

// ──────────────────────────────────────────────
// ANIMATED COUNTER
// ──────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = React.useState(0);
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    const duration = 2000;
                    const steps = 60;
                    const increment = value / steps;
                    let current = 0;
                    const interval = duration / steps;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            setCount(value);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, interval);
                }
            },
            { threshold: 0.3 },
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

// ──────────────────────────────────────────────
// SECTION PRINCIPALE
// ──────────────────────────────────────────────

export default function KeyFigures() {
    return (
        <WrapperSection
            className="relative overflow-hidden py-32"
            id="chiffres-cles"
        >
            {/* ── BACKGROUND UNIQUE : "The Dark Horizon" ── */}
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                {/* Couche de base sombre / profonde */}
                <div className="absolute inset-0 bg-background" />

                {/* Lueur radiale centrale asymétrique */}
                <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[160px]" />

                {/* Ligne laser diagonale */}
                <div className="absolute left-0 top-1/2 h-px w-full -rotate-12 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

                {/* Effet de grain / bruit pour le côté premium "Editorial" */}
                <div
                    className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            'url("https://grainy-gradients.vercel.app/noise.svg")',
                    }}
                />
            </div>

            {/* ── CONTENU ── */}
            <div className="relative">
                {/* Header stylisé (different de la section précédente) */}
                <div className="mb-20 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-primary"
                        >
                            <IconStar className="size-4" />
                            <Typography
                                variant="overline"
                                className="text-primary"
                            >
                                Performance & Résultats
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Typography
                                variant="h2"
                                className="text-5xl font-black md:text-6xl"
                            >
                                L&apos;excellence en{" "}
                                <span className="text-primary italic">
                                    mouvement
                                </span>
                            </Typography>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="max-w-xs"
                    >
                        <Typography
                            variant="body"
                            className="text-base text-muted-foreground/80"
                        >
                            Notre engagement se reflète dans chaque indicateur
                            de performance de notre communauté éducative.
                        </Typography>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* GAUCHE : Grand Dashboard Stat (Design différent) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="col-span-1 lg:col-span-4"
                    >
                        <div className="relative h-full overflow-hidden rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-10 backdrop-blur-xl">
                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />

                            <div className="relative z-10 flex h-full flex-col justify-between gap-12">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                                    <IconTrophy className="size-8" />
                                </div>

                                <div className="space-y-2">
                                    <div className="text-7xl font-black tracking-tighter text-primary">
                                        <AnimatedCounter
                                            value={97}
                                            suffix="%"
                                        />
                                    </div>
                                    <Typography
                                        variant="h3"
                                        className="text-2xl font-bold"
                                    >
                                        Taux de réussite
                                    </Typography>
                                    <Typography
                                        variant="body"
                                        className="text-sm"
                                    >
                                        Moyenne record sur les 5 dernières
                                        promotions nationales.
                                    </Typography>
                                </div>

                                <div className="flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 py-2 pl-3 pr-4 text-xs font-semibold text-primary">
                                    <IconCircleCheck className="size-4" />
                                    Certification Excellence 2024
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* DROITE : Grille de chiffres minimaliste */}
                    <div className="col-span-1 grid grid-cols-2 gap-4 lg:col-span-8 lg:grid-cols-4">
                        {figures
                            .filter((f) => f.label !== "Réussite")
                            .map((figure, index) => (
                                <motion.div
                                    key={figure.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative flex flex-col items-start justify-between rounded-[32px] border border-white/5 bg-white/[0.01] p-8 transition-all hover:bg-white/[0.04]"
                                >
                                    <div className="text-4xl font-black tracking-tight text-foreground transition-transform group-hover:scale-110">
                                        <AnimatedCounter
                                            value={figure.value}
                                            suffix={figure.suffix}
                                        />
                                    </div>
                                    <div className="mt-8">
                                        <Typography
                                            variant="caption"
                                            className="font-bold uppercase tracking-widest text-muted-foreground/50"
                                        >
                                            {figure.label}
                                        </Typography>
                                        <div className="mt-2 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-8" />
                                    </div>
                                </motion.div>
                            ))}

                        {/* Une carte d'action ou de vision pour completer la grille */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group col-span-2 flex flex-col justify-center rounded-[32px] border border-primary/20 bg-primary/5 p-8 transition-all hover:bg-primary/10"
                        >
                            <Typography
                                variant="h4"
                                className="text-xl font-bold text-primary"
                            >
                                Vision 2030
                            </Typography>
                            <Typography
                                variant="body"
                                className="mt-2 text-sm text-primary/80"
                            >
                                Vers une intégration complète du numérique et de
                                l&apos;IA dans notre cursus scolaire.
                            </Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
        </WrapperSection>
    );
}
