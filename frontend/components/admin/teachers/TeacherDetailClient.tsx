"use client";

import { useEffect, useState, useCallback } from "react";
import { TeacherAssignments } from "@/components/admin/teachers/TeacherAssignments";
import { StatCard } from "@/components/admin/StatCard";
import UserAvatar from "@/components/common/user-avatar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import {
    IconBook,
    IconCalendar,
    IconCalendarStats,
    IconCertificate,
    IconChevronLeft,
    IconEdit,
    IconMail,
    IconPhone,
    IconSchool,
    IconUsers,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface TeacherDetailClientProps {
    teacher: any;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function TeacherDetailClient({ teacher }: TeacherDetailClientProps) {
    const router = useRouter();
    const [assignments, setAssignments] = useState<any[]>(teacher.assignments || []);

    const distinctClasses = new Set(
        assignments?.map((a: any) => a.classId),
    ).size;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
        >
            {/* ─── Header Section ─── */}
            <motion.div
                variants={item}
                className="flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 flex-1">
                        <ButtonReusable
                            variant="outline"
                            size="icon"
                            onClick={() => router.back()}
                        className="mt-1"
                        >
                            <IconChevronLeft size={20} />
                        </ButtonReusable>
                    
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-2 justify-center items-center">
                        <div className="relative shrink-0">
                            <UserAvatar
                                firstName={teacher.user.firstName}
                                lastName={teacher.user.name}
                                size={60}
                            />
                            <div
                                className="absolute -bottom-1 -right-1 size-7 rounded-full bg-green-500 border-4 border-background z-20 flex items-center justify-center text-white shadow-sm"
                                title="Compte Actif"
                            >
                                <IconCertificate size={14} />
                            </div>
                        </div>

                        <StatusBadge status="active" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <Typography
                                    variant="h1"
                                    className="text-3xl md:text-4xl font-black tracking-tighter"
                                >
                                    {teacher.user.firstName} {teacher.user.name}
                                </Typography>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <span className="flex items-center gap-2 text-primary font-black text-sm">
                                    <IconBook size={16} />
                                    {teacher.speciality || "Spécialité non définie"}
                                </span>
                                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <IconMail size={16} className="opacity-50" />
                                    {teacher.user.email}
                                </span>
                                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <IconPhone size={16} className="opacity-50" />
                                    {teacher.phone || "Sans téléphone"}
                                </span>
                                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <IconCalendar size={16} className="opacity-50" />
                                    Depuis le {teacher.hireDate ? new Date(teacher.hireDate).toLocaleDateString('fr-FR') : 'Date inconnue'}
                                </span>
                            </div>
                        </div>

                </div>

                    <div className="flex items-center gap-3">
                    <ButtonReusable
                        variant="outline"
                        leftIcon={<IconEdit size={18} />}
                    >
                        Modifier le profil
                    </ButtonReusable>
                </div>

                </div>

            </motion.div>

            {/* ─── Stats Grid ─── */}
            <motion.div
                variants={item}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <StatCard
                    title="Cours Assignés"
                    value={assignments?.length || 0}
                    icon={IconBook}
                    delay={0.1}
                />
                <StatCard
                    title="Classes Distinctes"
                    value={distinctClasses}
                    icon={IconUsers}
                    delay={0.2}
                />
                <StatCard
                    title="Ancienneté"
                    value="2 ans"
                    icon={IconCalendarStats}
                    delay={0.3}
                />
            </motion.div>

            {/* ─── Main Content Area ─── */}
            <motion.div variants={item} className="w-full">
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                         <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                             <IconSchool size={20} />
                         </div>
                         <Typography variant="h3" className="font-black text-2xl tracking-tighter">
                             Assignations Pédagogiques
                         </Typography>
                    </div>
                    
                    <TeacherAssignments 
                        teacherId={teacher.id} 
                        onAssignmentsChange={setAssignments}
                    />
                </section>
            </motion.div>
        </motion.div>
    );
}
