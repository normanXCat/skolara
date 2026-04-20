"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ColumnWithIcon } from "@/components/admin/DataTable/DataTable";
import {
    Hash,
    User,
    Activity,
    Calendar,
    Settings,
    Clock,
    MoreHorizontal,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { IconEye, IconClock, IconDotsVertical } from "@tabler/icons-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/config/routes";
import { useEffect, useState, useCallback, Suspense } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface PreRegistration {
    id: number;
    fileNumber: string;
    childFirstName: string;
    childLastName: string;
    desiredGrade: string;
    status: string;
    submittedAt: string;
}

/**
 * Contenu du registre des pré-inscriptions.
 */
function PreRegistrationListContent() {
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
                <span className="font-black text-primary tracking-tighter">
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
                    <span className="font-bold text-foreground">
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
                                <button className="h-8 w-8 rounded-xl hover:bg-muted flex items-center justify-center transition-colors">
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
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-black tracking-tighter text-foreground flex items-center gap-3"
                    >
                        <span className="h-10 w-2 bg-amber-500 rounded-full" />
                        Registre Pré-inscriptions
                    </motion.h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2 px-5">
                        Examen des demandes d'admission • {pagination.total}{" "}
                        dossiers au total
                    </p>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={data}
                isLoading={loading}
                onRowClick={(item) =>
                    router.push(`${ROUTES.ADMIN.PRE_REGISTRATIONS}/${item.id}`)
                }
                searchKey="childLastName"
                searchPlaceholder="Rechercher par nom d'enfant ou n° dossier..."
            />
        </div>
    );
}

export default function AdminPreRegistrationsPage() {
    return (
        <AdminLayout>
            <Suspense
                fallback={
                    <div className="h-screen flex items-center justify-center">
                        Chargement...
                    </div>
                }
            >
                <PreRegistrationListContent />
            </Suspense>
        </AdminLayout>
    );
}
