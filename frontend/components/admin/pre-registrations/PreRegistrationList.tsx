"use client";

import {
    DataTable,
    ColumnWithIcon,
} from "@/components/admin/DataTable/DataTable";
import { Hash, User, Activity, Calendar, Settings, Clock } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { IconEye, IconDotsVertical } from "@tabler/icons-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/config/routes";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography } from "@/components/ui/typography";

export interface PreRegistration {
    id: number;
    fileNumber: string;
    childFirstName: string;
    childLastName: string;
    desiredGrade: string;
    status: string;
    submittedAt: string;
}

/**
 * Registre des pré-inscriptions.
 */
export function PreRegistrationList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<PreRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0 });

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(searchParams.toString());
            const response = await api.get<any>(
                `/admin/pre-registrations?${params.toString()}`,
            );
            if (response.success) {
                setData(response.data.data);
                setPagination({ total: response.data.total });
            }
        } catch (error) {
            toast.error("Impossible de charger les dossiers");
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const columns: ColumnWithIcon<PreRegistration>[] = [
        {
            accessorKey: "fileNumber",
            header: "N° Dossier",
            icon: Hash,
            cell: ({ row }) => (
                <span className="font-black text-primary tracking-tighter text-sm">
                    {row.original.fileNumber}
                </span>
            ),
        },
        {
            accessorKey: "childLastName",
            header: "Enfant",
            icon: User,
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-bold text-foreground text-sm">
                        {row.original.childFirstName}{" "}
                        {row.original.childLastName}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">
                        Souhaité : {row.original.desiredGrade}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Statut",
            icon: Activity,
            cell: ({ row }) => <StatusBadge status={row.original.status} />,
        },
        {
            accessorKey: "submittedAt",
            header: "Date de soumission",
            icon: Calendar,
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/80">
                    <Clock size={14} />
                    {new Date(row.original.submittedAt).toLocaleDateString(
                        "fr-FR",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        },
                    )}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            icon: Settings,
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="h-8 w-8 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
                                    aria-label="Options"
                                >
                                    <IconDotsVertical
                                        size={18}
                                        className="text-muted-foreground"
                                    />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-2xl p-2 shadow-xl border-border/50 bg-background/95 backdrop-blur-xl"
                            >
                                <DropdownMenuItem
                                    className="rounded-xl px-4 py-3 cursor-pointer focus:bg-primary/5"
                                    onClick={() =>
                                        router.push(
                                            `${ROUTES.ADMIN.PRE_REGISTRATIONS}/${item.id}`,
                                        )
                                    }
                                >
                                    <IconEye
                                        size={16}
                                        className="mr-3 text-primary"
                                    />
                                    <span className="font-bold text-sm">
                                        Examiner le dossier
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <Typography
                        variant="h1"
                        className="text-3xl md:text-4xl font-black tracking-tighter text-foreground flex items-center gap-3"
                    >
                        Registre Pré-inscriptions
                    </Typography>
                    <Typography
                        variant="body"
                        className="!text-sm text-muted-foreground font-medium mt-1"
                    >
                        Examen des demandes d'admission • {pagination.total}{" "}
                        dossiers au total
                    </Typography>
                </div>
            </div>

            <div className="relative group/table">
                <div className="absolute -inset-4 bg-primary/5 blur-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <DataTable
                    columns={columns}
                    data={data}
                    isLoading={loading}
                    onRowClick={(item) =>
                        router.push(
                            `${ROUTES.ADMIN.PRE_REGISTRATIONS}/${item.id}`,
                        )
                    }
                    searchKey="childLastName"
                    searchPlaceholder="Rechercher par nom d'enfant ou n° dossier..."
                />
            </div>
        </div>
    );
}
