"use client";

import {
    DataTable,
    ColumnWithIcon,
} from "@/components/admin/DataTable/DataTable";
import { User, School, Calendar, Activity, Settings, Shield, Clock, TrendingUp, AlertCircle } from "lucide-react";
import {
    IconDotsVertical,
    IconChartBar,
    IconCheck,
    IconX,
    IconClock,
    IconShieldCheck,
    IconAlertTriangle,
    IconCalendarEvent,
    IconChevronLeft as IconChevronLeftTabler,
} from "@tabler/icons-react";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { useEffect, useState, useCallback, useMemo } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import UserAvatar from "@/components/common/user-avatar";
import { cn } from "@/lib/utils";

interface AbsenceClassDetailProps {
    classId: string;
}

export function AbsenceClassDetail({ classId }: AbsenceClassDetailProps) {
    const [loading, setLoading] = useState(true);
    const [classData, setClassData] = useState<any>(null);
    const [absences, setAbsences] = useState<any[]>([]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // 1. Fetch Class Structure
            const classRes = await api.get<any>(`/admin/classes/${classId}`);
            if (classRes.success) setClassData(classRes.data);

            // 2. Fetch All Absences for this class
            const absencesRes = await api.get<any>(`/admin/absences?classId=${classId}&limit=1000`);
            if (absencesRes.success) {
                setAbsences(absencesRes.data.absences);
            }
        } catch (error) {
            toast.error("Erreur lors de la récupération des données");
        } finally {
            setLoading(false);
        }
    }, [classId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const matrixData = useMemo(() => {
        if (!classData || !classData.students) return [];
        
        return classData.students.map((student: any) => {
            const studentAbsences = absences.filter(a => a.studentId === student.id);
            const total = studentAbsences.length;
            const absent = studentAbsences.filter(a => a.status === "ABSENT").length;
            const late = studentAbsences.filter(a => a.status === "LATE").length;
            const unjustified = studentAbsences.filter(a => a.status === "ABSENT" && !a.isJustified).length;
            
            // Presence Rate (rough estimation based on total records)
            // Assuming 100% presence means 0 absences/lates.
            // Since we only track absences/lates, we could show "Total Impacts" or similar.
            
            return {
                id: student.id,
                student: student,
                totalImpacts: total,
                absentCount: absent,
                lateCount: late,
                unjustifiedCount: unjustified,
                recent: studentAbsences.slice(0, 5).map(a => ({ status: a.status, justified: a.isJustified }))
            };
        });
    }, [classData, absences]);

    const columns = useMemo(() => {
        if (!classData) return [];

        const base: ColumnWithIcon<any>[] = [
            {
                id: "student",
                header: "Élève",
                accessorFn: (row) => `${row.student.user.firstName} ${row.student.user.name}`,
                cell: ({ row }) => {
                    const student = row.original.student;
                    return (
                        <div className="flex items-center gap-3 py-4">
                            <UserAvatar 
                                firstName={student.user.firstName}
                                lastName={student.user.name}
                                size={40}
                            />
                            <div className="flex flex-col min-w-0">
                                <span className="font-bold text-md text-foreground truncate">
                                    {student.user.firstName} {student.user.name}
                                </span>
                                <span className="text-xs text-muted-foreground font-black uppercase tracking-widest leading-none">ID: #{student.id}</span>
                            </div>
                        </div>
                    );
                },
            }
        ];

        const statsCols: ColumnWithIcon<any>[] = [
            {
                accessorKey: "absentCount",
                header: "Absences",
                cell: ({ row }) => {
                    const val = row.original.absentCount;
                    return (
                        <div className={cn(
                            "mx-auto w-12 h-8 flex items-center justify-center rounded-3xl border transition-all tabular-nums text-sm font-black",
                            val === 0 ? "bg-emerald-500/5 text-emerald-500/30 border-emerald-500/10" : "bg-rose-500/10 border-rose-500/20 text-rose-500 shadow-sm shadow-rose-500/5"
                        )}>
                            {val}
                        </div>
                    );
                }
            },
            {
                accessorKey: "lateCount",
                header: "Retards",
                cell: ({ row }) => {
                    const val = row.original.lateCount;
                    return (
                        <div className={cn(
                            "mx-auto w-12 h-8 flex items-center justify-center rounded-3xl border transition-all tabular-nums text-sm font-black",
                            val === 0 ? "bg-emerald-500/5 text-emerald-500/30 border-emerald-500/10" : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                        )}>
                            {val}
                        </div>
                    );
                }
            },
            {
                accessorKey: "unjustifiedCount",
                header: "Non Justifiées",
                cell: ({ row }) => {
                    const val = row.original.unjustifiedCount;
                    return (
                        <div className={cn(
                            "mx-auto w-12 h-8 flex items-center justify-center rounded-3xl border transition-all tabular-nums text-sm font-black",
                            val === 0 ? "bg-emerald-500/5 text-emerald-500/30 border-emerald-500/10" : "bg-rose-600/20 border-rose-600/30 text-rose-600 animate-pulse shadow-sm shadow-rose-600/10"
                        )}>
                            {val}
                        </div>
                    );
                }
            },
            {
                id: "recent",
                header: "Derniers états",
                cell: ({ row }) => {
                    const recent = row.original.recent;
                    if (recent.length === 0) return <span className="text-[10px] text-muted-foreground/30 uppercase font-black tracking-widest pl-4">— Aucun</span>;
                    return (
                        <div className="flex items-center gap-1.5 pl-4">
                            {recent.map((a: any, i: number) => (
                                <div 
                                    key={i} 
                                    className={cn(
                                        "size-2.5 rounded-full",
                                        a.status === "ABSENT" ? (a.justified ? "bg-blue-500" : "bg-rose-500") : "bg-amber-500"
                                    )}
                                    title={a.status}
                                />
                            ))}
                        </div>
                    );
                }
            }
        ];

        const scoreCol: ColumnWithIcon<any> = {
            id: "total",
            header: "Total Impacts",
            icon: TrendingUp,
            cell: ({ row }) => {
                const val = row.original.totalImpacts;
                return (
                    <div className={cn(
                        "px-2.5 py-1.5 rounded-3xl border text-center font-black tabular-nums text-md",
                        val === 0 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : 
                        val < 5 ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : 
                        "bg-rose-500/10 border-rose-500/20 text-rose-500 shadow-sm shadow-rose-500/5"
                    )}>
                        {val}
                    </div>
                );
            }
        };

        return [...base, ...statsCols, scoreCol];
    }, [classData]);

    return (
        <div className="space-y-8">
            {/* Header Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl shadow-2xl shadow-black/5">
                <div className="flex items-center gap-4">
                    <Link href="/admin/absences">
                        <ButtonReusable variant="outline" size="icon" className="rounded-2xl shrink-0">
                            <IconChevronLeftTabler size={20} />
                        </ButtonReusable>
                    </Link>
                    <div>
                        {loading ? (
                            <div className="space-y-2">
                                <SkeletonReusable width={200} height={28} className="rounded-lg" />
                                <SkeletonReusable width={120} height={12} className="rounded-md" />
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                    <Typography variant="h2" className="text-2xl font-black tracking-tighter">
                                        {classData?.name}
                                    </Typography>
                                    <Badge className="bg-primary text-primary-foreground border-none text-[9px] font-black uppercase px-2 py-0 h-5">
                                        {classData?.level}
                                    </Badge>
                                </div>
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-0.5 whitespace-nowrap">
                                    Récapitulatif des absences • Année {classData?.schoolYear}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 pr-2">
                    <div className="p-3 rounded-2xl bg-muted/30 border border-border/50">
                        <IconCalendarEvent size={24} className="text-primary/60" />
                    </div>
                </div>
            </div>

            {/* Matrix Content */}
            {(loading || matrixData.length > 0) && (
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative group/table">
                            <div className="absolute -inset-4 bg-primary/5 blur-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <DataTable
                                columns={columns}
                                data={matrixData}
                                isLoading={loading}
                                searchKey="student"
                                searchPlaceholder="Rechercher un élève..."
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Empty State */}
            {!loading && absences.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 bg-emerald-500/5 border border-dashed border-emerald-500/20 rounded-[2.5rem] text-center space-y-4">
                    <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <IconShieldCheck size={32} />
                    </div>
                    <div>
                        <Typography variant="h3" className="text-xl font-black text-emerald-600 tracking-tight">Discipline Parfaite</Typography>
                        <p className="text-md text-muted-foreground max-w-md mx-auto">
                            Aucune absence ou retard n'a été enregistré pour cette classe. Félicitations aux élèves !
                        </p>
                    </div>
                </div>
            )}

            {/* Legend */}
            {(loading || absences.length > 0) && (
                <div className="flex flex-wrap gap-6 items-center px-8 py-5 rounded-3xl bg-muted/10 border border-border/30 justify-center">
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-rose-500" />
                        <span className="text-[11px] font-black text-muted-foreground uppercase tracking-wider">Absence</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-amber-500" />
                        <span className="text-[11px] font-black text-muted-foreground uppercase tracking-wider">Retard</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-blue-500" />
                        <span className="text-[11px] font-black text-muted-foreground uppercase tracking-wider">Justifié</span>
                    </div>
                </div>
            )}
        </div>
    );
}
