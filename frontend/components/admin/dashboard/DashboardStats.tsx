"use client";

import { motion } from "framer-motion";
import { StatCard } from "@/components/admin/StatCard";
import {
    IconSchool,
    IconUsers,
    IconAlertCircle,
    IconClipboardList,
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
                title="Élèves Actifs"
                value={loading ? "..." : stats?.totalStudents || 0}
                icon={IconSchool}
                trend={{
                    value: 12,
                    label: "ce mois",
                    isPositive: true,
                }}
                isLoading={loading}
                delay={0.1}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
            />
            <StatCard
                title="Enseignants"
                value={loading ? "..." : stats?.totalTeachers || 0}
                icon={IconUsers}
                isLoading={loading}
                delay={0.2}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
            />
            <StatCard
                title="Paiements en attente"
                value={loading ? "..." : stats?.pendingPayments || 0}
                icon={IconAlertCircle}
                badge={
                    stats?.latePayments > 0
                        ? {
                              label: `${stats.latePayments} en retard`,
                              variant: "destructive",
                          }
                        : undefined
                }
                isLoading={loading}
                delay={0.3}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
            />
            <StatCard
                title="Pré-inscriptions"
                value={loading ? "..." : stats?.pendingPreRegistrations || 0}
                icon={IconClipboardList}
                badge={
                    stats?.pendingPreRegistrations > 0
                        ? { label: "À traiter", variant: "warning" }
                        : undefined
                }
                isLoading={loading}
                delay={0.4}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
            />
        </motion.div>
    );
}
