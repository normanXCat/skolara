"use client";

import { useState, useEffect } from "react";
import { 
    IconBook, 
    IconPlus, 
    IconEdit, 
    IconTrash, 
    IconSearch,
    IconLoader2
} from "@tabler/icons-react";
import { Activity, FileText, Settings, Hash } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/admin/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { SubjectModal } from "./SubjectModal";

export interface Subject {
    id: number;
    name: string;
    code: string;
    coefficient: number;
    description: string | null;
}

export function SubjectList() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const res: any = await api.get('/admin/subjects');
            setSubjects(res?.data?.subjects || []);
        } catch (error) {
            toast.error("Erreur lors du chargement des matières.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette matière ? (Ceci sera bloqué si des enseignants y sont assignés)")) return;

        try {
            await api.delete(`/admin/subjects/${id}`);
            toast.success("Matière supprimée avec succès.");
            fetchSubjects();
        } catch (error: any) {
            toast.error(error.message || "Erreur lors de la suppression. Peut-être qu'elle est utilisée.");
        }
    };

    const columns: any[] = [
        {
            id: "name",
            header: "Matière",
            accessorKey: "name",
            icon: IconBook,
            cell: (info: any) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <IconBook size={18} />
                    </div>
                    <span className="font-semibold text-foreground/90">{info.getValue()}</span>
                </div>
            )
        },
        {
            id: "code",
            header: "Code",
            accessorKey: "code",
            icon: Hash,
            cell: (info: any) => (
                <Badge variant="outline" className="font-mono bg-background">
                    {info.getValue()}
                </Badge>
            )
        },
        {
            id: "coefficient",
            header: "Coefficient",
            accessorKey: "coefficient",
            icon: Activity,
            cell: (info: any) => (
                <span className="font-medium px-2 py-1 bg-muted rounded-full text-sm">
                    {info.getValue()} x
                </span>
            )
        },
        {
            accessorKey: "description",
            header: "Description",
            icon: FileText,
            cell: ({ getValue }: any) => {
                const value = getValue();
                return (
                    <span className="text-sm text-muted-foreground truncate max-w-[250px] inline-block">
                        {value || "Aucune description"}
                    </span>
                );
            }
        },
        {
            header: "Actions",
            id: "actions",
            icon: Settings,
            cell: (info: any) => {
                const subject = info.row.original;
                return (
                    <div className="flex items-center gap-2">
                        <ButtonReusable
                            variant="outline"
                            size="icon"
                            onClick={() => { setSelectedSubject(subject); setIsMenuOpen(true); }}
                        >
                            <IconEdit size={18} />
                        </ButtonReusable>
                        <ButtonReusable
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(subject.id)}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                            <IconTrash size={18} />
                        </ButtonReusable>
                    </div>
                )
            }
        }
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
                        Catalogue des Matières
                    </Typography>
                    <Typography 
                        variant="body" 
                        className="!text-sm text-muted-foreground font-medium mt-1"
                    >
                        Gestion des disciplines scolaires • {subjects.length} matières répertoriées
                    </Typography>
                </div>
                <div className="flex items-center gap-3">
                    <ButtonReusable
                        onClick={() => { setSelectedSubject(null); setIsMenuOpen(true); }}
                        leftIcon={<IconPlus size={20} />}
                        className="shrink-0"
                    >
                        Nouvelle Matière
                    </ButtonReusable>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative group/table">
                <div className="absolute -inset-4 bg-primary/5 blur-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <DataTable
                    columns={columns}
                    data={subjects}
                    isLoading={loading}
                    searchKey="name"
                    searchPlaceholder="Rechercher une matière..."
                />
            </div>

            <SubjectModal
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onSuccess={fetchSubjects}
                subject={selectedSubject}
            />
        </div>
    );
}
