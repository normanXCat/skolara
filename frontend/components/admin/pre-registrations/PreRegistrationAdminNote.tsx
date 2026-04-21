"use client";

import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import TextareaReusable from "@/components/ui/textarea-reusable";
import { IconNotes } from "@tabler/icons-react";

interface Props {
    data: any;
}

export function PreRegistrationAdminNote({ data }: Props) {
    return (
        <div className="bg-primary/5 p-4 rounded-3xl border border-primary/20 space-y-4">
            <Typography
                variant="caption"
                className="text-primary font-black uppercase tracking-tighter"
            >
                Note administrative
            </Typography>
            <TextareaReusable
                id="admin-comment"
                placeholder="Ajouter un commentaire interne au dossier..."
                defaultValue={data.adminComment}
                className="!bg-transparent mt-2"
                icon={IconNotes}
            />
            <ButtonReusable variant="outline" size="sm" className="w-full">
                Enregistrer la note
            </ButtonReusable>
        </div>
    );
}
