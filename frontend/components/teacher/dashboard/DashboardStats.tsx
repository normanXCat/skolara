"use client";

import { motion } from "framer-motion";
import { StatCard } from "@/components/teacher/StatCard";
import {
    IconBook,
    IconUserX,
    IconCalendarTime,
    IconStar,
} from "@tabler/icons-react";

interface DashboardStatsProps {
    stats: any;
    loading?: boolean;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export function DashboardStats({ stats, loading }: DashboardStatsProps) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-6"
        >
            <StatCard
                title="Classes assignées"
                value={loading ? "..." : stats?.totalClasses || 0}
                icon={IconBook}
                isLoading={loading}
                delay={0.1}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
            />
            <StatCard
                title="Appels du jour"
                value={loading ? "..." : stats?.completedRollCalls || "0/0"}
                icon={IconUserX}
                badge={
                    stats?.pendingRollCalls > 0
                        ? { label: `${stats.pendingRollCalls} restants`, variant: "warning" }
                        : { label: "Terminé", variant: "success" }
                }
                isLoading={loading}
                delay={0.2}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
            />
            <StatCard
                title="Prochain cours"
                value={loading ? "..." : stats?.nextClassTime || "--:--"}
                icon={IconCalendarTime}
                description={stats?.nextClassName || "Aucun cours prévu"}
                isLoading={loading}
                delay={0.3}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
            />
            <StatCard
                title="Moyenne générale"
                value={loading ? "..." : stats?.globalAverage || "N/A"}
                icon={IconStar}
                trend={
                    stats?.averageTrend 
                        ? {
                            value: stats.averageTrend,
                            label: "vs période préc.",
                            isPositive: stats.averageTrend > 0
                        }
                        : undefined
                }
                isLoading={loading}
                delay={0.4}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
            />
        </motion.div>
    );
}
