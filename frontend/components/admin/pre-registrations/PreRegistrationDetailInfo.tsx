"use client";

import {
    IconUser,
    IconCalendar,
    IconFileText,
    IconMapPin,
    IconPhone,
    IconMail,
} from "@tabler/icons-react";
import { Typography } from "@/components/ui/typography";

interface Props {
    data: any;
}

export function PreRegistrationDetailInfo({ data }: Props) {
    return (
        <div className="space-y-8">
            <section className="bg-background border border-border/50 rounded-3xl p-10 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                    <IconUser size={120} />
                </div>
                <Typography
                    variant="h3"
                    className="text-xl font-black mb-8 border-b border-border/10 pb-4"
                >
                    Informations de l'élève
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <DetailItem
                        icon={IconCalendar}
                        label="Date de naissance"
                        value={new Date(
                            data.childDateOfBirth,
                        ).toLocaleDateString("fr-FR")}
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

            <section className="bg-background border border-border/50 rounded-3xl p-10 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                    <IconPhone size={120} />
                </div>
                <Typography
                    variant="h3"
                    className="text-xl font-black mb-8 border-b border-border/10 pb-4"
                >
                    Contact Parent
                </Typography>
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
        </div>
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
            <div className="h-10 w-10 rounded-xl bg-muted/40 flex items-center justify-center text-muted-foreground shrink-0 border border-border/5">
                <Icon size={20} strokeWidth={1.5} />
            </div>
            <div>
                <Typography
                    variant="caption"
                    className="font-black text-muted-foreground mb-0.5"
                >
                    {label}
                </Typography>
                <Typography
                    variant="body"
                    className="text-foreground/90 text-sm md:text-base"
                >
                    {value || "Non renseigné"}
                </Typography>
            </div>
        </div>
    );
}
