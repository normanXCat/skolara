"use client";

import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api-client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  IconBook2,
  IconSearch,
  IconCalendarEvent,
  IconNotebook,
} from "@tabler/icons-react";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import InputReusable from "@/components/ui/input-reusable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AdminLessonBookClient() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get<any>("/api/admin/lesson-book");
        if (res.success) {
          setLessons(res.data.lessons || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return lessons;
    return lessons.filter((l) => {
      const teacher = `${l.teacher?.user?.firstName || ""} ${l.teacher?.user?.name || ""}`.toLowerCase();
      const className = (l.class?.name || "").toLowerCase();
      const subject = (l.subject?.name || "").toLowerCase();
      const content = (l.content || "").toLowerCase();
      return teacher.includes(q) || className.includes(q) || subject.includes(q) || content.includes(q);
    });
  }, [lessons, searchQuery]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">
      {/* Sidebar — liste condensée */}
      <div className="self-start lg:sticky lg:top-0">
        <Card className="rounded-3xl border-border/40 bg-background/40 backdrop-blur-xl h-full">
          <CardContent className="p-5 h-full flex flex-col gap-4">
            <InputReusable
              id="admin-lessonbook-search"
              placeholder="Rechercher une leçon..."
              icon={IconSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="pt-1 flex-1 min-h-0">
              <Typography variant="overline" className="text-muted-foreground">
                Leçons ({filteredLessons.length})
              </Typography>

              <div className="mt-3 h-full overflow-y-auto overflow-x-hidden space-y-3 pr-1">
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl border border-border/30 bg-background/20 space-y-2"
                      >
                        <SkeletonReusable width="40%" height={10} />
                        <SkeletonReusable width="75%" height={10} />
                      </div>
                    ))}
                  </div>
                ) : filteredLessons.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">Aucune leçon trouvée.</p>
                ) : (
                  filteredLessons.map((lesson) => (
                    <a
                      key={lesson.id}
                      href={`#lesson-${lesson.id}`}
                      className="group relative block w-full text-left p-3 rounded-2xl border border-border/40 bg-background/30 hover:bg-background/40 hover:border-primary/20 transition-all overflow-hidden"
                    >
                      <div className="absolute -right-4 -top-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:opacity-[0.07] text-primary pointer-events-none">
                        <IconBook2 size={64} strokeWidth={1} />
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <IconCalendarEvent size={18} className="text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm truncate font-black">
                              {lesson.class?.name} — {lesson.subject?.name}
                            </p>
                          </div>
                          <p className="text-xs mt-1 truncate text-foreground/85 font-medium">
                            {format(new Date(lesson.lessonDate), "EEEE dd MMM", { locale: fr })}
                          </p>
                          <p className="text-[10px] mt-1 text-muted-foreground truncate">
                            Ens. {lesson.teacher?.user?.firstName} {lesson.teacher?.user?.name}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main — détails des leçons */}
      <div className="self-start lg:sticky lg:top-0 lg:h-[calc(100vh-2rem)]">
        <Card className="rounded-3xl border-border/40 bg-background/40 backdrop-blur-xl h-full">
          <CardContent className="p-0 h-full overflow-hidden flex flex-col">
            <div className="px-7 py-6 border-b border-border/40 flex items-center gap-4">
              <div className="size-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <IconNotebook size={20} className="text-primary" />
              </div>
              <div>
                <Typography variant="h3" className="text-lg font-black">
                  Supervision des leçons
                </Typography>
                <p className="text-sm text-muted-foreground">
                  Ensemble des leçons enregistrées par les enseignants
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-7 space-y-4 bg-gradient-to-b from-background/10 to-background/40">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-2xl border border-border/30 bg-background/20 space-y-2">
                      <SkeletonReusable width="55%" height={10} />
                      <SkeletonReusable width="85%" height={10} />
                    </div>
                  ))}
                </div>
              ) : filteredLessons.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6 py-20">
                  <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <IconBook2 size={28} className="text-primary" />
                  </div>
                  <Typography variant="h3" className="text-xl font-black">
                    Aucune leçon trouvée
                  </Typography>
                  <Typography variant="body" className="text-muted-foreground max-w-md mt-2">
                    Les leçons enregistrées par les enseignants apparaîtront ici.
                  </Typography>
                </div>
              ) : (
                filteredLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    id={`lesson-${lesson.id}`}
                    className="rounded-3xl border border-border/40 bg-background/30 p-6 space-y-4 scroll-mt-28"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="font-black text-foreground">
                          {format(new Date(lesson.lessonDate), "EEEE dd MMMM yyyy", { locale: fr })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 rounded-full">
                          {lesson.class?.name}
                        </Badge>
                        <Badge variant="secondary" className="rounded-full">
                          {lesson.subject?.name}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Ens. {lesson.teacher?.user?.firstName} {lesson.teacher?.user?.name}
                    </p>

                    <div className="prose prose-sm max-w-none text-foreground/90" dangerouslySetInnerHTML={{ __html: lesson.content }} />

                    {lesson.homework && (
                      <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-5">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-black text-amber-700 uppercase tracking-widest">Devoirs &amp; Travaux</span>
                          {lesson.homeworkDueDate && (
                            <span className="text-xs text-amber-600 font-medium">
                              À rendre pour le {format(new Date(lesson.homeworkDueDate), "dd/MM/yyyy")}
                            </span>
                          )}
                        </div>
                        <div className="prose prose-sm prose-amber max-w-none text-amber-800/90" dangerouslySetInnerHTML={{ __html: lesson.homework }} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
