"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import WrapperSection from "@/components/wrapper-section";
import { Typography } from "@/components/ui/typography";
import {
    ADMIN_NAVIGATION_LINKS,
    TEACHER_NAVIGATION_LINKS,
    STUDENT_NAVIGATION_LINKS,
    PARENT_NAVIGATION_LINKS,
    NAVIGATION_LINKS,
} from "@/config/navigation";
import {
    IconLayoutDashboard,
    IconSchool,
    IconUsers,
    IconDoor,
    IconCalendarTime,
    IconFileCertificate,
    IconUserX,
    IconFileAnalytics,
    IconCreditCard,
    IconClipboardList,
    IconMessages,
    IconSettings,
    IconBook,
    IconNews,
    IconCalendar,
    IconArrowRight,
    IconCompass,
    IconShieldLock,
    IconChalkboard,
    IconBackpack,
    IconUsersGroup,
    IconChevronDown,
    IconChevronUp,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, any> = {
    IconDashboard: IconLayoutDashboard,
    IconSchool: IconSchool,
    IconUsers: IconUsers,
    IconDoor: IconDoor,
    IconCalendarTime: IconCalendarTime,
    IconFileCertificate: IconFileCertificate,
    IconUserX: IconUserX,
    IconFileAnalytics: IconFileAnalytics,
    IconCreditCard: IconCreditCard,
    IconClipboardList: IconClipboardList,
    IconMessages: IconMessages,
    IconSettings: IconSettings,
    IconBook: IconBook,
    IconNews: IconNews,
    IconCalendar: IconCalendar,
};

const SECTIONS = [
    {
        title: "Site Public",
        icon: <IconCompass className="size-6 text-primary" />,
        links: NAVIGATION_LINKS.map(link => ({ ...link, icon: undefined })),
    },
    {
        title: "Administration",
        icon: <IconShieldLock className="size-6 text-emerald-500" />,
        links: ADMIN_NAVIGATION_LINKS,
    },
    {
        title: "Espace Enseignant",
        icon: <IconChalkboard className="size-6 text-blue-500" />,
        links: TEACHER_NAVIGATION_LINKS,
    },
    {
        title: "Espace Élève",
        icon: <IconBackpack className="size-6 text-indigo-500" />,
        links: STUDENT_NAVIGATION_LINKS,
    },
    {
        title: "Espace Parent",
        icon: <IconUsersGroup className="size-6 text-fuchsia-500" />,
        links: PARENT_NAVIGATION_LINKS,
    },
];

function SectionCard({ section, idx }: { section: any; idx: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasMore = section.links.length > 5;
    const displayedLinks = isExpanded ? section.links : section.links.slice(0, 5);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group flex flex-col rounded-3xl border border-border/50 bg-card/30 backdrop-blur-xl p-8 shadow-sm transition-all hover:bg-card/50 hover:shadow-md hover:border-primary/20 h-max"
        >
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-xs border border-border/50 group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                </div>
                <Typography variant="h3" className="text-xl font-bold tracking-tight">
                    {section.title}
                </Typography>
            </div>

            <motion.ul layout className="flex flex-col gap-4 flex-1 overflow-hidden">
                <AnimatePresence initial={false}>
                    {displayedLinks.map((link: any) => {
                        const IconComp = link.icon ? ICON_MAP[link.icon] : null;

                        return (
                            <motion.li 
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                key={link.href + link.label} 
                                className="flex flex-col gap-2 overflow-hidden"
                            >
                                <Link 
                                    href={(link as any).disabled ? "#" : link.href} 
                                    onClick={(e) => {
                                        if ((link as any).disabled) e.preventDefault();
                                    }}
                                    className={cn(
                                        "group/link flex items-center gap-3 transition-colors",
                                        (link as any).disabled 
                                            ? "pointer-events-none opacity-40 grayscale" 
                                            : "hover:text-primary"
                                    )}
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-muted-foreground transition-colors group-hover/link:bg-primary/10 group-hover/link:text-primary">
                                        {IconComp ? <IconComp className="size-4" strokeWidth={2} /> : <div className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />}
                                    </div>
                                    <span className="text-sm font-semibold text-foreground/80 group-hover/link:text-primary transition-colors">
                                        {link.label}
                                    </span>
                                    {!(link as any).disabled && (
                                        <IconArrowRight className="size-3.5 ml-auto shrink-0 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-primary" />
                                    )}
                                </Link>

                                {/* Sublinks */}
                                {link.subLinks && link.subLinks.length > 0 && !(link as any).disabled && (
                                    <ul className="ml-11 space-y-2 border-l-2 border-border/30 pl-4 py-1">
                                        {link.subLinks.map((sub: any, subIdx: number) => (
                                            <li key={sub.href + subIdx}>
                                                <Link 
                                                    href={sub.href}
                                                    className="flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors py-1"
                                                >
                                                    <span className="w-2 h-px bg-border/50 mr-2 shrink-0" />
                                                    {sub.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
            </motion.ul>

            {hasMore && (
                <motion.button 
                    layout
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 py-2.5 rounded-xl transition-colors w-full"
                >
                    {isExpanded ? "Voir moins" : `Voir plus (${section.links.length - 5})`}
                    {isExpanded ? <IconChevronUp className="size-4" strokeWidth={3} /> : <IconChevronDown className="size-4" strokeWidth={3} />}
                </motion.button>
            )}
        </motion.div>
    );
}

export default function SitemapClient() {
    return (
        <WrapperSection className="py-24 relative overflow-hidden min-h-screen">
            {/* Background embellishments */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

            {/* Header */}
            <div className="max-w-2xl text-center mx-auto mb-20 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="caption" className="text-primary font-bold uppercase tracking-[0.25em] mb-4 block">
                        Navigation Globale
                    </Typography>
                    <Typography variant="h1" className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        Plan du <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Site</span>
                    </Typography>
                    <Typography variant="body" className="text-lg text-muted-foreground leading-relaxed">
                        Accédez rapidement à l&apos;ensemble des portails et des fonctionnalités de la plateforme éducative Skolara.
                    </Typography>
                </motion.div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
                {SECTIONS.map((section, idx) => (
                    <SectionCard key={section.title} section={section} idx={idx} />
                ))}
            </div>
        </WrapperSection>
    );
}

