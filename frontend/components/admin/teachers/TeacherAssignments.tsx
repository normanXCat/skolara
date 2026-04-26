"use client";

import { useEffect, useState, useCallback } from "react";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { EmptyState } from "@/components/admin/EmptyState";
import InputReusable from "@/components/ui/input-reusable";
import {
    IconPlus,
    IconTrash,
    IconBook,
    IconSchool,
    IconCalendarTime,
} from "@tabler/icons-react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { ClassSelect } from "@/components/shared/ClassSelect";
import { SubjectSelect } from "@/components/shared/SubjectSelect";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { AnimatePresence, motion } from "framer-motion";
import { getCurrentSchoolYear } from "@/lib/utils";

interface Assignment {
    teacherId: number;
    subjectId: number;
    classId: number;
    schoolYear: string;
    subject: {
        id: number;
        name: string;
        code: string;
    };
    class: {
        id: number;
        name: string;
        level: string;
    };
}

interface TeacherAssignmentsProps {
    teacherId: number;
    onAssignmentsChange?: (assignments: Assignment[]) => void;
}

export function TeacherAssignments({
    teacherId,
    onAssignmentsChange,
}: TeacherAssignmentsProps) {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form states
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [schoolYear, setSchoolYear] = useState(getCurrentSchoolYear());

    const fetchAssignments = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get<any>(`/admin/teachers/${teacherId}`);
            if (response.success) {
                const fetchedAssignments = response.data.assignments || [];
                setAssignments(fetchedAssignments);
                onAssignmentsChange?.(fetchedAssignments);
            }
        } catch (error) {
            toast.error("Impossible de charger les assignations");
        } finally {
            setLoading(false);
        }
    }, [teacherId, onAssignmentsChange]);

    useEffect(() => {
        fetchAssignments();
    }, [fetchAssignments]);

    const handleAddAssignment = async () => {
        if (!selectedClass || !selectedSubject) {
            toast.error("Veuillez sélectionner une classe et une matière");
            return;
        }

        setSubmitting(true);
        try {
            const response = await api.post(
                `/admin/teachers/${teacherId}/assignments`,
                {
                    classId: parseInt(selectedClass),
                    subjectId: parseInt(selectedSubject),
                    schoolYear,
                },
            );

            if (response.success) {
                toast.success("Cours ajouté avec succès");
                setSelectedClass("");
                setSelectedSubject("");
                fetchAssignments();
            }
        } catch (error: any) {
            toast.error(error.message || "Une erreur est survenue");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemoveAssignment = async (assignment: Assignment) => {
        try {
            const response = await api.delete<any>(
                `/admin/teachers/${teacherId}/assignments`,
                {
                    params: {
                        classId: assignment.classId,
                        subjectId: assignment.subjectId,
                        schoolYear: assignment.schoolYear,
                    },
                },
            );

            if (response.success) {
                toast.success("Assignation supprimée");
                fetchAssignments();
            }
        } catch (error: any) {
            toast.error(
                error.message || "Impossible de supprimer l'assignation",
            );
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* ─── List Section (2/3) ─── */}
            <div className="lg:col-span-2 order-2 lg:order-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            [1, 2, 3, 4].map((i) => (
                                <SkeletonReusable
                                    key={i}
                                    height={160}
                                    className="rounded-[2rem]"
                                />
                            ))
                        ) : assignments.length === 0 ? (
                            <div className="col-span-full">
                                <EmptyState
                                    title="Aucun cours assigné"
                                    description="Utilisez le formulaire latéral pour définir la charge pédagogique de cet enseignant."
                                    icon={IconBook}
                                />
                            </div>
                        ) : (
                            assignments.map((assignment, index) => (
                                <motion.div
                                    key={`${assignment.classId}-${assignment.subjectId}-${assignment.schoolYear}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.95,
                                        transition: { duration: 0.2 },
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.05,
                                    }}
                                    layout
                                >
                                    <section className="bg-background border border-border/40 rounded-[2rem] p-6 shadow-sm relative overflow-hidden group hover:shadow-md hover:border-primary/20 transition-all h-full">
                                        {/* Background icon */}
                                        <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
                                            <IconSchool size={80} />
                                        </div>

                                        {/* Delete button */}
                                        <div className="absolute top-4 right-4 z-20">
                                            <ButtonReusable
                                                variant="outline"
                                                size="icon"
                                                className="text-red-500"
                                                onClick={() =>
                                                    handleRemoveAssignment(
                                                        assignment,
                                                    )
                                                }
                                            >
                                                <IconTrash size={16} />
                                            </ButtonReusable>
                                        </div>

                                        <div className="space-y-4 relative z-10">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                                                        {assignment.class.level}
                                                    </span>
                                                </div>
                                                <Typography
                                                    variant="h4"
                                                    className="font-black text-lg tracking-tight leading-none pt-1"
                                                >
                                                    {assignment.class.name}
                                                </Typography>
                                            </div>

                                            <div className="flex items-center gap-3 pt-2">
                                                <div className="size-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground/70 border border-border/10">
                                                    <IconBook size={16} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <Typography
                                                        variant="body"
                                                        className="font-bold text-sm truncate"
                                                    >
                                                        {assignment.subject.name}
                                                    </Typography>
                                                    <Typography variant="caption" className="text-sm text-muted-foreground">
                                                        Code: {assignment.subject.code}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ─── Form Section (1/3) ─── */}
            <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="sticky top-8 space-y-6">
                    <section className="bg-background border border-border/50 rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none text-primary">
                            <IconPlus size={80} />
                        </div>
                        
                        <div className="relative z-10 space-y-8">
                            <div>
                                <Typography
                                    variant="h3"
                                    className="text-xl font-black tracking-tight"
                                >
                                    Nouvelle Assignation
                                </Typography>
                            </div>

                            <div className="space-y-3">
                                <ClassSelect
                                    label="Classe"
                                    value={selectedClass}
                                    onChange={(val: string) => setSelectedClass(val)}
                                    disabled={submitting}
                                    className="z-10"
                                    placeholder="Classe"
                                />
                                <SubjectSelect
                                    label="Matière"
                                    value={selectedSubject}
                                    onChange={(val: string | string[]) =>
                                        setSelectedSubject(val as string)
                                    }
                                    disabled={submitting}
                                    className="z-10"
                                    placeholder="Matière"
                                />
                                <InputReusable
                                    id="school-year"
                                    label="Année Scolaire"
                                    icon={IconCalendarTime}
                                    value={schoolYear}
                                    onChange={(e) => setSchoolYear(e.target.value)}
                                    placeholder="2024-2025"
                                    disabled={true}
                                    className="z-10"
                                />

                                <div className="pt-4">
                                    <ButtonReusable
                                        variant="default"
                                        onClick={handleAddAssignment}
                                        isLoading={submitting}
                                        className="w-full z-10"
                                        leftIcon={<IconPlus size={18} />}
                                    >
                                        Assigner ce cours
                                    </ButtonReusable>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
