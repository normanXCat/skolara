"use client";

import {
    IconUserCheck,
    IconUserX,
    IconClock,
    IconMailForward,
} from "@tabler/icons-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { ROUTES } from "@/config/routes";
import { Typography } from "@/components/ui/typography";

interface Props {
    data: any;
    processing: boolean;
    onUpdateStatus: (status: string) => void;
    onOpenConvertDialog: () => void;
    onResendEmails: () => void;
}

export function PreRegistrationDetailHeader({
    data,
    processing,
    onUpdateStatus,
    onOpenConvertDialog,
    onResendEmails,
}: Props) {

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-2">
                    <Typography
                        variant="h1"
                        className="text-3xl md:text-4xl font-black tracking-tighter truncate"
                    >
                        {data.childFirstName} {data.childLastName}
                    </Typography>
                    <Typography
                        variant="body"
                        className="!text-sm text-muted-foreground font-medium"
                    >
                        N° Dossier :{" "}
                        <span className="text-primary font-black uppercase">
                            {data.fileNumber}
                        </span>
                    </Typography>
                    <div className="flex-none">
                        <StatusBadge status={data.status} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    {data.status === "PENDING" && (
                        <ButtonReusable
                            variant="outline"
                            onClick={() => onUpdateStatus("PROCESSING")}
                            isLoading={processing}
                            leftIcon={<IconClock size={20} />}
                            className="text-amber-500 border-amber-500 hover:bg-amber-500/5"
                        >
                            Marquer comme "En cours"
                        </ButtonReusable>
                    )}
                    <div className="flex items-center gap-3">
                        {data.status === "ACCEPTED" && (
                            <>
                                <ButtonReusable
                                    variant="outline"
                                    onClick={onResendEmails}
                                    isLoading={processing}
                                    leftIcon={<IconMailForward size={20} />}
                                >
                                    Renvoyer identifiants
                                </ButtonReusable>
                                <ButtonReusable
                                    href={`${ROUTES.ADMIN.STUDENTS}/${data.studentId}`}
                                    variant="default"
                                >
                                    Voir la fiche élève
                                </ButtonReusable>
                            </>
                        )}

                        {data.status !== "ACCEPTED" &&
                            data.status !== "REJECTED" && (
                                <>
                                    <ButtonReusable
                                        onClick={onOpenConvertDialog}
                                        isLoading={processing}
                                        leftIcon={<IconUserCheck size={20} />}
                                    >
                                        Accepter & Inscrire
                                    </ButtonReusable>
                                    <ButtonReusable
                                        variant="outline"
                                        onClick={() =>
                                            onUpdateStatus("REJECTED")
                                        }
                                        isLoading={processing}
                                        className="text-red-500 border-red-500"
                                        leftIcon={<IconUserX size={20} />}
                                    >
                                        Refuser
                                    </ButtonReusable>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
