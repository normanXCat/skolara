"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: any;
    description?: string;
    trend?: {
        value: number | string;
        label: string;
        isPositive: boolean;
    };
    badge?: {
        label: string;
        variant: "default" | "destructive" | "warning" | "success";
    };
    className?: string;
    delay?: number;
    isLoading?: boolean;
}

export const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
    trend,
    badge,
    className,
    delay = 0,
    isLoading = false,
}: StatCardProps) => {
    if (isLoading) {
        return (
            <div
                className={cn(
                    "h-40 rounded-3xl border border-border/50 bg-background p-6 shadow-sm overflow-hidden",
                    className,
                )}
            >
                <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                        <SkeletonReusable
                            width="40%"
                            height={12}
                            shape="full"
                            className="bg-muted/30"
                        />
                        <SkeletonReusable
                            width="60%"
                            height={36}
                            shape="rounded"
                        />
                        <div className="pt-2">
                            <SkeletonReusable
                                width="80%"
                                height={10}
                                shape="full"
                                className="opacity-40"
                            />
                        </div>
                    </div>
                    <SkeletonReusable
                        width={48}
                        height={48}
                        shape="rounded"
                        className="rounded-2xl"
                    />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className={cn(
                "group relative overflow-hidden rounded-3xl border border-border/50 bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-primary/20",
                className,
            )}
        >
            {/* Background Decoration */}
            <div className="absolute -right-4 -top-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:opacity-[0.07] text-primary">
                <Icon size={120} strokeWidth={1} />
            </div>

            <div className="flex items-start justify-between relative z-10">
                <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black tracking-tight text-foreground">
                            {value}
                        </h3>
                        {trend && (
                            <span
                                className={cn(
                                    "text-[10px] font-bold px-1.5 py-0.5 rounded-lg border",
                                    trend.isPositive
                                        ? "text-emerald-600 bg-emerald-500/5 border-emerald-500/20"
                                        : "text-rose-600 bg-rose-500/5 border-rose-500/20",
                                )}
                            >
                                {trend.isPositive ? "↑" : "↓"} {trend.value}%
                            </span>
                        )}
                    </div>
                    {description && (
                        <p className="text-xs text-muted-foreground font-medium">
                            {description}
                        </p>
                    )}
                </div>

                <div
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/10 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground group-hover:shadow-primary/20 group-hover:shadow-lg",
                    )}
                >
                    <Icon size={24} strokeWidth={2} />
                </div>
            </div>

            {badge && badge.label && (
                <div className="mt-4 relative z-10">
                    <span
                        className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider",
                            badge.variant === "default" &&
                                "bg-primary/10 text-primary border border-primary/20",
                            badge.variant === "destructive" &&
                                "bg-rose-500/10 text-rose-500 border border-rose-500/20",
                            badge.variant === "warning" &&
                                "bg-amber-500/10 text-amber-500 border border-amber-500/20",
                            badge.variant === "success" &&
                                "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
                        )}
                    >
                        {badge.label}
                    </span>
                </div>
            )}
        </motion.div>
    );
};
