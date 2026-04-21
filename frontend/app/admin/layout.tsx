"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ADMIN_NAVIGATION_LINKS } from "@/config/navigation";
import InputReusable from "@/components/ui/input-reusable";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { IconUserCircle, IconSearch } from "@tabler/icons-react";
import SectionDivider from "@/components/ui/section-divider";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { useAuthStore } from "@/stores/auth-store";
import { translateRole } from "@/lib/roles";
import UserAvatar from "@/components/common/user-avatar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout persistant pour toute la section administration.
 * Utilise les conventions Next.js pour éviter le rechargement de la barre latérale
 * et de l'en-tête lors de la navigation interne.
 */
export default function AdminRootLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const { user, fetchUser, isLoading } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

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
                        {/* User Profile Info with explicit loading state */}
                        <div className="flex items-center gap-3">
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <div
                                        key="header-loading"
                                        className="flex flex-col items-end gap-2"
                                    >
                                        <SkeletonReusable
                                            variant="primary"
                                            width={100}
                                            height={14}
                                        />
                                        <SkeletonReusable
                                            variant="primary"
                                            width={60}
                                            height={16}
                                            className="rounded-lg"
                                        />
                                    </div>
                                ) : user ? (
                                    <motion.div
                                        key="header-user"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex flex-col items-end"
                                    >
                                        <span className="text-sm font-bold truncate max-w-[150px]">
                                            {user.firstName} {user.name}
                                        </span>
                                        <span className="text-[10px] uppercase font-black text-primary px-2 py-0.5 rounded-lg bg-primary/10 border border-primary/20">
                                            {translateRole(user.role)}
                                        </span>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>

                            <UserAvatar
                                isLoading={isLoading}
                                firstName={user?.firstName}
                                lastName={user?.name}
                                size={44}
                            />
                        </div>
                    </div>
                </header>
                <SectionDivider className="py-4" />
                {/* Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {/* On ne wrap plus avec motion.div ici si on veut que le layout soit fixe */}
                    {children}
                </main>
            </div>
        </div>
    );
}
