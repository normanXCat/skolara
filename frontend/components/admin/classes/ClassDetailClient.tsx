"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClassForm } from "./ClassForm";
import { StatCard } from "@/components/admin/StatCard";
import UserAvatar from "@/components/common/user-avatar";
import { Badge } from "@/components/ui/badge";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { 
    IconChevronLeft, 
    IconSchool, 
    IconUsers, 
    IconUser,
    IconBook,
    IconSettings,
    IconAlertCircle,
    IconChevronRight
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClassDetailClientProps {
    classData: any;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
} as const;

export function ClassDetailClient({ classData }: ClassDetailClientProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"students" | "assignments" | "edit">("students");

    const students = classData.students || [];
    const assignments = classData.assignments || [];
    const headTeacher = classData.headTeacher;
    const capacity = classData.maxCapacity || 30;
    const fillRatio = (students.length / capacity) * 100;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-10"
        >
            {/* ─── Header Section ─── */}
            <motion.div
                variants={itemVariants}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl shadow-2xl shadow-black/5"
            >
                <div className="flex items-center gap-4">
                    <ButtonReusable
                        variant="outline"
                        size="icon"
                        onClick={() => router.push("/admin/classes")}
                        className="rounded-2xl shrink-0"
                    >
                        <IconChevronLeft size={20} />
                    </ButtonReusable>
                    
                    <div>
                        <div className="flex items-center gap-3">
                            <Typography variant="h2" className="text-2xl font-black tracking-tighter">
                                {classData.name}
                            </Typography>
                            <Badge className="bg-primary text-primary-foreground border-none text-[9px] font-black uppercase px-2.5 py-0.5 h-5 rounded-full">
                                {classData.level}
                            </Badge>
                        </div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-0.5 whitespace-nowrap">
                            Gestion Pédagogique • Année Scolaire {classData.schoolYear}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant="outline" className={cn("px-3 py-1 font-bold text-sm rounded-xl", fillRatio >= 100 ? "text-rose-500 border-rose-500/30" : "text-primary border-primary/30")}>
                        {students.length} / {capacity} Élèves
                    </Badge>
                </div>
            </motion.div>

            {/* ─── Stats Grid ─── */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <StatCard
                    title="Effectif"
                    value={`${students.length} / ${capacity}`}
                    icon={IconUsers}
                    delay={0.05}
                />
                <StatCard
                    title="Professeur Principal"
                    value={headTeacher ? `${headTeacher.user.firstName} ${headTeacher.user.name}` : "Non assigné"}
                    icon={IconUser}
                    delay={0.1}
                />
                <StatCard
                    title="Matières Assignées"
                    value={assignments.length}
                    icon={IconBook}
                    delay={0.15}
                />
            </motion.div>

            {/* ─── Custom Tabs ─── */}
            <motion.div variants={itemVariants} className="flex gap-2 p-1.5 bg-muted/20 border border-border/40 backdrop-blur-xl rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab("students")}
                    className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300",
                        activeTab === "students" 
                            ? "bg-background text-primary shadow-sm" 
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <IconUsers size={18} />
                    Élèves ({students.length})
                </button>
                <button
                    onClick={() => setActiveTab("assignments")}
                    className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300",
                        activeTab === "assignments" 
                            ? "bg-background text-primary shadow-sm" 
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <IconBook size={18} />
                    Matières ({assignments.length})
                </button>
                <button
                    onClick={() => setActiveTab("edit")}
                    className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300",
                        activeTab === "edit" 
                            ? "bg-background text-primary shadow-sm" 
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <IconSettings size={18} />
                    Modifier la classe
                </button>
            </motion.div>

            {/* ─── Tab Content ─── */}
            <motion.div variants={itemVariants} className="w-full">
                {activeTab === "students" && (
                    <Card className="p-8 rounded-[2rem] border-border/50 bg-background/50 backdrop-blur-3xl overflow-hidden relative">
                        <div className="absolute -top-24 -right-24 size-48 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="flex items-center gap-3 mb-8">
                            <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <IconUsers size={20} />
                            </div>
                            <Typography variant="h3" className="font-black text-2xl tracking-tighter">
                                Liste des élèves
                            </Typography>
                        </div>

                        {students.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                                <div className="size-16 rounded-[1.5rem] bg-muted/20 flex items-center justify-center text-muted-foreground/50">
                                    <IconAlertCircle size={32} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg">Aucun élève dans cette classe</h4>
                                    <p className="text-sm text-muted-foreground">Utilisez la gestion des élèves pour les assigner à cette classe.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border/50">
                                            <th className="pb-4 font-black uppercase text-xs text-muted-foreground tracking-wider">Élève</th>
                                            <th className="pb-4 font-black uppercase text-xs text-muted-foreground tracking-wider">Email</th>
                                            <th className="pb-4 font-black uppercase text-xs text-muted-foreground tracking-wider">Statut</th>
                                            <th className="pb-4 text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/30">
                                        {students.map((student: any) => (
                                            <tr 
                                                key={student.id} 
                                                className="group hover:bg-muted/10 transition-colors cursor-pointer"
                                                onClick={() => router.push(`/admin/students/${student.id}`)}
                                            >
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <UserAvatar 
                                                            firstName={student.user.firstName} 
                                                            lastName={student.user.name} 
                                                            size={36}
                                                        />
                                                        <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                                                            {student.user.firstName} {student.user.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-sm text-muted-foreground">
                                                    {student.user.email}
                                                </td>
                                                <td className="py-4">
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase px-2.5 py-1 rounded-full",
                                                        student.status === "ACTIVE" 
                                                            ? "bg-green-500/10 text-green-500" 
                                                            : "bg-muted text-muted-foreground"
                                                    )}>
                                                        {student.status === "ACTIVE" ? "Actif" : student.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <ButtonReusable 
                                                        variant="ghost" 
                                                        size="icon"
                                                        className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <IconChevronRight size={16} />
                                                    </ButtonReusable>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                )}

                {activeTab === "assignments" && (
                    <Card className="p-8 rounded-[2rem] border-border/50 bg-background/50 backdrop-blur-3xl overflow-hidden relative">
                        <div className="absolute -top-24 -right-24 size-48 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="flex items-center gap-3 mb-8">
                            <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <IconBook size={20} />
                            </div>
                            <Typography variant="h3" className="font-black text-2xl tracking-tighter">
                                Enseignements et Affectations
                            </Typography>
                        </div>

                        {assignments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                                <div className="size-16 rounded-[1.5rem] bg-muted/20 flex items-center justify-center text-muted-foreground/50">
                                    <IconAlertCircle size={32} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg">Aucune affectation dans cette classe</h4>
                                    <p className="text-sm text-muted-foreground">Assignez des matières et des enseignants via la gestion des affectations.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {assignments.map((assignment: any) => (
                                    <Card 
                                        key={assignment.id} 
                                        className="p-5 rounded-2xl border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-md bg-muted/5 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <IconBook size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-foreground text-base leading-tight">
                                                    {assignment.subject?.name}
                                                </h4>
                                                <p className="text-xs text-muted-foreground font-medium mt-1 flex items-center gap-1.5">
                                                    <span className="font-bold">{assignment.subject?.code}</span>
                                                    <span>•</span>
                                                    <span>{assignment.hoursPerWeek ? `${assignment.hoursPerWeek}h / semaine` : "Horaire non spécifié"}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {assignment.teacher && (
                                            <div className="flex items-center gap-2 bg-background/50 border border-border/30 rounded-xl p-2 pr-3 cursor-pointer hover:bg-muted/10 transition-colors" onClick={() => router.push(`/admin/teachers/${assignment.teacher.id}`)}>
                                                <UserAvatar 
                                                    firstName={assignment.teacher.user.firstName} 
                                                    lastName={assignment.teacher.user.name} 
                                                    size={28}
                                                />
                                                <span className="font-bold text-xs text-foreground truncate max-w-[120px]">
                                                    {assignment.teacher.user.firstName} {assignment.teacher.user.name}
                                                </span>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Card>
                )}

                {activeTab === "edit" && (
                    <ClassForm isEdit={true} initialData={classData} />
                )}
            </motion.div>
        </motion.div>
    );
}
