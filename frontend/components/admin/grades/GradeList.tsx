"use client";

import { IconSchool, IconChartBar } from "@tabler/icons-react";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api-client";
import { Typography } from "@/components/ui/typography";
import { GradeDistributionChart } from "./GradeDistributionChart";
import { GradeClassGrid } from "./GradeClassGrid";
import { motion, AnimatePresence } from "framer-motion";

interface GradeStats {
    totalGrades: number;
    average: number;
    highest: number;
    lowest: number;
    distribution: { range: string; count: number }[];
}

export function GradeList() {
    const [stats, setStats] = useState<GradeStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"classes" | "stats">("classes");

    const fetchStats = useCallback(async () => {
        setStatsLoading(true);
        try {
            const response = await api.get<any>("/admin/grades/stats");
            if (response.success) setStats(response.data);
        } catch (error) {
            // silent
        } finally {
            setStatsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <Typography
                        variant="h1"
                        className="text-3xl md:text-4xl font-black tracking-tighter text-foreground"
                    >
                        Registre des Notes
                    </Typography>
                    <Typography
                        variant="body"
                        className="!text-sm text-muted-foreground font-medium mt-1"
                    >
                        Analyse globale et consultation par classe
                    </Typography>
                </div>

                {/* Simple Tab Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-3xl bg-muted/20 border border-border/40">
                    <button
                        onClick={() => setActiveTab("classes")}
                        className={`px-6 py-2 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "classes" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted/40"}`}
                    >
                        Classes
                    </button>
                    <button
                        onClick={() => setActiveTab("stats")}
                        className={`px-6 py-2 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "stats" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted/40"}`}
                    >
                        Stats
                    </button>
                </div>
            </div>

            {/* Tab Content with Simple Fade */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    {activeTab === "classes" ? (
                        <motion.div
                            key="classes-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <GradeClassGrid />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="stats-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-3xl opacity-50 pointer-events-none" />
                                <GradeDistributionChart stats={stats!} loading={statsLoading} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
