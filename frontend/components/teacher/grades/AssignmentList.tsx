"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { IconBook, IconChevronRight, IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function AssignmentList() {
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAssignments() {
            try {
                const response = await api.get<any>("/teacher/grades");
                if (response.success) {
                    setAssignments(response.data);
                }
            } catch (error) {
                toast.error("Erreur chargement des assignations");
            } finally {
                setLoading(false);
            }
        }
        fetchAssignments();
    }, []);

    if (assignments.length === 0 && !loading) {
        return (
            <div className="text-center py-20 bg-background/20 rounded-[3rem] border border-dashed border-border/60">
                <IconBook size={48} className="mx-auto text-muted-foreground mb-4" />
                <Typography variant="h3">Aucune classe assignée</Typography>
                <Typography variant="body" className="text-muted-foreground">Vous n'avez pas encore de classes ou matières assignées.</Typography>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {loading ? (
                <SkeletonReusable width={250} height={32} className="mb-8" />
            ) : (
                <Typography variant="h2" className="text-2xl font-black mb-8">Vos Classes & Matières</Typography>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="p-6 rounded-[2rem] bg-background/40 border border-border/40 backdrop-blur-xl space-y-4">
                            <div className="flex items-center gap-3">
                                <SkeletonReusable width={40} height={40} className="rounded-xl" />
                                <SkeletonReusable width={120} height={20} />
                            </div>
                            <div className="space-y-2">
                                <SkeletonReusable width={60} height={10} />
                                <SkeletonReusable width="80%" height={16} />
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <SkeletonReusable width={80} height={20} className="rounded-lg" />
                                <SkeletonReusable width={20} height={20} className="rounded-full" />
                            </div>
                        </div>
                    ))
                ) : assignments.map((assignment, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Link 
                            href={`/teacher/grades/${assignment.classId}/${assignment.subjectId}`}
                            className="group block p-6 rounded-[2rem] bg-background/40 border border-border/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <IconBook size={80} />
                            </div>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <IconUsers size={20} />
                                </div>
                                <Typography variant="h4" className="text-lg font-black">{assignment.class.name}</Typography>
                            </div>

                            <div className="space-y-1 mb-6">
                                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Matière</p>
                                <p className="text-base font-bold text-foreground truncate">{assignment.subject.name}</p>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[10px] font-black uppercase px-2 py-1 bg-muted rounded-lg border border-border/40">Saisie des notes</span>
                                <IconChevronRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
