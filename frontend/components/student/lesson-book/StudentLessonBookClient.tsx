"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { IconBook, IconCalendarEvent, IconNotebook } from "@tabler/icons-react";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { Card, CardContent } from "@/components/ui/card";

function hasMeaningfulHtml(html?: string | null) {
  if (!html) return false;
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 0;
}

export function StudentLessonBookClient() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get("/api/student/lesson-book");
        if (res.success) {
          setLessons((res.data as any).lessons || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  return (
    <div className="relative z-10 space-y-10 pb-20">
      <div className="space-y-6">
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
            <Typography variant="h3">Aucune lecon enregistree</Typography>
            <Typography variant="body" className="text-muted-foreground mt-2">
              Les lecons publiees par tes professeurs apparaitront ici.
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="relative p-6 rounded-3xl bg-background/40 border border-border/40 backdrop-blur-xl shadow-2xl space-y-4 overflow-hidden group hover:border-primary/20 transition-all hover:-translate-y-1 hover:shadow-primary/5"
              >
                <div className="absolute -right-4 -top-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:opacity-[0.07] text-primary pointer-events-none">
                  <IconNotebook size={120} strokeWidth={1} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 rounded-xl">
                      {lesson.subject?.name}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end">
                    <time className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <IconCalendarEvent size={14} className="text-primary/70" />
                      {format(new Date(lesson.lessonDate), "dd MMM yyyy", { locale: fr })}
                    </time>
                    <span className="text-[10px] text-muted-foreground/70 mt-1 font-medium italic">
                      par {lesson.teacher?.user?.firstName} {lesson.teacher?.user?.name}
                    </span>
                  </div>
                </div>

                <div
                  className="text-sm text-foreground/80 prose prose-sm max-w-none dark:prose-invert relative z-10"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />

                {hasMeaningfulHtml(lesson.homework) && (
                  <div className="p-4 mt-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <Typography variant="overline" className="text-amber-700">
                        Travail a faire
                      </Typography>
                      {lesson.homeworkDueDate && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full text-amber-700">
                          Pour le {format(new Date(lesson.homeworkDueDate), "dd MMM", { locale: fr })}
                        </span>
                      )}
                    </div>
                    <div
                      className="text-sm prose prose-sm max-w-none prose-amber text-amber-800/90"
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
