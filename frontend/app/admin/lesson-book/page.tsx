import { AdminLessonBookClient } from "@/components/admin/lesson-book/AdminLessonBookClient";
import Link from "next/link";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { IconChevronLeft } from "@tabler/icons-react";

export const metadata = {
  title: "Cahier de Texte | Skolara Admin",
  description: "Supervision de l'ensemble des leçons enregistrées par les enseignants.",
};

export default function AdminLessonBookPage() {
  return (
    <div className="space-y-6">
      <div className="bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <ButtonReusable variant="outline" size="icon">
                <IconChevronLeft size={20} />
              </ButtonReusable>
            </Link>
            <div className="flex flex-col">
              <Typography variant="h2" className="text-2xl font-black">Cahier de Texte Global</Typography>
              <Typography
                variant="body"
                className="text-[10px] uppercase font-black text-muted-foreground mt-1 tracking-widest leading-none"
              >
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <AdminLessonBookClient />
    </div>
  );
}
