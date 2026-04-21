"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import api from "@/lib/api-client";
import { ADMIN_NAVIGATION_LINKS } from "@/config/navigation";
import { ROUTES } from "@/config/routes";
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
    IconMenu2,
    IconX,
    IconLogout,
    IconBell,
    IconUserCircle,
    IconCheck,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ButtonReusable } from "@/components/ui/button-reusable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/common/logo";
import SectionDivider from "../ui/section-divider";

const MotionLink = motion.create(Link);

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
};

export const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Close mobile menu on path change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            router.push(ROUTES.LOGIN);
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    const sidebarContent = (
        <div className="flex h-full flex-col transition-colors relative">
            {/* 2. Logo Section */}
            <div className="w-full flex items-center justify-between">
                <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Logo size={48} asLink />
                </motion.div>
                <div className="flex justify-between items-center lg:justify-center lg:gap-4">
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <div className="mx-1 h-6 w-px bg-border/60" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="relative flex items-center justify-center size-8 rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-primary transition-all duration-300 group active:scale-95"
                                    aria-label="Notifications"
                                >
                                    <IconBell
                                        size={26}
                                        className="group-hover:rotate-12 transition-transform"
                                    />
                                    <span className="absolute top-1 right-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/30"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-background shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]"></span>
                                    </span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                className="w-80 p-0 rounded-2xl overflow-hidden border-border/40 shadow-2xl"
                            >
                                <DropdownMenuLabel className="p-4 border-b border-border/10 bg-muted/30">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold">
                                            Notifications
                                        </span>
                                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-black">
                                            2 nouvelles
                                        </span>
                                    </div>
                                </DropdownMenuLabel>
                                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                    <DropdownMenuItem className="p-4 focus:bg-primary/5 cursor-pointer border-b border-border/5">
                                        <div className="flex gap-3">
                                            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <IconUserCircle
                                                    size={18}
                                                    className="text-primary"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-xs font-bold leading-none">
                                                    Nouvelle pré-inscription
                                                </p>
                                                <p className="text-[10px] text-muted-foreground line-clamp-1">
                                                    Un nouvel élève vient de
                                                    s'inscrire.
                                                </p>
                                                <p className="text-[9px] text-primary font-medium mt-1">
                                                    Il y a 5 min
                                                </p>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="p-4 focus:bg-primary/5 cursor-pointer">
                                        <div className="flex gap-3">
                                            <div className="size-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                                                <IconBell
                                                    size={18}
                                                    className="text-amber-500"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-xs font-bold leading-none">
                                                    Maintenance système
                                                </p>
                                                <p className="text-[10px] text-muted-foreground line-clamp-1">
                                                    Une mise à jour est prévue à
                                                    22h00.
                                                </p>
                                                <p className="text-[9px] text-primary font-medium mt-1">
                                                    Il y a 2 heures
                                                </p>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                </div>
                                <DropdownMenuSeparator className="m-0" />
                                <div className="p-2 bg-muted/20">
                                    <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors py-2">
                                        <IconCheck size={12} />
                                        Tout marquer comme lu
                                    </button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden p-2 rounded-xl bg-muted/40 text-foreground"
                        aria-label="Fermer le menu"
                    >
                        <IconX size={24} />
                    </button>
                </div>
            </div>

            <SectionDivider className="py-4" />

            {/* 3. Navigation Links */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar scroll-smooth pt-2">
                {ADMIN_NAVIGATION_LINKS.map((link) => {
                    const Icon = ICON_MAP[link.icon];
                    const isActive = pathname === link.href;

                    return (
                        <MotionLink
                            key={link.href}
                            href={link.disabled ? "#" : link.href}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className={cn(
                                "group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 overflow-hidden transition-all duration-300",
                                isActive
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                                link.disabled &&
                                    "cursor-not-allowed opacity-30 grayscale pointer-events-none",
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-primary/5 rounded-2xl -z-10"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30,
                                    }}
                                />
                            )}

                            {/* Effet de Balayage (Sheen) */}
                            <motion.div
                                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                                variants={{
                                    initial: { x: "-100%", skewX: -20 },
                                    hover: {
                                        x: "100%",
                                        transition: {
                                            duration: 0.8,
                                            ease: "easeInOut",
                                        },
                                    },
                                }}
                            />

                            {Icon && (
                                <motion.div
                                    animate={
                                        isActive
                                            ? {
                                                  y: [0, -3, 0],
                                                  rotate: [0, 8, -8, 0],
                                                  scale: [1, 1.1, 1],
                                              }
                                            : {
                                                  y: 0,
                                                  rotate: 0,
                                                  scale: 1,
                                              }
                                    }
                                    whileHover={{
                                        scale: 1.2,
                                        rotate: [0, -10, 10, 0],
                                    }}
                                    transition={{
                                        y: {
                                            repeat: Infinity,
                                            duration: 2.5,
                                            ease: "easeInOut",
                                        },
                                        rotate: {
                                            repeat: Infinity,
                                            duration: 3.5,
                                            ease: "easeInOut",
                                        },
                                        scale: {
                                            repeat: Infinity,
                                            duration: 3,
                                            ease: "easeInOut",
                                        },
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10,
                                    }}
                                    className={cn(
                                        "shrink-0 transition-colors duration-300 relative z-10",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground/60 group-hover:text-primary",
                                    )}
                                >
                                    <Icon size={22} strokeWidth={2.4} />
                                </motion.div>
                            )}
                            <motion.span
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={cn(
                                    "font-bold tracking-tight whitespace-nowrap transition-all duration-300",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground group-hover:translate-x-1",
                                )}
                            >
                                {link.label}
                            </motion.span>

                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active-indicator"
                                    className="absolute left-0 w-1.5 h-6 rounded-r-full bg-primary shadow-[4px_0_12px_rgba(var(--primary-rgb),0.6)]"
                                />
                            )}
                        </MotionLink>
                    );
                })}

                {/* Simulation de sous-menu raffiné */}
                {pathname.includes("/classes") && (
                    <div className="ml-8 pl-4 border-l border-border/20 space-y-1 my-2">
                        {["Maths", "English", "Economics"].map((sub) => (
                            <div
                                key={sub}
                                className="relative flex items-center group cursor-pointer pl-4 py-2 hover:bg-muted/30 rounded-xl transition-all"
                            >
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-border/40 group-hover:bg-primary/60" />
                                <span className="text-[11px] font-bold text-muted-foreground/60 group-hover:text-primary transition-all uppercase tracking-wider">
                                    {sub}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </nav>

            <SectionDivider className="py-2" />

            {/* 4. Bottom Section - Logout & Info */}
            <div className="px-4 space-y-4">
                <button
                    onClick={handleLogout}
                    className="group relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-muted-foreground transition-all duration-300 hover:bg-red-500/10 hover:text-red-500"
                >
                    <IconLogout
                        size={22}
                        className="shrink-0 transition-transform group-hover:-translate-x-1"
                    />
                    <span className="font-bold tracking-tight">
                        Déconnexion
                    </span>
                </button>

                <div className="text-center py-4">
                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                        © {new Date().getFullYear()} Skolara
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-6 left-6 z-[40] p-3 rounded-2xl bg-background border border-border/40 shadow-xl text-foreground active:scale-95 transition-transform"
                aria-label="Ouvrir le menu"
            >
                <IconMenu2 size={24} />
            </button>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex h-full flex-col relative group/sidebar w-[280px]">
                <aside className="relative flex h-full flex-col pointer-events-auto">
                    {sidebarContent}
                </aside>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="lg:hidden fixed inset-0 z-[100] w-full h-full bg-background"
                    >
                        {sidebarContent}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
