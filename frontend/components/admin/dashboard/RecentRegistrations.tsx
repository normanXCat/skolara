"use client";

import { ColumnWithIcon } from "@/components/admin/DataTable/DataTable";
import { DataTable } from "@/components/admin/DataTable/DataTable";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
    IconClock,
    IconUser,
    IconSchool,
    IconActivity,
    IconCalendar,
    IconAdjustments,
} from "@tabler/icons-react";
import { ROUTES } from "@/config/routes";
import {
    User,
    GraduationCap,
    Activity,
    Calendar,
    Settings,
    Clock,
} from "lucide-react";

interface RecentRegistrationsProps {
    data: any[];
}

const preRegistrationColumns: ColumnWithIcon<any>[] = [
    {
        header: "Enfant",
        icon: User,
        cell: ({ row }) => (
            <div className="py-1">
                <div className="font-bold text-foreground">
                    {row.original.childFirstName} {row.original.childLastName}
                </div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                    {row.original.parentFullName}
                </div>
            </div>
        ),
    },
    {
        header: "Niveau",
        icon: GraduationCap,
        cell: ({ row }) => (
            <span className="font-black text-primary/80">
                {row.original.desiredGrade || "N/A"}
            </span>
        ),
    },
    {
        header: "Statut",
        icon: Activity,
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
        header: "Soumis le",
        icon: Calendar,
        cell: ({ row }) => (
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                <Clock size={16} />
                {new Date(row.original.submittedAt).toLocaleDateString()}
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        icon: Settings,
        cell: ({ row }) => (
            <div className="text-right">
                <ButtonReusable
                    href={`${ROUTES.ADMIN.PRE_REGISTRATIONS}/${row.original.id}`}
                    variant="outline"
                    size="xs"
                >
                    Traiter
                </ButtonReusable>
            </div>
        ),
    },
];

export function RecentRegistrations({ data }: RecentRegistrationsProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <Typography
                        variant="h3"
                        className="text-xl font-black tracking-tight"
                    >
                        Dernières pré-inscriptions
                    </Typography>
                    <Typography
                        variant="body"
                        className="!text-sm text-muted-foreground font-medium"
                    >
                        Les dossiers les plus récents en attente de traitement
                    </Typography>
                </div>
                <ButtonReusable
                    href={ROUTES.ADMIN.PRE_REGISTRATIONS}
                    variant="outline"
                    size="sm"
                >
                    Voir tout le registre
                </ButtonReusable>
            </div>

            <div className="relative group/table pt-2">
                <div className="absolute -inset-4 bg-primary/5 blur-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <DataTable columns={preRegistrationColumns} data={data || []} />
            </div>
        </div>
    );
}
