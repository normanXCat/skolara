"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { STUDENT_NAVIGATION_LINKS } from "@/config/navigation";
import InputReusable from "@/components/ui/input-reusable";
import { Sidebar } from "@/components/common/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { IconSearch } from "@tabler/icons-react";
import SectionDivider from "@/components/ui/section-divider";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { useAuthStore } from "@/stores/auth-store";
import { translateRole } from "@/lib/roles";
import UserAvatar from "@/components/common/user-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { IconLayoutDashboard, IconLogout, IconSchool } from "@tabler/icons-react";
import api from "@/lib/api-client";

interface StudentLayoutProps {
    children: React.ReactNode;
}

export default function StudentRootLayout({ children }: StudentLayoutProps) {
    const pathname = usePathname();
    const { user, fetchUser, isLoading, clearUser } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const currentLink = (STUDENT_NAVIGATION_LINKS as any).find(
        (link: any) => link.href === pathname
    );
    const pageTitle = currentLink ? currentLink.label : "Tableau de bord Élève";

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            clearUser();
            window.location.href = ROUTES.LOGIN;
        }
    };

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
                            id="student-search"
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="cursor-pointer">
                                        <UserAvatar
                                            isLoading={isLoading}
                                            firstName={user?.firstName}
                                            lastName={user?.name}
                                            size={44}
                                        />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 bg-background/95 backdrop-blur-xl rounded-3xl border-border/40 shadow-2xl p-2"
                                >
                                    <div className="px-3 py-2 text-sm font-bold truncate">
                                        {user?.firstName} {user?.name}
                                    </div>
                                    <DropdownMenuSeparator className="bg-border/40" />
                                    
                                    <DropdownMenuItem
                                        asChild
                                        className="rounded-xl cursor-pointer"
                                    >
                                        <Link
                                            href={ROUTES.STUDENT.DASHBOARD}
                                            className="w-full flex items-center text-foreground/80 hover:text-primary py-2 px-3"
                                        >
                                            <IconSchool className="mr-2 h-4 w-4" />
                                            Espace Élève
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="bg-border/40" />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="rounded-xl cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive py-2 px-3"
                                    >
                                        <IconLogout className="mr-2 h-4 w-4" />
                                        Déconnexion
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
