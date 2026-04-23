"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { cn } from "@/lib/utils";
import { IconCheck, IconX, IconClock, IconSend } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

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
    const [attendance, setAttendance] = useState<Record<number, "PRESENT" | "ABSENT" | "LATE">>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch teacher's classes
    useEffect(() => {
        async function fetchMyClasses() {
            try {
                // For now, list all classes for demo, in real it should be teacher's specific
                const response = await api.get<any>("/admin/classes");
                if (response.success) {
                    setClasses(response.data.classes);
                    if (response.data.classes.length > 0) {
                        setSelectedClassId(response.data.classes[0].id);
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

    // Fetch students when class changes
    useEffect(() => {
        if (!selectedClassId) return;
        async function fetchStudents() {
            setLoading(true);
            try {
                const response = await api.get<any>(`/teacher/grades/grid?classId=${selectedClassId}`);
                if (response.success) {
                    setStudents(response.data);
                    // Initialize everyone as PRESENT
                    const initial: Record<number, any> = {};
                    response.data.forEach((s: any) => initial[s.id] = "PRESENT");
                    setAttendance(initial);
                }
            } catch (error) {
                toast.error("Erreur chargement élèves");
            } finally {
                setLoading(false);
            }
        }
        fetchStudents();
    }, [selectedClassId]);

    const setStatus = (studentId: number, status: "PRESENT" | "ABSENT" | "LATE") => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSubmit = async () => {
        if (!selectedClassId) return;
        setSubmitting(true);
        try {
            const items = Object.entries(attendance).map(([id, status]) => ({
                studentId: parseInt(id),
                status
            }));
            
            const response = await api.post("/teacher/absences/roll-call", {
                classId: selectedClassId,
                items
            });
            
            if (response.success) {
                toast.success("Feuille d'appel transmise à la vie scolaire");
            }
        } catch (error) {
            toast.error("Erreur lors de la transmission");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading && classes.length === 0) return <SkeletonReusable width="100%" height={400} />;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <Typography variant="h2" className="text-2xl font-black">Faire l'appel</Typography>
                        <Typography variant="body" className="text-xs text-muted-foreground mt-1">
                            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </Typography>
                    </div>
                    
                    <div className="flex gap-2 bg-muted/40 p-1.5 rounded-2xl border border-border/50">
                        {classes.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedClassId(c.id)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                                    selectedClassId === c.id 
                                        ? "bg-primary text-primary-foreground shadow-lg" 
                                        : "hover:bg-background/60 text-muted-foreground"
                                )}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {students.map(student => (
                    <div 
                        key={student.id}
                        className={cn(
                            "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                            attendance[student.id] === "PRESENT" ? "bg-background/40 border-border/40" :
                            attendance[student.id] === "ABSENT" ? "bg-rose-500/5 border-rose-500/20" :
                            "bg-amber-500/5 border-amber-500/20"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-muted flex items-center justify-center font-black text-xs">
                                {student.user.firstName[0]}{student.user.name[0]}
                            </div>
                            <span className="font-bold text-sm">{student.user.firstName} {student.user.name}</span>
                        </div>

                        <div className="flex gap-1 bg-muted/30 p-1 rounded-xl border border-border/20">
                            <button
                                onClick={() => setStatus(student.id, "PRESENT")}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    attendance[student.id] === "PRESENT" ? "bg-emerald-500 text-white shadow-sm" : "text-muted-foreground hover:bg-background/60"
                                )}
                                title="Présent"
                            >
                                <IconCheck size={18} />
                            </button>
                            <button
                                onClick={() => setStatus(student.id, "ABSENT")}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    attendance[student.id] === "ABSENT" ? "bg-rose-500 text-white shadow-sm" : "text-muted-foreground hover:bg-background/60"
                                )}
                                title="Absent"
                            >
                                <IconX size={18} />
                            </button>
                            <button
                                onClick={() => setStatus(student.id, "LATE")}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    attendance[student.id] === "LATE" ? "bg-amber-500 text-white shadow-sm" : "text-muted-foreground hover:bg-background/60"
                                )}
                                title="En retard"
                            >
                                <IconClock size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-6">
                <ButtonReusable 
                    onClick={handleSubmit} 
                    isLoading={submitting}
                    disabled={students.length === 0}
                    rightIcon={<IconSend size={18} />}
                    className="rounded-2xl px-12"
                >
                    Valider l'appel
                </ButtonReusable>
            </div>
        </div>
    );
}
