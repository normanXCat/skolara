"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { cn } from "@/lib/utils";
import { IconCheck, IconX, IconClock, IconSend, IconUsers, IconAlertCircle, IconSearch, IconChevronLeft } from "@tabler/icons-react";
import InputReusable from "@/components/ui/input-reusable";
import { useMemo } from "react";
import { motion } from "framer-motion";
import UserAvatar from "@/components/common/user-avatar";
import Link from "next/link";

interface Student {
    id: number;
    user: {
        firstName: string;
        name: string;
    };
}

export function RollCall() {
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [attendance, setAttendance] = useState<Record<number, { status: "PRESENT" | "ABSENT" | "LATE", reason: string }>>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch teacher's classes
    useEffect(() => {
        async function fetchMyClasses() {
            try {
                // On récupère les assignations réelles
                const response = await api.get<any>("/teacher/grades");
                if (response.success) {
                    // On map pour n'avoir que les classes (dédupliquées si besoin, mais ici une par une c'est ok)
                    const classesList = response.data.map((a: any) => ({
                        id: a.classId,
                        name: a.class.name
                    })).filter((v: any, i: any, a: any) => a.findIndex((t: any) => t.id === v.id) === i);
                    
                    setClasses(classesList);
                    if (classesList.length > 0) {
                        setSelectedClassId(classesList[0].id);
                    }
                }
            } catch (error) {
                toast.error("Erreur chargement classes");
            } finally {
                setLoading(false);
            }
        }
        fetchMyClasses();
    }, []);

    // Fetch students and check if roll call was already done today
    useEffect(() => {
        if (!selectedClassId) return;
        async function fetchStudentsAndRollCall() {
            setLoading(true);
            try {
                const today = new Date().toISOString().split('T')[0];
                
                // Fetch students and existing roll call in parallel
                const [studentsRes, rollCallRes] = await Promise.all([
                    api.get<any>(`/teacher/absences/${selectedClassId}/students`),
                    api.get<any>(`/teacher/absences/${selectedClassId}/roll-call?date=${today}`)
                ]);

                if (studentsRes.success) {
                    setStudents(studentsRes.data);
                    
                    // Initialize with default PRESENT
                    const initial: Record<number, any> = {};
                    studentsRes.data.forEach((s: any) => {
                        initial[s.id] = { status: "PRESENT", reason: "" };
                    });

                    // Merge existing roll call records if any
                    if (rollCallRes.success && Array.isArray(rollCallRes.data)) {
                        rollCallRes.data.forEach((record: any) => {
                            if (initial[record.studentId]) {
                                initial[record.studentId] = {
                                    status: record.status,
                                    reason: record.reason || ""
                                };
                            }
                        });
                    }
                    
                    setAttendance(initial);
                }
            } catch (error) {
                toast.error("Erreur chargement des données");
            } finally {
                setLoading(false);
            }
        }
        fetchStudentsAndRollCall();
    }, [selectedClassId]);

    const setStatus = (studentId: number, status: "PRESENT" | "ABSENT" | "LATE") => {
        setAttendance(prev => ({ 
            ...prev, 
            [studentId]: { ...prev[studentId], status } 
        }));
    };

    const setReason = (studentId: number, reason: string) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: { ...prev[studentId], reason }
        }));
    };

    const filteredStudents = useMemo(() => {
        if (!searchQuery) return students;
        const q = searchQuery.toLowerCase();
        return students.filter(s => 
            s.user.firstName.toLowerCase().includes(q) || 
            s.user.name.toLowerCase().includes(q)
        );
    }, [students, searchQuery]);

    const handleSubmit = async () => {
        if (!selectedClassId) return;
        setSubmitting(true);
        try {
            const records = Object.entries(attendance).map(([id, state]) => ({
                studentId: parseInt(id),
                status: state.status,
                reason: state.reason
            }));
            
            const response = await api.post(`/teacher/absences/${selectedClassId}/roll-call`, {
                date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
                records
            });
            
            if (response.success) {
                toast.success("Feuille d'appel transmise à la vie scolaire. Les parents sont notifiés.");
            }
        } catch (error) {
            toast.error("Erreur lors de la transmission");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link href="/teacher/dashboard">
                            <ButtonReusable variant="outline" size="icon">
                                <IconChevronLeft size={20} />
                            </ButtonReusable>
                        </Link>
                        <div className="flex items-center gap-3">
                            {loading && classes.length === 0 ? (
                                <SkeletonReusable width={300} height={40} />
                            ) : (
                                <div className="flex flex-col">
                                    <Typography variant="h2" className="text-2xl font-black">Faire l'appel</Typography>
                                    <Typography variant="body" className="text-[10px] uppercase font-black text-muted-foreground mt-1 tracking-widest leading-none">
                                        {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex bg-muted/40 p-1 rounded-3xl border border-border/50 transition-all">
                        {loading && classes.length === 0 ? (
                            <SkeletonReusable width={200} height={32} className="rounded-3xl" />
                        ) : (
                            classes.map(c => (
                                <button
                                    key={c.id}
                                    onClick={() => setSelectedClassId(c.id)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-3xl text-xs font-black transition-all border",
                                        selectedClassId === c.id 
                                            ? "bg-primary text-primary-foreground shadow-lg border-primary" 
                                            : "hover:bg-background/60 text-muted-foreground border-border/40"
                                    )}
                                >
                                    {c.name}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                <div className="mt-8">
                     <InputReusable
                        id="search-student"
                        icon={IconSearch}
                        placeholder="Rechercher un élève par nom..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-md"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {/* Header labels */}
                <div className="hidden md:grid grid-cols-[1fr_200px_250px] gap-6 px-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    <span>Élève</span>
                    <span className="text-center">Présence</span>
                    <span>Motif / Observation</span>
                </div>

                {loading ? (
                    [1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="bg-background/20 p-4 rounded-3xl border border-border/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                             <div className="flex items-center gap-4">
                                <SkeletonReusable width={40} height={40} className="rounded-2xl" />
                                <SkeletonReusable width={120} height={16} />
                            </div>
                            <SkeletonReusable width={180} height={32} className="rounded-2xl" />
                            <SkeletonReusable width={150} height={32} className="rounded-2xl" />
                        </div>
                    ))
                ) : filteredStudents.length > 0 ? (
                    filteredStudents.map(student => {
                        const state = attendance[student.id] || { status: "PRESENT", reason: "" };
                        return (
                            <motion.div 
                                key={student.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "grid grid-cols-1 md:grid-cols-[1fr_200px_250px] items-center gap-6 p-4 rounded-[2rem] border transition-all duration-500 group",
                                    state.status === "PRESENT" ? "bg-background/40 border-border/40 hover:border-primary/20" :
                                    state.status === "ABSENT" ? "bg-rose-500/5 border-rose-500/20" :
                                    "bg-amber-500/5 border-amber-500/20"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <UserAvatar 
                                        firstName={student.user.firstName}
                                        lastName={student.user.name}
                                        size={44}
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[15px] text-foreground/90">{student.user.firstName} {student.user.name}</span>
                                        <span className="text-[9px] font-black text-muted-foreground uppercase mt-0.5 opacity-50">#ID {student.id}</span>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <div className="flex gap-1 bg-muted/30 p-1.5 rounded-2xl border border-border/20 w-fit backdrop-blur-sm">
                                        <button
                                            onClick={() => setStatus(student.id, "PRESENT")}
                                            className={cn(
                                                "p-2 rounded-xl transition-all duration-300",
                                                state.status === "PRESENT" ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 scale-105" : "text-muted-foreground/60 hover:bg-background/60 hover:text-foreground"
                                            )}
                                            title="Présent"
                                        >
                                            <IconCheck size={18} stroke={3} />
                                        </button>
                                        <button
                                            onClick={() => setStatus(student.id, "ABSENT")}
                                            className={cn(
                                                "p-2 rounded-xl transition-all duration-300",
                                                state.status === "ABSENT" ? "bg-rose-500 text-white shadow-xl shadow-rose-500/20 scale-105" : "text-muted-foreground/60 hover:bg-background/60 hover:text-foreground"
                                            )}
                                            title="Absent"
                                        >
                                            <IconX size={18} stroke={3} />
                                        </button>
                                        <button
                                            onClick={() => setStatus(student.id, "LATE")}
                                            className={cn(
                                                "p-2 rounded-xl transition-all duration-300",
                                                state.status === "LATE" ? "bg-amber-500 text-white shadow-xl shadow-amber-500/20 scale-105" : "text-muted-foreground/60 hover:bg-background/60 hover:text-foreground"
                                            )}
                                            title="En retard"
                                        >
                                            <IconClock size={18} stroke={3} />
                                        </button>
                                    </div>
                                </div>

                                <div className="relative">
                                    <InputReusable
                                        id={`reason-${student.id}`}
                                        hideIcon
                                        placeholder={state.status === "PRESENT" ? "Rien à signaler" : "Motif..."}
                                        value={state.reason}
                                        onChange={(e) => setReason(student.id, e.target.value)}
                                        disabled={state.status === "PRESENT"}
                                        className="!gap-0"
                                        inputClassName={cn(
                                            state.status === "PRESENT" && "opacity-20 cursor-not-allowed"
                                        )}
                                    />
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="text-center py-24 bg-background/20 rounded-[3rem] border border-dashed border-border/60">
                        <div className="size-20 rounded-[2.5rem] bg-muted/10 border-2 border-dashed border-muted-foreground/10 flex items-center justify-center mx-auto mb-6">
                            <IconUsers size={32} className="text-muted-foreground/20" />
                        </div>
                        <Typography variant="h3" className="text-xl font-black text-foreground/40 uppercase tracking-tighter">Aucun étudiant</Typography>
                        <p className="text-xs text-muted-foreground font-medium mt-2">Aucun résultat ne correspond à votre recherche.</p>
                    </div>
                )}
            </div>

            <div className="">
                <ButtonReusable 
                    onClick={handleSubmit} 
                    isLoading={submitting}
                    disabled={students.length === 0}
                    rightIcon={<IconSend size={18} />}
                >
                    Valider l'appel
                </ButtonReusable>
            </div>
        </div>
    );
}
