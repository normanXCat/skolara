"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import {
    IconAlphabetGreek,
    IconBook,
    IconSchool,
    IconBriefcase,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const levels = [
    {
        title: "Maternelle",
        age: "3 - 5 ans",
        description:
            "Un environnement bienveillant pour stimuler l'éveil, la créativité et les premières interactions sociales de votre enfant.",
        stats: "12 classes · 240 élèves",
        icon: <IconAlphabetGreek className="size-8" />,
        color: "text-rose-500",
        bg: "bg-rose-500/5",
        border: "border-rose-500/20",
    },
    {
        title: "Primaire",
        age: "6 - 10 ans",
        description:
            "L'acquisition des savoirs fondamentaux à travers une pédagogie active et un suivi personnalisé pour chaque élève.",
        stats: "20 classes · 500 élèves",
        icon: <IconBook className="size-8" />,
        color: "text-blue-500",
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
    },
    {
        title: "Collège",
        age: "11 - 14 ans",
        description:
            "Développement de l'autonomie, approfondissement des connaissances et exploration de nouveaux horizons disciplinaires.",
        stats: "12 classes · 360 élèves",
        icon: <IconSchool className="size-8" />,
        color: "text-emerald-500",
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20",
    },
    {
        title: "Lycée",
        age: "15 - 18 ans",
        description:
            "Vers l'excellence académique et la réussite aux examens nationaux. Orientation ciblée pour les études supérieures.",
        stats: "4 classes · 100 élèves",
        icon: <IconBriefcase className="size-8" />,
        color: "text-violet-500",
        bg: "bg-violet-500/5",
        border: "border-violet-500/20",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function SchoolLevels() {
    return (
        <WrapperSection className="py-24 md:py-32" id="niveaux">
            <div className="flex flex-col items-center mb-20 text-center">
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
                        Inscriptions
                    </Typography>
                    <Typography
                        variant="h2"
                        className="text-4xl md:text-5xl font-black"
                    >
                        Nos <span className="text-primary italic">cycles</span> d&apos;enseignement
                    </Typography>
                    <Typography
                        variant="body"
                        className="max-w-2xl text-muted-foreground mx-auto"
                    >
                        De l&apos;éveil à la réussite académique, nous accompagnons nos
                        élèves à chaque étape de leur développement intellectuel et
                        humain.
                    </Typography>
                </motion.div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {levels.map((level, index) => (
                    <motion.div
                        key={level.title}
                        variants={cardVariants}
                        className={cn(
                            "group relative flex flex-col p-8 rounded-[32px] border transition-all duration-500",
                            "bg-card/50 backdrop-blur-md hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2",
                            level.border
                        )}
                    >
                        {/* Glow effect on hover */}
                        <div className={cn(
                            "absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10",
                            level.bg
                        )} />

                        <div className={cn(
                            "mb-6 p-4 rounded-2xl w-fit transition-transform duration-500 group-hover:scale-110",
                            level.bg,
                            level.color
                        )}>
                            {level.icon}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <Typography variant="h3" className="text-2xl font-bold">
                                {level.title}
                            </Typography>
                            <span className="text-xs font-black uppercase tracking-tighter opacity-40">
                                {level.age}
                            </span>
                        </div>

                        <Typography
                            variant="body"
                            className="text-sm text-muted-foreground/80 mb-8 line-clamp-3"
                        >
                            {level.description}
                        </Typography>

                        <div className="mt-auto pt-6 border-t border-border/10 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                {level.stats}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </WrapperSection>
    );
}
