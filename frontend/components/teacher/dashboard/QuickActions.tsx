"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { IconBook, IconUserX, IconChevronRight } from "@tabler/icons-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function QuickActions() {
    const actions = [
        {
            title: "Saisir des notes",
            description: "Enregistrer les notes d'une évaluation pour vos classes.",
            href: "/teacher/grades",
            icon: IconBook,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            title: "Faire l'appel",
            description: "Marquer les présences et absences pour le cours actuel.",
            href: "/teacher/absences",
            icon: IconUserX,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
        },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            {actions.map((action, i) => (
                <motion.div key={i} variants={item}>
                    <Link
                        href={action.href}
                        className="group flex flex-col p-8 rounded-3xl bg-background/40 border border-border/40 backdrop-blur-xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden h-full"
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-start justify-between relative z-10">
                            <div className={`size-16 rounded-2xl ${action.bg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}>
                                <action.icon className={action.color} size={32} />
                            </div>
                            <div className="size-10 rounded-full bg-border/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500">
                                <IconChevronRight size={20} className="text-muted-foreground" />
                            </div>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <Typography variant="h3" className="text-2xl font-black mb-3 tracking-tight">
                                {action.title}
                            </Typography>
                            <Typography variant="body" className="text-muted-foreground leading-relaxed">
                                {action.description}
                            </Typography>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
