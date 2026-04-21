"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { IconFileOff, IconArrowLeft } from "@tabler/icons-react";
import { PreRegistrationDetailHeader } from "./PreRegistrationDetailHeader";
import { PreRegistrationDetailInfo } from "./PreRegistrationDetailInfo";
import { PreRegistrationDocuments } from "./PreRegistrationDocuments";
import { PreRegistrationTimeline } from "./PreRegistrationTimeline";
import { PreRegistrationAdminNote } from "./PreRegistrationAdminNote";

interface Props {
    id: string;
}

export default function PreRegistrationDetailClient({ id }: Props) {
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
        if (id) fetchData();
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

    if (loading) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Skeleton Perfectly Aligned */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-2">
                        <SkeletonReusable
                            width={320}
                            height={40}
                            variant="primary"
                        />
                        <SkeletonReusable width={180} height={14} />
                        <div className="pt-1">
                            <SkeletonReusable
                                width={90}
                                height={26}
                                shape="full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        {/* Status update button skeleton */}
                        <SkeletonReusable
                            width={220}
                            height={44}
                            className="rounded-2xl"
                        />
                        {/* Main actions group skeleton - flex-row */}
                        <div className="flex items-center gap-3">
                            <SkeletonReusable
                                width={160}
                                height={44}
                                className="rounded-2xl"
                            />
                            <SkeletonReusable
                                width={110}
                                height={44}
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Info Section Skeleton - updated to rounded-3xl */}
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="bg-background border border-border/50 rounded-3xl p-10 space-y-8"
                            >
                                <SkeletonReusable width={200} height={24} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                    {[1, 2, 3].map((j) => (
                                        <div key={j} className="flex gap-4">
                                            <SkeletonReusable
                                                width={40}
                                                height={40}
                                                className="rounded-xl shrink-0"
                                            />
                                            <div className="space-y-2 flex-1 pt-1">
                                                <SkeletonReusable
                                                    width="40%"
                                                    height={8}
                                                />
                                                <SkeletonReusable
                                                    width="80%"
                                                    height={14}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8">
                        {/* Timeline Skeleton - updated to rounded-3xl */}
                        <div className="bg-background border border-border/50 rounded-3xl p-8 space-y-8">
                            <SkeletonReusable width={100} height={20} />
                            {[1, 2].map((k) => (
                                <div key={k} className="flex gap-4">
                                    <SkeletonReusable
                                        width={8}
                                        height={8}
                                        shape="circle"
                                        className="mt-2 shrink-0"
                                        variant="primary"
                                    />
                                    <div className="space-y-2 flex-1">
                                        <SkeletonReusable
                                            width="50%"
                                            height={10}
                                        />
                                        <SkeletonReusable
                                            width="80%"
                                            height={14}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Admin Note Skeleton - updated to p-4 and rounded-3xl */}
                        <div className="bg-primary/5 p-4 rounded-3xl border border-primary/20 space-y-4">
                            <SkeletonReusable
                                width={120}
                                height={14}
                                variant="primary"
                            />
                            <div className="mt-2">
                                <SkeletonReusable height={120} />
                            </div>
                            <SkeletonReusable height={44} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                    <div className="relative size-24 rounded-[2.5rem] bg-background border border-border/50 flex items-center justify-center text-primary shadow-2xl">
                        <IconFileOff size={44} strokeWidth={1.5} />
                    </div>
                </div>
                <Typography
                    variant="h2"
                    className="font-black tracking-tighter mb-2 text-center"
                >
                    Dossier introuvable
                </Typography>
                <Typography
                    variant="body"
                    className="text-muted-foreground text-center max-w-md mb-10"
                >
                    Le dossier demandé est inexistant ou a été supprimé.
                    Veuillez vérifier l'ID ou retourner au registre principal.
                </Typography>
                <ButtonReusable
                    variant="outline"
                    size="lg"
                    onClick={() => router.push(ROUTES.ADMIN.PRE_REGISTRATIONS)}
                    leftIcon={<IconArrowLeft size={20} />}
                >
                    Retour au registre
                </ButtonReusable>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <PreRegistrationDetailHeader
                data={data}
                processing={processing}
                onUpdateStatus={handleUpdateStatus}
                onOpenConvertDialog={() => setIsConvertDialogOpen(true)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Colonne Gauche: Détails */}
                <div className="lg:col-span-2 space-y-8">
                    <PreRegistrationDetailInfo data={data} />
                    <PreRegistrationDocuments />
                </div>

                {/* Colonne Droite: Workflow */}
                <div className="space-y-8">
                    <PreRegistrationTimeline data={data} />
                    <PreRegistrationAdminNote data={data} />
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
    );
}
