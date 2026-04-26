"use client";

import { DataTable, ColumnWithIcon } from "@/components/admin/DataTable/DataTable";
import { User, BookOpen, Phone, Activity, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { IconPlus, IconDotsVertical, IconEdit, IconArchive, IconLink } from "@tabler/icons-react";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/config/routes";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/common/user-avatar";

export interface Teacher {
    id: number;
    user: {
        firstName: string;
        name: string;
        email: string;
        active: boolean;
    };
    speciality: string;
    phone: string;
    _count: {
        assignments: number;
    };
    assignments?: {
        subject: {
            id: number;
            name: string;
            code: string;
        };
    }[];
}

export function TeacherList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });

    const fetchTeachers = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(searchParams.toString());
            const response = await api.get<any>(`/admin/teachers?${params.toString()}`);
            if (response.success) {
                console.log("Teachers Data:", response.data.teachers);
                setData(response.data.teachers);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            toast.error("Impossible de charger les enseignants");
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    const columns: ColumnWithIcon<Teacher>[] = [
        {
            accessorKey: "user.name",
            header: "Enseignant",
            icon: User,
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <UserAvatar 
                        firstName={row.original.user.firstName} 
                        lastName={row.original.user.name} 
                        size={40} 
                    />
                    <div className="min-w-0">
                        <div className="font-bold text-foreground text-sm tracking-tight truncate">
                            {row.original.user.firstName} {row.original.user.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-heavy uppercase tracking-wider truncate">
                            {row.original.user.email}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "speciality",
            header: "Spécialité",
            icon: BookOpen,
            cell: ({ row }) => {
                const teacher = row.original;
                // On récupère les codes depuis les assignations réelles
                const codesFromAssignments = teacher.assignments?.map(a => a.subject.code) || [];
                const subjectCodes = Array.from(new Set(codesFromAssignments)).join(", ");
                
                return (
                    <span className="font-bold text-sm text-primary">
                        {teacher.speciality || "Non spécifiée"}&nbsp;
                        {subjectCodes ? (
                            <span className="text-primary/60 font-medium text-xs">({subjectCodes})</span>
                        ) : (
                            <span className="text-muted-foreground/30 font-medium text-xs">(NC)</span>
                        )}
                    </span>
                );
            },
        },
        {
            accessorKey: "_count.assignments",
            header: "Assignations",
            icon: IconLink,
            cell: ({ row }) => (
                <Badge variant="outline" className="font-black border-primary/30 text-primary bg-primary/5">
                    {row.original._count.assignments} cours
                </Badge>
            ),
        },
        {
            accessorKey: "phone",
            header: "Contact",
            icon: Phone,
            cell: ({ row }) => <span className="text-xs font-medium text-muted-foreground">{row.original.phone || "-"}</span>,
        },
        {
            accessorKey: "user.active",
            header: "Statut",
            icon: Activity,
            cell: ({ row }) => <StatusBadge status={row.original.user.active ? "ACTIVE" : "ARCHIVED"} />,
        },
        {
            id: "actions",
            header: "Actions",
            icon: Settings,
            cell: ({ row }) => (
                <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <ButtonReusable
                                variant="outline"
                                size="icon"
                            >
                                <IconDotsVertical size={18} className="text-muted-foreground" />
                            </ButtonReusable>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-xl border-border/50 backdrop-blur-xl bg-background/95">
                            <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer focus:bg-primary/5" onClick={() => router.push(`${ROUTES.ADMIN.TEACHERS}/${row.original.id}`)}>
                                <IconEdit size={16} className="mr-3 text-primary" />
                                <span className="font-bold text-sm">Gérer les cours</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 border-muted/50" />
                            <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer text-rose-500 focus:text-rose-600 focus:bg-rose-500/10">
                                <IconArchive size={16} className="mr-3" />
                                <span className="font-bold text-sm">{row.original.user.active ? "Désactiver" : "Activer"}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <Typography variant="h1" className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">Corps Enseignant</Typography>
                    <Typography variant="body" className="!text-sm text-muted-foreground font-medium mt-1">Équipe pédagogique • {pagination.total} enseignants</Typography>
                </div>
                <div className="flex items-center gap-3">
                    <ButtonReusable
                        href={`${ROUTES.ADMIN.TEACHERS}/new`}
                        leftIcon={<IconPlus size={18} />}
                    >
                        Nouvel Enseignant
                    </ButtonReusable>
                </div>
            </div>
            <div className="relative group/table">
                <div className="absolute -inset-4 bg-secondary/5 blur-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <DataTable
                    columns={columns}
                    data={data}
                    isLoading={loading}
                    onRowClick={(teacher) => router.push(`${ROUTES.ADMIN.TEACHERS}/${teacher.id}`)}
                    searchKey="user_name"
                    searchPlaceholder="Rechercher un enseignant..."
                />
            </div>
        </div>
    );
}
