"use client";

import { User, School, Calendar, Activity, Settings, Shield, Clock } from "lucide-react";
import {
    IconDotsVertical,
    IconCheck,
    IconX,
    IconClock,
    IconShieldCheck,
    IconAlertCircle,
} from "@tabler/icons-react";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { useRouter } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import InputReusable from "@/components/ui/input-reusable";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AbsenceClassGrid } from "./AbsenceClassGrid";
import { AbsenceStatsCharts } from "./AbsenceStatsCharts";

interface AbsenceEntry {
    id: number;
    date: string;
    status: "PRESENT" | "ABSENT" | "LATE";
    reason: string | null;
    isJustified: boolean;
    parentNotifiedAt: string | null;
    student: {
        id: number;
        user: { firstName: string; name: string; email: string };
        parent?: { user: { firstName: string; name: string; email: string } } | null;
    };
    teacher: {
        id: number;
        user: { firstName: string; name: string };
    };
    class: { id: number; name: string; level: string };
}

interface AbsenceStats {
    totalAbsences: number;
    absentCount: number;
    lateCount: number;
    justifiedCount: number;
    unjustifiedCount: number;
    monthlyTrend: { month: string; count: number }[];
    topClasses: { name: string; count: number }[];
    distribution: { name: string; value: number }[];
}

export function AbsenceList() {
    const router = useRouter();
    const [stats, setStats] = useState<AbsenceStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    // Justify dialog
    const [justifyTarget, setJustifyTarget] = useState<AbsenceEntry | null>(null);
    const [justifyReason, setJustifyReason] = useState("");
    const [isJustifyDialogOpen, setIsJustifyDialogOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const fetchStats = useCallback(async () => {
        setStatsLoading(true);
        try {
            const response = await api.get<any>("/admin/absences/stats");
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

    const handleJustify = async () => {
        if (!justifyTarget || !justifyReason.trim()) return;
        setIsActionLoading(true);
        try {
            const response = await api.put(`/admin/absences/${justifyTarget.id}/justify`, {
                isJustified: true,
                reason: justifyReason,
            });
            if (response.success) {
                toast.success("Absence justifiée avec succès");
                setIsJustifyDialogOpen(false);
                setJustifyTarget(null);
                setJustifyReason("");
                fetchStats();
            }
        } catch (error) {
            toast.error("Erreur lors de la justification");
        } finally {
            setIsActionLoading(false);
        }
    };

    const [activeTab, setActiveTab] = useState<"classes" | "stats">("classes");

    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <Typography
                        variant="h1"
                        className="text-3xl md:text-4xl font-black tracking-tighter text-foreground"
                    >
                        Suivi des Absences
                    </Typography>
                    <Typography
                        variant="body"
                        className="!text-sm text-muted-foreground font-medium mt-1"
                    >
                        Gestion des présences et analyse des retards
                    </Typography>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-3xl bg-muted/20 border border-border/40 shrink-0">
                    {[
                        { id: "classes", label: "Classes" },
                        { id: "stats", label: "Stats" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "px-6 py-2 rounded-3xl text-xs font-black uppercase tracking-widest transition-all",
                                activeTab === tab.id 
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                                    : "text-muted-foreground hover:bg-muted/40"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative">
                <AnimatePresence mode="wait">
                    {activeTab === "classes" ? (
                        <motion.div
                            key="classes-view"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <AbsenceClassGrid />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="stats-view"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-3xl opacity-50 pointer-events-none" />
                                <AbsenceStatsCharts stats={stats} loading={statsLoading} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Justify Dialog */}
            {isJustifyDialogOpen && justifyTarget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { setIsJustifyDialogOpen(false); setJustifyTarget(null); }}
                        className="absolute inset-0 bg-background/60 dark:bg-black/80 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border/50 bg-background p-10 shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                        <button
                            onClick={() => { setIsJustifyDialogOpen(false); setJustifyTarget(null); }}
                            className="absolute right-8 top-8 z-50 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
                            aria-label="Fermer"
                        >
                            <IconX size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl mb-8 shadow-inner border border-border/50 bg-emerald-500/10 text-emerald-500">
                                <IconShieldCheck size={40} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                                Justifier l'absence
                            </h3>
                            <p className="text-muted-foreground font-medium mb-6 max-w-[280px] leading-relaxed">
                                {justifyTarget.student.user.firstName} {justifyTarget.student.user.name} — {new Date(justifyTarget.date).toLocaleDateString("fr-FR")}
                            </p>

                            <div className="w-full mb-8">
                                <InputReusable
                                    id="justify-reason"
                                    label="Motif de justification"
                                    placeholder="Ex: Certificat médical fourni..."
                                    value={justifyReason}
                                    onChange={(e) => setJustifyReason(e.target.value)}
                                />
                            </div>

                            <div className="flex w-full flex-col gap-4 sm:flex-row">
                                <ButtonReusable
                                    onClick={() => { setIsJustifyDialogOpen(false); setJustifyTarget(null); }}
                                    variant="outline"
                                    className="flex-1"
                                    disabled={isActionLoading}
                                    leftIcon={<IconX size={18} />}
                                >
                                    Annuler
                                </ButtonReusable>
                                <ButtonReusable
                                    onClick={handleJustify}
                                    className="flex-1"
                                    isLoading={isActionLoading}
                                    loadingText="Justification..."
                                    disabled={!justifyReason.trim()}
                                    leftIcon={<IconCheck size={18} />}
                                >
                                    Justifier
                                </ButtonReusable>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
