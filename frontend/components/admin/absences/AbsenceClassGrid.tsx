"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { IconSchool, IconChevronRight, IconUsers, IconCalendarEvent } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function AbsenceClassGrid() {
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClasses() {
            try {
                const response = await api.get<any>("/admin/classes?limit=100");
                if (response.success) {
                    setClasses(response.data.classes);
                }
            } catch (error) {
                toast.error("Erreur chargement des classes");
            } finally {
                setLoading(false);
            }
        }
        fetchClasses();
    }, []);

    if (classes.length === 0 && !loading) {
        return (
            <div className="text-center py-20 bg-background/20 rounded-[3rem] border border-dashed border-border/60">
                <IconSchool size={48} className="mx-auto text-muted-foreground mb-4" />
                <Typography variant="h3">Aucune classe disponible</Typography>
                <Typography variant="body" className="text-muted-foreground">Veuillez d'abord créer des classes dans le module de configuration.</Typography>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-background/40 border border-border/40 backdrop-blur-xl h-[200px] flex flex-col gap-6">
                            <SkeletonReusable width={60} height={20} className="rounded-full" />
                            <div className="space-y-2">
                                <SkeletonReusable width="80%" height={28} className="rounded-lg" />
                            </div>
                            <div className="mt-auto pt-4 border-t border-border/10 flex justify-between items-center">
                                <SkeletonReusable width={80} height={16} className="rounded-md" />
                                <SkeletonReusable width={20} height={20} className="rounded-full" />
                            </div>
                        </div>
                    ))
                ) : classes.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.03 }}
                    >
                        <Link 
                            href={`/admin/absences/${item.id}`}
                            className="group block p-8 rounded-3xl bg-background/40 border border-border/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 relative overflow-hidden h-full shadow-lg shadow-black/5"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                                <IconCalendarEvent size={100} />
                            </div>
                            
                            <div className="flex flex-col h-full">
                                <div className="mb-6">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                        {item.level}
                                    </span>
                                </div>

                                <Typography variant="h4" className="text-2xl font-black mb-2 tracking-tight group-hover:text-primary transition-colors">{item.name}</Typography>
                                
                                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/10">
                                    <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
                                        <IconUsers size={14} />
                                        <span className="text-xs font-bold uppercase tracking-wider tabular-nums">{item._count?.students || 0} élèves</span>
                                    </div>
                                    <IconChevronRight size={18} className="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
