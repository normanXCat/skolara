import { LessonBookListClient } from "@/components/teacher/lesson-book/LessonBookListClient";
import Link from "next/link";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { IconChevronLeft } from "@tabler/icons-react";

export const metadata = {
  title: "Cahier de Texte | Skolara Enseignant",
  description: "Gérez le contenu des cours et les devoirs assignés à vos classes",
};

export default function TeacherLessonBookPage() {
  return (
    <div className="space-y-6">
      <div className="bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/teacher/dashboard">
            <ButtonReusable variant="outline" size="icon">
              <IconChevronLeft size={20} />
            </ButtonReusable>
          </Link>
          <div className="flex flex-col">
            <Typography variant="h2" className="text-2xl font-black">Cahier de texte</Typography>
            <Typography variant="body" className="text-[10px] uppercase font-black text-muted-foreground mt-1 tracking-widest leading-none">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </Typography>
          </div>
        </div>
      </div>
      <LessonBookListClient />
    </div>
  );
}

