"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/lib/toast-store";
import {
    IconArrowLeft,
    IconFileText,
    IconUser,
    IconCalendar,
    IconPhone,
    IconMail,
    IconMapPin,
    IconDownload,
    IconCheck,
    IconX,
    IconUserCheck,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ROUTES } from "@/config/routes";

/**
 * Page de détail et traitement d'une pré-inscription.
 */
export default function PreRegistrationDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await api.get<any>(
                `/admin/pre-registrations/${id}`,
            );
            if (response.success) {
                setData(response.data);
            }
        } catch (error) {
            toast.error("Impossible de charger le dossier");
            router.push(ROUTES.ADMIN.PRE_REGISTRATIONS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleUpdateStatus = async (status: string) => {
        setProcessing(true);
        try {
            const response = await api.patch(
                `/admin/pre-registrations/${id}/status`,
                { status },
            );
            if (response.success) {
                toast.success(
                    `Le dossier est maintenant marqué comme : ${status}`,
                );
                fetchData();
            }
        } catch (error) {
            toast.error("Une erreur est survenue lors de la mise à jour");
        } finally {
            setProcessing(false);
        }
    };

    const handleConvert = async () => {
        setProcessing(true);
        try {
            const response = await api.post(
                `/admin/pre-registrations/${id}/convert`,
                {
                    createParentAccount: true,
                },
            );
            if (response.success) {
                toast.success(
                    "Dossier validé ! L'élève a été inscrit au registre.",
                );
                router.push(ROUTES.ADMIN.STUDENTS);
            }
        } catch (error) {
            toast.error("Échec de la conversion en élève");
        } finally {
            setProcessing(false);
            setIsConvertDialogOpen(false);
        }
    };

    if (loading)
        return (
            <AdminLayout>
                <div className="h-screen flex items-center justify-center animate-pulse text-muted-foreground font-bold">
                    Chargement du dossier...
                </div>
            </AdminLayout>
        );
    if (!data) return <AdminLayout>Dossier introuvable</AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                {/* Header / Actions Quick Access */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <button
                            onClick={() =>
                                router.push(ROUTES.ADMIN.PRE_REGISTRATIONS)
                            }
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold uppercase text-[10px] tracking-widest mb-4 group"
                        >
                            <IconArrowLeft
                                size={14}
                                className="group-hover:-translate-x-1 transition-transform"
                            />
                            Retour au registre
                        </button>
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl font-black tracking-tighter truncate">
                                {data.childFirstName} {data.childLastName}
                            </h1>
                            <StatusBadge status={data.status} />
                        </div>
                        <p className="text-muted-foreground font-medium">
                            N° Dossier :{" "}
                            <span className="text-primary font-black">
                                {data.fileNumber}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {data.status === "PENDING" && (
                            <ButtonReusable
                                variant="outline"
                                onClick={() => handleUpdateStatus("PROCESSING")}
                                isLoading={processing}
                                className="rounded-2xl"
                            >
                                Marquer comme "En cours"
                            </ButtonReusable>
                        )}

                        {data.status !== "ACCEPTED" &&
                            data.status !== "REJECTED" && (
                                <>
                                    <ButtonReusable
                                        variant="outline"
                                        onClick={() =>
                                            handleUpdateStatus("REJECTED")
                                        }
                                        isLoading={processing}
                                        className="rounded-2xl border-rose-500/20 text-rose-500 hover:bg-rose-500/5 h-14"
                                    >
                                        Refuser
                                    </ButtonReusable>
                                    <ButtonReusable
                                        onClick={() =>
                                            setIsConvertDialogOpen(true)
                                        }
                                        isLoading={processing}
                                        leftIcon={<IconUserCheck size={20} />}
                                        className="rounded-2xl shadow-lg shadow-primary/20 h-14"
                                    >
                                        Accepter & Inscrire
                                    </ButtonReusable>
                                </>
                            )}

                        {data.status === "ACCEPTED" && (
                            <ButtonReusable
                                href={`${ROUTES.ADMIN.STUDENTS}/${data.studentId}`}
                                variant="outline"
                                className="rounded-2xl border-emerald-500/20 text-emerald-600 h-14 px-8"
                            >
                                Voir la fiche élève
                            </ButtonReusable>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne Gauche: Détails */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-background border border-border/50 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                <IconUser size={120} />
                            </div>
                            <h2 className="text-xl font-black mb-8 border-b pb-4">
                                Informations de l'élève
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <DetailItem
                                    icon={IconCalendar}
                                    label="Date de naissance"
                                    value={new Date(
                                        data.childDateOfBirth,
                                    ).toLocaleDateString()}
                                />
                                <DetailItem
                                    icon={IconFileText}
                                    label="Niveau souhaité"
                                    value={data.desiredGrade}
                                />
                                <DetailItem
                                    icon={IconMapPin}
                                    label="Adresse"
                                    value={data.parentAddress}
                                />
                            </div>
                        </section>

                        <section className="bg-background border border-border/50 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                <IconPhone size={120} />
                            </div>
                            <h2 className="text-xl font-black mb-8 border-b pb-4">
                                Contact Parent
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <DetailItem
                                    icon={IconUser}
                                    label="Nom du parent"
                                    value={data.parentFullName}
                                />
                                <DetailItem
                                    icon={IconMail}
                                    label="Email"
                                    value={data.parentEmail}
                                />
                                <DetailItem
                                    icon={IconPhone}
                                    label="Téléphone"
                                    value={data.parentPhone}
                                />
                            </div>
                        </section>

                        {/* TODO: Liste des documents joints */}
                        <section className="bg-background border border-border/50 rounded-[2.5rem] p-10 shadow-sm">
                            <h2 className="text-xl font-black mb-8 border-b pb-4">
                                Pièces justificatives
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Livret de famille",
                                    "Certificat médical",
                                    "Justificatif de domicile",
                                ].map((doc, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center text-primary">
                                                <IconFileText size={20} />
                                            </div>
                                            <span className="text-sm font-bold">
                                                {doc}
                                            </span>
                                        </div>
                                        <button className="p-2 hover:bg-background rounded-full transition-colors text-muted-foreground hover:text-primary">
                                            <IconDownload size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Colonne Droite: Workflow */}
                    <div className="space-y-8">
                        <div className="bg-background border border-border/50 rounded-[2.5rem] p-8 shadow-sm">
                            <h3 className="text-lg font-black mb-6">
                                Traitement
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                    <div>
                                        <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-1">
                                            Dossier reçu
                                        </p>
                                        <p className="text-sm font-bold">
                                            {new Date(
                                                data.submittedAt,
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                {data.processedAt && (
                                    <div className="flex items-start gap-4">
                                        <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                                        <div>
                                            <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-1">
                                                Dernière action
                                            </p>
                                            <p className="text-sm font-bold">
                                                {new Date(
                                                    data.processedAt,
                                                ).toLocaleString()}
                                            </p>
                                            {data.processedByUser && (
                                                <p className="text-[10px] text-primary font-bold mt-1">
                                                    Par:{" "}
                                                    {
                                                        data.processedByUser
                                                            .firstName
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20 space-y-4">
                            <p className="text-sm text-primary font-black uppercase tracking-tighter">
                                Note administrative
                            </p>
                            <textarea
                                className="w-full h-32 bg-background/50 border border-primary/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none placeholder:text-muted-foreground/40 font-medium"
                                placeholder="Ajouter un commentaire interne au dossier..."
                                defaultValue={data.adminComment}
                            />
                            <ButtonReusable
                                variant="outline"
                                size="sm"
                                className="w-full rounded-xl bg-background"
                            >
                                Enregistrer la note
                            </ButtonReusable>
                        </div>
                    </div>
                </div>

                <ConfirmDialog
                    isOpen={isConvertDialogOpen}
                    onClose={() => setIsConvertDialogOpen(false)}
                    onConfirm={handleConvert}
                    isLoading={processing}
                    variant="default"
                    title="Valider l'admission ?"
                    description={`Cette action va transformer le dossier de ${data.childFirstName} en élève définitif et créer les accès parents.`}
                    confirmLabel="Confirmer l'admission"
                />
            </div>
        </AdminLayout>
    );
}

function DetailItem({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-muted/40 flex items-center justify-center text-muted-foreground shrink-0">
                <Icon size={20} strokeWidth={1.5} />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-0.5">
                    {label}
                </p>
                <p className="text-base font-bold text-foreground/80">
                    {value || "Non renseigné"}
                </p>
            </div>
        </div>
    );
}
