"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { TEACHER_NAVIGATION_LINKS } from "@/config/navigation";
import InputReusable from "@/components/ui/input-reusable";
import { Sidebar } from "@/components/common/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { IconSearch } from "@tabler/icons-react";
import SectionDivider from "@/components/ui/section-divider";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { useAuthStore } from "@/stores/auth-store";
import { translateRole } from "@/lib/roles";
import UserAvatar from "@/components/common/user-avatar";

interface TeacherLayoutProps {
    children: React.ReactNode;
}

export default function TeacherRootLayout({ children }: TeacherLayoutProps) {
    const pathname = usePathname();
    const { user, fetchUser, isLoading } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const currentLink = (TEACHER_NAVIGATION_LINKS as any).find(
        (link: any) => link.href === pathname
    );
    const pageTitle = currentLink ? currentLink.label : "Tableau de bord Enseignant";

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background p-4 gap-4 relative">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-background/80 backdrop-blur-3xl shadow-2xl relative">
                <header className="flex shrink-0 items-center justify-between px-8 pt-4 z-30">
                    <div className="flex items-center gap-4">
                        <p className="text-xl font-black text-foreground tracking-tight">{pageTitle}</p>
                        <InputReusable
                            id="teacher-search"
                            placeholder="Rechercher..."
                            icon={IconSearch}
                            className="hidden md:flex !gap-0 w-64"
                            iconSize={18}
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <div key="header-loading" className="flex flex-col items-end gap-2">
                                        <SkeletonReusable variant="primary" width={100} height={14} />
                                        <SkeletonReusable variant="primary" width={60} height={16} className="rounded-lg" />
                                    </div>
                                ) : user ? (
                                    <motion.div key="header-user" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-end">
                                        <span className="text-sm font-bold truncate max-w-[150px]">{user.firstName} {user.name}</span>
                                        <span className="text-[10px] uppercase font-black text-primary px-2 py-0.5 rounded-lg bg-primary/10 border border-primary/20">{translateRole(user.role)}</span>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                            <UserAvatar isLoading={isLoading} firstName={user?.firstName} lastName={user?.name} size={44} />
                        </div>
                    </div>
                </header>
                <SectionDivider className="py-4" />
                <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
