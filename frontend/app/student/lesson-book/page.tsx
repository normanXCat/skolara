import { StudentLessonBookClient } from "@/components/student/lesson-book/StudentLessonBookClient";
import { Typography } from "@/components/ui/typography";

export const metadata = {
  title: "Cahier de Texte | Skolara Élève",
  description: "Consultez le déroulement de vos cours et vos devoirs.",
};

export default function StudentLessonBookPage() {
  return (
    <div className="space-y-6">
      <div className="bg-background/40 p-6 rounded-3xl border border-border/40 backdrop-blur-xl">
        <div className="flex flex-col">
          <Typography variant="h2" className="text-2xl font-black">Cahier de Texte</Typography>
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
      <StudentLessonBookClient />
    </div>
  );
}
