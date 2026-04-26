"use client";

import React from "react";
import { motion } from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import {
    IconTrophy,
    IconHeart,
    IconUsers,
    IconLamp,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const values = [
    {
        title: "Excellence Académique",
        description:
            "Nous visons les plus hauts standards de réussite pour nos élèves, en leur fournissant les outils nécessaires pour exceller dans un monde en constante évolution.",
        icon: <IconTrophy className="size-12" />,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
    },
    {
        title: "Bienveillance & Écoute",
        description:
            "Le bien-être de l'élève est au cœur de notre démarche. Nous cultivons un environnement sécurisant où chaque voix est entendue et respectée.",
        icon: <IconHeart className="size-12" />,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
    },
    {
        title: "Innovation Pédagogique",
        description:
            "Nous intégrons les dernières technologies et méthodes d'apprentissage pour stimuler la curiosité et favoriser l'esprit critique de nos apprenants.",
        icon: <IconLamp className="size-12" />,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        title: "Esprit de Communauté",
        description:
            "La collaboration entre élèves, parents et enseignants est le socle de notre réussite. Ensemble, nous bâtissons les citoyens de demain.",
        icon: <IconUsers className="size-12" />,
        color: "text-violet-500",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
    },
];

export default function SchoolValues() {
    return (
        <WrapperSection className="py-24 md:py-32" id="valeurs">
            <div className="flex flex-col items-center mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <Typography
                        variant="overline"
                        className="text-primary font-bold uppercase tracking-widest"
                    >
                        Philosophie
                    </Typography>
                    <Typography
                        variant="h2"
                        className="text-4xl md:text-5xl font-black"
                    >
                        Les <span className="text-primary italic">valeurs</span> qui nous animent
                    </Typography>
                    <Typography
                        variant="body"
                        className="max-w-2xl text-muted-foreground mx-auto"
                    >
                        Plus qu&apos;une école, un lieu de vie et d&apos;épanouissement
                        fondé sur des principes solides pour forger le futur de
                        nos enfants.
                    </Typography>
                </motion.div>
            </div>

            <div className="flex flex-col gap-20 md:gap-32">
                {values.map((value, index) => (
                    <motion.div
                        key={value.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className={cn(
                            "flex flex-col md:flex-row items-center gap-12",
                            index % 2 !== 0 && "md:flex-row-reverse"
                        )}
                    >
                        {/* Illustration / Icon Container */}
                        <div className="flex-1 w-full flex justify-center">
                            <div className={cn(
                                "relative size-48 md:size-64 flex items-center justify-center rounded-[48px] border-2 rotate-3 hover:rotate-0 transition-transform duration-500",
                                value.bg,
                                value.border
                            )}>
                                {/* Decorative Blobs */}
                                <div className={cn(
                                    "absolute -inset-4 blur-3xl opacity-20 -z-10 rounded-full",
                                    value.bg
                                )} />
                                
                                <div className={cn("transition-transform duration-500 hover:scale-110", value.color)}>
                                    {value.icon}
                                </div>

                                {/* Index Number */}
                                <div className="absolute -top-4 -right-4 size-12 rounded-2xl bg-background border flex items-center justify-center shadow-xl">
                                    <span className="text-lg font-black text-foreground">0{index + 1}</span>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <Typography variant="h3" className="text-3xl md:text-4xl font-black tracking-tight">
                                {value.title}
                            </Typography>
                            <Typography
                                variant="body"
                                className={cn(
                                    "text-lg leading-relaxed text-muted-foreground/80 max-w-lg",
                                    index % 2 !== 0 ? "md:mr-0 md:ml-auto" : ""
                                )}
                            >
                                {value.description}
                            </Typography>
                            <div className={cn(
                                "h-1 w-20 bg-primary/20 rounded-full mx-auto md:mx-0",
                                index % 2 !== 0 && "md:ml-auto md:mr-0"
                            )} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </WrapperSection>
    );
}
