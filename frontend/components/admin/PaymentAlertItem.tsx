"use client";

import { motion } from "framer-motion";
import {
    IconAlertCircle,
    IconChevronRight,
    IconArrowRight,
    IconUser,
    IconReceipt,
    IconClock,
} from "@tabler/icons-react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";

interface PaymentAlertItemProps {
    studentName: string;
    amount: number | string;
    delay?: number;
    currency?: string;
    onClick?: () => void;
    className?: string;
}

/**
 * Composant PaymentAlertItem "UI/UX Pro Max"
 * Design spatial avec glassmorphism, pattern hexagonal et bordure laser animée au survol.
 */
export const PaymentAlertItem = ({
    studentName,
    amount,
    delay = 0,
    currency = "€",
    onClick,
    className,
}: PaymentAlertItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.23, 1, 0.32, 1],
            }}
            onClick={onClick}
            className={cn(
                "group relative p-[1px] rounded-[2.5rem] overflow-hidden cursor-pointer",
                className,
            )}
        >
            {/* Laser Animation Border (Visible on Hover) */}
            <motion.div
                className="absolute duration-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Glass Container */}
            <div className="relative h-full w-full bg-background/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.45rem] overflow-hidden p-5 border border-white/10 dark:border-white/5 transition-all duration-500 group-hover:bg-background/40 group-hover:shadow-[0_0_40px_rgba(var(--destructive),0.1)]">
                {/* Background Decoration: Hexagons & Icon */}
                <HexagonPattern
                    radius={12}
                    className="opacity-[0.03] dark:opacity-[0.07] scale-150 transition-transform duration-700 group-hover:scale-[1.7] group-hover:rotate-12"
                />
                <div className="absolute -bottom-6 -right-6 h-32 w-32 opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 text-destructive">
                    <IconReceipt size="100%" strokeWidth={0.5} />
                </div>

                {/* Content Layout */}
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-5">
                        {/* Avatar Section */}
                        <div className="relative">
                            <div className="size-14 rounded-[1.25rem] bg-gradient-to-br from-rose-500/20 via-rose-500/5 to-transparent flex items-center justify-center text-rose-500 border border-rose-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                                <IconUser size={28} strokeWidth={1.5} />
                            </div>
                            {/* Live Badge indicator */}
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border-2 border-background"></span>
                            </span>
                        </div>

                        {/* Text Info */}
                        <div className="space-y-1">
                            <Typography
                                variant="h4"
                                className="!text-[15px] font-black tracking-tight group-hover:text-rose-500 transition-colors duration-300"
                            >
                                {studentName}
                            </Typography>
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                                    <IconClock
                                        size={10}
                                        className="text-rose-500"
                                    />
                                    <span className="text-[9px] uppercase font-black tracking-[0.15em] text-rose-600">
                                        Retard
                                    </span>
                                </div>
                                <div className="size-1 rounded-full bg-muted-foreground/30" />
                                <span className="text-[11px] font-medium text-muted-foreground/80 lowercase">
                                    échéance dépassée
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action & Amount Section */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest leading-none mb-1">
                                À Régler
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black tabular-nums tracking-tighter text-foreground group-hover:text-rose-500 transition-colors">
                                    {amount}
                                </span>
                                <span className="text-sm font-heavy text-muted-foreground">
                                    {currency}
                                </span>
                            </div>
                        </div>

                        {/* Interactive Suffix */}
                        <div className="size-12 rounded-2xl bg-muted/20 dark:bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] group-active:scale-90 overflow-hidden relative">
                            <IconArrowRight
                                size={20}
                                className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Glow Sheen */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
    );
};
