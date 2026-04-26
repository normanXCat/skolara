"use client";

import {
    DataTable,
    ColumnWithIcon,
} from "@/components/admin/DataTable/DataTable";
import { User, School, BookOpen, Calculator, Activity, Calendar, MessageSquare, Settings, ArrowLeft, TrendingUp, ChevronLeft, AlertCircle } from "lucide-react";
import {
    IconDotsVertical,
    IconChartBar,
    IconBooks,
    IconChevronLeft,
    IconAlertTriangle,
} from "@tabler/icons-react";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { useEffect, useState, useCallback, useMemo } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import UserAvatar from "@/components/common/user-avatar";
import { cn } from "@/lib/utils";

interface GradeClassDetailProps {
    classId: string;
}

export function GradeClassDetail({ classId }: GradeClassDetailProps) {
    const [loading, setLoading] = useState(true);
    const [classData, setClassData] = useState<any>(null);
    const [grades, setGrades] = useState<any[]>([]);
    const [semesterFilter, setSemesterFilter] = useState(1);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // 1. Fetch Class Structure
            const classRes = await api.get<any>(`/admin/classes/${classId}`);
            if (classRes.success) setClassData(classRes.data);

            // 2. Fetch All Grades (Limit increased to 1000 in backend schema)
            const gradesRes = await api.get<any>(`/admin/grades?classId=${classId}&semester=${semesterFilter}&limit=1000`);
            if (gradesRes.success) {
                setGrades(gradesRes.data.grades);
            }
        } catch (error) {
            toast.error("Erreur lors de la récupération des données");
        } finally {
            setLoading(false);
        }
    }, [classId, semesterFilter]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const matrixData = useMemo(() => {
        if (!classData || !classData.students) return [];
        const subjects = classData.assignments?.map((a: any) => a.subject) || [];
        
        return classData.students.map((student: any) => {
            const row: any = {
                id: student.id,
                student: student,
                generalAverage: 0
            };

            let weighedSum = 0;
            let totalCoeff = 0;
 
            subjects.forEach((sub: any) => {
                const grade = grades.find(g => g.studentId === student.id && g.subjectId === sub.id);
                row[sub.code] = grade ? grade.value : null;
                if (grade) {
                    weighedSum += (grade.value * (sub.coefficient || 1));
                    totalCoeff += (sub.coefficient || 1);
                }
            });
 
            row.generalAverage = totalCoeff > 0 ? weighedSum / totalCoeff : null;
            return row;
        });
    }, [classData, grades]);

    const getGradeStyles = (val: number | null) => {
        if (val === null) return "text-muted-foreground/30 font-bold bg-muted/5 border-muted/10";
        if (val >= 16) return "text-emerald-500 font-black bg-emerald-500/10 border-emerald-500/20 shadow-sm shadow-emerald-500/5";
        if (val >= 12) return "text-blue-500 font-bold bg-blue-500/10 border-blue-500/20";
        if (val >= 10) return "text-amber-500 font-bold bg-amber-500/10 border-amber-500/20";
        return "text-rose-500 font-black bg-rose-500/10 border-rose-500/20 shadow-sm shadow-rose-500/5";
    };

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

        const subjects = classData.assignments?.map((a: any) => a.subject) || [];
        const subjectCols: ColumnWithIcon<any>[] = subjects.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((sub: any) => {
            // Check if this subject has NO grades at all in the whole class
            const hasAnyGrade = grades.some(g => g.subjectId === sub.id);

            return {
                accessorKey: sub.code,
                header: () => (
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-center">{sub.name}</span>
                        {!hasAnyGrade && !loading && (
                            <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20 text-sm px-1.5 py-0 font-black flex items-center gap-0.5 animate-pulse">
                                <IconAlertTriangle size={10} />
                                VIDE
                            </Badge>
                        )}
                    </div>
                ),
                cell: ({ row }: any) => {
                    const val = row.original[sub.code];
                    return (
                        <div className="flex items-center justify-center gap-1.5">
                            <div className={cn("w-12 h-8 flex items-center justify-center rounded-3xl border transition-all tabular-nums text-sm", getGradeStyles(val))}>
                                {val !== null ? val.toFixed(1) : <span className="text-rose-500/40 text-md font-black tracking-tighter">N.N</span>}
                            </div>
                            {val !== null && (
                                <span className="text-[10px] font-black text-muted-foreground/30 tabular-nums">
                                    x{sub.coefficient}
                                </span>
                            )}
                        </div>
                    );
                }
            };
        });

        const avgCol: ColumnWithIcon<any> = {
            accessorKey: "generalAverage",
            header: "Moyenne",
            icon: TrendingUp,
            cell: ({ row }) => {
                const val = row.original.generalAverage;
                if (val === null) return <div className="text-center text-muted-foreground/20 text-sm">—</div>;
                return (
                    <div className={cn(
                        "px-2.5 py-1.5 rounded-3xl border text-center font-black tabular-nums text-md",
                        val >= 10 ? "bg-primary/10 border-primary/20 text-primary shadow-sm shadow-primary/5" : "bg-rose-500/10 border-rose-500/20 text-rose-500 shadow-sm shadow-rose-500/5"
                    )}>
                        {val.toFixed(2)}
                    </div>
                );
            }
        };

        return [...base, ...subjectCols, avgCol];
    }, [classData, grades, loading]);

    return (
        <div className="space-y-8">
            {/* Header Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl shadow-2xl shadow-black/5">
                <div className="flex items-center gap-4">
                    <Link href="/admin/grades">
                        <ButtonReusable variant="outline" size="icon" className="rounded-2xl shrink-0">
                            <IconChevronLeft size={20} />
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
                                    Registre matricule • Année {classData?.schoolYear} • Semestre {semesterFilter}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex bg-muted/40 p-1 rounded-2xl border border-border/50 backdrop-blur-sm">
                        {[1, 2].map(s => (
                            <button
                                key={s}
                                onClick={() => setSemesterFilter(s)}
                                className={cn(
                                    "px-6 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    semesterFilter === s ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-background/60 text-muted-foreground"
                                )}
                            >
                                Semestre {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Matrix Content */}
            {(loading || grades.length > 0) && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`semester-${semesterFilter}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
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

            {/* Empty State / Hints */}
            {!loading && grades.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 bg-rose-500/5 border border-dashed border-rose-500/20 rounded-[2.5rem] text-center space-y-4">
                    <div className="size-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                        <IconAlertTriangle size={32} />
                    </div>
                    <div>
                        <Typography variant="h3" className="text-xl font-black text-rose-500 tracking-tight">Aucune note enregistrée</Typography>
                        <p className="text-md text-muted-foreground max-w-md mx-auto">
                            Il n'y a actuellement aucune donnée de performance pour cette classe sur le <strong>Semestre {semesterFilter}</strong>. 
                            Les enseignants doivent d'abord saisir les notes via leur dashboard.
                        </p>
                    </div>
                </div>
            )}

            {/* Legend / Info */}
            {(loading || grades.length > 0) && (
                <div className="flex flex-wrap gap-4 items-center px-6 py-4 rounded-3xl bg-muted/10 border border-border/30 justify-center">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-rose-500/50">N.N : Non Noté</span>
                    </div>
                    <div className="w-px h-4 bg-border/40" />
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-semibold text-muted-foreground">Excellent (≥ 16)</span>
                    </div>
                    <div className="w-px h-4 bg-border/40" />
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-blue-500" />
                        <span className="text-sm font-semibold text-muted-foreground">Bien (12-16)</span>
                    </div>
                    <div className="w-px h-4 bg-border/40" />
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-amber-500" />
                        <span className="text-sm font-semibold text-muted-foreground">Passable (10-12)</span>
                    </div>
                    <div className="w-px h-4 bg-border/40" />
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-rose-500" />
                        <span className="text-sm font-semibold text-muted-foreground">Insuffisant (&lt; 10)</span>
                    </div>
                </div>
            )}
        </div>
    );
}
