"use client";

import {
    DataTable,
    ColumnWithIcon,
} from "@/components/admin/DataTable/DataTable";
import { User, School, Calendar, Activity, Settings } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
    IconPlus,
    IconDownload,
    IconDotsVertical,
    IconEdit,
    IconArchive,
    IconUser,
} from "@tabler/icons-react";
import UserAvatar from "@/components/common/user-avatar";
import { ButtonReusable } from "@/components/ui/button-reusable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/config/routes";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { useRouter, useSearchParams } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";

export interface Student {
    id: number;
    user: {
        firstName: string;
        name: string;
        email: string;
    };
    class?: {
        name: string;
        level: string;
    };
    status: string;
    schoolYear: string;
    createdAt: string;
}

export function StudentList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });

    // Status update state
    const [targetStudent, setTargetStudent] = useState<Student | null>(null);
    const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(searchParams.toString());
            const response = await api.get<any>(
                `/admin/students?${params.toString()}`,
            );
            if (response.success) {
                setData(response.data.students);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            toast.error("Impossible de charger les élèves");
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleArchive = async () => {
        if (!targetStudent) return;
        setIsActionLoading(true);
        try {
            const response = await api.patch(
                `/admin/students/${targetStudent.id}/status`,
                {
                    status:
                        targetStudent.status === "ACTIVE"
                            ? "ARCHIVED"
                            : "ACTIVE",
                },
            );
            if (response.success) {
                toast.success(
                    targetStudent.status === "ACTIVE"
                        ? "Élève archivé avec succès"
                        : "Élève réactivé avec succès",
                );
                setIsArchiveDialogOpen(false);
                fetchStudents();
            }
        } catch (error) {
            toast.error(
                "Une erreur est survenue lors de la mise à jour du statut",
            );
        } finally {
            setIsActionLoading(false);
            setTargetStudent(null);
        }
    };

    const handleExport = () => {
        const baseUrl = api.getBaseUrl();
        window.location.href = `${baseUrl}/admin/students/export?${searchParams.toString()}`;
    };

    const columns: ColumnWithIcon<Student>[] = [
        {
            accessorKey: "user.name",
            header: "Élève",
            icon: User,
            cell: ({ row }) => {
                const student = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <UserAvatar 
                            firstName={student.user.firstName} 
                            lastName={student.user.name} 
                            size={40}
                        />
                        <div className="min-w-0">
                            <div className="font-bold text-foreground text-sm tracking-tight truncate">
                                {student.user.firstName} {student.user.name}
                            </div>
                            <div className="text-[10px] text-muted-foreground font-heavy uppercase tracking-wider truncate">
                                {student.user.email}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "class.name",
            header: "Classe",
            icon: School,
            cell: ({ row }) => {
                const cls = row.original.class;
                return cls ? (
                    <div className="flex flex-col">
                        <span className="font-black text-primary/80">
                            {cls.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase">
                            {cls.level}
                        </span>
                    </div>
                ) : (
                    <Badge
                        variant="outline"
                        className="text-[10px] border-dashed text-muted-foreground"
                    >
                        Non assignée
                    </Badge>
                );
            },
        },
        {
            accessorKey: "schoolYear",
            header: "Année",
            icon: Calendar,
            cell: ({ row }) => (
                <span className="font-bold text-muted-foreground/80 text-xs">
                    {row.original.schoolYear}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Statut",
            icon: Activity,
            cell: ({ row }) => <StatusBadge status={row.original.status} />,
        },
        {
            id: "actions",
            header: "Actions",
            icon: Settings,
            cell: ({ row }) => {
                const student = row.original;
                return (
                    <div
                        className="flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <ButtonReusable
                                    variant="outline"
                                    size="icon"
                                    aria-label="Options"
                                >
                                    <IconDotsVertical
                                        size={18}
                                        className="text-muted-foreground"
                                    />
                                </ButtonReusable>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-2xl p-2 shadow-xl border-border/50 backdrop-blur-xl bg-background/95"
                            >
                                <DropdownMenuItem
                                    className="rounded-xl px-4 py-3 cursor-pointer focus:bg-primary/5"
                                    onClick={() =>
                                        router.push(
                                            `${ROUTES.ADMIN.STUDENTS}/${student.id}`,
                                        )
                                    }
                                >
                                    <IconUser
                                        size={16}
                                        className="mr-3 text-primary"
                                    />
                                    <span className="font-bold text-sm">
                                        Voir le profil
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="rounded-xl px-4 py-3 cursor-pointer focus:bg-amber-500/5"
                                    onClick={() =>
                                        router.push(
                                            `${ROUTES.ADMIN.STUDENTS}/${student.id}/edit`,
                                        )
                                    }
                                >
                                    <IconEdit
                                        size={16}
                                        className="mr-3 text-amber-500"
                                    />
                                    <span className="font-bold text-sm">
                                        Modifier
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-1 border-muted/50" />
                                <DropdownMenuItem
                                    className="rounded-xl px-4 py-3 cursor-pointer text-rose-500 focus:text-rose-600 focus:bg-rose-500/10"
                                    onClick={() => {
                                        setTargetStudent(student);
                                        setIsArchiveDialogOpen(true);
                                    }}
                                >
                                    <IconArchive size={16} className="mr-3" />
                                    <span className="font-bold text-sm">
                                        {student.status === "ACTIVE"
                                            ? "Archiver"
                                            : "Réactiver"}
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <Typography
                        variant="h1"
                        className="text-3xl md:text-4xl font-black tracking-tighter text-foreground"
                    >
                        Registre des élèves
                    </Typography>
                    <Typography
                        variant="body"
                        className="!text-sm text-muted-foreground font-medium mt-1"
                    >
                        Gestion centralisée de la scolarité • {pagination.total}{" "}
                        élèves inscrits
                    </Typography>
                </div>

                <div className="flex items-center gap-3">
                    <ButtonReusable
                        variant="outline"
                        onClick={handleExport}
                        leftIcon={<IconDownload size={18} />}
                    >
                        Exporter
                    </ButtonReusable>
                    <ButtonReusable
                        href={`${ROUTES.ADMIN.STUDENTS}/new`}
                        leftIcon={<IconPlus size={18} />}
                    >
                        Nouvel élève
                    </ButtonReusable>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative group/table">
                <div className="absolute -inset-4 bg-primary/5 blur-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <DataTable
                    columns={columns}
                    data={data}
                    isLoading={loading}
                    onRowClick={(student) =>
                        router.push(`${ROUTES.ADMIN.STUDENTS}/${student.id}`)
                    }
                    searchKey="user_name"
                    searchPlaceholder="Rechercher un élève..."
                />
            </div>

            {/* Confirm Archive Dialog */}
            <ConfirmDialog
                isOpen={isArchiveDialogOpen}
                onClose={() => {
                    setIsArchiveDialogOpen(false);
                    setTargetStudent(null);
                }}
                onConfirm={handleArchive}
                isLoading={isActionLoading}
                title={
                    targetStudent?.status === "ACTIVE"
                        ? "Archiver l'élève ?"
                        : "Réactiver l'élève ?"
                }
                description={
                    targetStudent?.status === "ACTIVE"
                        ? `L'élève ${targetStudent.user.firstName} ${targetStudent.user.name} ne sera plus visible dans la liste active de l'établissement.`
                        : `L'élève ${targetStudent?.user.firstName} ${targetStudent?.user.name} sera à nouveau visible dans le registre actif.`
                }
                confirmLabel={
                    targetStudent?.status === "ACTIVE"
                        ? "Archiver"
                        : "Réactiver"
                }
                variant={
                    targetStudent?.status === "ACTIVE"
                        ? "destructive"
                        : "default"
                }
            />
        </div>
    );
}
