"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { IconDeviceFloppy, IconChartBar, IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, debounce } from "@/lib/utils";
import { DataTable, ColumnWithIcon } from "@/components/admin/DataTable/DataTable";
import InputReusable from "@/components/ui/input-reusable";
import UserAvatar from "@/components/common/user-avatar";

interface StudentGrade {
    id: number;
    firstName: string;
    lastName: string;
    gradeId: number | null;
    value: number | null;
    comment: string | null;
}

interface GradeEntryGridProps {
    classId: number;
    subjectId: number;
}

export function GradeEntryGrid({ classId, subjectId }: GradeEntryGridProps) {
    const [semester, setSemester] = useState(1);
    const [students, setStudents] = useState<StudentGrade[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const fetchGrid = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get<any>(`/teacher/grades/${classId}/${subjectId}?semester=${semester}`);
            if (response.success) {
                setStudents(response.data.students);
            }
        } catch (error) {
            toast.error("Erreur chargement de la grille");
        } finally {
            setLoading(false);
        }
    }, [classId, subjectId, semester]);

    const fetchStats = useCallback(async () => {
        try {
            const response = await api.get<any>(`/teacher/grades/${classId}/${subjectId}/stats?semester=${semester}`);
            if (response.success) {
                setStats(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch stats", error);
        }
    }, [classId, subjectId, semester]);

    useEffect(() => {
        fetchGrid();
        fetchStats();
    }, [fetchGrid, fetchStats]);

    // Autosave function
    const debouncedSave = useCallback(
        debounce(async (updatedGrades: any[]) => {
            setSaving(true);
            try {
                const response = await api.post(`/teacher/grades/${classId}/${subjectId}`, {
                    semester,
                    grades: updatedGrades
                });
                if (response.success) {
                    setLastSaved(new Date());
                    fetchStats(); // Update stats after save
                }
            } catch (error) {
                toast.error("Erreur lors de l'enregistrement automatique");
            } finally {
                setSaving(false);
            }
        }, 2000),
        [classId, subjectId, semester, fetchStats]
    );

    const handleGradeChange = useCallback((studentId: number, value: string) => {
        const numValue = value === "" ? null : parseFloat(value);
        if (numValue !== null && (numValue < 0 || numValue > 20)) return;

        setStudents(prev => prev.map(s => 
            s.id === studentId ? { ...s, value: numValue } : s
        ));

        // Prep data for partial save
        debouncedSave([{ studentId, value: numValue }]);
    }, [debouncedSave]);

    const handleCommentChange = useCallback((studentId: number, comment: string) => {
        setStudents(prev => {
            const student = prev.find(s => s.id === studentId);
            const val = student?.value ?? null;
            debouncedSave([{ studentId, value: val, comment }]);
            return prev.map(s => s.id === studentId ? { ...s, comment } : s);
        });
    }, [debouncedSave]);

    const columns = useMemo<ColumnWithIcon<StudentGrade>[]>(() => [
        {
            id: "student",
            header: "Élève",
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            cell: ({ row }) => {
                const student = row.original;
                return (
                    <div className="flex items-center gap-4 py-8">
                        <UserAvatar 
                            firstName={student.firstName}
                            lastName={student.lastName}
                            size={44}
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-[15px] font-bold text-foreground/90">{student.firstName} {student.lastName}</span>
                            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">ID: #{student.id}</span>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "value",
            header: "Note (0-20)",
            cell: ({ row }) => {
                const student = row.original;
                return (
                    <div className="relative group/input max-w-[100px]">
                        <InputReusable
                            id={`grade-${student.id}`}
                            type="number"
                            step="0.25"
                            min={0}
                            max={20}
                            hideIcon
                            compact
                            value={student.value ?? ""}
                            onChange={(e) => handleGradeChange(student.id, e.target.value)}
                            placeholder="--"
                            className="!gap-0"
                            inputClassName={cn(
                                "text-center font-black",
                                student.value === null ? "text-muted-foreground/40" : 
                                student.value < 10 ? "text-rose-500" : "text-emerald-500"
                            )}
                        />
                    </div>
                );
            }
        },
        {
            accessorKey: "comment",
            header: "Appréciation / Commentaire",
            cell: ({ row }) => {
                const student = row.original;
                return (
                    <div className="relative w-full min-w-[300px]">
                        <InputReusable
                            id={`comment-${student.id}`}
                            type="text"
                            hideIcon
                            value={student.comment ?? ""}
                            onChange={(e) => handleCommentChange(student.id, e.target.value)}
                            placeholder="Évaluer l'élève..."
                            className="!gap-0"
                        />
                    </div>
                );
            }
        }
    ], [handleGradeChange, handleCommentChange]);

    return (
        <div className="space-y-8 pb-20">
            {/* Header / Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <Link href="/teacher/grades">
                        <ButtonReusable variant="outline" size="icon">
                            <IconChevronLeft size={20} />
                        </ButtonReusable>
                    </Link>
                    <div>
                        {loading ? (
                            <div className="space-y-2">
                                <SkeletonReusable width={150} height={24} />
                                <SkeletonReusable width={100} height={12} />
                            </div>
                        ) : (
                            <>
                                <Typography variant="h2" className="text-xl font-black">Saisie des notes</Typography>
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                    Semestre {semester} • {lastSaved ? `Sauvegardé à ${lastSaved.toLocaleTimeString()}` : "En attente de saisie"}
                                </p>
                            </>
                        )}
                    </div>
                </div>
 
                <div className="flex items-center gap-3">
                    {loading ? (
                        <SkeletonReusable width={120} height={40} className="rounded-3xl" />
                    ) : (
                        <div className="flex bg-muted/40 p-1 rounded-3xl border border-border/50">
                            {[1, 2].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSemester(s)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-3xl text-xs font-black transition-all",
                                        semester === s ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-background/60 text-muted-foreground"
                                    )}
                                >
                                    S{s}
                                </button>
                            ))}
                        </div>
                    )}
                    {saving && (
                        <div className="flex items-center gap-2 text-primary animate-pulse">
                            <IconDeviceFloppy size={16} className="animate-spin" />
                            <span className="text-[10px] font-black uppercase">Sauvegarde...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Table */}
            <div className="relative group/table">
                <div className="absolute -inset-4 bg-primary/5 blur-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <DataTable
                    columns={columns}
                    data={students}
                    isLoading={loading}
                    searchKey="student"
                    searchPlaceholder="Rechercher un élève..."
                    getRowId={(row) => row.id.toString()}
                />
            </div>

            <div className="flex items-center gap-2 text-muted-foreground bg-blue-500/5 p-4 rounded-2xl border border-blue-500/20">
                <IconInfoCircle size={20} className="text-blue-500 shrink-0" />
                <p className="text-sm">
                    Les modifications sont enregistrées automatiquement après 2 secondes d'inactivité. Vous pouvez saisir des décimales (ex: 14.5).
                </p>
            </div>
        </div>
    );
}
