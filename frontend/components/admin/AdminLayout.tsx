"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/lib/api-client";
import { ADMIN_NAVIGATION_LINKS } from "@/config/navigation";
import InputReusable from "@/components/ui/input-reusable";
import { AdminSidebar } from "./AdminSidebar";
import { motion } from "framer-motion";
import {
    IconUserCircle,
    IconSearch,
    IconCertificate,
} from "@tabler/icons-react";
import SectionDivider from "../ui/section-divider";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const ROLE_TRANSLATIONS: Record<string, string> = {
    ADMIN: "Administrateur",
    TEACHER: "Enseignant",
    STUDENT: "Élève",
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await api.get<any>("/auth/me");
            if (res.success) {
                setUser(res.data);
            }
        };
        fetchUser();
    }, []);

    // Trouver le titre de la page courante
    const currentLink = ADMIN_NAVIGATION_LINKS.find(
        (link) => link.href === pathname,
    );
    const pageTitle = currentLink ? currentLink.label : "Tableau de bord";
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background p-4 gap-4 relative">
            {/* Global Background Pattern - Distinct Grid */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <AdminSidebar />

            <div className="flex flex-1 flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-background/80 backdrop-blur-3xl shadow-2xl relative">
                {/* Professional Editorial Grid Background - Top Right */}
                <div className="absolute top-0 right-0 -z-10 pointer-events-none overflow-hidden w-[600px] h-[500px] [mask-image:linear-gradient(to_bottom,black_20%,transparent),linear-gradient(to_left,black_20%,transparent)] [mask-composite:intersect] dark:opacity-30">
                    {/* Architectural Base Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(from_var(--primary)_l_c_h_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(from_var(--primary)_l_c_h_/_0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(from_var(--primary)_l_c_h_/_0.02)_1px,transparent_1px),linear-gradient(to_bottom,oklch(from_var(--primary)_l_c_h_/_0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    {/* Intersection Markers (+) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, oklch(from var(--primary) l c h / 0.2) 1px, transparent 1px)",
                            backgroundSize: "100px 100px",
                            backgroundPosition: "-0.5px -0.5px",
                        }}
                    />

                    {/* Floating Data Beams */}
                    <motion.div
                        className="absolute top-20 right-0 w-32 h-[1px] bg-primary/20"
                        animate={{ x: [0, -400, 0], opacity: [0, 1, 0] }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute top-0 right-[200px] w-[1px] h-32 bg-primary/20"
                        animate={{ y: [0, 300, 0], opacity: [0, 1, 0] }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Soft Corner Lighting */}
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
                </div>

                {/* Header */}
                <header className="flex shrink-0 items-center justify-between px-8 pt-4 z-30">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-xl font-black text-foreground tracking-tight">
                                {pageTitle}
                            </p>
                        </div>

                        {/* Barre de recherche globale Reusable */}
                        <InputReusable
                            id="global-search"
                            placeholder="Rechercher..."
                            icon={IconSearch}
                            className="hidden md:flex !gap-0 w-64"
                            iconSize={18}
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                                {user ? (
                                    <span className="text-sm font-bold truncate max-w-[150px]">
                                        {user.firstName} {user.name}
                                    </span>
                                ) : (
                                    <SkeletonReusable
                                        width={100}
                                        height={14}
                                        className="mb-1"
                                    />
                                )}
                                {user ? (
                                    <span className="text-[10px] uppercase font-black text-primary px-2 py-0.5 rounded-lg bg-primary/10 border border-primary/20">
                                        {ROLE_TRANSLATIONS[user.role] ||
                                            user.role}
                                    </span>
                                ) : (
                                    <SkeletonReusable
                                        width={60}
                                        height={16}
                                        className="rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm transition-all hover:scale-110 hover:shadow-primary/20 cursor-pointer overflow-hidden backdrop-blur-sm">
                                <IconUserCircle size={32} />
                            </div>
                        </div>
                    </div>
                </header>
                <SectionDivider className="py-4" />
                {/* Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="max-w-7xl mx-auto"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
