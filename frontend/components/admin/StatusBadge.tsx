"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    IconClock,
    IconEye,
    IconLoader2,
    IconCheck,
    IconX,
    IconBolt,
    IconArchive,
    IconCreditCard,
    IconAlertTriangle,
    IconCircle,
} from "@tabler/icons-react";

export type StatusVariant =
    | "pending"
    | "in_review"
    | "in_progress"
    | "accepted"
    | "rejected"
    | "active"
    | "archived"
    | "paid"
    | "late";

interface StatusBadgeProps {
    status: StatusVariant | string;
    className?: string;
}

const STATUS_CONFIG: Record<
    string,
    { label: string; color: string; icon: any; pulse?: boolean }
> = {
    pending: {
        label: "En attente",
        color: "amber",
        icon: IconClock,
        pulse: true,
    },
    in_review: {
        label: "En examen",
        color: "blue",
        icon: IconEye,
        pulse: true,
    },
    in_progress: {
        label: "En cours",
        color: "indigo",
        icon: IconLoader2,
        pulse: true,
    },
    accepted: {
        label: "Accepté",
        color: "emerald",
        icon: IconCheck,
    },
    rejected: {
        label: "Refusé",
        color: "rose",
        icon: IconX,
    },
    active: {
        label: "Actif",
        color: "emerald",
        icon: IconBolt,
    },
    archived: {
        label: "Archivé",
        color: "slate",
        icon: IconArchive,
    },
    paid: {
        label: "Payé",
        color: "emerald",
        icon: IconCreditCard,
    },
    late: {
        label: "En retard",
        color: "rose",
        icon: IconAlertTriangle,
        pulse: true,
    },
};

const COLOR_MAP: Record<
    string,
    {
        bg: string;
        text: string;
        border: string;
        indicator: string;
        shadow: string;
    }
> = {
    amber: {
        bg: "bg-amber-500/5 dark:bg-amber-500/10",
        text: "text-amber-700 dark:text-amber-400",
        border: "border-amber-500/20 dark:border-amber-400/20",
        indicator: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
        shadow: "hover:shadow-amber-500/10",
    },
    blue: {
        bg: "bg-blue-500/5 dark:bg-blue-500/10",
        text: "text-blue-700 dark:text-blue-400",
        border: "border-blue-500/20 dark:border-blue-400/20",
        indicator: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
        shadow: "hover:shadow-blue-500/10",
    },
    indigo: {
        bg: "bg-indigo-500/5 dark:bg-indigo-500/10",
        text: "text-indigo-700 dark:text-indigo-400",
        border: "border-indigo-500/20 dark:border-indigo-400/20",
        indicator: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]",
        shadow: "hover:shadow-indigo-500/10",
    },
    emerald: {
        bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
        text: "text-emerald-700 dark:text-emerald-400",
        border: "border-emerald-500/20 dark:border-emerald-400/20",
        indicator: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
        shadow: "hover:shadow-emerald-500/10",
    },
    rose: {
        bg: "bg-rose-500/5 dark:bg-rose-500/10",
        text: "text-rose-700 dark:text-rose-400",
        border: "border-rose-500/20 dark:border-rose-400/20",
        indicator: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
        shadow: "hover:shadow-rose-500/10",
    },
    slate: {
        bg: "bg-slate-500/5 dark:bg-slate-500/10",
        text: "text-slate-700 dark:text-slate-400",
        border: "border-slate-500/20 dark:border-slate-400/20",
        indicator: "bg-slate-500",
        shadow: "hover:shadow-slate-500/5",
    },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
    const s = status.toLowerCase();
    const config = STATUS_CONFIG[s] || {
        label: status,
        color: "slate",
        icon: IconCircle,
    };

    const colors = COLOR_MAP[config.color] || COLOR_MAP.slate;
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -1, scale: 1.02 }}
            className={cn(
                "inline-flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-sm",
                colors.bg,
                colors.border,
                colors.text,
                colors.shadow,
                className,
            )}
        >
            {/* Color Sidebar Indicator */}
            <div
                className={cn(
                    "w-1 h-3 rounded-full shrink-0",
                    colors.indicator,
                )}
            />

            {/* Icon + Label */}
            <div className="flex items-center gap-1.5">
                <Icon
                    size={14}
                    className={cn(
                        "shrink-0 opacity-80",
                        config.pulse && "animate-pulse",
                    )}
                />
                <span className="text-[10px] font-black uppercase tracking-wider">
                    {config.label}
                </span>
            </div>
        </motion.div>
    );
};
