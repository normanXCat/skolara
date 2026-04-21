"use client";

import { IconFileText, IconDownload } from "@tabler/icons-react";
import { Typography } from "@/components/ui/typography";

export function PreRegistrationDocuments() {
    return (
        <section className="bg-background border border-border/50 rounded-3xl p-10 shadow-sm">
            <Typography
                variant="h3"
                className="text-xl font-black mb-8 border-b border-border/10 pb-4"
            >
                Pièces justificatives
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    "Livret de famille",
                    "Certificat médical",
                    "Justificatif de domicile",
                ].map((doc, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <IconFileText size={20} />
                            </div>
                            <span className="text-sm font-bold">{doc}</span>
                        </div>
                        <button className="p-2 hover:bg-background rounded-xl transition-colors text-muted-foreground hover:text-primary active:scale-90">
                            <IconDownload size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
