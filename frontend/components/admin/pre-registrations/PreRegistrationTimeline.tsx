"use client";

import { Typography } from "@/components/ui/typography";

interface Props {
    data: any;
}

export function PreRegistrationTimeline({ data }: Props) {
    return (
        <div className="bg-background border border-border/50 rounded-3xl p-8 shadow-sm">
            <Typography variant="h3" className="text-lg font-black mb-6">
                Traitement
            </Typography>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <div>
                        <Typography
                            variant="caption"
                            className="font-black uppercase text-muted-foreground tracking-widest mb-1"
                        >
                            Dossier reçu
                        </Typography>
                        <Typography
                            variant="body"
                            className="font-bold text-sm"
                        >
                            {new Date(data.submittedAt).toLocaleString("fr-FR")}
                        </Typography>
                    </div>
                </div>
                {data.processedAt && (
                    <div className="flex items-start gap-4">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                        <div>
                            <Typography
                                variant="caption"
                                className="font-black uppercase text-muted-foreground tracking-widest mb-1"
                            >
                                Dernière action
                            </Typography>
                            <Typography
                                variant="body"
                                className="font-bold text-sm"
                            >
                                {new Date(data.processedAt).toLocaleString(
                                    "fr-FR",
                                )}
                            </Typography>
                            {data.processedByUser && (
                                <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-tight">
                                    Par: {data.processedByUser.firstName}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
