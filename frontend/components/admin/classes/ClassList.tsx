"use client";

import { DataTable, ColumnWithIcon } from "@/components/admin/DataTable/DataTable";
import { School, Users, User, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconPlus, IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
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

export interface Class {
    id: number;
    name: string;
    level: string;
    schoolYear: string;
    maxCapacity: number;
    headTeacher?: {
        user: {
            firstName: string;
            name: string;
        };
    };
    _count: {
        students: number;
    };
}

export function ClassList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<Class[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });

    const fetchClasses = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(searchParams.toString());
            const response = await api.get<any>(`/admin/classes?${params.toString()}`);
            if (response.success) {
                setData(response.data.classes);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            toast.error("Impossible de charger les classes");
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchClasses();
    }, [fetchClasses]);

    const columns: ColumnWithIcon<Class>[] = [
        {
            accessorKey: "name",
            header: "Classe",
            icon: School,
            cell: ({ row }) => (
                <div className="flex items-center gap-4 group/cell">
                    <div className="size-11 rounded-[1.2rem] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 border border-primary/20 shadow-sm group-hover/cell:scale-110 transition-transform duration-300">
                        <School className="size-6 text-primary" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-black text-foregroundtext-lg leading-tight group-hover/cell:translate-x-0.5 transition-transform duration-300">
                            {row.original.name}
                        </span>
                        <span className="text-sm text-muted-foreground font-bold">
                            {row.original.level}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "headTeacher.user.name",
            header: "Prof. Principal",
            icon: User,
            cell: ({ row }) => {
                const teacher = row.original.headTeacher;
                return teacher ? (
                    <div className="flex items-center gap-2.5 group/teacher cursor-pointer">
                        <UserAvatar 
                            firstName={teacher.user.firstName} 
                            lastName={teacher.user.name} 
                            size={36} 
                            className="border-primary/20 bg-primary/10 text-primary"
                        />
                        <span className="font-bold text-sm text-foreground group-hover/teacher:text-primary transition-colors">
                            {teacher.user.firstName} {teacher.user.name}
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-muted-foreground/40 italic">
                        <span className="text-sm font-medium">Non assigné</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "_count.students",
            header: "Effectif",
            icon: Users,
            cell: ({ row }) => {
                const count = row.original._count.students;
                const capacity = row.original.maxCapacity;
                const ratio = (count / capacity) * 100;
                
                return (
                    <div className="flex items-center gap-2">
                        <span className={cn("font-black", ratio >= 100 ? "text-rose-500" : "text-primary")}>
                            {count} / {capacity}
                        </span>
                        <div className="flex-1 h-1 w-12 bg-muted rounded-full overflow-hidden hidden sm:block">
                            <div 
                                className={cn("h-full", ratio >= 90 ? "bg-rose-500" : ratio >= 70 ? "bg-amber-500" : "bg-primary")}
                                style={{ width: `${Math.min(ratio, 100)}%` }}
                            />
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "schoolYear",
            header: "Année",
            icon: Calendar,
            cell: ({ row }) => <Badge variant="secondary" className="font-bold">{row.original.schoolYear}</Badge>,
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
                            <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer focus:bg-primary/5" onClick={() => router.push(`${ROUTES.ADMIN.CLASSES}/${row.original.id}`)}>
                                <IconEdit size={16} className="mr-3 text-primary" />
                                <span className="font-bold text-sm">Gérer</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 border-muted/50" />
                            <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer text-rose-500 focus:text-rose-600 focus:bg-rose-500/10">
                                <IconTrash size={16} className="mr-3" />
                                <span className="font-bold text-sm">Supprimer</span>
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
                    <Typography variant="h1" className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">Gestion des Classes</Typography>
                    <Typography variant="body" className="!text-sm text-muted-foreground font-medium mt-1">Structure pédagogique • {pagination.total} classes actives</Typography>
                </div>
                <div className="flex items-center gap-3">
                    <ButtonReusable 
                        leftIcon={<IconPlus size={18} />}
                        onClick={() => router.push(`${ROUTES.ADMIN.CLASSES}/new`)}
                    >
                        Nouvelle Classe
                    </ButtonReusable>
                </div>
            </div>
            <div className="relative group/table">
                <div className="absolute -inset-4 bg-primary/5 blur-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <DataTable
                    columns={columns}
                    data={data}
                    isLoading={loading}
                    onRowClick={(cls) => router.push(`${ROUTES.ADMIN.CLASSES}/${cls.id}`)}
                    searchKey="name"
                    searchPlaceholder="Rechercher une classe..."
                />
            </div>
        </div>
    );
}
