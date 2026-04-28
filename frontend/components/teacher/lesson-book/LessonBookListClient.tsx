"use client";

import { Badge } from "@/components/ui/badge";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { Typography } from "@/components/ui/typography";
import { useLessonBook } from "@/hooks/teacher/useLessonBook";
import { IconBook, IconPlus } from "@tabler/icons-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function hasMeaningfulHtml(html?: string | null) {
  if (!html) return false;
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 0;
}

export function LessonBookListClient() {
  const { lessons, loading } = useLessonBook();

  return (
    <div className="relative z-10 space-y-10 pb-20">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <Typography variant="h3" className="text-2xl font-black">
              Historique
            </Typography>
          </div>
          <ButtonReusable href="/teacher/lesson-book/new" leftIcon={<IconPlus size={18} />}>
            Nouvelle lecon
          </ButtonReusable>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-6 rounded-[2rem] bg-background/40 border border-border/40 backdrop-blur-xl space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <SkeletonReusable width={140} height={24} className="rounded-xl" />
                  <SkeletonReusable width={90} height={16} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <SkeletonReusable width="90%" height={12} />
                  <SkeletonReusable width="70%" height={12} />
                  <SkeletonReusable width="85%" height={12} />
                </div>
                <SkeletonReusable width={120} height={26} className="rounded-xl" />
              </div>
            ))}
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-20 bg-background/20 rounded-[3rem] border border-dashed border-border/60">
            <IconBook size={48} className="mx-auto text-muted-foreground mb-4" />
            <Typography variant="h3">Aucun cours enregistre</Typography>
            <Typography variant="body" className="text-muted-foreground">
              Publie une premiere lecon pour alimenter ton cahier de texte.
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-start">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="relative p-6 rounded-3xl bg-background/40 border border-border/40 backdrop-blur-xl shadow-2xl space-y-4 overflow-hidden"
              >

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="bg-muted/30 border-border/40 rounded-xl">
                      {lesson.class?.name}
                    </Badge>
                    <span className="text-sm font-bold text-foreground/80">
                      {lesson.subject?.name}
                    </span>
                  </div>
                  <time className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    {format(new Date(lesson.lessonDate), "dd MMM yyyy", { locale: fr })}
                  </time>
                </div>

                <div
                  className="text-sm text-foreground/80 prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />

                {hasMeaningfulHtml(lesson.homework) && (
                  <div className="p-4 mt-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <Typography variant="overline" className="text-primary">
                        Travail a faire
                      </Typography>
                      {lesson.homeworkDueDate && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-primary/10 border border-primary/15 px-2 py-1 rounded-full text-primary">
                          Pour le {format(new Date(lesson.homeworkDueDate), "dd MMM", { locale: fr })}
                        </span>
                      )}
                    </div>
                    <div
                      className="text-sm text-foreground/80 prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: lesson.homework ?? "" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
